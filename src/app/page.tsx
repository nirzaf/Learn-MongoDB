import { Button } from '@/components/ui/Button';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-16">
        <main className="text-center space-y-8">
          {/* Hero Section */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-primary">
              Learn MongoDB
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto">
              Master MongoDB from fundamentals to advanced concepts with our interactive learning platform
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">📚</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Structured Learning</h3>
              <p className="text-gray-600">Follow a carefully designed curriculum from beginner to expert level</p>
            </div>

            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">⚡</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Interactive Playground</h3>
              <p className="text-gray-600">Practice MongoDB queries in a real-time, sandboxed environment</p>
            </div>

            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">📊</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Progress Tracking</h3>
              <p className="text-gray-600">Monitor your learning journey and track completed lessons</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <a href="/learn">
              <Button size="lg" className="text-lg px-8">
                Start Learning
              </Button>
            </a>
            <Button variant="outline" size="lg" className="text-lg px-8">
              View Curriculum
            </Button>
          </div>

          {/* Status */}
          <div className="mt-16 p-6 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">🎉 Learning Platform Ready!</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium text-gray-700 mb-2">✅ Completed Features</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• Complete learning interface</li>
                  <li>• Module & lesson navigation</li>
                  <li>• Progress tracking (localStorage)</li>
                  <li>• Markdown content rendering</li>
                  <li>• MongoDB Atlas integration</li>
                  <li>• Responsive design</li>
                  <li>• 3 MongoDB fundamentals lessons</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 mb-2">🎯 Ready to Add</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• Interactive code playground</li>
                  <li>• More learning modules</li>
                  <li>• Challenge exercises</li>
                  <li>• Schema visualization</li>
                  <li>• Advanced MongoDB topics</li>
                  <li>• Community features</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 p-3 bg-primary/10 rounded-lg text-center">
              <p className="text-primary font-medium">
                🚀 Click "Start Learning" above to begin your MongoDB journey!
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
