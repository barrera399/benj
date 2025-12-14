import { NextRequest, NextResponse } from 'next/server'

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

    // Here you would typically:
    // 1. Save to database
    // 2. Send email notification
    // 3. Integrate with email service (SendGrid, Resend, etc.)
    
    // For now, we'll just log it and return success
    console.log('Contact form submission:', {
      email,
      description,
      timestamp: new Date().toISOString(),
    })

    // Example: Send email using a service like Resend, SendGrid, etc.
    // await sendEmail({
    //   to: 'your-email@example.com',
    //   subject: 'New Contact Form Submission',
    //   body: `Email: ${email}\n\nMessage: ${description}`,
    // })

    return NextResponse.json(
      { message: 'Message sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error processing contact form:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

