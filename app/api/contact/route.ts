import { NextRequest, NextResponse } from 'next/server'
import sgMail from '@sendgrid/mail'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, description, recaptchaToken } = body

    // Validate required fields
    if (!email || !description || !recaptchaToken) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Verify reCAPTCHA token
    const recaptchaSecretKey = process.env.RECAPTCHA_SECRET_KEY
    
    if (!recaptchaSecretKey) {
      console.error('RECAPTCHA_SECRET_KEY is not set')
      // In development, you might want to allow without verification
      // For production, you should always verify
    } else {
      console.log('Verifying reCAPTCHA token...')
      console.log('Token length:', recaptchaToken?.length)
      console.log('Request hostname:', request.headers.get('host'))
      
      const recaptchaResponse = await fetch(
        `https://www.google.com/recaptcha/api/siteverify`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `secret=${recaptchaSecretKey}&response=${recaptchaToken}`,
        }
      )

      const recaptchaData = await recaptchaResponse.json()

      if (!recaptchaData.success) {
        console.error('reCAPTCHA verification failed:', {
          success: recaptchaData.success,
          'error-codes': recaptchaData['error-codes'],
          challenge_ts: recaptchaData.challenge_ts,
          hostname: recaptchaData.hostname,
        })
        
        // Log specific error codes for debugging
        const errorCodes = recaptchaData['error-codes'] || []
        if (errorCodes.includes('browser-error')) {
          console.error('Browser error - this usually means the token was not generated correctly on the client side')
        }
        if (errorCodes.includes('invalid-input-response')) {
          console.error('Invalid token - the token provided was malformed or expired')
        }
        if (errorCodes.includes('invalid-input-secret')) {
          console.error('Invalid secret key - check your RECAPTCHA_SECRET_KEY environment variable')
        }
        
        return NextResponse.json(
          { error: 'reCAPTCHA verification failed', details: errorCodes },
          { status: 400 }
        )
      }

      // For reCAPTCHA v3, also check the score (0.0 to 1.0)
      // Lower scores indicate more suspicious activity
      // You can adjust the threshold (0.5 is a common default)
      if (recaptchaData.score !== undefined && recaptchaData.score < 0.5) {
        console.warn('reCAPTCHA score too low:', recaptchaData.score)
        return NextResponse.json(
          { error: 'reCAPTCHA verification failed - suspicious activity detected' },
          { status: 400 }
        )
      }
    }

    // Save to Supabase first (primary operation - success depends on this)
    let supabaseSuccess = false
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('contacts')
          .insert([
            {
              email: email,
              description: description,
            },
          ])
          .select()
        
        if (error) {
          console.error('Error saving to Supabase:', error)
          // This is critical - if Supabase fails, we should return an error
          return NextResponse.json(
            { error: 'Failed to save your message. Please try again later.' },
            { status: 500 }
          )
        } else {
          console.log('Contact saved to Supabase successfully:', data)
          supabaseSuccess = true
        }
      } catch (dbError) {
        console.error('Error connecting to Supabase:', dbError)
        // If Supabase connection fails, return error
        return NextResponse.json(
          { error: 'Failed to save your message. Please try again later.' },
          { status: 500 }
        )
      }
    } else {
      console.warn('Supabase client not initialized - cannot save contact')
      return NextResponse.json(
        { error: 'Contact form is not properly configured. Please contact the administrator.' },
        { status: 500 }
      )
    }

    // Send email notification using SendGrid (secondary operation - failure doesn't affect success)
    // This runs after Supabase success, so even if it fails, we still return success
    const sendGridApiKey = process.env.SENDGRID_API_KEY
    const contactEmail = process.env.CONTACT_EMAIL || 'jobenbarrera5@gmail.com'
    
    if (sendGridApiKey) {
      try {
        sgMail.setApiKey(sendGridApiKey)
        
        // Escape HTML to prevent XSS
        const escapeHtml = (text: string) => {
          const map: { [key: string]: string } = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;',
          }
          return text.replace(/[&<>"']/g, (m) => map[m])
        }
        
        const safeEmail = escapeHtml(email)
        const safeDescription = escapeHtml(description)
        const formattedDate = new Date().toLocaleString('en-US', {
          dateStyle: 'medium',
          timeStyle: 'short',
        })
        
        const msg = {
          to: contactEmail,
          from: contactEmail, // SendGrid requires a verified sender
          subject: 'New Contact Form Submission - Portfolio',
          text: `You have received a new message from your portfolio contact form.\n\nFrom: ${email}\nDate: ${formattedDate}\n\nMessage:\n${description}`,
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="background: linear-gradient(135deg, #14b8a6 0%, #0d9488 100%); padding: 30px; border-radius: 8px 8px 0 0; text-align: center;">
                <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
              </div>
              <div style="background-color: #f5f5f5; padding: 20px; border-left: 4px solid #14b8a6; margin: 20px 0;">
                <p style="margin: 5px 0;"><strong>From:</strong> ${safeEmail}</p>
                <p style="margin: 5px 0;"><strong>Date:</strong> ${formattedDate}</p>
              </div>
              <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #14b8a6; margin-top: 0;">Message:</h3>
                <p style="color: #666; line-height: 1.8; white-space: pre-wrap;">${safeDescription.replace(/\n/g, '<br>')}</p>
              </div>
              <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
                <p style="color: #999; font-size: 12px; margin: 0;">
                  This email was sent from your portfolio contact form.
                </p>
              </div>
            </body>
            </html>
          `,
        }
        
        await sgMail.send(msg)
        console.log('Email sent successfully to:', contactEmail)
      } catch (emailError: any) {
        // SendGrid failure is non-critical - log but don't fail the request
        // Since Supabase already succeeded, we can still return success
        console.error('Error sending email (non-critical):', emailError)
        if (emailError.response) {
          console.error('SendGrid error details:', JSON.stringify(emailError.response.body, null, 2))
        }
        console.warn('Email notification failed, but contact was saved to database successfully')
      }
    } else {
      console.warn('SENDGRID_API_KEY is not set - email notification skipped')
    }
    
    // Only return success if Supabase save was successful
    if (supabaseSuccess) {
      console.log('Contact form submission completed successfully:', {
        email,
        description,
        timestamp: new Date().toISOString(),
        savedToDatabase: true,
      })

      return NextResponse.json(
        { message: 'Message sent successfully' },
        { status: 200 }
      )
    }
  } catch (error) {
    console.error('Error processing contact form:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

