import { NextRequest, NextResponse } from 'next/server';

/**
 * Chat API endpoint for AI conversation
 * 
 * POINT YOUR AI SERVICE URL HERE:
 * - This endpoint: https://your-domain.vercel.app/api/chat
 * - External AI API: Configure OPENAI_API_URL in .env.local
 * 
 * Use this endpoint for frontend chat interface integration
 */

export async function POST(request: NextRequest) {
  try {
    const { message, persona = 'ava' } = await request.json();
    
    if (!message) {
      return NextResponse.json({ 
        error: 'Message is required' 
      }, { status: 400 });
    }

    // Here you would integrate with OpenAI or your AI service
    // Using environment variables configured in .env.local
    const openaiUrl = process.env.OPENAI_API_URL;
    const openaiKey = process.env.OPENAI_API_KEY;
    
    // Placeholder response - replace with actual AI integration
    const response = {
      message: `Hello! This is ${persona === 'ava' ? 'Ava Skye' : 'Matt Payne'} responding to: "${message}"`,
      persona,
      timestamp: new Date().toISOString()
    };
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({ 
      error: 'Failed to process chat message' 
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'active',
    endpoint: 'chat',
    message: 'DigiBot101 chat API is ready',
    supportedPersonas: ['ava', 'matt']
  });
}