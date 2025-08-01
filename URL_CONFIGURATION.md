# DigiBot101 - URL Configuration Guide

## 🔗 Where to Point Your URLs

Thank you for offering to provide URLs! Here's exactly where you need to configure them in the DigiBot101 project:

### 📋 Quick Setup Checklist

1. **Copy environment file**: `cp .env.example .env.local`
2. **Fill in your URLs** in the `.env.local` file (see sections below)
3. **Configure external services** to point to the API endpoints listed below

---

## 🌐 API Endpoints (Point External Services Here)

### Main Application URLs
- **Production**: `https://your-domain.vercel.app`
- **Development**: `http://localhost:3000`

### API Endpoints for External Integration

| Endpoint | Purpose | Point Your Service To |
|----------|---------|----------------------|
| `/api/webhook` | General webhook receiver | `https://your-domain.vercel.app/api/webhook` |
| `/api/chat` | AI chat interface | `https://your-domain.vercel.app/api/chat` |
| `/api/voice/synthesize` | Text-to-speech | `https://your-domain.vercel.app/api/voice/synthesize` |
| `/api/voice/recognize` | Speech-to-text | `https://your-domain.vercel.app/api/voice/recognize` |

---

## ⚙️ Environment Configuration (.env.local)

### 🔧 OpenAI API (Required)
```env
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_API_URL=https://api.openai.com/v1
```

### 🎤 Voice Services (Point Your Voice URLs Here)
```env
# Text-to-Speech Service
VOICE_SYNTHESIS_URL=your_text_to_speech_service_url_here

# Speech-to-Text Service  
SPEECH_TO_TEXT_URL=your_speech_to_text_service_url_here
```

### 🔗 Webhook Configuration (Point Your Webhook URLs Here)
```env
# Main webhook endpoint
WEBHOOK_URL=your_webhook_endpoint_url_here

# Notification webhooks
NOTIFICATION_WEBHOOK_URL=your_notification_webhook_url_here
```

### 🌍 External API Integration (Point Your API URLs Here)
```env
# External API endpoints
EXTERNAL_API_URL=your_external_api_url_here
EXTERNAL_API_KEY=your_external_api_key_here

# Database connections
DATABASE_URL=your_database_connection_url_here
REDIS_URL=your_redis_connection_url_here
```

### 👥 Persona Configuration (Point Your Persona Service URLs Here)
```env
# Ava Skye personality and voice
AVA_PERSONALITY_URL=your_ava_personality_config_url_here
AVA_VOICE_URL=your_ava_voice_service_url_here

# Matt Payne personality and voice
MATT_PERSONALITY_URL=your_matt_personality_config_url_here
MATT_VOICE_URL=your_matt_voice_service_url_here
```

---

## 🚀 Vercel Deployment Configuration

### vercel.json (Auto-configured for your domain)
The project will automatically detect your Vercel domain. If you have a custom domain, update:

```env
NEXT_PUBLIC_APP_URL=https://your-custom-domain.com
NEXT_PUBLIC_API_BASE_URL=https://your-custom-domain.com/api
```

---

## 📝 What URLs Do You Have Available?

Please let me know what type of URLs you have available:

### 🔍 Common URL Types Needed:
- [ ] **Webhook endpoint** - for receiving external data
- [ ] **Voice service API** - for text-to-speech/speech-to-text
- [ ] **AI/ML API endpoint** - for enhanced AI capabilities
- [ ] **Database connection** - for data persistence
- [ ] **Custom domain** - for the main application
- [ ] **CDN/Storage** - for media files
- [ ] **Analytics service** - for usage tracking

### 💬 Just tell me:
1. **What type of service** your URL provides
2. **The actual URL** you want to use
3. **Any authentication** (API keys, tokens, etc.)

I'll show you exactly where to configure it in the project!

---

## 🧪 Testing Your URLs

After configuring, you can test the endpoints:

```bash
# Test webhook endpoint
curl https://your-domain.vercel.app/api/webhook

# Test chat API
curl -X POST https://your-domain.vercel.app/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello!", "persona": "ava"}'

# Test voice synthesis
curl -X POST https://your-domain.vercel.app/api/voice/synthesize \
  -H "Content-Type: application/json" \
  -d '{"text": "Hello world!", "persona": "ava"}'
```

---

## 🆘 Need Help?

If you're unsure about any URL configuration, just provide:
- The URL you have
- What service it connects to
- Any documentation or examples

I'll configure it properly in the project for you!