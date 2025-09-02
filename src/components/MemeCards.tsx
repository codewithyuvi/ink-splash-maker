import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Heart, Share2, Zap, Star, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';

interface Meme {
  id: string;
  name: string;
  url: string;
  width: number;
  height: number;
  box_count: number;
}

export default function MemeCards() {
  const [memes, setMemes] = useState<Meme[]>([]);
  const [filterText, setFilterText] = useState('');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [likedMemes, setLikedMemes] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    async function fetchMemes() {
      try {
        setLoading(true);
        const response = await axios.get('https://api.imgflip.com/get_memes');
        setMemes(response.data.data.memes);
      } catch (error) {
        console.error('Failed to fetch memes:', error);
        toast({
          title: "Oops! 💥",
          description: "Failed to load meme templates. Please try again!",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }
    fetchMemes();
  }, [toast]);

  const filteredMemes = useMemo(() => {
    return memes.filter(meme =>
      meme.name.toLowerCase().includes(filterText.toLowerCase())
    );
  }, [memes, filterText]);

  const getComicBadge = (index: number) => {
    if (index % 7 === 0) return { label: 'LEGENDARY! ⭐', variant: 'default' as const, icon: <Star className="w-3 h-3" /> };
    if (index % 5 === 0) return { label: 'HOT! 🔥', variant: 'destructive' as const, icon: <Zap className="w-3 h-3" /> };
    if (index % 3 === 0) return { label: 'POW! ✨', variant: 'secondary' as const, icon: <Sparkles className="w-3 h-3" /> };
    return null;
  };

  const handleLike = (memeId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newLiked = new Set(likedMemes);
    if (newLiked.has(memeId)) {
      newLiked.delete(memeId);
      toast({
        title: "Unliked! 💔",
        description: "Removed from favorites",
      });
    } else {
      newLiked.add(memeId);
      toast({
        title: "Liked! ❤️",
        description: "Added to favorites!",
      });
    }
    setLikedMemes(newLiked);
  };

  const handleShare = (meme: Meme, e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: `Check out this ${meme.name} meme template!`,
        url: meme.url,
      });
    } else {
      navigator.clipboard.writeText(meme.url);
      toast({
        title: "COPIED! 📋",
        description: "Meme link copied to clipboard!",
      });
    }
  };

  const handleUseMeme = (meme: Meme) => {
    toast({
      title: "BOOM! 💥",
      description: `Let's create with ${meme.name}!`,
    });
    navigate('/edit-meme', { state: meme });
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary rounded-full animate-bounce mx-auto mb-4 flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h2 className="font-cartoon-header text-2xl text-primary mb-2">Loading Awesome Memes...</h2>
          <p className="font-cartoon text-muted-foreground">Getting the funniest templates ready! 🎨</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-8">
      {/* Comic book dots background overlay */}
      <div className="absolute inset-0 comic-dots pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="font-cartoon-header text-4xl md:text-5xl text-primary mb-4">
            🎨 Choose Your Meme Template!
          </h1>
          <p className="font-cartoon text-lg text-muted-foreground max-w-2xl mx-auto">
            Pick from hundreds of hilarious templates and create your masterpiece! 
            Each one is ready to become your next viral sensation! ✨
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder="Search for the perfect meme... 🔍"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="pl-10 h-12 border-4 border-border rounded-2xl font-cartoon text-lg bg-white shadow-lg focus:shadow-xl transition-shadow duration-300"
            />
          </div>
        </div>

        {/* Results Count */}
        {filterText && (
          <div className="text-center mb-6">
            <Badge variant="secondary" className="font-cartoon text-lg px-4 py-2">
              Found {filteredMemes.length} amazing templates! 🎉
            </Badge>
          </div>
        )}

        {/* Meme Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMemes.map((meme, index) => {
            const badge = getComicBadge(index);
            const isHovered = hoveredCard === meme.id;
            const isLiked = likedMemes.has(meme.id);

            return (
              <div
                key={meme.id}
                className={`card-comic cursor-pointer group relative ${
                  isHovered ? 'scale-105 shadow-2xl' : ''
                }`}
                onMouseEnter={() => setHoveredCard(meme.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => handleUseMeme(meme)}
              >
                {/* Comic Badge */}
                {badge && (
                  <Badge 
                    variant={badge.variant}
                    className="absolute top-3 left-3 z-10 font-cartoon font-bold border-2 border-border shadow-lg"
                  >
                    {badge.icon}
                    {badge.label}
                  </Badge>
                )}

                {/* Meme Image */}
                <div className="relative mb-4 overflow-hidden rounded-xl border-3 border-border bg-muted">
                  <img
                    src={meme.url}
                    alt={meme.name}
                    className={`w-full h-48 object-contain bg-white transition-transform duration-300 ${
                      isHovered ? 'scale-105' : ''
                    }`}
                    loading="lazy"
                  />
                  
                  {/* Hover Overlay */}
                  <div className={`absolute inset-0 bg-primary/20 flex items-center justify-center transition-opacity duration-300 ${
                    isHovered ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <div className="speech-bubble bg-white px-4 py-2 rounded-2xl border-3 border-border">
                      <span className="font-cartoon font-bold text-primary">CLICK ME! 🎨</span>
                    </div>
                  </div>
                </div>

                {/* Meme Info */}
                <div className="space-y-3">
                  <h3 className="font-cartoon font-bold text-lg text-foreground leading-tight">
                    {meme.name}
                  </h3>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUseMeme(meme);
                      }}
                      className="btn-comic-primary flex-1 font-cartoon"
                    >
                      Create Meme! ✨
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => handleLike(meme.id, e)}
                      className={`btn-comic ${isLiked ? 'bg-accent text-white' : ''}`}
                    >
                      <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => handleShare(meme, e)}
                      className="btn-comic"
                    >
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* No Results */}
        {filteredMemes.length === 0 && !loading && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center">
              <Search className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="font-cartoon-header text-2xl text-primary mb-2">No memes found! 😅</h3>
            <p className="font-cartoon text-muted-foreground">
              Try a different search term or browse all our awesome templates!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}