import { Message, PersonaType } from '@/types';
import { getPersona } from './personas';

// Simulated AI responses for demo purposes
// In production, this would integrate with OpenAI API or similar
export async function generateAIResponse(
  message: string, 
  persona: PersonaType, 
  conversationHistory: Message[]
): Promise<string> {
  const personaData = getPersona(persona);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
  
  // Simple response generation based on persona and keywords
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('marketing') || lowerMessage.includes('social media')) {
    if (persona === 'ava') {
      return "As your digital marketing specialist, I can help you develop comprehensive strategies for social media engagement, content creation, and brand awareness. What specific marketing goals are you looking to achieve?";
    } else {
      return "From a technical perspective, I can help you implement marketing automation tools, analyze campaign data, and optimize your digital marketing funnel. What metrics are you tracking?";
    }
  }
  
  if (lowerMessage.includes('schedule') || lowerMessage.includes('appointment')) {
    if (persona === 'ava') {
      return "I'd be happy to help manage your schedule! While I can't directly access your calendar yet, I can help you organize your tasks and remind you of important appointments. What would you like to schedule?";
    } else {
      return "For scheduling optimization, I recommend implementing a calendar management system. I can help you automate appointment booking and integrate with your existing tools. What's your current setup?";
    }
  }
  
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
    if (persona === 'ava') {
      return `Hello! I'm Ava Skye, your professional digital marketing assistant. I'm here to help with your personal tasks and DigiMark101 agency management. How can I assist you today?`;
    } else {
      return `Hi there! I'm Matt Payne, your technical consultant and business strategist. I specialize in optimizing processes and implementing tech solutions. What can I help you with?`;
    }
  }
  
  // Default responses
  const responses = persona === 'ava' ? [
    "I understand what you're looking for. Let me help you find the best solution for your needs.",
    "That's an interesting question! As your assistant, I'm here to provide comprehensive support.",
    "I'd be happy to help you with that. Could you provide a bit more detail about what you're trying to achieve?",
  ] : [
    "Let me analyze that request and provide you with a strategic approach.",
    "From a technical standpoint, there are several ways we could approach this.",
    "I can help you implement a solution for that. What's your current process?",
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
}