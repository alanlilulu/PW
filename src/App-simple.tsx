import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Simple pages without complex contexts
function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-6xl font-serif text-gray-900 mb-6">Welcome</h1>
          <p className="text-xl text-gray-700 mb-8">Software Engineer, Photographer, and Theatre Director</p>
          <div className="flex justify-center space-x-4">
            <a 
              href="/about" 
              className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Learn More
            </a>
            <a 
              href="/portrait" 
              className="bg-white text-gray-900 px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              View Work
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-5xl font-serif text-gray-900 mb-8">About Me</h1>
        <div className="prose prose-lg text-gray-700">
          <p className="text-xl mb-6">
            Hi, I'm Alan Li 👋 I'm a Software Engineer based in Seattle, currently working at Lululemon on the Digital Optimization team.
          </p>
          <p className="mb-6">
            My work focuses on building and maintaining full-stack A/B testing frameworks and experimentation tools that directly impact millions of customers.
          </p>
          <p className="mb-6">
            Beyond engineering, I'm deeply interested in Human–Computer Interaction (HCI) and product design. I enjoy exploring how people interact with technology and how thoughtful design can shape meaningful digital experiences.
          </p>
          <p>
            Outside of tech, I'm a photographer 📷 and a theatre director/actor 🎭. Photography allows me to capture real moments and stories through my lens, while theatre has trained me to understand people, empathy, and storytelling from a different perspective.
          </p>
        </div>
      </div>
    </div>
  );
}

function PortraitPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-5xl font-serif text-gray-900 mb-8 text-center">Portrait Photography</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-64 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <span className="text-gray-500">Portrait {i}</span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900">Sample Portrait</h3>
                <p className="text-gray-600 text-sm">Creative portrait photography</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DramaPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-5xl font-serif text-gray-900 mb-8">Drama & Theatre</h1>
        <div className="space-y-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Theatre Director</h2>
            <p className="text-gray-700">
              I have directed multiple Chinese theatre productions, bringing stories to life through creative vision and collaborative leadership.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Actor</h2>
            <p className="text-gray-700">
              As an actor, I've performed in various productions, developing deep understanding of character, emotion, and human connection.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Radio MC</h2>
            <p className="text-gray-700">
              I'm also an MC of a Seattle Chinese radio, connecting with the community through storytelling and cultural exchange.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CareerPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-5xl font-serif text-gray-900 mb-8">Career Journey</h1>
        <div className="space-y-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Software Engineer @ Lululemon</h2>
            <p className="text-gray-700 mb-2">
              Led experimentation & testing platforms with $200M+ revenue impact
            </p>
            <ul className="text-gray-600 space-y-1">
              <li>• Full-stack A/B testing frameworks</li>
              <li>• Human-Computer Interaction (HCI)</li>
              <li>• Product design & strategy</li>
            </ul>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Education</h2>
            <p className="text-gray-700">
              UMich CS '22, with minors in Math & Complex Systems
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Vision</h2>
            <p className="text-gray-700">
              My long-term vision is to combine engineering, design, and creativity — building products that people truly need, while also keeping space for art and storytelling.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Simple header without contexts
function SimpleHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <a href="/" className="text-2xl font-light text-gray-900 hover:text-gray-600">
            AL
          </a>
          <nav className="flex space-x-8">
            <a href="/" className="text-gray-600 hover:text-gray-900">Home</a>
            <a href="/about" className="text-gray-600 hover:text-gray-900">About</a>
            <a href="/portrait" className="text-gray-600 hover:text-gray-900">Portrait</a>
            <a href="/drama" className="text-gray-600 hover:text-gray-900">Drama</a>
            <a href="/career" className="text-gray-600 hover:text-gray-900">Career</a>
          </nav>
        </div>
      </div>
    </header>
  );
}

// Simple footer
function SimpleFooter() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p>&copy; 2025 Alan Li. All rights reserved.</p>
      </div>
    </footer>
  );
}

function SimpleApp() {
  return (
    <Router>
      <div className="min-h-screen bg-black">
        <SimpleHeader />
        <main id="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/portrait" element={<PortraitPage />} />
            <Route path="/drama" element={<DramaPage />} />
            <Route path="/career" element={<CareerPage />} />
          </Routes>
        </main>
        <SimpleFooter />
      </div>
    </Router>
  );
}

export default SimpleApp;