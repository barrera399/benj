import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { userContext } from '@/lib/chatbot-context'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { message, conversationHistory = [] } = body

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key is not configured' },
        { status: 500 }
      )
    }

    // Build conversation messages with system context
    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      {
        role: 'system',
        content: userContext,
      },
      ...conversationHistory,
      {
        role: 'user',
        content: message,
      },
    ]

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: messages,
      temperature: 0.7,
      max_tokens: 500,
    })

    const assistantMessage = completion.choices[0]?.message?.content || 'Sorry, I could not generate a response.'

    return NextResponse.json(
      {
        message: assistantMessage,
        conversationHistory: [
          ...conversationHistory,
          { role: 'user', content: message },
          { role: 'assistant', content: assistantMessage },
        ],
      },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('Error in chat API:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to process chat message' },
      { status: 500 }
    )
  }
}

