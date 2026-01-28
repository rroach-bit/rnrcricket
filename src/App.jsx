import React, { useState, useEffect, useRef } from 'react';

// Sample product data - replace with your actual inventory
const sampleProducts = [
  // Bats
  { id: 1, name: "SS Super Power English Willow", category: "Bats", brand: "SS", price: 200, image: "🏏", description: "Premium English willow bat with excellent pickup", inStock: true },
  { id: 2, name: "SG KLR Xtreme", category: "Bats", brand: "SG", price: 275, image: "🏏", description: "Professional grade English willow cricket bat", inStock: true },
  { id: 3, name: "CEAT Marvel English Willow", category: "Bats", brand: "CEAT", price: 275, image: "🏏", description: "Signature series with premium sweet spot", inStock: true },
  { id: 4, name: "SS Royal Retro Classic", category: "Bats", brand: "SS", price: 200, image: "🏏", description: "Classic design with modern performance", inStock: false },
  { id: 5, name: "Gray-Nicolls Powerbow", category: "Bats", brand: "Gray-Nicolls", price: 320, image: "🏏", description: "Iconic bow shape for powerful strokes", inStock: true },
  
  // Gloves
  { id: 6, name: "SG KLR Lite Batting Gloves", category: "Gloves", brand: "SG", price: 60, image: "🧤", description: "Lightweight protection with superior grip", inStock: true },
  { id: 7, name: "SS Super Test IPL Gloves", category: "Gloves", brand: "SS", price: 55, image: "🧤", description: "IPL edition batting gloves", inStock: true },
  { id: 8, name: "SG Test White Batting Gloves", category: "Gloves", brand: "SG", price: 55, image: "🧤", description: "Traditional white test match gloves", inStock: true },
  { id: 9, name: "SS Matrix Batting Gloves", category: "Gloves", brand: "SS", price: 65, image: "🧤", description: "Premium protection with flex zones", inStock: true },
  { id: 10, name: "Gray-Nicolls GN+ Batting Gloves", category: "Gloves", brand: "Gray-Nicolls", price: 75, image: "🧤", description: "Professional grade batting gloves", inStock: true },
  
  // Pads
  { id: 11, name: "SG League Batting Pads", category: "Pads", brand: "SG", price: 85, image: "🦵", description: "Excellent protection for club cricket", inStock: true },
  { id: 12, name: "SS Sunridges Pads", category: "Pads", brand: "SS", price: 90, image: "🦵", description: "Traditional cane construction", inStock: true },
  { id: 13, name: "Gray-Nicolls Ultimate Pads", category: "Pads", brand: "Gray-Nicolls", price: 120, image: "🦵", description: "Lightweight with maximum protection", inStock: true },
  { id: 14, name: "SG Campus Pads", category: "Pads", brand: "SG", price: 45, image: "🦵", description: "Entry level batting pads", inStock: true },
  
  // WK Equipment
  { id: 15, name: "SG League WK Gloves", category: "WK Equipment", brand: "SG", price: 80, image: "🧤", description: "Professional wicket keeping gloves", inStock: true },
  { id: 16, name: "SS Reserve Edition WK Gloves", category: "WK Equipment", brand: "SS", price: 95, image: "🧤", description: "Premium leather construction", inStock: true },
  { id: 17, name: "SG WK Pads", category: "WK Equipment", brand: "SG", price: 75, image: "🦵", description: "Lightweight keeping pads", inStock: true },
  { id: 18, name: "SS Dragon WK Inner Gloves", category: "WK Equipment", brand: "SS", price: 25, image: "🧤", description: "Cotton padded inners", inStock: true },
  
  // Shoes
  { id: 19, name: "Adidas Howzat Cricket Spikes", category: "Shoes", brand: "Adidas", price: 100, image: "👟", description: "Full spike cricket shoes", inStock: true },
  { id: 20, name: "Asics Gully 5 Cricket Shoes", category: "Shoes", brand: "Asics", price: 150, image: "👟", description: "Rubber sole all-rounder shoes", inStock: true },
  { id: 21, name: "Puma Cricket 22 FH", category: "Shoes", brand: "Puma", price: 130, image: "👟", description: "Half spike cricket footwear", inStock: true },
  { id: 22, name: "SG Sierra Cricket Shoes", category: "Shoes", brand: "SG", price: 75, image: "👟", description: "Affordable rubber sole shoes", inStock: true },
  
  // Kids
  { id: 23, name: "SS Junior Cricket Bat Size 5", category: "Kids", brand: "SS", price: 45, image: "🏏", description: "Kashmir willow junior bat", inStock: true },
  { id: 24, name: "SG Junior Batting Set", category: "Kids", brand: "SG", price: 120, image: "🎒", description: "Complete batting kit for juniors", inStock: true },
  { id: 25, name: "Junior Batting Gloves", category: "Kids", brand: "SG", price: 35, image: "🧤", description: "Youth size batting gloves", inStock: true },
  { id: 26, name: "Kids Cricket Pads", category: "Kids", brand: "SS", price: 40, image: "🦵", description: "Youth batting leg guards", inStock: true },
  
  // Accessories
  { id: 27, name: "Pro Fingerless Gloves Inner", category: "Accessories", brand: "Generic", price: 10, image: "🧤", description: "Inner gloves for comfort", inStock: true },
  { id: 28, name: "Players Full Gloves Inner", category: "Accessories", brand: "Generic", price: 15, image: "🧤", description: "Full finger cotton inners", inStock: true },
  { id: 29, name: "SS Ranjimax Cricket Ball", category: "Accessories", brand: "SS", price: 50, image: "🏐", description: "Premium leather cricket ball", inStock: true },
  { id: 30, name: "Cricket Kit Bag Large", category: "Accessories", brand: "SG", price: 85, image: "🎒", description: "Wheelie kit bag", inStock: true },
  { id: 31, name: "Bat Grip Set (3 Pack)", category: "Accessories", brand: "Generic", price: 12, image: "📦", description: "Replacement bat grips", inStock: true },
  { id: 32, name: "Cricket Helmet Senior", category: "Accessories", brand: "Shrey", price: 95, image: "⛑️", description: "Steel grill cricket helmet", inStock: true },
  { id: 33, name: "Arm Guard", category: "Accessories", brand: "SG", price: 18, image: "💪", description: "Forearm protection", inStock: true },
  { id: 34, name: "Thigh Guard Set", category: "Accessories", brand: "SS", price: 28, image: "🦵", description: "Inner and outer thigh pads", inStock: true },
  { id: 35, name: "Abdominal Guard", category: "Accessories", brand: "SG", price: 15, image: "🛡️", description: "Essential protection", inStock: true },
];

const categories = ["All", "Bats", "Gloves", "Pads", "WK Equipment", "Shoes", "Kids", "Accessories"];
const brands = ["All", "SS", "SG", "Gray-Nicolls", "CEAT", "Adidas", "Asics", "Puma", "Shrey", "Generic"];

export default function RNRCricket() {
  const [currentPage, setCurrentPage] = useState('home');
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [sortBy, setSortBy] = useState('name');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [orderFormOpen, setOrderFormOpen] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });

  // Filter and sort products
  const filteredProducts = sampleProducts
    .filter(p => selectedCategory === 'All' || p.category === selectedCategory)
    .filter(p => selectedBrand === 'All' || p.brand === selectedBrand)
    .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      return a.name.localeCompare(b.name);
    });

  const addToCart = (product) => {
    setCart(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item => 
      item.id === productId ? { ...item, quantity } : item
    ));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const submitOrder = (e) => {
    e.preventDefault();
    setOrderSuccess(true);
    setTimeout(() => {
      setOrderFormOpen(false);
      setOrderSuccess(false);
      setCart([]);
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 3000);
  };

  // Logo Component
  const Logo = ({ size = 'normal' }) => (
    <div className={`flex items-center gap-2 ${size === 'large' ? 'scale-150' : ''}`}>
      <div className="relative">
        <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center shadow-lg">
          <span className="text-white font-black text-sm">RNR</span>
        </div>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-600 rounded-full"></div>
      </div>
      <div className="flex flex-col">
        <span className="text-blue-900 font-black text-xl tracking-tight leading-none">RNR CRICKET</span>
        <span className="text-red-600 text-[10px] font-semibold tracking-widest">TAKE YOUR GAME TO THE NEXT LEVEL</span>
      </div>
    </div>
  );

  // Navigation
  const Navigation = () => (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <button onClick={() => setCurrentPage('home')} className="flex-shrink-0">
            <Logo />
          </button>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {['Home', 'Shop', 'About', 'Contact'].map(item => (
              <button
                key={item}
                onClick={() => setCurrentPage(item.toLowerCase())}
                className={`text-sm font-semibold tracking-wide transition-all duration-300 ${
                  currentPage === item.toLowerCase() 
                    ? 'text-red-600' 
                    : 'text-gray-700 hover:text-blue-900'
                }`}
              >
                {item.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {/* Cart Button */}
            <button 
              onClick={() => setCartOpen(true)}
              className="relative p-2 text-gray-700 hover:text-red-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg">
            {['Home', 'Shop', 'About', 'Contact'].map(item => (
              <button
                key={item}
                onClick={() => { setCurrentPage(item.toLowerCase()); setMobileMenuOpen(false); }}
                className="block w-full text-left px-6 py-4 text-gray-700 hover:bg-gray-50 font-medium border-b border-gray-100"
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );

  // Hero Section
  const Hero = () => (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/20 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/10 rounded-full"></div>
      </div>
      
      {/* Cricket Ball Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div 
            key={i}
            className="absolute w-16 h-16 border-2 border-red-500/20 rounded-full"
            style={{
              top: `${20 + i * 15}%`,
              left: `${10 + i * 15}%`,
              animation: `float ${3 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <div className="mb-6 inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          <span className="text-white/90 text-sm font-medium">Cayman Islands' Premier Cricket Store</span>
        </div>
        
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-white mb-6 tracking-tight">
          <span className="block">TAKE YOUR</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">GAME</span>
          <span className="block">TO THE NEXT LEVEL</span>
        </h1>
        
        <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto font-light">
          Premium cricket equipment from the world's best brands. Quality gear for every level of play.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => setCurrentPage('shop')}
            className="group px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-red-600/30"
          >
            SHOP NOW
            <svg className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
          <button 
            onClick={() => setCurrentPage('contact')}
            className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg backdrop-blur-sm border border-white/20 transition-all duration-300"
          >
            CONTACT US
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
      `}</style>
    </section>
  );

  // Featured Categories
  const FeaturedCategories = () => (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-blue-900 mb-4">SHOP BY CATEGORY</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Find exactly what you need for your game</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {[
            { name: 'Bats', icon: '🏏', color: 'from-red-500 to-red-700' },
            { name: 'Gloves', icon: '🧤', color: 'from-blue-500 to-blue-700' },
            { name: 'Pads', icon: '🦵', color: 'from-green-500 to-green-700' },
            { name: 'Shoes', icon: '👟', color: 'from-purple-500 to-purple-700' },
          ].map((cat) => (
            <button
              key={cat.name}
              onClick={() => { setSelectedCategory(cat.name); setCurrentPage('shop'); }}
              className="group relative overflow-hidden rounded-2xl aspect-square bg-gradient-to-br from-gray-800 to-gray-900 p-6 transition-all duration-500 hover:scale-105 hover:shadow-2xl"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-90 transition-opacity duration-500`}></div>
              <div className="relative z-10 h-full flex flex-col items-center justify-center">
                <span className="text-5xl sm:text-6xl mb-4 transition-transform duration-500 group-hover:scale-110">{cat.icon}</span>
                <span className="text-white font-bold text-lg sm:text-xl tracking-wide">{cat.name.toUpperCase()}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );

  // Featured Products
  const FeaturedProducts = () => (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-black text-blue-900 mb-2">FEATURED PRODUCTS</h2>
            <p className="text-gray-600">Our top picks for serious cricketers</p>
          </div>
          <button 
            onClick={() => setCurrentPage('shop')}
            className="hidden sm:flex items-center gap-2 text-red-600 font-semibold hover:gap-4 transition-all"
          >
            View All <span>→</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sampleProducts.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );

  // Product Card Component
  const ProductCard = ({ product }) => (
    <div 
      className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-500"
    >
      <div 
        className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center cursor-pointer overflow-hidden"
        onClick={() => setSelectedProduct(product)}
      >
        <span className="text-7xl group-hover:scale-110 transition-transform duration-500">{product.image}</span>
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="text-white font-bold text-lg">OUT OF STOCK</span>
          </div>
        )}
        <div className="absolute top-3 right-3">
          <span className="text-xs font-semibold bg-blue-900 text-white px-2 py-1 rounded">{product.brand}</span>
        </div>
      </div>
      <div className="p-4">
        <p className="text-xs text-gray-500 mb-1">{product.category}</p>
        <h3 
          className="font-bold text-gray-900 mb-2 line-clamp-2 cursor-pointer hover:text-red-600 transition-colors"
          onClick={() => setSelectedProduct(product)}
        >
          {product.name}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-xl font-black text-red-600">${product.price}</span>
          <button
            onClick={() => product.inStock && addToCart(product)}
            disabled={!product.inStock}
            className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
              product.inStock 
                ? 'bg-blue-900 text-white hover:bg-red-600' 
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            {product.inStock ? 'Add to Cart' : 'Sold Out'}
          </button>
        </div>
      </div>
    </div>
  );

  // Shop Page
  const ShopPage = () => (
    <section className="pt-24 pb-20 px-4 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black text-blue-900 mb-2">SHOP ALL PRODUCTS</h1>
          <p className="text-gray-600">{filteredProducts.length} products found</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24">
              <h3 className="font-bold text-gray-900 mb-4">Filters</h3>
              
              {/* Search */}
              <div className="mb-6">
                <label className="text-sm font-medium text-gray-700 mb-2 block">Search</label>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="text-sm font-medium text-gray-700 mb-2 block">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Brand Filter */}
              <div className="mb-6">
                <label className="text-sm font-medium text-gray-700 mb-2 block">Brand</label>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  {brands.map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>

              {/* Sort */}
              <div className="mb-6">
                <label className="text-sm font-medium text-gray-700 mb-2 block">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="name">Name A-Z</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>

              {/* Reset Filters */}
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSelectedBrand('All');
                  setSearchQuery('');
                  setSortBy('name');
                }}
                className="w-full py-2 text-red-600 font-semibold hover:bg-red-50 rounded-lg transition-colors"
              >
                Reset Filters
              </button>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
                <button
                  onClick={() => { setSelectedCategory('All'); setSelectedBrand('All'); setSearchQuery(''); }}
                  className="mt-4 text-red-600 font-semibold hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );

  // Product Modal
  const ProductModal = () => {
    if (!selectedProduct) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={() => setSelectedProduct(null)}>
        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-auto" onClick={e => e.stopPropagation()}>
          <div className="relative aspect-video bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
            <span className="text-9xl">{selectedProduct.image}</span>
            <button 
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold bg-blue-900 text-white px-2 py-1 rounded">{selectedProduct.brand}</span>
              <span className="text-xs text-gray-500">{selectedProduct.category}</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{selectedProduct.name}</h2>
            <p className="text-gray-600 mb-6">{selectedProduct.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-black text-red-600">${selectedProduct.price}</span>
              <button
                onClick={() => { selectedProduct.inStock && addToCart(selectedProduct); setSelectedProduct(null); }}
                disabled={!selectedProduct.inStock}
                className={`px-8 py-3 rounded-lg font-bold transition-all ${
                  selectedProduct.inStock 
                    ? 'bg-red-600 text-white hover:bg-red-700' 
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              >
                {selectedProduct.inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Cart Sidebar
  const CartSidebar = () => (
    <div className={`fixed inset-0 z-50 ${cartOpen ? 'visible' : 'invisible'}`}>
      <div 
        className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${cartOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={() => setCartOpen(false)}
      />
      <div className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl transition-transform duration-300 ${cartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-bold text-gray-900">Your Cart ({cartCount})</h2>
            <button onClick={() => setCartOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="flex-1 overflow-auto p-6">
            {cart.length === 0 ? (
              <div className="text-center py-12">
                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <p className="text-gray-500">Your cart is empty</p>
                <button 
                  onClick={() => { setCartOpen(false); setCurrentPage('shop'); }}
                  className="mt-4 text-red-600 font-semibold hover:underline"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center text-3xl flex-shrink-0">
                      {item.image}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 text-sm line-clamp-1">{item.name}</h3>
                      <p className="text-red-600 font-bold">${item.price}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 bg-white border rounded flex items-center justify-center hover:bg-gray-100"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 bg-white border rounded flex items-center justify-center hover:bg-gray-100"
                        >
                          +
                        </button>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="ml-auto text-red-500 hover:text-red-700"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {cart.length > 0 && (
            <div className="p-6 border-t bg-gray-50">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-2xl font-black text-gray-900">${cartTotal}</span>
              </div>
              <p className="text-sm text-gray-500 mb-4">Shipping calculated after order confirmation</p>
              <button 
                onClick={() => { setCartOpen(false); setOrderFormOpen(true); }}
                className="w-full py-4 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors"
              >
                REQUEST ORDER
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Order Form Modal
  const OrderFormModal = () => {
    if (!orderFormOpen) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
        <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-auto">
          <div className="p-6 sm:p-8">
            {orderSuccess ? (
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Request Sent!</h2>
                <p className="text-gray-600">We'll contact you shortly to confirm your order and arrange payment.</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Complete Your Order</h2>
                  <button onClick={() => setOrderFormOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Order Summary</h3>
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between text-sm py-1">
                      <span className="text-gray-600">{item.name} × {item.quantity}</span>
                      <span className="font-medium">${item.price * item.quantity}</span>
                    </div>
                  ))}
                  <div className="flex justify-between font-bold text-lg mt-2 pt-2 border-t">
                    <span>Total</span>
                    <span className="text-red-600">${cartTotal}</span>
                  </div>
                </div>

                <form onSubmit={submitOrder} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Any special requests or delivery instructions..."
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full py-4 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors"
                  >
                    SUBMIT ORDER REQUEST
                  </button>
                  <p className="text-xs text-gray-500 text-center">
                    We'll contact you to confirm availability and arrange payment
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  // About Page
  const AboutPage = () => (
    <section className="pt-24 pb-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-black text-blue-900 mb-4">ABOUT RNR CRICKET</h1>
          <p className="text-xl text-gray-600">The Cayman Islands' Premier Cricket Equipment Store</p>
        </div>
        
        <div className="prose prose-lg max-w-none">
          <div className="bg-gradient-to-br from-blue-900 to-blue-800 text-white rounded-2xl p-8 sm:p-12 mb-12">
            <h2 className="text-2xl font-bold mb-4 text-white">Our Mission</h2>
            <p className="text-white/90 text-lg leading-relaxed">
              At RNR Cricket, we're passionate about providing the Cayman Islands cricket community with access to the world's finest cricket equipment. We believe every cricketer, from beginner to professional, deserves quality gear that enhances their game.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🏏</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Quality Equipment</h3>
              <p className="text-gray-600">We stock only genuine products from the world's most trusted cricket brands including SS, SG, Gray-Nicolls, Adidas, and more.</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🌴</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Local Service</h3>
              <p className="text-gray-600">Based in the Cayman Islands, we understand the local cricket scene and provide personalized service to our community.</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">💬</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Expert Advice</h3>
              <p className="text-gray-600">Our team are cricket enthusiasts who can help you choose the right equipment for your playing style and skill level.</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🚚</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Island Delivery</h3>
              <p className="text-gray-600">We offer convenient delivery across the Cayman Islands so you can focus on what matters – your game.</p>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <button 
            onClick={() => setCurrentPage('shop')}
            className="px-8 py-4 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors"
          >
            BROWSE OUR COLLECTION
          </button>
        </div>
      </div>
    </section>
  );

  // Contact Page
  const ContactPage = () => (
    <section className="pt-24 pb-20 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-black text-blue-900 mb-4">CONTACT US</h1>
          <p className="text-xl text-gray-600">We'd love to hear from you</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Get In Touch</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <button 
                type="submit"
                className="w-full py-4 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors"
              >
                SEND MESSAGE
              </button>
            </form>
          </div>
          
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-900 to-blue-800 text-white rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-4">Location</h3>
              <p className="text-white/90">
                Cayman Islands<br />
                Serving cricketers across Grand Cayman
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Hours</h3>
              <div className="space-y-2 text-gray-600">
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 4:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
            
            <div className="bg-red-50 rounded-2xl p-8 border border-red-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Inquiry?</h3>
              <p className="text-gray-600 mb-4">
                Looking for a specific product or have questions about our equipment? We're here to help!
              </p>
              <button 
                onClick={() => setCurrentPage('shop')}
                className="text-red-600 font-semibold hover:underline"
              >
                Browse our catalog →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  // Shipping Policy Page (accessed via footer)
  const ShippingPage = () => (
    <section className="pt-24 pb-20 min-h-screen">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-4xl font-black text-blue-900 mb-8">SHIPPING POLICY</h1>
        
        <div className="prose prose-lg max-w-none">
          <div className="bg-gray-50 rounded-xl p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Local Delivery (Cayman Islands)</h2>
            <p className="text-gray-600">We offer delivery across Grand Cayman. Delivery times and fees will be confirmed when we contact you to process your order.</p>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Order Processing</h2>
            <p className="text-gray-600">Once you submit an order request, we will contact you within 24-48 hours to confirm product availability, finalize pricing, and arrange payment and delivery details.</p>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Payment</h2>
            <p className="text-gray-600">Payment is arranged directly with RNR Cricket after order confirmation. We accept various payment methods which will be discussed when we contact you.</p>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Returns & Exchanges</h2>
            <p className="text-gray-600">We want you to be completely satisfied with your purchase. If you have any issues with your order, please contact us within 7 days of receiving your items and we'll work with you to resolve the situation.</p>
          </div>
          
          <div className="bg-red-50 rounded-xl p-6 border border-red-100">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Questions?</h2>
            <p className="text-gray-600 mb-4">If you have any questions about shipping or our policies, please don't hesitate to reach out.</p>
            <button 
              onClick={() => setCurrentPage('contact')}
              className="text-red-600 font-semibold hover:underline"
            >
              Contact Us →
            </button>
          </div>
        </div>
      </div>
    </section>
  );

  // Footer
  const Footer = () => (
    <footer className="bg-blue-950 text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center">
                  <span className="text-white font-black text-sm">RNR</span>
                </div>
                <span className="text-white font-black text-xl">RNR CRICKET</span>
              </div>
              <p className="text-white/70 max-w-sm">
                The Cayman Islands' premier destination for quality cricket equipment. Take your game to the next level.
              </p>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'Shop', 'About', 'Contact'].map(link => (
                <li key={link}>
                  <button 
                    onClick={() => setCurrentPage(link.toLowerCase())}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4">Policies</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => setCurrentPage('shipping')}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Shipping Policy
                </button>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-white/50 text-sm">
            © {new Date().getFullYear()} RNR Cricket. All rights reserved. Cayman Islands.
          </p>
        </div>
      </div>
    </footer>
  );

  // Home Page
  const HomePage = () => (
    <>
      <Hero />
      <FeaturedCategories />
      <FeaturedProducts />
      
      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-red-600 to-red-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">READY TO UPGRADE YOUR GEAR?</h2>
          <p className="text-white/90 text-lg mb-8">Browse our full collection and find the perfect equipment for your game.</p>
          <button 
            onClick={() => setCurrentPage('shop')}
            className="px-8 py-4 bg-white text-red-600 font-bold rounded-lg hover:bg-gray-100 transition-colors transform hover:scale-105"
          >
            SHOP ALL PRODUCTS
          </button>
        </div>
      </section>
    </>
  );

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'shop' && <ShopPage />}
      {currentPage === 'about' && <AboutPage />}
      {currentPage === 'contact' && <ContactPage />}
      {currentPage === 'shipping' && <ShippingPage />}
      
      <Footer />
      
      <CartSidebar />
      <ProductModal />
      <OrderFormModal />
    </div>
  );
}
