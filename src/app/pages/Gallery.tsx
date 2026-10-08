import { useState } from "react";
import { SEO } from "../components/SEO";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { X } from "lucide-react";

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Add all your image paths here! Make sure the images are inside the `public/gallery` folder.
  const galleryImages = [
    "/gallery/1.png", "/gallery/2.png", "/gallery/3.png", "/gallery/4.png", "/gallery/5.png",
    "/gallery/6.png", "/gallery/7.png", "/gallery/8.png", "/gallery/9.png", "/gallery/10.png",
    "/gallery/11.png", "/gallery/12.png", "/gallery/13.png", "/gallery/14.png", "/gallery/15.png",
    "/gallery/16.jpg", "/gallery/17.jpg", "/gallery/18.jpg", "/gallery/19.jpg", "/gallery/20.jpg",
    "/gallery/21.jpg",
  ];

  return (
    <div className="min-h-screen md:pt-20 bg-[#0A0E27]">
      <SEO
        title="Gallery - Chola FC"
        description="Explore the moments and memories of Chola FC."
        canonicalUrl="https://www.cholafc.com/gallery"
      />
      
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-[#0A0E27] to-[#12172E]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Our
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-[#FFB800]">
              Moments
            </span>
          </h1>
          <p className="text-xl text-gray-300">
            A glimpse into the hard work, passion, and joy of our players on and off the pitch.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* We use 'columns' for a beautiful Pinterest-style masonry layout! */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {galleryImages.map((src, index) => (
              <div 
                key={index} 
                className="break-inside-avoid rounded-2xl overflow-hidden hover:scale-[1.02] transition-transform shadow-lg border border-white/10 group relative bg-[#12172E] cursor-pointer"
                onClick={() => setSelectedImage(src)}
              >
                <ImageWithFallback 
                  src={src} 
                  alt={`Chola FC Gallery Moment ${index + 1}`} 
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E27]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <span className="text-white font-bold">Chola FC</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Overlay */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-6 right-6 text-white hover:text-[#FF6B35] transition-colors p-2"
            onClick={() => setSelectedImage(null)}
            aria-label="Close"
          >
            <X size={32} />
          </button>
          <img 
            src={selectedImage} 
            alt="Expanded view" 
            className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()} 
          />
        </div>
      )}
    </div>
  );
}
