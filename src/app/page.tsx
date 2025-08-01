export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            🤖 DigiBot101
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            AI Assistant with Voice Capabilities • Dual Personas: Ava Skye & Matt Payne
          </p>
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-8">
            <strong>✅ Project Setup Complete!</strong> All API endpoints are ready for your URLs.
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">🔗 URL Configuration</h2>
            <p className="text-gray-600 mb-4">
              You mentioned you have URLs to make development easier! Here's where to configure them:
            </p>
            <ul className="space-y-2 text-sm">
              <li>✅ Environment variables ready in <code className="bg-gray-100 px-2 py-1 rounded">.env.example</code></li>
              <li>✅ API endpoints created and tested</li>
              <li>✅ Vercel deployment configuration ready</li>
              <li>✅ Documentation provided in <code className="bg-gray-100 px-2 py-1 rounded">URL_CONFIGURATION.md</code></li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">🌐 API Endpoints</h2>
            <p className="text-gray-600 mb-4">Ready to receive your URLs:</p>
            <ul className="space-y-2 text-sm">
              <li><span className="font-mono bg-blue-100 px-2 py-1 rounded">/api/webhook</span> - Webhook receiver</li>
              <li><span className="font-mono bg-blue-100 px-2 py-1 rounded">/api/chat</span> - AI chat interface</li>
              <li><span className="font-mono bg-blue-100 px-2 py-1 rounded">/api/voice/synthesize</span> - Text-to-speech</li>
              <li><span className="font-mono bg-blue-100 px-2 py-1 rounded">/api/voice/recognize</span> - Speech-to-text</li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">📋 What URLs Can You Provide?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Service Types:</h3>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>🔗 Webhook endpoints</li>
                <li>🎤 Voice service APIs</li>
                <li>🤖 AI/ML service URLs</li>
                <li>🗄️ Database connections</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Infrastructure:</h3>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>🌍 Custom domains</li>
                <li>📊 Analytics services</li>
                <li>☁️ Cloud storage URLs</li>
                <li>🔐 Authentication endpoints</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-yellow-800 mb-2">💡 Next Steps</h2>
          <ol className="list-decimal list-inside space-y-2 text-yellow-700">
            <li>Tell me what URLs you have available</li>
            <li>I'll show you exactly where to configure each one</li>
            <li>Copy <code className="bg-yellow-100 px-1 rounded">.env.example</code> to <code className="bg-yellow-100 px-1 rounded">.env.local</code></li>
            <li>Add your actual URLs to the configuration</li>
            <li>Deploy to Vercel with your configured URLs</li>
          </ol>
        </div>

        <div className="text-center">
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/URL_CONFIGURATION.md"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              📖 View Configuration Guide
            </a>
            <a
              href="/.env.example"
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              ⚙️ See Environment Variables
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
