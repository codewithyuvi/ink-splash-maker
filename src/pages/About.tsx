import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Star, Heart, Zap, Palette, Smile, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 pb-8">
        <div className="container mx-auto px-4">
          
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-primary rounded-full border-4 border-border mb-6 shadow-lg">
              <Palette className="w-12 h-12 text-white" />
            </div>
            <h1 className="font-cartoon-header text-4xl md:text-5xl text-primary mb-4">
              About Memeify 🎨
            </h1>
            <p className="font-cartoon text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Welcome to the most fun corner of the internet! We're on a mission to spread joy, 
              laughter, and creativity through the magic of cartoon-style memes! ✨
            </p>
          </div>

          {/* Mission Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            
            <div className="card-comic text-center group hover:scale-105">
              <div className="w-16 h-16 bg-accent rounded-full border-3 border-border mx-auto mb-4 flex items-center justify-center group-hover:animate-wiggle">
                <Smile className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-cartoon-header text-xl text-primary mb-3">Spread Joy</h3>
              <p className="font-cartoon text-muted-foreground">
                Every meme is a little package of happiness waiting to brighten someone's day! 😊
              </p>
            </div>

            <div className="card-comic text-center group hover:scale-105">
              <div className="w-16 h-16 bg-secondary rounded-full border-3 border-border mx-auto mb-4 flex items-center justify-center group-hover:animate-wiggle">
                <Zap className="w-8 h-8 text-foreground" />
              </div>
              <h3 className="font-cartoon-header text-xl text-primary mb-3">Easy Creation</h3>
              <p className="font-cartoon text-muted-foreground">
                No design skills needed! Our cartoon-style interface makes meme creation super simple! ⚡
              </p>
            </div>

            <div className="card-comic text-center group hover:scale-105">
              <div className="w-16 h-16 bg-primary rounded-full border-3 border-border mx-auto mb-4 flex items-center justify-center group-hover:animate-wiggle">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-cartoon-header text-xl text-primary mb-3">Community Fun</h3>
              <p className="font-cartoon text-muted-foreground">
                Join thousands of creators sharing laughs and making the internet a happier place! 🌟
              </p>
            </div>
          </div>

          {/* Story Section */}
          <div className="card-comic mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="font-cartoon-header text-3xl text-primary mb-6">Our Story 📖</h2>
                <div className="space-y-4 font-cartoon text-muted-foreground">
                  <p>
                    Once upon a time, in a world where memes were too serious and complicated, 
                    a group of creative minds decided to change everything! 🎨
                  </p>
                  <p>
                    We believed that creating memes should be as fun as sharing them. So we built 
                    Memeify - a magical place where anyone can become a meme master with just a 
                    few clicks! ✨
                  </p>
                  <p>
                    Today, millions of laughs later, we're still here making the internet a 
                    brighter, funnier place, one cartoon meme at a time! 🚀
                  </p>
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-gradient-to-br from-secondary to-accent rounded-2xl border-4 border-border p-8 text-center shadow-lg">
                  <div className="text-6xl mb-4">🎭</div>
                  <h3 className="font-cartoon-header text-2xl text-foreground mb-2">1,000,000+</h3>
                  <p className="font-cartoon text-lg text-muted-foreground">Memes Created</p>
                  <div className="absolute -top-3 -right-3 w-12 h-12 bg-accent rounded-full border-3 border-white flex items-center justify-center">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="text-center mb-16">
            <h2 className="font-cartoon-header text-3xl text-primary mb-8">Meet the Creator 👨‍💻</h2>
            
            <div className="max-w-md mx-auto">
              <div className="card-comic text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-full border-4 border-border mx-auto mb-4 flex items-center justify-center text-3xl text-white">
                  YB
                </div>
                <h3 className="font-cartoon-header text-2xl text-primary mb-2">Yuvraj Bansal</h3>
                <p className="font-cartoon text-accent mb-3">Chief Meme Officer & Founder</p>
                <p className="font-cartoon text-muted-foreground">
                  Passionate about bringing joy to the world through technology and creativity! 
                  When not coding, you can find me creating the next viral meme! 😄
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="card-comic text-center bg-gradient-to-br from-secondary/20 to-accent/20">
            <h2 className="font-cartoon-header text-3xl text-primary mb-4">Ready to Create Magic? ✨</h2>
            <p className="font-cartoon text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join our amazing community of meme creators and start spreading joy today! 
              Your perfect meme template is waiting for you!
            </p>
            <Link to="/">
              <Button className="btn-comic-primary text-lg px-8 py-3">
                <Heart className="w-5 h-5 mr-2" />
                Start Creating Now!
              </Button>
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}