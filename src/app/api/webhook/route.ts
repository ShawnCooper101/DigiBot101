import { NextRequest, NextResponse } from 'next/server';

/**
 * Webhook endpoint for external services
 * 
 * POINT YOUR WEBHOOK URL HERE:
 * - Production: https://your-domain.vercel.app/api/webhook
 * - Development: http://localhost:3000/api/webhook
 * 
 * Configure this URL in your external services that need to send data to DigiBot101
 */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    console.log('Webhook received:', body);
    
    // Process webhook data here
    // You can add logic to handle different types of webhook events
    
    return NextResponse.json({ 
      success: true, 
      message: 'Webhook processed successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to process webhook' 
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  // Health check endpoint
  return NextResponse.json({ 
    status: 'active',
    endpoint: 'webhook',
    message: 'DigiBot101 webhook endpoint is ready to receive data'
  });
}