import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Supabase Configuration
const supabaseUrl = 'https://hqjjfypcrndyamhlwjdd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhxampmeXBjcm5keWFtaGx3amRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk1OTgzMzIsImV4cCI6MjA4NTE3NDMzMn0.zHAom2Owwwar65l5xOrD7_AmsL0FEO7qvJ1M-bfGrKw';
const supabase = createClient(supabaseUrl, supabaseKey);

// Image URLs from Unsplash (fallback/default images)
const DEFAULT_IMAGES = {
  hero: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=1600&h=900&fit=crop",
  bat: "https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?w=400&h=400&fit=crop",
  gloves: "https://images.unsplash.com/photo-1559812686-e95a0a66f965?w=400&h=400&fit=crop",
  pads: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400&h=400&fit=crop",
  shoes: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop",
  default: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400&h=400&fit=crop",
};

// Category images for the homepage
const CATEGORY_IMAGES = {
  Bats: "https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?w=600&h=600&fit=crop",
  Gloves: "https://images.unsplash.com/photo-1559812686-e95a0a66f965?w=600&h=600&fit=crop",
  Pads: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=600&h=600&fit=crop",
  Shoes: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&h=600&fit=crop",
};

const categories = ["All", "Bats", "Gloves", "Pads", "WK Equipment", "Shoes", "Kids", "Accessories"];
const brands = ["All", "SS", "SG", "Gray-Nicolls", "CEAT", "Adidas", "Asics", "Puma", "Shrey", "Generic"];

// Admin password - change this!
const ADMIN_PASSWORD = "rnrcricket2025";

export default function RNRCricket() {
  const [currentPage, setCurrentPage] = useState('home');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
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
  
  // Admin states
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '', category: 'Bats', brand: 'SS', price: 0, image: '', description: '', in_stock: true
  });

  // Fetch products from Supabase
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching products:', error);
    } else {
      setProducts(data || []);
    }
    setLoading(false);
  };

  // Admin functions
  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminPassword === ADMIN_PASSWORD) {
      setIsAdmin(true);
      setAdminPassword('');
    } else {
      alert('Incorrect password');
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('products')
      .insert([{
        name: newProduct.name,
        category: newProduct.category,
        brand: newProduct.brand,
        price: parseFloat(newProduct.price),
        image: newProduct.image || DEFAULT_IMAGES.default,
        description: newProduct.description,
        in_stock: newProduct.in_stock
      }])
      .select();
    
    if (error) {
      alert('Error adding product: ' + error.message);
    } else {
      setProducts([data[0], ...products]);
      setNewProduct({ name: '', category: 'Bats', brand: 'SS', price: 0, image: '', description: '', in_stock: true });
      alert('Product added successfully!');
    }
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from('products')
      .update({
        name: editingProduct.name,
        category: editingProduct.category,
        brand: editingProduct.brand,
        price: parseFloat(editingProduct.price),
        image: editingProduct.image,
        description: editingProduct.description,
        in_stock: editingProduct.in_stock
      })
      .eq('id', editingProduct.id);
    
    if (error) {
      alert('Error updating product: ' + error.message);
    } else {
      setProducts(products.map(p => p.id === editingProduct.id ? editingProduct : p));
      setEditingProduct(null);
      alert('Product updated successfully!');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);
    
    if (error) {
      alert('Error deleting product: ' + error.message);
    } else {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const handleToggleStock = async (product) => {
    const { error } = await supabase
      .from('products')
      .update({ in_stock: !product.in_stock })
      .eq('id', product.id);
    
    if (error) {
      alert('Error updating stock: ' + error.message);
    } else {
      setProducts(products.map(p => p.id === product.id ? { ...p, in_stock: !p.in_stock } : p));
    }
  };

  // Filter and sort products
  const filteredProducts = products
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

  const submitOrder = async (e) => {
    e.preventDefault();
    
    // Save order to Supabase
    const { error } = await supabase
      .from('orders')
      .insert([{
        customer_name: formData.name,
        customer_email: formData.email,
        customer_phone: formData.phone,
        notes: formData.message,
        items: cart,
        total: cartTotal,
        status: 'pending'
      }]);
    
    if (error) {
      console.error('Error saving order:', error);
    }
    
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
            {isAdmin && (
              <button
                onClick={() => setCurrentPage('admin')}
                className={`text-sm font-semibold tracking-wide transition-all duration-300 px-3 py-1 rounded-full ${
                  currentPage === 'admin' 
                    ? 'bg-red-600 text-white' 
                    : 'bg-red-100 text-red-600 hover:bg-red-200'
                }`}
              >
                ADMIN
              </button>
            )}
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
            {isAdmin && (
              <button
                onClick={() => { setCurrentPage('admin'); setMobileMenuOpen(false); }}
                className="block w-full text-left px-6 py-4 text-red-600 hover:bg-red-50 font-medium border-b border-gray-100"
              >
                Admin Panel
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );

  // Hero Section
  const Hero = () => (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${DEFAULT_IMAGES.hero})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/95 via-blue-900/90 to-blue-800/80"></div>
      </div>
      
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
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

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
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
            { name: 'Bats', color: 'from-red-500 to-red-700' },
            { name: 'Gloves', color: 'from-blue-500 to-blue-700' },
            { name: 'Pads', color: 'from-green-500 to-green-700' },
            { name: 'Shoes', color: 'from-purple-500 to-purple-700' },
          ].map((cat) => (
            <button
              key={cat.name}
              onClick={() => { setSelectedCategory(cat.name); setCurrentPage('shop'); }}
              className="group relative overflow-hidden rounded-2xl aspect-square transition-all duration-500 hover:scale-105 hover:shadow-2xl"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${CATEGORY_IMAGES[cat.name]})` }}
              />
              <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-70 group-hover:opacity-85 transition-opacity duration-500`}></div>
              <div className="relative z-10 h-full flex flex-col items-center justify-center">
                <span className="text-white font-bold text-lg sm:text-xl tracking-wide drop-shadow-lg">{cat.name.toUpperCase()}</span>
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
        
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-500">Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No products yet. Add products via the admin panel.</p>
            <button 
              onClick={() => setCurrentPage('admin')}
              className="mt-4 text-red-600 font-semibold hover:underline"
            >
              Go to Admin Panel →
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );

  // Product Card Component
  const ProductCard = ({ product }) => (
    <div className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-500">
      <div 
        className="relative aspect-square bg-gray-100 cursor-pointer overflow-hidden"
        onClick={() => setSelectedProduct(product)}
      >
        <img 
          src={product.image || DEFAULT_IMAGES.default} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => { e.target.src = DEFAULT_IMAGES.default; }}
        />
        {!product.in_stock && (
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
            onClick={() => product.in_stock && addToCart(product)}
            disabled={!product.in_stock}
            className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
              product.in_stock 
                ? 'bg-blue-900 text-white hover:bg-red-600' 
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            {product.in_stock ? 'Add to Cart' : 'Sold Out'}
          </button>
        </div>
      </div>
    </div>
  );

  // Shop Page
  const ShopPage = () => (
    <section className="pt-24 pb-20 px-4 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-black text-blue-900 mb-2">SHOP ALL PRODUCTS</h1>
          <p className="text-gray-600">{filteredProducts.length} products found</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24">
              <h3 className="font-bold text-gray-900 mb-4">Filters</h3>
              
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
            {loading ? (
              <div className="text-center py-20">
                <div className="inline-block w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-gray-500">Loading products...</p>
              </div>
            ) : filteredProducts.length === 0 ? (
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
          <div className="relative aspect-video bg-gray-100">
            <img 
              src={selectedProduct.image || DEFAULT_IMAGES.default} 
              alt={selectedProduct.name}
              className="w-full h-full object-cover"
              onError={(e) => { e.target.src = DEFAULT_IMAGES.default; }}
            />
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
                onClick={() => { selectedProduct.in_stock && addToCart(selectedProduct); setSelectedProduct(null); }}
                disabled={!selectedProduct.in_stock}
                className={`px-8 py-3 rounded-lg font-bold transition-all ${
                  selectedProduct.in_stock 
                    ? 'bg-red-600 text-white hover:bg-red-700' 
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              >
                {selectedProduct.in_stock ? 'Add to Cart' : 'Out of Stock'}
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
                    <div className="w-16 h-16 bg-white rounded-lg flex-shrink-0 overflow-hidden">
                      <img src={item.image || DEFAULT_IMAGES.default} alt={item.name} className="w-full h-full object-cover" />
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

  // Admin Panel
  const AdminPanel = () => {
    if (!isAdmin) {
      return (
        <section className="pt-24 pb-20 min-h-screen bg-gray-50">
          <div className="max-w-md mx-auto px-4">
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Admin Login</h1>
              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input
                    type="password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Enter admin password"
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors"
                >
                  LOGIN
                </button>
              </form>
            </div>
          </div>
        </section>
      );
    }

    return (
      <section className="pt-24 pb-20 min-h-screen bg-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-black text-blue-900">Admin Panel</h1>
              <p className="text-gray-600">Manage your products and inventory</p>
            </div>
            <button 
              onClick={() => setIsAdmin(false)}
              className="px-4 py-2 text-red-600 font-semibold hover:bg-red-50 rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>

          {/* Add New Product Form */}
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Add New Product</h2>
            <form onSubmit={handleAddProduct} className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
                <input
                  type="text"
                  required
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price ($) *</label>
                <input
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                <select
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  {categories.filter(c => c !== 'All').map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Brand *</label>
                <select
                  value={newProduct.brand}
                  onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  {brands.filter(b => b !== 'All').map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input
                  type="url"
                  value={newProduct.image}
                  onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                  placeholder="https://example.com/image.jpg (leave empty for default)"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="inStock"
                  checked={newProduct.in_stock}
                  onChange={(e) => setNewProduct({ ...newProduct, in_stock: e.target.checked })}
                  className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
                />
                <label htmlFor="inStock" className="text-sm font-medium text-gray-700">In Stock</label>
              </div>
              <div className="flex justify-end">
                <button 
                  type="submit"
                  className="px-6 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors"
                >
                  + Add Product
                </button>
              </div>
            </form>
          </div>

          {/* Products List */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Products ({products.length})</h2>
            
            {products.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No products yet. Add your first product above!</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-2 font-semibold text-gray-700">Image</th>
                      <th className="text-left py-3 px-2 font-semibold text-gray-700">Name</th>
                      <th className="text-left py-3 px-2 font-semibold text-gray-700">Category</th>
                      <th className="text-left py-3 px-2 font-semibold text-gray-700">Brand</th>
                      <th className="text-left py-3 px-2 font-semibold text-gray-700">Price</th>
                      <th className="text-left py-3 px-2 font-semibold text-gray-700">Stock</th>
                      <th className="text-left py-3 px-2 font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(product => (
                      <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-2">
                          <img 
                            src={product.image || DEFAULT_IMAGES.default} 
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded"
                            onError={(e) => { e.target.src = DEFAULT_IMAGES.default; }}
                          />
                        </td>
                        <td className="py-3 px-2 font-medium">{product.name}</td>
                        <td className="py-3 px-2 text-gray-600">{product.category}</td>
                        <td className="py-3 px-2 text-gray-600">{product.brand}</td>
                        <td className="py-3 px-2 font-semibold text-red-600">${product.price}</td>
                        <td className="py-3 px-2">
                          <button
                            onClick={() => handleToggleStock(product)}
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              product.in_stock 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-red-100 text-red-700'
                            }`}
                          >
                            {product.in_stock ? 'In Stock' : 'Out of Stock'}
                          </button>
                        </td>
                        <td className="py-3 px-2">
                          <div className="flex gap-2">
                            <button
                              onClick={() => setEditingProduct({ ...product })}
                              className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm font-semibold hover:bg-blue-200"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm font-semibold hover:bg-red-200"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Edit Product Modal */}
          {editingProduct && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
              <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-auto p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Edit Product</h2>
                  <button onClick={() => setEditingProduct(null)} className="p-2 hover:bg-gray-100 rounded-lg">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <form onSubmit={handleUpdateProduct} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
                    <input
                      type="text"
                      required
                      value={editingProduct.name}
                      onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Price ($) *</label>
                      <input
                        type="number"
                        required
                        min="0"
                        step="0.01"
                        value={editingProduct.price}
                        onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                      <select
                        value={editingProduct.category}
                        onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      >
                        {categories.filter(c => c !== 'All').map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Brand *</label>
                    <select
                      value={editingProduct.brand}
                      onChange={(e) => setEditingProduct({ ...editingProduct, brand: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      {brands.filter(b => b !== 'All').map(brand => (
                        <option key={brand} value={brand}>{brand}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                    <input
                      type="url"
                      value={editingProduct.image || ''}
                      onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      rows={3}
                      value={editingProduct.description || ''}
                      onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="editInStock"
                      checked={editingProduct.in_stock}
                      onChange={(e) => setEditingProduct({ ...editingProduct, in_stock: e.target.checked })}
                      className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
                    />
                    <label htmlFor="editInStock" className="text-sm font-medium text-gray-700">In Stock</label>
                  </div>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setEditingProduct(null)}
                      className="flex-1 py-3 border border-gray-200 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </section>
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
                <input type="text" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea rows={5} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" />
              </div>
              <button type="submit" className="w-full py-4 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors">
                SEND MESSAGE
              </button>
            </form>
          </div>
          
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-900 to-blue-800 text-white rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-4">Location</h3>
              <p className="text-white/90">Cayman Islands<br />Serving cricketers across Grand Cayman</p>
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
              <p className="text-gray-600 mb-4">Looking for a specific product or have questions about our equipment? We're here to help!</p>
              <button onClick={() => setCurrentPage('shop')} className="text-red-600 font-semibold hover:underline">
                Browse our catalog →
              </button>
            </div>
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
                  <button onClick={() => setCurrentPage(link.toLowerCase())} className="text-white/70 hover:text-white transition-colors">
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4">Admin</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => setCurrentPage('admin')} className="text-white/70 hover:text-white transition-colors">
                  Admin Login
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
      {currentPage === 'admin' && <AdminPanel />}
      
      <Footer />
      
      <CartSidebar />
      <ProductModal />
      <OrderFormModal />
    </div>
  );
}
