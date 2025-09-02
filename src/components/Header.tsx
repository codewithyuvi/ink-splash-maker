import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Palette, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import cartoonBrush from '@/assets/cartoon-brush.png';

interface HeaderProps {
  className?: string;
}

export default function Header({ className = '' }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 ${className}`}>
      {/* Comic book cloud background */}
      <div className="bg-white/95 backdrop-blur-sm border-b-4 border-border shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <img 
                  src={cartoonBrush} 
                  alt="Paint Brush" 
                  className="w-10 h-10 animate-bounce-gentle group-hover:animate-wiggle"
                />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full border-2 border-white animate-pulse">
                  <Star className="w-2 h-2 text-white m-0.5" />
                </div>
              </div>
              <h1 className="font-cartoon-header text-2xl md:text-3xl text-primary hover:text-accent transition-colors duration-300">
                Memeify 🎨
              </h1>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-4">
              <Link to="/">
                <Button variant="ghost" className="btn-comic-primary text-white font-bold relative overflow-hidden group">
                  <span className="relative z-10">Home</span>
                  <div className="absolute inset-0 bg-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </Button>
              </Link>
              
              <Link to="/about">
                <Button variant="ghost" className="btn-comic-secondary font-bold relative overflow-hidden group">
                  <span className="relative z-10">About</span>
                  <div className="absolute inset-0 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </Button>
              </Link>

              {/* Fun User Avatar */}
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-secondary to-accent rounded-full border-3 border-border cursor-pointer hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                  <Palette className="w-5 h-5 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white">
                  XP
                </div>
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden btn-comic"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t-2 border-border bg-muted/50 backdrop-blur-sm animate-pop">
              <nav className="flex flex-col space-y-2">
                <Link 
                  to="/" 
                  className="btn-comic-primary text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  to="/about" 
                  className="btn-comic-secondary text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}