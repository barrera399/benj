'use client'

import { motion, useInView } from 'framer-motion'
import React, { useRef, useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void
      execute: (siteKey: string, options: { action: string }) => Promise<string>
    }
  }
}

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, margin: '-100px' })
  
  const [formData, setFormData] = useState({
    email: '',
    description: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false)

  // Load reCAPTCHA v3 script
  useEffect(() => {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
    if (!siteKey) {
      console.warn('reCAPTCHA site key not found')
      return
    }

    // Check if script already exists
    const existingScript = document.querySelector(`script[src*="recaptcha/api.js"]`)
    if (existingScript) {
      // Script already loaded, check if grecaptcha is available
      if (window.grecaptcha) {
        window.grecaptcha.ready(() => {
          setRecaptchaLoaded(true)
        })
      }
      return
    }

    const script = document.createElement('script')
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`
    script.async = true
    script.defer = true
    script.onload = () => {
      // Wait for grecaptcha to be ready
      if (window.grecaptcha) {
        window.grecaptcha.ready(() => {
          setRecaptchaLoaded(true)
        })
      } else {
        // Fallback: wait a bit and try again
        setTimeout(() => {
          if (window.grecaptcha) {
            window.grecaptcha.ready(() => {
              setRecaptchaLoaded(true)
            })
          }
        }, 500)
      }
    }
    script.onerror = () => {
      console.error('Failed to load reCAPTCHA script')
    }
    document.body.appendChild(script)

    return () => {
      // Don't remove script on unmount as it might be needed by other components
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const executeRecaptcha = async (): Promise<string | null> => {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
    if (!siteKey) {
      console.error('reCAPTCHA site key not configured')
      return null
    }

    if (!window.grecaptcha) {
      console.error('reCAPTCHA not loaded - window.grecaptcha is undefined')
      return null
    }

    try {
      // Use grecaptcha.ready() to ensure it's fully initialized
      return new Promise((resolve, reject) => {
        window.grecaptcha.ready(async () => {
          try {
            console.log('Executing reCAPTCHA with site key:', siteKey)
            console.log('Current hostname:', window.location.hostname)
            
            const token = await window.grecaptcha.execute(siteKey, {
              action: 'contact_form'
            })
            
            console.log('reCAPTCHA token generated successfully, length:', token?.length)
            
            if (!token || token.length === 0) {
              console.error('Empty token received from reCAPTCHA')
              reject(new Error('Empty token received'))
              return
            }
            
            resolve(token)
          } catch (error) {
            console.error('reCAPTCHA execution error:', error)
            reject(error)
          }
        })
      })
    } catch (error) {
      console.error('reCAPTCHA execution error:', error)
      return null
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Execute reCAPTCHA v3
      console.log('Starting reCAPTCHA execution...')
      const recaptchaToken = await executeRecaptcha()
      
      if (!recaptchaToken) {
        console.error('Failed to get reCAPTCHA token')
        setSubmitStatus('error')
        setIsSubmitting(false)
        alert('Failed to verify reCAPTCHA. Please refresh the page and try again.')
        return
      }

      console.log('Submitting form with token...')
      
      // Submit form with reCAPTCHA token
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          description: formData.description,
          recaptchaToken,
        }),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ email: '', description: '' })
      } else {
        const errorData = await response.json()
        console.error('Form submission error:', errorData)
        
        console.log(errorData.details)
        // Show more specific error message if available
        if (errorData.details && errorData.details.includes('browser-error')) {
          alert('reCAPTCHA error: Please make sure your domain is added to the reCAPTCHA allowed domains list in Google Console.')
        }
        
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div
      ref={containerRef}
      id="contact"
      className="w-full max-w-[1280px] min-h-[50vh] mt-20 m-auto z-100 flex flex-col py-14 px-6 md:px-16"
    >
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
        className="text-5xl md:text-6xl font-bold font-bebas-neue text-white mb-16 text-center"
      >
        Contact Me
      </motion.h1>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-2xl mx-auto w-full"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-black/50 border border-[#86868b] rounded-lg text-white placeholder:text-[#86868b] focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 transition-all"
              placeholder="your.email@example.com"
            />
          </div>

          {/* Description Field */}
          <div className="space-y-2">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-white mb-2"
            >
              Message
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={6}
              className="w-full px-4 py-3 bg-black/50 border border-[#86868b] rounded-lg text-white placeholder:text-[#86868b] focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 transition-all resize-none"
              placeholder="Tell me about your project or inquiry..."
            />
          </div>

          {/* reCAPTCHA v3 - Invisible, runs automatically */}
          {!process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
            <div className="p-4 bg-yellow-500/20 border border-yellow-500 rounded-lg text-yellow-400 text-center text-sm">
              ⚠️ reCAPTCHA is not configured. Please set NEXT_PUBLIC_RECAPTCHA_SITE_KEY in your environment variables.
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-center">
            <Button
              type="submit"
              disabled={isSubmitting || !recaptchaLoaded}
              className="px-8 py-3 bg-teal-400 hover:bg-teal-500 text-black font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
          </div>
          
          {/* reCAPTCHA v3 badge - required by Google */}
          {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
            <div className="text-xs text-gray-500 text-center mt-2">
              This site is protected by reCAPTCHA and the Google{' '}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:underline">
                Privacy Policy
              </a>
              {' '}and{' '}
              <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:underline">
                Terms of Service
              </a>
              {' '}apply.
            </div>
          )}

          {/* Status Messages */}
          {submitStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-teal-400/20 border border-teal-400 rounded-lg text-teal-400 text-center"
            >
              Thank you! Your message has been sent successfully.
            </motion.div>
          )}

          {submitStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-400 text-center"
            >
              Something went wrong. Please try again.
            </motion.div>
          )}
        </form>
      </motion.div>
    </div>
  )
}

