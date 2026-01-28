# RNR Cricket 🏏

**Cayman Islands' Premier Cricket Store**

A modern, responsive e-commerce website for RNR Cricket featuring product catalog, filtering, cart functionality, and order inquiry system.

![RNR Cricket](https://img.shields.io/badge/RNR-Cricket-dc2626?style=for-the-badge)

## Features

- ✅ Modern, responsive design
- ✅ Product catalog with 35+ items
- ✅ Filter by category, brand, and search
- ✅ Sort by name and price
- ✅ Shopping cart with quantity controls
- ✅ Order request form (no online payment)
- ✅ Product detail modals
- ✅ Mobile-friendly navigation
- ✅ About, Contact, and Shipping Policy pages

## Tech Stack

- **React 18** - UI Framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/rroach-bit/rnrcricket.git
   cd rnrcricket
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open http://localhost:5173 in your browser

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` folder.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Deploy!

### Netlify

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Connect your GitHub repository
4. Build command: `npm run build`
5. Publish directory: `dist`

## Customization

### Adding Products

Edit the `sampleProducts` array in `src/App.jsx`:

```javascript
const sampleProducts = [
  {
    id: 1,
    name: "Product Name",
    category: "Bats", // Bats, Gloves, Pads, WK Equipment, Shoes, Kids, Accessories
    brand: "SS",
    price: 200,
    image: "🏏", // Replace with actual image URL
    description: "Product description",
    inStock: true
  },
  // ... more products
];
```

### Adding Product Images

Replace the emoji placeholders with actual images:

```javascript
image: "/images/product-name.jpg"
```

Or use external URLs:

```javascript
image: "https://example.com/product-image.jpg"
```

### Updating Contact Information

Search for the Contact page section in `src/App.jsx` and update the details.

## Project Structure

```
rnrcricket/
├── public/
│   └── favicon.svg
├── src/
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## License

© 2025 RNR Cricket. All rights reserved.

---

**Take Your Game to the Next Level** 🏏
