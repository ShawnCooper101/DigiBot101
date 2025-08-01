# DigiBot101 Deployment Guide

## Overview

DigiBot101 is an AI assistant application with dual personas (Ava Skye and Matt Payne) that can be deployed in two ways:
1. **Web Application** - Deploy to Vercel for online access
2. **Desktop Widget** - Install on Windows 11 as a floating widget

## Features

- 🎭 **Dual Personas**: Switch between Ava Skye (marketing specialist) and Matt Payne (technical consultant)
- 🗣️ **Voice Capabilities**: Speech-to-text input and text-to-speech output
- 💬 **Real-time Chat**: Interactive conversation interface
- 🎨 **Modern UI**: Glass-morphism design with beautiful animations
- 📱 **Responsive**: Works on all screen sizes
- 🖥️ **Desktop Widget**: Floating window for Windows 11

## Web Deployment (Vercel)

### Prerequisites
- GitHub account
- Vercel account (free tier available)

### Steps

1. **Push to GitHub** (already done via this PR)
2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Import the `DigiBot101` repository
   - Vercel will automatically detect it's a Next.js project

3. **Deploy**:
   - Click "Deploy"
   - Vercel will build and deploy automatically
   - Your app will be available at `https://your-project-name.vercel.app`

### Custom Domain (Optional)
- In Vercel dashboard, go to your project
- Click "Settings" → "Domains"
- Add your custom domain

## Desktop Widget Deployment (Windows 11)

### Prerequisites
- Node.js 16+ installed
- Windows 11 (recommended)

### Development Mode

1. **Clone and Setup**:
   ```bash
   git clone https://github.com/ShawnCooper101/DigiBot101.git
   cd DigiBot101
   npm install
   ```

2. **Run Desktop App**:
   ```bash
   npm run electron
   ```
   This starts both the Next.js dev server and Electron app.

### Production Build

1. **Build Desktop App**:
   ```bash
   npm run dist
   ```

2. **Install**:
   - The installer will be created in the `dist` folder
   - Run the `.exe` file to install DigiBot101
   - The app will appear in your Start Menu and Desktop

### Desktop Features

- **Floating Widget**: Always stays on top of other windows
- **Draggable**: Click and drag to reposition
- **Resizable**: Minimize or expand as needed
- **System Tray**: Minimize to system tray
- **Auto-start**: Option to start with Windows (configure in settings)

## Usage Guide

### Getting Started

1. **Choose Your Persona**:
   - **Ava Skye**: Digital marketing specialist, perfect for business management and marketing tasks
   - **Matt Payne**: Technical consultant, ideal for technical solutions and data analysis

2. **Interact**:
   - Type messages in the input field
   - Click the microphone icon for voice input
   - Use voice commands naturally

3. **Voice Features**:
   - The assistant will speak responses back to you
   - Each persona has a different voice characteristic
   - Voice recognition works in most modern browsers

### Example Commands

**For Ava Skye (Marketing Specialist)**:
- "Help me create a social media strategy"
- "What's the best time to post on Instagram?"
- "Schedule a meeting with the marketing team"
- "Analyze our campaign performance"

**For Matt Payne (Technical Consultant)**:
- "Help me optimize our website performance"
- "What tools should we use for data analytics?"
- "Implement a customer tracking system"
- "Review our technical infrastructure"

### Desktop Widget Controls

- **📌 Pin Icon**: Toggle always-on-top mode
- **📱 Resize Icon**: Switch between widget and full window mode
- **➖ Minimize Icon**: Hide to system tray
- **❌ Close Icon**: Exit application

## Customization

### Adding OpenAI Integration

To enhance AI responses, you can integrate with OpenAI:

1. Get an OpenAI API key
2. Update `src/lib/ai.ts`:
   ```typescript
   // Replace the simulation with actual OpenAI API calls
   import OpenAI from 'openai';
   
   const openai = new OpenAI({
     apiKey: process.env.OPENAI_API_KEY,
   });
   ```

3. Add environment variables for production deployment

### Styling

- Colors and themes can be customized in `tailwind.config.js`
- Component styles are in `src/app/globals.css`
- Individual component styles are within each component file

## Troubleshooting

### Web Deployment Issues

- **Build Fails**: Check the build logs in Vercel dashboard
- **App Won't Load**: Ensure all dependencies are listed in package.json
- **Voice Not Working**: Some browsers require HTTPS for voice features

### Desktop App Issues

- **App Won't Start**: Ensure Node.js is installed and updated
- **Voice Features**: Windows may ask for microphone permissions
- **Performance**: Close other intensive applications if the app is slow

### Browser Compatibility

- **Chrome/Edge**: Full support including voice features
- **Firefox**: Basic features, limited voice support
- **Safari**: Basic features, limited voice support

## Support

For issues or feature requests:
1. Check the GitHub Issues page
2. Create a new issue with detailed description
3. Include your operating system and browser information

## Future Enhancements

Planned features:
- Calendar integration
- Email management
- Advanced analytics dashboard
- Multi-language support
- Custom persona creation
- Team collaboration features

---

**DigiBot101** - Your AI Assistant for Personal & Business Management