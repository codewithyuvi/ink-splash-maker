import React from 'react';
import Header from '@/components/Header';
import MemeCards from '@/components/MemeCards';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <MemeCards />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
