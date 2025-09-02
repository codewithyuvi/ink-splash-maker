import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, Zap } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-16 bg-white border-t-4 border-border">
      {/* Cartoon wave pattern */}
      <div className="absolute top-0 left-0 right-0 h-8 bg-secondary transform -translate-y-4">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="w-full h-full"
        >
          <path 
            d="M0,60 C150,120 300,0 450,60 C600,120 750,0 900,60 C1050,120 1200,0 1200,60 L1200,120 L0,120 Z" 
            fill="currentColor"
            className="text-secondary"
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 pt-12 pb-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full border-3 border-border flex items-center justify-center">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="font-cartoon-header text-2xl text-primary">Memeify</h3>
            </div>
            <p className="font-cartoon text-muted-foreground leading-relaxed">
              Creating smiles, one meme at a time! The most fun way to express yourself 
              through hilarious cartoon-style memes! ✨
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h4 className="font-cartoon-header text-lg text-foreground mb-4 flex items-center justify-center">
              <Star className="w-5 h-5 mr-2 text-accent" />
              Quick Links
            </h4>
            <nav className="space-y-2">
              <Link 
                to="/" 
                className="block font-cartoon text-muted-foreground hover:text-primary transition-colors duration-300 hover:scale-105 transform"
              >
                🏠 Home
              </Link>
              <Link 
                to="/about" 
                className="block font-cartoon text-muted-foreground hover:text-primary transition-colors duration-300 hover:scale-105 transform"
              >
                ℹ️ About Us
              </Link>
              <Link 
                to="/create" 
                className="block font-cartoon text-muted-foreground hover:text-primary transition-colors duration-300 hover:scale-105 transform"
              >
                ✨ Create Memes
              </Link>
            </nav>
          </div>

          {/* Fun Stats */}
          <div className="text-center">
            <h4 className="font-cartoon-header text-lg text-foreground mb-4 flex items-center justify-center">
              <Zap className="w-5 h-5 mr-2 text-accent" />
              Meme Magic
            </h4>
            <div className="space-y-3">
              <div className="bg-muted rounded-xl p-3 border-2 border-border">
                <div className="font-cartoon-header text-xl text-primary">1000+</div>
                <div className="font-cartoon text-sm text-muted-foreground">Templates Available</div>
              </div>
              <div className="bg-muted rounded-xl p-3 border-2 border-border">
                <div className="font-cartoon-header text-xl text-accent">∞</div>
                <div className="font-cartoon text-sm text-muted-foreground">Laughs Created</div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-4 mb-6">
          {[
            { label: 'Facebook', emoji: '📘' },
            { label: 'Twitter', emoji: '🐦' },
            { label: 'Instagram', emoji: '📸' },
            { label: 'TikTok', emoji: '🎵' }
          ].map((social) => (
            <button
              key={social.label}
              className="w-12 h-12 bg-white border-3 border-border rounded-full flex items-center justify-center text-xl hover:scale-110 hover:bg-secondary transition-all duration-300 shadow-lg hover:shadow-xl"
              aria-label={social.label}
            >
              {social.emoji}
            </button>
          ))}
        </div>

        {/* Divider with cartoon style */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t-2 border-border"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="bg-white px-4">
              <Heart className="w-6 h-6 text-accent" />
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className="font-cartoon text-muted-foreground">
            <span className="inline-flex items-center">
              Made with <Heart className="w-4 h-4 mx-1 text-accent fill-current" /> by 
              <span className="ml-1 font-bold text-primary">Yuvraj Bansal</span>
            </span>
          </p>
          <p className="font-cartoon text-sm text-muted-foreground mt-1">
            © {currentYear} Memeify. Leveling up your meme game! 🚀
          </p>
        </div>

        {/* Floating cartoon elements */}
        <div className="absolute top-4 left-4 opacity-20">
          <div className="w-8 h-8 bg-secondary rounded-full animate-bounce-gentle"></div>
        </div>
        <div className="absolute top-8 right-8 opacity-20">
          <div className="w-6 h-6 bg-accent rounded-full animate-bounce-gentle" style={{ animationDelay: '0.5s' }}></div>
        </div>
        <div className="absolute bottom-16 left-1/4 opacity-20">
          <Star className="w-6 h-6 text-primary animate-pulse" />
        </div>
      </div>
    </footer>
  );
}