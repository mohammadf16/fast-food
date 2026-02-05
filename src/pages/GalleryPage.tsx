import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ChevronLeft, ChevronRight, Camera, Heart } from 'lucide-react';

interface GalleryImage {
  id: number;
  src: string;
  title: string;
  category: string;
  likes: number;
}

const galleryImages: GalleryImage[] = [
  { id: 1, src: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80', title: 'Klassisk Margherita', category: 'Pizza', likes: 234 },
  { id: 2, src: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=80', title: 'Pepperoni Special', category: 'Pizza', likes: 189 },
  { id: 3, src: 'https://images.unsplash.com/photo-1579751626657-72bc17010498?w=800&q=80', title: 'Vores Restaurant', category: 'Restaurant', likes: 156 },
  { id: 4, src: 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=800&q=80', title: 'Pizzabager i Aktion', category: 'Køkken', likes: 201 },
  { id: 5, src: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80', title: 'Quattro Formaggi', category: 'Pizza', likes: 178 },
  { id: 6, src: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=800&q=80', title: 'Spicy Diavola', category: 'Pizza', likes: 145 },
  { id: 7, src: 'https://images.unsplash.com/photo-1536964549204-cce9eab227bd?w=800&q=80', title: 'Calzone Perfekt', category: 'Pizza', likes: 167 },
  { id: 8, src: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=800&q=80', title: 'Vegansk Kreation', category: 'Pizza', likes: 134 },
  { id: 9, src: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=800&q=80', title: 'Garden Fresh', category: 'Pizza', likes: 112 },
  { id: 10, src: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80', title: 'Hyggelig Atmosfære', category: 'Restaurant', likes: 198 },
  { id: 11, src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80', title: 'Indretning', category: 'Restaurant', likes: 167 },
  { id: 12, src: 'https://images.unsplash.com/photo-1428515613728-6b4607e44363?w=800&q=80', title: 'Familie Middag', category: 'Gæster', likes: 223 },
  { id: 13, src: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=800&q=80', title: 'Stenovn', category: 'Køkken', likes: 256 },
  { id: 14, src: 'https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?w=800&q=80', title: 'Friske Ingredienser', category: 'Køkken', likes: 189 },
  { id: 15, src: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&q=80', title: 'Tiramisu', category: 'Dessert', likes: 145 },
  { id: 16, src: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=800&q=80', title: 'Dej Forberedelse', category: 'Køkken', likes: 178 },
];

const categories = ['Alle', 'Pizza', 'Restaurant', 'Køkken', 'Gæster', 'Dessert'];

const GalleryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('Alle');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [likedImages, setLikedImages] = useState<number[]>([]);

  const filteredImages = selectedCategory === 'Alle'
    ? galleryImages
    : galleryImages.filter(img => img.category === selectedCategory);

  const handleLike = (id: number) => {
    setLikedImages(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (!selectedImage) return;
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    const newIndex = direction === 'next' 
      ? (currentIndex + 1) % filteredImages.length
      : (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    setSelectedImage(filteredImages[newIndex]);
  };

  return (
    <div className="min-h-screen bg-dark pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
            <Camera size={18} />
            <span className="font-semibold">Vores Galleri</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Øjeblikke af Lækkerhed
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto">
            Tag et kig bag kulisserne og se vores lækre kreationer, hyggelige restaurant og glade gæster
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2.5 rounded-full font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-primary to-accent text-dark shadow-lg'
                  : 'bg-surface text-muted hover:bg-surface-2 shadow'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Gallery Grid */}
        <motion.div 
          layout 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="relative group cursor-pointer aspect-square rounded-2xl overflow-hidden shadow-lg"
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-bold text-lg">{image.title}</h3>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-white/80 text-sm">{image.category}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLike(image.id);
                        }}
                        className={`flex items-center gap-1 transition-colors ${
                          likedImages.includes(image.id) ? 'text-red-500' : 'text-white/80'
                        }`}
                      >
                        <Heart 
                          size={18} 
                          className={likedImages.includes(image.id) ? 'fill-red-500' : ''} 
                        />
                        <span className="text-sm">
                          {image.likes + (likedImages.includes(image.id) ? 1 : 0)}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Zoom Icon */}
                <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn size={20} className="text-white" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          <div className="bg-surface p-6 rounded-2xl shadow-lg text-center">
            <div className="text-3xl font-bold text-primary">{galleryImages.length}+</div>
            <div className="text-muted text-sm mt-1">Billeder</div>
          </div>
          <div className="bg-surface p-6 rounded-2xl shadow-lg text-center">
            <div className="text-3xl font-bold text-primary">50+</div>
            <div className="text-muted text-sm mt-1">Pizza Varianter</div>
          </div>
          <div className="bg-surface p-6 rounded-2xl shadow-lg text-center">
            <div className="text-3xl font-bold text-primary">15+</div>
            <div className="text-muted text-sm mt-1">År i Drift</div>
          </div>
          <div className="bg-surface p-6 rounded-2xl shadow-lg text-center">
            <div className="text-3xl font-bold text-primary">10K+</div>
            <div className="text-muted text-sm mt-1">Glade Kunder</div>
          </div>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
            >
              <X size={24} />
            </button>

            {/* Navigation */}
            <button
              onClick={() => navigateImage('prev')}
              className="absolute left-4 md:left-8 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <ChevronLeft size={28} />
            </button>
            <button
              onClick={() => navigateImage('next')}
              className="absolute right-4 md:right-8 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <ChevronRight size={28} />
            </button>

            {/* Image */}
            <motion.div
              key={selectedImage.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="max-w-5xl max-h-[80vh] relative"
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
              
              {/* Image Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                <h3 className="text-white text-xl font-bold">{selectedImage.title}</h3>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-white/80">{selectedImage.category}</span>
                  <button
                    onClick={() => handleLike(selectedImage.id)}
                    className={`flex items-center gap-1 ${
                      likedImages.includes(selectedImage.id) ? 'text-red-500' : 'text-white/80'
                    }`}
                  >
                    <Heart 
                      size={20} 
                      className={likedImages.includes(selectedImage.id) ? 'fill-red-500' : ''} 
                    />
                    <span>
                      {selectedImage.likes + (likedImages.includes(selectedImage.id) ? 1 : 0)}
                    </span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryPage;
