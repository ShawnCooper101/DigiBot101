# DigiBot101

A special AI assistant with voice capabilities specifically designed as a personal assistant and DigiMark101 digital marketing agency manager/receptionist.

## 🔗 URL Configuration

**You mentioned you have URLs to make development easier!** 

👉 **See [URL_CONFIGURATION.md](./URL_CONFIGURATION.md) for exactly where to point your URLs.**

## ⚡ Quick Start

1. **Configure your URLs**:
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your actual URLs
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**: http://localhost:3000

## 🌐 API Endpoints Ready for Your URLs

| Endpoint | Purpose | Point Your Service To |
|----------|---------|----------------------|
| `/api/webhook` | Webhook receiver | `https://your-domain.vercel.app/api/webhook` |
| `/api/chat` | AI chat interface | `https://your-domain.vercel.app/api/chat` |
| `/api/voice/synthesize` | Text-to-speech | `https://your-domain.vercel.app/api/voice/synthesize` |
| `/api/voice/recognize` | Speech-to-text | `https://your-domain.vercel.app/api/voice/recognize` |

## 📋 What URLs Can You Provide?

Tell me what you have available:
- 🔗 **Webhook endpoints**
- 🎤 **Voice service APIs**
- 🤖 **AI/ML service URLs**
- 🗄️ **Database connections**
- 🌍 **Custom domains**
- 📊 **Analytics services**

I'll show you exactly where to configure each one!

## 🚀 Deployment

**Vercel** (Recommended):
```bash
npx vercel --prod
```

Your app will be available at: `https://your-project.vercel.app`

## 👥 Dual Personas

- **Ava Skye**: Digital marketing assistant persona
- **Matt Payne**: Business manager persona

Configure persona-specific voice URLs in `.env.local`:
```env
AVA_VOICE_URL=your_ava_voice_service_url
MATT_VOICE_URL=your_matt_voice_service_url
```

## 🛠️ Technology Stack

- **Next.js 15** with TypeScript
- **Tailwind CSS** for styling
- **API Routes** for backend functionality
- **Vercel** for deployment
- **Voice integration** ready

## 📖 Documentation

- [URL Configuration Guide](./URL_CONFIGURATION.md) - **Start here for URL setup!**
- [Environment Variables](./.env.example) - Complete list of configurable URLs

---

💡 **Ready to integrate your URLs!** Just let me know what you have available and I'll guide you through the exact configuration steps.
