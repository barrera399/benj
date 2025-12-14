'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaRobot, FaTimes, FaMicrophone, FaVolumeUp, FaVolumeMute, FaPaperPlane } from 'react-icons/fa'
import { HiChatBubbleLeftRight } from 'react-icons/hi2'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! I'm here to help you learn more about Joseph and his work. What would you like to know?",
    },
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [speechEnabled, setSpeechEnabled] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const recognitionRef = useRef<SpeechRecognition | null>(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = false
      recognitionRef.current.lang = 'en-US'

      recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript
        setInputMessage(transcript)
        setIsListening(false)
      }

      recognitionRef.current.onerror = () => {
        setIsListening(false)
      }

      recognitionRef.current.onend = () => {
        setIsListening(false)
      }
    }
  }, [])

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true)
      recognitionRef.current.start()
    }
  }

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
    }
  }

  const speak = (text: string) => {
    if (!speechEnabled || typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return
    }

    // Stop any ongoing speech
    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 0.9
    utterance.pitch = 1
    utterance.volume = 0.8

    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)

    window.speechSynthesis.speak(utterance)
  }

  const stopSpeaking = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
    }
  }

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    const userMessage = inputMessage.trim()
    setInputMessage('')
    setIsLoading(true)

    // Add user message to chat
    const newMessages: Message[] = [...messages, { role: 'user', content: userMessage }]
    setMessages(newMessages)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          conversationHistory: messages.map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
        }),
      })

      const data = await response.json()

      if (response.ok) {
        const assistantMessage: Message = { role: 'assistant', content: data.message }
        setMessages([...newMessages, assistantMessage])

        // Speak the assistant's response if speech is enabled
        if (speechEnabled) {
          speak(data.message)
        }
      } else {
        setMessages([
          ...newMessages,
          {
            role: 'assistant',
            content: 'Sorry, I encountered an error. Please try again.',
          },
        ])
      }
    } catch (error) {
      console.error('Error sending message:', error)
      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again.',
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      {/* Chatbot Toggle Button */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-[9999] bg-teal-400 hover:bg-teal-500 text-black rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center cursor-pointer"
          style={{ pointerEvents: 'auto' }}
          aria-label="Open chatbot"
        >
          <HiChatBubbleLeftRight className="w-6 h-6" />
        </motion.button>
      )}

      {/* Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 300, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.8 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-6 right-6 z-[9999] w-96 h-[600px] bg-black border border-teal-400/30 rounded-lg shadow-2xl flex flex-col overflow-hidden"
            style={{ pointerEvents: 'auto' }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-teal-400/20 to-teal-500/20 border-b border-teal-400/30 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-teal-400 rounded-full flex items-center justify-center">
                  <FaRobot className="text-black text-lg" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">AI Assistant</h3>
                  <p className="text-teal-400 text-xs">Ask me anything!</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    stopSpeaking()
                    setSpeechEnabled(!speechEnabled)
                  }}
                  className="p-2 hover:bg-teal-400/20 rounded-lg transition-colors"
                  aria-label={speechEnabled ? 'Disable speech' : 'Enable speech'}
                >
                  {speechEnabled ? (
                    <FaVolumeUp className="text-teal-400 w-4 h-4" />
                  ) : (
                    <FaVolumeMute className="text-gray-400 w-4 h-4" />
                  )}
                </button>
                <button
                  onClick={() => {
                    setIsOpen(false)
                    stopSpeaking()
                    stopListening()
                  }}
                  className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                  aria-label="Close chatbot"
                >
                  <FaTimes className="text-white w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages Container */}
            <div
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/50"
              style={{ scrollbarWidth: 'thin' }}
            >
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === 'user'
                        ? 'bg-teal-400 text-black'
                        : 'bg-gray-800 text-white border border-teal-400/30'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-800 border border-teal-400/30 rounded-lg p-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-teal-400/30 p-4 bg-black/80">
              <div className="flex gap-2">
                <button
                  onMouseDown={startListening}
                  onMouseUp={stopListening}
                  onTouchStart={startListening}
                  onTouchEnd={stopListening}
                  className={`p-2 rounded-lg transition-colors ${
                    isListening
                      ? 'bg-red-500/20 text-red-400'
                      : 'bg-teal-400/20 text-teal-400 hover:bg-teal-400/30'
                  }`}
                  aria-label="Voice input"
                >
                  <FaMicrophone className="w-4 h-4" />
                </button>
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 bg-gray-800 border border-teal-400/30 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-teal-400"
                  disabled={isLoading}
                />
                <button
                  onClick={sendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  className="p-2 bg-teal-400 hover:bg-teal-500 text-black rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Send message"
                >
                  <FaPaperPlane className="w-4 h-4" />
                </button>
              </div>
              {isListening && (
                <p className="text-xs text-red-400 mt-2 text-center">Listening... Release to stop</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// TypeScript declaration for Speech Recognition
declare global {
  interface Window {
    webkitSpeechRecognition: any
    SpeechRecognition: any
  }
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean
  interimResults: boolean
  lang: string
  start(): void
  stop(): void
  abort(): void
  onresult: (event: SpeechRecognitionEvent) => void
  onerror: (event: Event) => void
  onend: () => void
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList
}

interface SpeechRecognitionResultList {
  [index: number]: SpeechRecognitionResult
  length: number
}

interface SpeechRecognitionResult {
  [index: number]: SpeechRecognitionAlternative
  length: number
  isFinal: boolean
}

interface SpeechRecognitionAlternative {
  transcript: string
  confidence: number
}

