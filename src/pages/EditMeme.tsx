import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Sparkles, Loader2, Paintbrush, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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

export default function EditMeme() {
  const navigate = useNavigate();
  const location = useLocation();
  const meme = location.state as Meme;
  const { toast } = useToast();

  // Imgflip credentials (development only)
  const IMGFLIP_USERNAME = "YUVRAJBANSAL";
  const IMGFLIP_PASSWORD = "my@new#password";

  const [captions, setCaptions] = useState<string[]>(
    Array(meme?.box_count || 0).fill("")
  );
  const [previewUrl, setPreviewUrl] = useState(meme?.url || "");
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  if (!meme) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-24 h-24 bg-muted rounded-full mx-auto flex items-center justify-center">
            <Paintbrush className="w-12 h-12 text-muted-foreground" />
          </div>
          <h2 className="font-cartoon-header text-2xl text-primary">No meme selected! 😅</h2>
          <p className="font-cartoon text-muted-foreground">Please go back and select a template to edit.</p>
          <Button onClick={() => navigate('/')} className="btn-comic-primary font-cartoon">
            Go Back Home 🏠
          </Button>
        </div>
      </div>
    );
  }

  const handleCaptionChange = (index: number, value: string) => {
    const newCaptions = [...captions];
    newCaptions[index] = value;
    setCaptions(newCaptions);
  };

  const updatePreview = async (currentCaptions?: string[]) => {
    if (!meme.id) return;
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append("template_id", meme.id);
      params.append("username", IMGFLIP_USERNAME);
      params.append("password", IMGFLIP_PASSWORD);
      (currentCaptions || captions).forEach((text, i) => {
        params.append(`boxes[${i}][text]`, text || " ");
      });
      const response = await axios.post(
        "https://api.imgflip.com/caption_image",
        params.toString(),
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );
      if (response.data.success) {
        setPreviewUrl(response.data.data.url);
        toast({
          title: "UPDATED! ✨",
          description: "Your meme preview has been refreshed!",
        });
      }
    } catch (error) {
      console.error("Imgflip API error:", error);
      toast({
        title: "Oops! 💥",
        description: "Failed to update preview. Please try again!",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const generateAiCaptions = async () => {
    setAiLoading(true);
    try {
      const endpoint =
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDSHqp_MwRDH5WsSRWzEkedBPx6pE2eA7w";
      const promptBody = {
        contents: [
          {
            parts: [
              {
                text: `Generate a funny meme caption in hinglish with exactly ${meme.box_count} lines for this template: ${meme.name}. Each line should be witty. Return only the lines.`,
              },
            ],
          },
        ],
      };
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(promptBody),
      });
      const data = await res.json();
      const responseText =
        data.candidates?.[0]?.content?.parts?.[0]?.text || "";
      const lines = responseText
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
        .slice(0, meme.box_count);
      while (lines.length < meme.box_count) lines.push("");
      setCaptions(lines);
      await updatePreview(lines);
      toast({
        title: "AI MAGIC! 🎪",
        description: "Generated hilarious captions for you!",
      });
    } catch (err) {
      console.error("Gemini API error:", err);
      toast({
        title: "Oops! 🤖",
        description: "AI caption generation failed. Please try again!",
        variant: "destructive",
      });
    } finally {
      setAiLoading(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => updatePreview(), 500);
    return () => clearTimeout(timeout);
  }, [captions]);

  return (
    <div className="min-h-screen pt-20 pb-8">
      {/* Comic book dots background overlay */}
      <div className="absolute inset-0 comic-dots pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-cartoon-header text-4xl md:text-5xl text-primary mb-4">
            🎨 Meme Creator Studio!
          </h1>
          <p className="font-cartoon text-lg text-muted-foreground max-w-2xl mx-auto">
            Add your hilarious captions and watch the magic happen! ✨
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Meme Preview Card */}
          <div className="card-comic space-y-4">
            {/* Card Header */}
            <div className="flex items-center justify-between mb-4">
              <Button
                variant="outline"
                onClick={() => navigate('/')}
                className="btn-comic font-cartoon gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Templates
              </Button>
              {loading && (
                <div className="flex items-center gap-2 text-accent">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="font-cartoon text-sm">Updating...</span>
                </div>
              )}
            </div>

            {/* Meme Image */}
            <div className="relative overflow-hidden rounded-xl border-3 border-border bg-white">
              <img
                src={previewUrl}
                alt={meme.name}
                className="w-full max-h-96 object-contain bg-white"
              />
            </div>

            {/* Meme Info */}
            <div className="text-center space-y-2">
              <h3 className="font-cartoon-header text-xl text-primary">
                {meme.name}
              </h3>
              <p className="font-cartoon text-sm text-muted-foreground">
                📝 Text boxes: {meme.box_count}
              </p>
            </div>
          </div>

          {/* Caption Editor Card */}
          <div className="card-comic space-y-6">
            {/* Editor Header */}
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-accent rounded-full mx-auto flex items-center justify-center">
                <Palette className="w-8 h-8 text-white" />
              </div>
              <h2 className="font-cartoon-header text-2xl text-primary">
                Caption Editor
              </h2>
              <p className="font-cartoon text-muted-foreground">
                Type your funny captions below! 😄
              </p>
            </div>

            {/* AI Generate Button */}
            <Button
              onClick={generateAiCaptions}
              disabled={aiLoading}
              className="btn-comic-primary w-full font-cartoon text-lg gap-2"
            >
              {aiLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  AI is thinking...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Generate AI Captions! 🤖
                </>
              )}
            </Button>

            {/* Caption Input Fields */}
            <div className="space-y-4">
              {captions.map((text, index) => (
                <div key={index} className="space-y-2">
                  <Label className="font-cartoon text-foreground font-bold">
                    📝 Text Line {index + 1}
                  </Label>
                  <Input
                    value={text}
                    onChange={(e) => handleCaptionChange(index, e.target.value)}
                    placeholder={`Type your hilarious text here... 😄`}
                    className="h-12 border-3 border-border rounded-2xl font-cartoon text-lg bg-white focus:border-accent transition-colors"
                  />
                </div>
              ))}
            </div>

            {/* Pro Tip */}
            <div className="speech-bubble bg-secondary/20 p-4 rounded-2xl border-2 border-accent/30">
              <p className="font-cartoon text-sm text-foreground">
                💡 <strong>Pro Tip:</strong> Sometimes ImgFlip might shift text positions slightly. 
                Don't worry, it's still awesome! Keep experimenting with different captions! 🎨
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}