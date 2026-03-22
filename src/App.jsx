import { useState, useEffect } from "react";

/* ─── SVG SPORT ICONS (no emojis) ─── */
const SportIcon = ({ sport, size = 24, color = "currentColor" }) => {
  const s = { width: size, height: size, fill: "none", stroke: color, strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" };
  const icons = {
    cricket: <svg viewBox="0 0 24 24" style={s}><path d="M4 20L14.5 9.5" stroke={color} /><rect x="13" y="2" width="3" height="12" rx="1.5" transform="rotate(45 14.5 8)" stroke={color} /><circle cx="18" cy="18" r="2.5" stroke={color} /></svg>,
    pickleball: <svg viewBox="0 0 24 24" style={s}><ellipse cx="10" cy="10" rx="7" ry="8" stroke={color} /><line x1="10" y1="18" x2="10" y2="23" stroke={color} strokeWidth="2.5" /><circle cx="18" cy="18" r="2" stroke={color} /><circle cx="7" cy="8" r=".8" fill={color} /><circle cx="10" cy="6" r=".8" fill={color} /><circle cx="13" cy="8" r=".8" fill={color} /></svg>,
    netball: <svg viewBox="0 0 24 24" style={s}><circle cx="12" cy="12" r="9" stroke={color} /><ellipse cx="12" cy="12" rx="9" ry="3" stroke={color} /><ellipse cx="12" cy="12" rx="3" ry="9" stroke={color} /></svg>,
    rugby: <svg viewBox="0 0 24 24" style={s}><ellipse cx="12" cy="12" rx="9" ry="6" transform="rotate(-30 12 12)" stroke={color} /><line x1="7" y1="9" x2="17" y2="15" stroke={color} /><line x1="9" y1="7.5" x2="9.5" y2="10.5" stroke={color} /><line x1="12" y1="9" x2="12" y2="12" stroke={color} /><line x1="15" y1="10.5" x2="14.5" y2="13.5" stroke={color} /></svg>,
    football: <svg viewBox="0 0 24 24" style={s}><circle cx="12" cy="12" r="9" stroke={color} /><path d="M12 3l2.5 6.5H21l-5.3 3.8 2 6.5L12 16.2 6.3 19.8l2-6.5L3 9.5h6.5z" stroke={color} fill="none" /></svg>,
  };
  return icons[sport] || null;
};

/* ─── DATA ─── */
const SPORTS = {
  cricket: {
    name: "Cricket", color: "#0D9488",
    categories: ["Bats", "Pads", "Gloves", "Helmets", "Balls", "Bags", "Shoes"],
    products: [
      { id: 1, name: "Gray-Nicolls Powerbow Inferno", cat: "Bats", price: 449, was: 549, rating: 5, badge: "Best Seller", desc: "Grade 1+ English Willow, revolutionary low-swell profile", img: "https://www.allroundercricket.com/cdn/shop/files/GN-Powerbow-Inferno-5-Star-Lite-1.png?v=1725366810&width=600" },
      { id: 2, name: "Kookaburra Ghost Pro Players", cat: "Bats", price: 389, was: 429, rating: 5, badge: "Pro Choice", desc: "Dynamic Core technology, maximum energy transfer", img: "https://www.stagsports.com.au/cdn/shop/files/ghost-pro-players-bat-24-25_550x.jpg?v=1725584419" },
      { id: 3, name: "SS Ton Super English Willow", cat: "Bats", price: 169, rating: 4, desc: "Premium English willow, excellent sweet spot", img: "https://www.cricketarabia.com/cdn/shop/files/ss-ton-super-english-willow-cricket-bat-sh-cricket-arabia-6_480x480.png?v=1729674252" },
      { id: 4, name: "New Balance TC 860", cat: "Bats", price: 299, rating: 4, badge: "Value Pick", desc: "Grade 1 English willow, innovative handle construction", img: "https://www.cricketmart.com.au/cdn/shop/files/New_Balance_TC_860_Cricket_Bat.webp?v=1725411032&width=500" },
      { id: 5, name: "SG Sunny Tonny Icon", cat: "Bats", price: 230, rating: 4, desc: "Grade 2 English willow, outstanding value proposition", img: "https://www.starsportsus.net/cdn/shop/files/SG-Sunny-Tonny-Icon-EW.jpg?v=1719584826&width=500" },
      { id: 6, name: "Kookaburra Ghost Pro Pads", cat: "Pads", price: 109, rating: 5, desc: "Ultra-lightweight, superior protection with HDF system", img: "https://romida.co.uk/cdn/shop/files/kookaburra-ghost-pro-batting-pads-2025.webp?v=1726584291&width=500" },
      { id: 7, name: "Gray-Nicolls Legend Pads", cat: "Pads", price: 119, was: 149, rating: 5, desc: "Professional grade, traditional cane rod construction", img: "https://www.allroundercricket.com/cdn/shop/files/GN-Legend-Batting-Pads-1.png?v=1725367651&width=500" },
      { id: 8, name: "SS Super Test Batting Gloves", cat: "Gloves", price: 64, rating: 4, desc: "Premium leather palm, high-density foam protection", img: "https://ecricshop.com/cdn/shop/files/SS-Super-Test-Batting-Gloves-2025.webp?v=1725584419&width=500" },
      { id: 9, name: "Masuri Vision Series Elite", cat: "Helmets", price: 179, rating: 5, badge: "Safety", desc: "Titanium grille, meets latest ICC safety standards", img: "https://www.westernsportscentre.com.au/cdn/shop/products/masuri-vision-test-steel-cricket-helmet-539855.jpg?v=1686275782&width=500" },
      { id: 10, name: "Kookaburra Turf Ball (6pk)", cat: "Balls", price: 89, rating: 5, desc: "Four-piece construction, hand-stitched quarter seam", img: "https://www.stagsports.com.au/cdn/shop/files/kookaburra-turf-red-cricket-ball_550x.jpg?v=1688694478" },
      { id: 11, name: "Gray-Nicolls Academy Wheelie", cat: "Bags", price: 79, rating: 4, desc: "Large wheelie bag, multiple compartments & bat sleeve", img: "https://www.allroundercricket.com/cdn/shop/files/GN-Academy-Wheelie-Bag-1.png?v=1725371086&width=500" },
      { id: 12, name: "New Balance CK4030 v5", cat: "Shoes", price: 129, rating: 4, desc: "Lightweight spike, REVlite midsole cushioning", img: "https://www.starsportsus.net/cdn/shop/files/NB-CK4030-v5-Cricket-Shoe.jpg?v=1719587562&width=500" },
    ],
  },
  pickleball: {
    name: "Pickleball", color: "#059669",
    categories: ["Paddles", "Balls", "Bags", "Nets", "Shoes"],
    products: [
      { id: 101, name: "JOOLA Ben Johns Perseus Pro IV", cat: "Paddles", price: 249, was: 279, rating: 5, badge: "Pro Choice", desc: "14mm carbon fiber, elite control and power balance", img: "https://cdn.shopify.com/s/files/1/0270/1060/3562/files/Ben_Johns_Perseus_ProIV_14.png?v=1730130093&width=600" },
      { id: 102, name: "Selkirk LABS Boomstik", cat: "Paddles", price: 288, rating: 5, badge: "Power", desc: "Raw explosive power, InfiniGrit surface technology", img: "https://www.selkirk.com/cdn/shop/files/Boomstik-Front-Webstore.png?v=1714060345&width=600" },
      { id: 103, name: "CRBN TruFoam Genesis 4", cat: "Paddles", price: 199, rating: 5, desc: "Foam core resists delamination, fiberglass face", img: "https://cdn.shopify.com/s/files/1/0568/7398/4498/files/CRBN-TruFoam-Genesis-4.png?v=1708552985&width=600" },
      { id: 104, name: "Bread & Butter Loco", cat: "Paddles", price: 159, rating: 5, desc: "Foam core, exceptional control and dwell time", img: "https://cdn.shopify.com/s/files/1/0757/9497/5069/files/loco-paddle-front.png?v=1706050293&width=600" },
      { id: 105, name: "Warping Point Neon", cat: "Paddles", price: 89, rating: 4, badge: "Budget", desc: "Elite forgiveness and spin at an incredible price", img: "https://cdn.shopify.com/s/files/1/0687/0242/8070/files/warping-point-neon.png?v=1706050293&width=600" },
      { id: 106, name: "Franklin X-40 Outdoor (12pk)", cat: "Balls", price: 24, rating: 4, desc: "Official outdoor tournament pickleballs", img: "https://m.media-amazon.com/images/I/71Ls3wGJURL._AC_SL1500_.jpg" },
      { id: 107, name: "Rally Portable Net System", cat: "Nets", price: 149, was: 189, rating: 5, desc: "Regulation height, assembles in 60 seconds", img: "https://m.media-amazon.com/images/I/71cJLx+pVTL._AC_SL1500_.jpg" },
      { id: 108, name: "K-Swiss Express Light PB", cat: "Shoes", price: 109, rating: 4, desc: "Court-specific outsole, lightweight cushioning", img: "https://m.media-amazon.com/images/I/71R6EYgzDfL._AC_SL1500_.jpg" },
    ],
  },
  netball: {
    name: "Netball", color: "#7C3AED",
    categories: ["Balls", "Shoes", "Bibs", "Posts"],
    products: [
      { id: 201, name: "Gilbert Spectra Match Ball", cat: "Balls", price: 42, rating: 5, badge: "Match", desc: "INF approved, superior grip in all conditions", img: "https://www.gilbertsport.com/media/catalog/product/cache/5/image/9df78eab33525d08d6e5fb8d27136e95/8/6/86884_spectra_sz5.jpg" },
      { id: 202, name: "Molten GN7X Match Ball", cat: "Balls", price: 45, rating: 5, desc: "INF approved, 18-panel fused design", img: "https://m.media-amazon.com/images/I/71DcPXY0ARL._AC_SL1500_.jpg" },
      { id: 203, name: "ASICS Netburner Shield FF", cat: "Shoes", price: 159, was: 189, rating: 5, badge: "Best Seller", desc: "FlyteFoam Propel, GEL cushioning system", img: "https://images.asics.com/is/image/asics/1072A091_100_SR_RT_GLB-1?wid=500" },
      { id: 204, name: "Mizuno Wave Stealth V", cat: "Shoes", price: 129, rating: 4, desc: "Lightweight Wave plate, excellent court grip", img: "https://m.media-amazon.com/images/I/71F7e5cD4aL._AC_SL1500_.jpg" },
      { id: 205, name: "Gilbert Netball Bibs Set", cat: "Bibs", price: 34, rating: 4, desc: "Reversible two-tone design, numbered 1 through 7", img: "https://m.media-amazon.com/images/I/61gg7NQCz6L._AC_SL1000_.jpg" },
      { id: 206, name: "Harrod Freestanding Posts (pair)", cat: "Posts", price: 599, rating: 5, desc: "Competition standard, heavy weighted base", img: "https://m.media-amazon.com/images/I/41h7TtODX1L._AC_.jpg" },
    ],
  },
  rugby: {
    name: "Rugby", color: "#B45309",
    categories: ["Balls", "Boots", "Protection", "Headguards", "Training"],
    products: [
      { id: 301, name: "Gilbert Sirius Match Ball", cat: "Balls", price: 89, rating: 5, badge: "Match", desc: "World Rugby approved, TrufliGHT valve system", img: "https://www.gilbertrugby.com/cdn/shop/files/gilbert-sirius-match-ball.jpg?v=1706050293&width=500" },
      { id: 302, name: "Canterbury Speed Infinite Pro", cat: "Boots", price: 179, was: 219, rating: 5, badge: "Best Seller", desc: "8-stud configuration, speed-focused design", img: "https://images.sportsdirect.com/images/products/20523003_l_a2.jpg" },
      { id: 303, name: "adidas Kakari Z.1 SG", cat: "Boots", price: 199, rating: 5, desc: "Forward-specific boot, supreme soft-ground traction", img: "https://m.media-amazon.com/images/I/71Lkb4SFDXL._AC_SL1500_.jpg" },
      { id: 304, name: "Gilbert Xact Body Armour", cat: "Protection", price: 59, rating: 4, desc: "World Rugby approved, flexible shoulder padding", img: "https://m.media-amazon.com/images/I/71PbNwNH0FL._AC_SL1500_.jpg" },
      { id: 305, name: "Canterbury Ventilator Headguard", cat: "Headguards", price: 39, rating: 4, desc: "World Rugby compliant, ventilated shell design", img: "https://m.media-amazon.com/images/I/71oABN+lZ5L._AC_SL1500_.jpg" },
      { id: 306, name: "Rhino Collision King Pad", cat: "Training", price: 89, rating: 4, desc: "Heavy-duty PVC shell, high-density foam core", img: "https://m.media-amazon.com/images/I/61c5GiRnRsL._AC_SL1200_.jpg" },
    ],
  },
  football: {
    name: "Football", color: "#1D4ED8",
    categories: ["Balls", "Boots", "Shin Guards", "Gloves", "Training"],
    products: [
      { id: 401, name: "Nike Flight Official Match Ball", cat: "Balls", price: 149, rating: 5, badge: "Match", desc: "Aerowsculpt technology, All Conditions Control", img: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/b91b3a8b-7b4b-4b0e-b9e0-f18e3e2c5e4a/flight-soccer-ball.png" },
      { id: 402, name: "adidas Predator Elite FG", cat: "Boots", price: 249, was: 299, rating: 5, badge: "Top Rated", desc: "Laceless Hybridtouch upper, Controlframe outsole", img: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/2b2f8e5e9a6e4f6bb3a2af0800b9c5b1_9366/Predator_Elite_Firm_Ground_Boots_Blue_IG7777_01_standard.jpg" },
      { id: 403, name: "Nike Mercurial Superfly 10", cat: "Boots", price: 229, rating: 5, desc: "Zoom Air unit, Vaporposite adaptive upper", img: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/a1b2c3d4-e5f6-7890-abcd-ef1234567890/mercurial-superfly-10-elite.png" },
      { id: 404, name: "Puma Future Ultimate FG", cat: "Boots", price: 199, rating: 4, desc: "FUZIONFIT+ compression, Dynamic Motion System", img: "https://m.media-amazon.com/images/I/71NqM-CVPGL._AC_SL1500_.jpg" },
      { id: 405, name: "G-Form Pro-S Elite Guards", cat: "Shin Guards", price: 39, rating: 5, desc: "SmartFlex impact tech, ultra-lightweight profile", img: "https://m.media-amazon.com/images/I/61c4b8CRZYL._AC_SL1500_.jpg" },
      { id: 406, name: "Reusch Attrakt Fusion GK", cat: "Gloves", price: 89, was: 109, rating: 5, desc: "Evolution Negative Cut, 4mm latex palm grip", img: "https://m.media-amazon.com/images/I/71sMfpjfMmL._AC_SL1500_.jpg" },
    ],
  },
};

const UNIFORMS = [
  { id: 501, sport: "cricket", name: "Custom Cricket Whites", price: 89, desc: "Full sublimation, moisture-wicking poly blend", type: "Team Kit", img: "https://m.media-amazon.com/images/I/61ZzQNqEd4L._AC_SL1200_.jpg" },
  { id: 502, sport: "cricket", name: "T20 Coloured Playing Kit", price: 69, desc: "Custom sublimated design, breathable mesh panels", type: "Match Wear", img: "https://m.media-amazon.com/images/I/71cmE3rCVtL._AC_SL1500_.jpg" },
  { id: 503, sport: "cricket", name: "Cricket Training Polo", price: 39, desc: "Embroidered crest, quick-dry technical fabric", type: "Training", img: "https://m.media-amazon.com/images/I/61N-S3nBK+L._AC_SL1000_.jpg" },
  { id: 504, sport: "pickleball", name: "Performance Court Tee", price: 44, desc: "4-way stretch, anti-microbial treatment", type: "Court Wear", img: "https://www.selkirk.com/cdn/shop/files/mens-performance-tee.png?v=1714060345&width=500" },
  { id: 505, sport: "netball", name: "Custom Netball Dress", price: 59, desc: "Full sublimated body-fit design with built-in shorts", type: "Team Kit", img: "https://m.media-amazon.com/images/I/51zBmP-B1AL._AC_SL1000_.jpg" },
  { id: 506, sport: "rugby", name: "Custom Rugby Jersey", price: 79, desc: "Reinforced seams, full sublimation print", type: "Team Kit", img: "https://m.media-amazon.com/images/I/71JTr1D0IuL._AC_SL1500_.jpg" },
  { id: 507, sport: "rugby", name: "Rugby Training Shorts", price: 34, desc: "Rip-stop fabric, elasticated drawstring waist", type: "Training", img: "https://m.media-amazon.com/images/I/71bIVKqLyTL._AC_SL1500_.jpg" },
  { id: 508, sport: "football", name: "Custom Football Kit", price: 69, desc: "Full sublimation, match-day specification", type: "Team Kit", img: "https://m.media-amazon.com/images/I/71sH5yBP5bL._AC_SL1500_.jpg" },
  { id: 509, sport: "football", name: "GK Jersey Custom", price: 59, desc: "Padded elbows, high-vis designs available", type: "Team Kit", img: "https://m.media-amazon.com/images/I/71ixwWBkVaL._AC_SL1500_.jpg" },
  { id: 510, sport: "football", name: "Training Tracksuit Set", price: 89, desc: "Zip jacket and tapered joggers combo", type: "Training", img: "https://m.media-amazon.com/images/I/61+ExZkRVOL._AC_SL1500_.jpg" },
];

/* ─── HELPERS ─── */
const Stars = ({ r }) => <span style={{ color: "#F59E0B", fontSize: 12, letterSpacing: 1 }}>{"★".repeat(r)}<span style={{ opacity: .2 }}>{"★".repeat(5-r)}</span></span>;

function Img({ src, alt, style }) {
  const [err, setErr] = useState(false);
  if (err || !src) return <div style={{ ...style, display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg,#F0FDFA,#E0F2FE)", borderRadius: 8, color: "#0D9488", fontSize: 12, fontWeight: 600 }}>No image</div>;
  return <img src={src} alt={alt} style={{ ...style, objectFit: "contain" }} onError={() => setErr(true)} loading="lazy" />;
}

/* ─── MAIN ─── */
export default function App() {
  const [page, setPage] = useState("home");
  const [sport, setSport] = useState("cricket");
  const [cat, setCat] = useState("All");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [q, setQ] = useState("");
  const [notif, setNotif] = useState(null);

  useEffect(() => {
    const el = document.getElementById("rnr");
    if (!el) return;
    const h = () => setScrolled(el.scrollTop > 30);
    el.addEventListener("scroll", h);
    return () => el.removeEventListener("scroll", h);
  }, []);

  const add = (item) => {
    setCart(p => { const e = p.find(c => c.id === item.id); return e ? p.map(c => c.id === item.id ? { ...c, qty: c.qty+1 } : c) : [...p, { ...item, qty: 1 }]; });
    setNotif(item.name); setTimeout(() => setNotif(null), 2000);
  };
  const rm = id => setCart(p => p.filter(c => c.id !== id));
  const qty = (id, d) => setCart(p => p.map(c => c.id === id ? { ...c, qty: Math.max(1, c.qty+d) } : c));
  const total = cart.reduce((s,c) => s + c.price * c.qty, 0);
  const count = cart.reduce((s,c) => s + c.qty, 0);
  const S = SPORTS[sport];

  const prods = S?.products.filter(p => {
    const mc = cat === "All" || p.cat === cat;
    const ms = !q || p.name.toLowerCase().includes(q.toLowerCase()) || p.desc.toLowerCase().includes(q.toLowerCase());
    return mc && ms;
  }) || [];

  const go = (pg, sp) => { setPage(pg); if(sp) setSport(sp); setCat("All"); setQ(""); document.getElementById("rnr")?.scrollTo({top:0,behavior:"smooth"}); };

  const nav = [{k:"home",l:"Home"},{k:"shop",l:"Equipment"},{k:"uniforms",l:"Uniforms"},{k:"about",l:"About"},{k:"contact",l:"Contact"}];

  const F = "'Sora', sans-serif";
  const B = "'Space Grotesk', sans-serif";

  return (
    <div id="rnr" style={{ fontFamily: F, height: "100vh", overflow: "auto", background: "#F5F9F9", color: "#0C1B1B" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:#0D948840;border-radius:4px}
        @keyframes fu{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes si{from{transform:translateX(100%)}to{transform:translateX(0)}}
        @keyframes ni{from{opacity:0;transform:translateY(-12px) scale(.96)}to{opacity:1;transform:translateY(0) scale(1)}}
        button{font-family:'Sora',sans-serif}
        input,select,textarea{font-family:'Sora',sans-serif}
      `}</style>

      {/* NOTIF */}
      {notif && <div style={{ position:"fixed",top:72,left:"50%",transform:"translateX(-50%)",zIndex:1000,background:"linear-gradient(135deg,#0D9488,#059669)",color:"#fff",padding:"10px 22px",borderRadius:12,fontSize:12.5,fontWeight:600,animation:"ni .25s ease",boxShadow:"0 10px 28px rgba(13,148,136,.25)",display:"flex",alignItems:"center",gap:8 }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="7" fill="rgba(255,255,255,.2)"/><path d="M4 7l2 2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        {notif} added
      </div>}

      {/* HEADER */}
      <header style={{ position:"sticky",top:0,zIndex:100,background:scrolled?"rgba(245,249,249,.9)":"transparent",backdropFilter:scrolled?"blur(20px) saturate(1.5)":"none",borderBottom:scrolled?"1px solid #D0E2E2":"1px solid transparent",transition:"all .3s",padding:"0 28px" }}>
        <div style={{ maxWidth:1360,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",height:64 }}>
          <div onClick={() => go("home")} style={{ cursor:"pointer",display:"flex",alignItems:"center",gap:12 }}>
            <div style={{ width:36,height:36,borderRadius:10,background:"linear-gradient(135deg,#0D9488,#059669)",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:800,fontSize:15,fontFamily:B,boxShadow:"0 3px 12px rgba(13,148,136,.3)" }}>R</div>
            <div>
              <div style={{ fontSize:15,fontWeight:700,letterSpacing:-.4,lineHeight:1.15,fontFamily:B }}>RNR <span style={{ color:"#0D9488" }}>Cricket & Equipment</span></div>
              <div style={{ fontSize:9,letterSpacing:3,textTransform:"uppercase",color:"#7A9494",fontWeight:500 }}>Cayman Islands</div>
            </div>
          </div>
          <nav style={{ display:"flex",gap:2,alignItems:"center" }}>
            {nav.map(n => <button key={n.k} onClick={() => go(n.k)} style={{ background:page===n.k?"#0D948810":"transparent",color:page===n.k?"#0D9488":"#6B8A8A",border:"none",borderRadius:8,padding:"7px 14px",fontSize:12.5,fontWeight:600,cursor:"pointer",transition:"all .15s",letterSpacing:-.1 }}>{n.l}</button>)}
            <div style={{ width:1,height:22,background:"#D0E2E2",margin:"0 10px" }} />
            <button onClick={() => setCartOpen(!cartOpen)} style={{ position:"relative",background:count>0?"linear-gradient(135deg,#0D9488,#059669)":"#0D948810",border:"none",borderRadius:10,padding:"7px 13px",cursor:"pointer",display:"flex",alignItems:"center",gap:6,color:count>0?"#fff":"#0D9488",boxShadow:count>0?"0 3px 12px rgba(13,148,136,.2)":"none",transition:"all .25s" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
              {count>0 && <span style={{ fontSize:11.5,fontWeight:700 }}>{count}</span>}
            </button>
          </nav>
        </div>
      </header>

      {/* CART */}
      {cartOpen && <>
        <div onClick={() => setCartOpen(false)} style={{ position:"fixed",inset:0,background:"rgba(12,27,27,.35)",zIndex:199,backdropFilter:"blur(3px)" }} />
        <div style={{ position:"fixed",top:0,right:0,bottom:0,width:400,maxWidth:"92vw",background:"#fff",zIndex:200,display:"flex",flexDirection:"column",animation:"si .25s cubic-bezier(.22,1,.36,1)",boxShadow:"-10px 0 40px rgba(0,0,0,.08)" }}>
          <div style={{ padding:"20px 24px",borderBottom:"1px solid #E8F0F0",display:"flex",justifyContent:"space-between",alignItems:"center" }}>
            <span style={{ fontSize:17,fontWeight:700,fontFamily:B,letterSpacing:-.3 }}>Cart</span>
            <button onClick={() => setCartOpen(false)} style={{ background:"#0D948810",border:"none",borderRadius:8,width:32,height:32,fontSize:16,cursor:"pointer",color:"#0D9488",fontWeight:600,display:"flex",alignItems:"center",justifyContent:"center" }}>
              <svg width="14" height="14" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="1" y1="1" x2="13" y2="13"/><line x1="13" y1="1" x2="1" y2="13"/></svg>
            </button>
          </div>
          <div style={{ flex:1,overflow:"auto",padding:"12px 24px" }}>
            {cart.length===0 ? <div style={{ textAlign:"center",padding:"50px 0",color:"#7A9494",fontSize:13 }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#B0C8C8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{margin:"0 auto 12px",display:"block"}}><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
              Your cart is empty
            </div> : cart.map(item => (
              <div key={item.id} style={{ display:"flex",gap:12,padding:"14px 0",borderBottom:"1px solid #E8F0F0",alignItems:"center" }}>
                <div style={{ width:52,height:52,borderRadius:8,background:"#F0FDFA",display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden",flexShrink:0 }}>
                  <Img src={item.img} alt={item.name} style={{ maxHeight:40,maxWidth:40 }} />
                </div>
                <div style={{ flex:1,minWidth:0 }}>
                  <div style={{ fontSize:12.5,fontWeight:600,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis" }}>{item.name}</div>
                  <div style={{ display:"flex",alignItems:"center",gap:8,marginTop:5 }}>
                    <button onClick={() => qty(item.id,-1)} style={{ width:24,height:24,borderRadius:5,border:"1px solid #D0E2E2",background:"#fff",cursor:"pointer",fontSize:13,fontWeight:600,color:"#6B8A8A",display:"flex",alignItems:"center",justifyContent:"center" }}>-</button>
                    <span style={{ fontSize:12.5,fontWeight:700,minWidth:14,textAlign:"center" }}>{item.qty}</span>
                    <button onClick={() => qty(item.id,1)} style={{ width:24,height:24,borderRadius:5,border:"1px solid #D0E2E2",background:"#fff",cursor:"pointer",fontSize:13,fontWeight:600,color:"#6B8A8A",display:"flex",alignItems:"center",justifyContent:"center" }}>+</button>
                  </div>
                </div>
                <div style={{ textAlign:"right" }}>
                  <div style={{ fontWeight:700,fontSize:13,fontFamily:B }}>${(item.price*item.qty).toFixed(2)}</div>
                  <button onClick={() => rm(item.id)} style={{ background:"none",border:"none",color:"#EF4444",cursor:"pointer",fontSize:10.5,fontWeight:600,marginTop:3 }}>Remove</button>
                </div>
              </div>
            ))}
          </div>
          {cart.length>0 && <div style={{ padding:"18px 24px",borderTop:"1px solid #E8F0F0",background:"#F5F9F9" }}>
            <div style={{ display:"flex",justifyContent:"space-between",marginBottom:14,fontSize:16,fontWeight:700,fontFamily:B }}><span>Total</span><span>${total.toFixed(2)}</span></div>
            <button style={{ width:"100%",background:"linear-gradient(135deg,#0D9488,#059669)",color:"#fff",border:"none",borderRadius:12,padding:14,fontSize:13.5,fontWeight:700,cursor:"pointer",boxShadow:"0 6px 20px rgba(13,148,136,.2)",letterSpacing:-.2 }}>Proceed to Checkout</button>
          </div>}
        </div>
      </>}

      <main style={{ maxWidth:1360,margin:"0 auto",padding:"0 28px" }}>

        {/* HOME */}
        {page==="home" && <div style={{ animation:"fu .45s ease" }}>
          <section style={{ padding:"72px 32px 56px",textAlign:"center",background:"linear-gradient(170deg,#CCFBF1 0%,#F0FDFA 45%,#F5F9F9 100%)",borderRadius:24,marginTop:16,marginBottom:48,position:"relative",overflow:"hidden" }}>
            <div style={{ position:"absolute",top:-100,left:-100,width:350,height:350,borderRadius:"50%",background:"radial-gradient(circle,#0D948812,transparent 70%)" }} />
            <div style={{ position:"absolute",bottom:-80,right:-80,width:280,height:280,borderRadius:"50%",background:"radial-gradient(circle,#05966912,transparent 70%)" }} />
            <div style={{ position:"relative",zIndex:1 }}>
              <div style={{ display:"inline-flex",alignItems:"center",gap:8,background:"#0D948812",borderRadius:20,padding:"5px 16px",fontSize:10.5,fontWeight:600,letterSpacing:1.8,textTransform:"uppercase",color:"#0D9488",marginBottom:20 }}>
                Cayman Islands Premier Sports Store
              </div>
              <h1 style={{ fontSize:"clamp(36px,5.5vw,62px)",fontWeight:800,lineHeight:1.05,marginBottom:18,fontFamily:B,letterSpacing:-1.5 }}>
                Your Game.<br/><span style={{ background:"linear-gradient(135deg,#0D9488,#059669)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" }}>Our Gear.</span>
              </h1>
              <p style={{ fontSize:15,color:"#5F7A7A",maxWidth:520,margin:"0 auto 30px",lineHeight:1.7,fontWeight:400 }}>
                From pitch to court — premium equipment and custom team uniforms across cricket, pickleball, netball, rugby, and football.
              </p>
              <div style={{ display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap" }}>
                <button onClick={() => go("shop")} style={{ background:"linear-gradient(135deg,#0D9488,#059669)",color:"#fff",border:"none",borderRadius:12,padding:"13px 32px",fontSize:13,fontWeight:700,cursor:"pointer",boxShadow:"0 6px 24px rgba(13,148,136,.25)",letterSpacing:-.2 }}>Shop Equipment</button>
                <button onClick={() => go("uniforms")} style={{ background:"rgba(255,255,255,.75)",color:"#0D9488",border:"1.5px solid #0D948830",borderRadius:12,padding:"13px 32px",fontSize:13,fontWeight:700,cursor:"pointer",backdropFilter:"blur(8px)",letterSpacing:-.2 }}>Custom Uniforms</button>
              </div>
            </div>
          </section>

          {/* Sport cards */}
          <section style={{ marginBottom:56 }}>
            <div style={{ textAlign:"center",marginBottom:32 }}>
              <h2 style={{ fontSize:26,fontWeight:700,fontFamily:B,letterSpacing:-.5 }}>Shop by Sport</h2>
              <p style={{ color:"#7A9494",fontSize:13,marginTop:5 }}>Everything you need, whatever you play</p>
            </div>
            <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:14 }}>
              {Object.entries(SPORTS).map(([k,s]) => (
                <div key={k} onClick={() => go("shop",k)} style={{ background:"#fff",borderRadius:16,padding:"28px 20px",textAlign:"center",cursor:"pointer",border:"1px solid #D0E2E2",transition:"all .25s cubic-bezier(.22,1,.36,1)" }}
                  onMouseEnter={e => { e.currentTarget.style.transform="translateY(-5px)"; e.currentTarget.style.boxShadow=`0 14px 36px ${s.color}12`; e.currentTarget.style.borderColor=`${s.color}35`; }}
                  onMouseLeave={e => { e.currentTarget.style.transform="none"; e.currentTarget.style.boxShadow="none"; e.currentTarget.style.borderColor="#D0E2E2"; }}>
                  <div style={{ display:"flex",justifyContent:"center",marginBottom:12 }}><SportIcon sport={k} size={36} color={s.color} /></div>
                  <div style={{ fontSize:14.5,fontWeight:700,color:s.color,fontFamily:B }}>{s.name}</div>
                  <div style={{ fontSize:11.5,color:"#7A9494",marginTop:3 }}>{s.products.length} products</div>
                </div>
              ))}
            </div>
          </section>

          {/* Featured */}
          <section style={{ marginBottom:56 }}>
            <div style={{ textAlign:"center",marginBottom:32 }}>
              <h2 style={{ fontSize:26,fontWeight:700,fontFamily:B,letterSpacing:-.5 }}>Featured Products</h2>
              <p style={{ color:"#7A9494",fontSize:13,marginTop:5 }}>Top sellers across all sports</p>
            </div>
            <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:18 }}>
              {Object.entries(SPORTS).flatMap(([,s]) => s.products.filter(p=>p.badge).slice(0,2).map(p => <Card key={p.id} p={p} c={s.color} add={add} F={F} B={B} />)).slice(0,8)}
            </div>
          </section>

          {/* Uniforms CTA */}
          <section style={{ background:"linear-gradient(135deg,#0C1B1B 0%,#134E4A 55%,#0D9488 100%)",borderRadius:22,padding:"56px 36px",textAlign:"center",color:"#fff",marginBottom:56,position:"relative",overflow:"hidden" }}>
            <div style={{ position:"absolute",inset:0,opacity:.04,background:"url('data:image/svg+xml,<svg viewBox=\"0 0 40 40\" xmlns=\"http://www.w3.org/2000/svg\"><circle cx=\"20\" cy=\"20\" r=\"1\" fill=\"white\"/></svg>') repeat",backgroundSize:"20px" }} />
            <div style={{ position:"relative",zIndex:1 }}>
              <div style={{ fontSize:10,fontWeight:600,letterSpacing:3,textTransform:"uppercase",color:"#5EEAD4",marginBottom:12 }}>Custom Team Wear</div>
              <h2 style={{ fontSize:30,fontWeight:700,marginBottom:14,fontFamily:B,letterSpacing:-.5 }}>Uniforms Designed for Your Team</h2>
              <p style={{ color:"#99F6E4",maxWidth:500,margin:"0 auto 24px",fontSize:14,lineHeight:1.65 }}>Full sublimation printing, custom designs, and team branding across all sports.</p>
              <button onClick={() => go("uniforms")} style={{ background:"#fff",color:"#0D9488",border:"none",borderRadius:12,padding:"13px 32px",fontSize:13,fontWeight:700,cursor:"pointer",boxShadow:"0 6px 20px rgba(0,0,0,.12)",letterSpacing:-.2 }}>Explore Uniforms</button>
            </div>
          </section>

          {/* Features */}
          <section style={{ marginBottom:56 }}>
            <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(230px,1fr))",gap:14 }}>
              {[
                { t:"Island-Wide Delivery",d:"Free delivery across Grand Cayman on orders over CI$100",ic:<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0D9488" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg> },
                { t:"Authentic Products",d:"Genuine equipment from world-leading sports brands",ic:<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0D9488" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg> },
                { t:"Custom Uniforms",d:"Full sublimation team kits, 2-3 week turnaround",ic:<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0D9488" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.38 3.46L16 2 12 5.5 8 2l-4.38 1.46a2 2 0 00-1.34 1.68l-.58 7.8A2 2 0 003.68 15l6.8 5.1a2.74 2.74 0 003.04 0l6.8-5.1a2 2 0 001.98-2.06l-.58-7.8a2 2 0 00-1.34-1.68z"/></svg> },
                { t:"Expert Advice",d:"Our sports specialists help you choose the right gear",ic:<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0D9488" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg> },
              ].map((f,i) => (
                <div key={i} style={{ background:"#fff",borderRadius:14,padding:"26px 24px",border:"1px solid #D0E2E2",display:"flex",gap:16,alignItems:"flex-start" }}>
                  <div style={{ flexShrink:0,width:44,height:44,borderRadius:11,background:"#0D948808",display:"flex",alignItems:"center",justifyContent:"center" }}>{f.ic}</div>
                  <div>
                    <div style={{ fontSize:14,fontWeight:700,marginBottom:4,fontFamily:B,letterSpacing:-.2 }}>{f.t}</div>
                    <div style={{ fontSize:12.5,color:"#7A9494",lineHeight:1.55 }}>{f.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>}

        {/* SHOP */}
        {page==="shop" && <div style={{ animation:"fu .35s ease",paddingTop:24,paddingBottom:56 }}>
          <div style={{ marginBottom:24 }}>
            <h1 style={{ fontSize:28,fontWeight:700,marginBottom:4,fontFamily:B,letterSpacing:-.5,display:"flex",alignItems:"center",gap:10 }}>
              <SportIcon sport={sport} size={28} color={S.color} /> {S.name} Equipment
            </h1>
            <p style={{ color:"#7A9494",fontSize:13 }}>Browse our full {S.name.toLowerCase()} range</p>
          </div>
          <div style={{ display:"flex",gap:7,marginBottom:20,flexWrap:"wrap" }}>
            {Object.entries(SPORTS).map(([k,s]) => (
              <button key={k} onClick={() => { setSport(k); setCat("All"); setQ(""); }}
                style={{ background:sport===k?`linear-gradient(135deg,${s.color},${s.color}CC)`:"#fff",color:sport===k?"#fff":"#6B8A8A",border:`1px solid ${sport===k?s.color:"#D0E2E2"}`,borderRadius:10,padding:"8px 18px",fontSize:12,fontWeight:600,cursor:"pointer",boxShadow:sport===k?`0 3px 12px ${s.color}20`:"none",transition:"all .2s",display:"flex",alignItems:"center",gap:6 }}>
                <SportIcon sport={k} size={16} color={sport===k?"#fff":s.color} /> {s.name}
              </button>
            ))}
          </div>
          <div style={{ marginBottom:16,position:"relative",maxWidth:380 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7A9494" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position:"absolute",left:13,top:"50%",transform:"translateY(-50%)" }}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" placeholder={`Search ${S.name}...`} value={q} onChange={e => setQ(e.target.value)}
              style={{ width:"100%",padding:"10px 14px 10px 38px",borderRadius:10,border:"1px solid #D0E2E2",fontSize:12.5,background:"#fff",outline:"none",fontWeight:500,transition:"border .2s" }}
              onFocus={e => e.target.style.borderColor="#0D9488"} onBlur={e => e.target.style.borderColor="#D0E2E2"} />
          </div>
          <div style={{ display:"flex",gap:5,marginBottom:24,flexWrap:"wrap" }}>
            {["All",...S.categories].map(c => (
              <button key={c} onClick={() => setCat(c)} style={{ background:cat===c?`${S.color}0F`:"transparent",color:cat===c?S.color:"#7A9494",border:`1px solid ${cat===c?S.color+"30":"#D0E2E2"}`,borderRadius:8,padding:"6px 14px",fontSize:11.5,fontWeight:600,cursor:"pointer",transition:"all .15s" }}>
                {c} ({c==="All"?S.products.length:S.products.filter(p=>p.cat===c).length})
              </button>
            ))}
          </div>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:18 }}>
            {prods.map(p => <Card key={p.id} p={p} c={S.color} add={add} F={F} B={B} />)}
          </div>
          {prods.length===0 && <div style={{ textAlign:"center",padding:56,color:"#7A9494",fontSize:13 }}>No products match your search.</div>}
        </div>}

        {/* UNIFORMS */}
        {page==="uniforms" && <div style={{ animation:"fu .35s ease",paddingTop:24,paddingBottom:56 }}>
          <div style={{ marginBottom:24 }}>
            <h1 style={{ fontSize:28,fontWeight:700,marginBottom:4,fontFamily:B,letterSpacing:-.5 }}>Custom Uniforms & Team Wear</h1>
            <p style={{ color:"#7A9494",fontSize:13 }}>Full sublimation printing with custom designs. Minimum order: 10 pieces.</p>
          </div>
          <div style={{ display:"flex",gap:7,marginBottom:24,flexWrap:"wrap" }}>
            <button onClick={() => setSport("all")} style={{ background:sport==="all"?"linear-gradient(135deg,#0C1B1B,#134E4A)":"#fff",color:sport==="all"?"#fff":"#6B8A8A",border:`1px solid ${sport==="all"?"#0C1B1B":"#D0E2E2"}`,borderRadius:10,padding:"8px 18px",fontSize:12,fontWeight:600,cursor:"pointer" }}>All Sports</button>
            {Object.entries(SPORTS).map(([k,s]) => (
              <button key={k} onClick={() => setSport(k)} style={{ background:sport===k?`linear-gradient(135deg,${s.color},${s.color}CC)`:"#fff",color:sport===k?"#fff":"#6B8A8A",border:`1px solid ${sport===k?s.color:"#D0E2E2"}`,borderRadius:10,padding:"8px 18px",fontSize:12,fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:6,boxShadow:sport===k?`0 3px 12px ${s.color}20`:"none" }}>
                <SportIcon sport={k} size={16} color={sport===k?"#fff":s.color} /> {s.name}
              </button>
            ))}
          </div>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:18 }}>
            {(sport==="all"?UNIFORMS:UNIFORMS.filter(u=>u.sport===sport)).map(u => {
              const sp = SPORTS[u.sport];
              return <UCard key={u.id} u={u} sp={sp} add={add} F={F} B={B} />;
            })}
          </div>
          <div style={{ marginTop:44,background:"linear-gradient(135deg,#F0FDFA,#CCFBF1)",borderRadius:18,padding:"44px 36px",textAlign:"center",border:"1px solid #0D948820" }}>
            <h3 style={{ fontSize:22,fontWeight:700,marginBottom:10,fontFamily:B,letterSpacing:-.4 }}>Need a Custom Design?</h3>
            <p style={{ color:"#5F7A7A",marginBottom:22,fontSize:13,lineHeight:1.6 }}>Send us your team colours, logos, and requirements. Free mockup within 48 hours.</p>
            <button onClick={() => go("contact")} style={{ background:"linear-gradient(135deg,#0D9488,#059669)",color:"#fff",border:"none",borderRadius:12,padding:"13px 28px",fontSize:13,fontWeight:700,cursor:"pointer",boxShadow:"0 6px 20px rgba(13,148,136,.2)" }}>Get a Free Quote</button>
          </div>
        </div>}

        {/* ABOUT */}
        {page==="about" && <div style={{ animation:"fu .35s ease",paddingTop:36,paddingBottom:56,maxWidth:700 }}>
          <h1 style={{ fontSize:28,fontWeight:700,marginBottom:20,fontFamily:B,letterSpacing:-.5 }}>About RNR <span style={{ color:"#0D9488" }}>Cricket & Equipment</span></h1>
          <div style={{ fontSize:14,color:"#5F7A7A",lineHeight:1.85,display:"flex",flexDirection:"column",gap:14 }}>
            <p>Born in the Cayman Islands, RNR Cricket & Equipment is your destination for premium sporting goods across the Caribbean. What started as a dedicated cricket store has grown into a multi-sport supplier serving athletes across cricket, pickleball, netball, rugby, and football.</p>
            <p>We source directly from Gray-Nicolls, Kookaburra, SS, SG, New Balance, JOOLA, Selkirk, Gilbert, Canterbury, Nike, adidas, and ASICS — ensuring every piece of equipment is genuine and competitively priced.</p>
            <p>Our custom uniform service provides full sublimation printing with rapid turnaround — perfect for clubs, schools, and corporate teams across the Cayman Islands and wider Caribbean.</p>
          </div>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14,marginTop:28 }}>
            {[{n:"5+",l:"Sports"},{n:"50+",l:"Products"},{n:"100+",l:"Teams Served"}].map((s,i) => (
              <div key={i} style={{ background:"#fff",borderRadius:14,padding:"22px 16px",textAlign:"center",border:"1px solid #D0E2E2" }}>
                <div style={{ fontSize:26,fontWeight:800,color:"#0D9488",fontFamily:B }}>{s.n}</div>
                <div style={{ fontSize:11.5,color:"#7A9494",marginTop:3,fontWeight:500 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>}

        {/* CONTACT */}
        {page==="contact" && <div style={{ animation:"fu .35s ease",paddingTop:36,paddingBottom:56,maxWidth:600 }}>
          <h1 style={{ fontSize:28,fontWeight:700,marginBottom:24,fontFamily:B,letterSpacing:-.5 }}>Get in Touch</h1>
          <div style={{ display:"grid",gap:12,marginBottom:28 }}>
            {[{l:"Email",v:"info@rnrcricket.com",ic:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0D9488" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>},
              {l:"Location",v:"George Town, Grand Cayman",ic:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0D9488" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>},
              {l:"Hours",v:"Mon — Sat, 9:00 AM — 6:00 PM",ic:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0D9488" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>}
            ].map((c,i) => (
              <div key={i} style={{ background:"#fff",borderRadius:12,padding:"16px 20px",border:"1px solid #D0E2E2",display:"flex",alignItems:"center",gap:14 }}>
                <div style={{ width:40,height:40,borderRadius:10,background:"#0D948808",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>{c.ic}</div>
                <div>
                  <div style={{ fontSize:10,fontWeight:600,textTransform:"uppercase",letterSpacing:1.2,color:"#0D9488",marginBottom:1 }}>{c.l}</div>
                  <div style={{ fontSize:13.5,fontWeight:600 }}>{c.v}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ background:"#fff",borderRadius:16,padding:28,border:"1px solid #D0E2E2" }}>
            <h3 style={{ fontSize:18,fontWeight:700,marginBottom:18,fontFamily:B,letterSpacing:-.3 }}>Send a Message</h3>
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12 }}>
              {["Name","Email"].map((l,i) => <div key={i}><label style={{ display:"block",fontSize:11,fontWeight:600,marginBottom:4,color:"#7A9494" }}>{l}</label><input style={{ width:"100%",padding:"10px 13px",borderRadius:8,border:"1px solid #D0E2E2",fontSize:12.5,background:"#F5F9F9",outline:"none",fontWeight:500 }} onFocus={e=>e.target.style.borderColor="#0D9488"} onBlur={e=>e.target.style.borderColor="#D0E2E2"} /></div>)}
            </div>
            <div style={{ marginBottom:12 }}><label style={{ display:"block",fontSize:11,fontWeight:600,marginBottom:4,color:"#7A9494" }}>Enquiry Type</label><select style={{ width:"100%",padding:"10px 13px",borderRadius:8,border:"1px solid #D0E2E2",fontSize:12.5,background:"#F5F9F9",outline:"none",fontWeight:500 }}><option>Cricket Equipment</option><option>Pickleball Equipment</option><option>Netball Equipment</option><option>Rugby Equipment</option><option>Football Equipment</option><option>Custom Uniforms</option><option>Bulk / Team Order</option></select></div>
            <div style={{ marginBottom:16 }}><label style={{ display:"block",fontSize:11,fontWeight:600,marginBottom:4,color:"#7A9494" }}>Message</label><textarea rows={5} style={{ width:"100%",padding:"10px 13px",borderRadius:8,border:"1px solid #D0E2E2",fontSize:12.5,background:"#F5F9F9",outline:"none",resize:"vertical",fontWeight:500 }} onFocus={e=>e.target.style.borderColor="#0D9488"} onBlur={e=>e.target.style.borderColor="#D0E2E2"} /></div>
            <button style={{ background:"linear-gradient(135deg,#0D9488,#059669)",color:"#fff",border:"none",borderRadius:12,padding:"13px 28px",fontSize:13,fontWeight:700,cursor:"pointer",boxShadow:"0 6px 20px rgba(13,148,136,.2)" }}>Send Message</button>
          </div>
        </div>}
      </main>

      {/* FOOTER */}
      <footer style={{ background:"linear-gradient(180deg,#0C1B1B,#081212)",color:"#5F8080",padding:"44px 28px 24px",marginTop:44 }}>
        <div style={{ maxWidth:1360,margin:"0 auto" }}>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(190px,1fr))",gap:32,marginBottom:32 }}>
            <div>
              <div style={{ color:"#fff",fontSize:16,fontWeight:700,marginBottom:12,fontFamily:B,letterSpacing:-.3 }}>RNR <span style={{ color:"#0D9488" }}>Cricket & Equipment</span></div>
              <div style={{ fontSize:12.5,lineHeight:1.7 }}>Cayman Islands' premier sporting equipment and custom uniform supplier.</div>
            </div>
            <div>
              <div style={{ color:"#5EEAD4",fontSize:10,fontWeight:600,marginBottom:12,textTransform:"uppercase",letterSpacing:2 }}>Sports</div>
              {Object.entries(SPORTS).map(([k,s]) => <div key={k} style={{ fontSize:12.5,marginBottom:7,cursor:"pointer",transition:"color .15s" }} onClick={() => go("shop",k)} onMouseEnter={e=>e.target.style.color="#5EEAD4"} onMouseLeave={e=>e.target.style.color="#5F8080"}>{s.name}</div>)}
            </div>
            <div>
              <div style={{ color:"#5EEAD4",fontSize:10,fontWeight:600,marginBottom:12,textTransform:"uppercase",letterSpacing:2 }}>Links</div>
              {nav.map(n => <div key={n.k} style={{ fontSize:12.5,marginBottom:7,cursor:"pointer",transition:"color .15s" }} onClick={() => go(n.k)} onMouseEnter={e=>e.target.style.color="#5EEAD4"} onMouseLeave={e=>e.target.style.color="#5F8080"}>{n.l}</div>)}
            </div>
            <div>
              <div style={{ color:"#5EEAD4",fontSize:10,fontWeight:600,marginBottom:12,textTransform:"uppercase",letterSpacing:2 }}>Contact</div>
              <div style={{ fontSize:12.5,lineHeight:1.9 }}>George Town, Grand Cayman<br/>info@rnrcricket.com<br/>Mon — Sat 9AM — 6PM</div>
            </div>
          </div>
          <div style={{ borderTop:"1px solid #1A2E2E",paddingTop:18,fontSize:11,textAlign:"center",color:"#3A5555" }}>
            &copy; 2026 RNR Cricket & Equipment. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ─── PRODUCT CARD ─── */
function Card({ p, c, add, F, B }) {
  const [h, setH] = useState(false);
  return (
    <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{
      background:"#fff",borderRadius:14,overflow:"hidden",
      transition:"transform .25s cubic-bezier(.22,1,.36,1),box-shadow .25s,border-color .25s",
      transform:h?"translateY(-6px)":"none",
      boxShadow:h?`0 18px 44px ${c}14`:"0 1px 6px rgba(0,0,0,.03)",
      display:"flex",flexDirection:"column",cursor:"pointer",
      border:`1px solid ${h?c+"30":"#D0E2E2"}`,
    }}>
      {p.badge && <div style={{ position:"absolute",top:12,left:12,zIndex:2,background:`linear-gradient(135deg,${c},${c}DD)`,color:"#fff",fontSize:9.5,fontWeight:700,padding:"4px 10px",borderRadius:16,letterSpacing:.7,textTransform:"uppercase",boxShadow:`0 3px 10px ${c}35` }}>{p.badge}</div>}
      {p.was && <div style={{ position:"absolute",top:12,right:12,zIndex:2,background:"#EF4444",color:"#fff",fontSize:9.5,fontWeight:700,padding:"4px 9px",borderRadius:16 }}>-{Math.round((1-p.price/p.was)*100)}%</div>}
      <div style={{ height:190,background:"linear-gradient(160deg,#F0FDFA,#ECFDF5,#F0F9FF)",display:"flex",alignItems:"center",justifyContent:"center",padding:18,position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",top:-25,right:-25,width:100,height:100,borderRadius:"50%",background:`${c}06` }} />
        <Img src={p.img} alt={p.name} style={{ maxHeight:155,maxWidth:"85%",transition:"transform .3s",transform:h?"scale(1.04)":"scale(1)" }} />
      </div>
      <div style={{ padding:"14px 18px 18px",flex:1,display:"flex",flexDirection:"column" }}>
        <div style={{ fontSize:10,color:c,fontWeight:600,textTransform:"uppercase",letterSpacing:1.5,marginBottom:5 }}>{p.cat}</div>
        <div style={{ fontSize:14,fontWeight:700,color:"#0C1B1B",lineHeight:1.35,marginBottom:5,fontFamily:B,letterSpacing:-.2 }}>{p.name}</div>
        <div style={{ fontSize:12,color:"#7A9494",lineHeight:1.55,marginBottom:10,flex:1 }}>{p.desc}</div>
        <Stars r={p.rating} />
        <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:10 }}>
          <div style={{ display:"flex",alignItems:"baseline",gap:7 }}>
            <span style={{ fontSize:20,fontWeight:800,fontFamily:B,letterSpacing:-.5 }}>${p.price}</span>
            {p.was && <span style={{ fontSize:12.5,color:"#9AB0B0",textDecoration:"line-through" }}>${p.was}</span>}
          </div>
          <button onClick={e => { e.stopPropagation(); add(p); }} style={{
            background:`linear-gradient(135deg,${c},${c}CC)`,color:"#fff",border:"none",borderRadius:8,
            padding:"8px 14px",fontSize:11.5,fontWeight:700,cursor:"pointer",transition:"transform .15s",
            boxShadow:`0 3px 10px ${c}25`,letterSpacing:-.1,
          }}
            onMouseEnter={e=>e.target.style.transform="scale(1.04)"}
            onMouseLeave={e=>e.target.style.transform="scale(1)"}
          >Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

/* ─── UNIFORM CARD ─── */
function UCard({ u, sp, add, F, B }) {
  const [h, setH] = useState(false);
  return (
    <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{
      background:"#fff",borderRadius:14,overflow:"hidden",
      transition:"transform .25s cubic-bezier(.22,1,.36,1),box-shadow .25s,border-color .25s",
      transform:h?"translateY(-6px)":"none",
      boxShadow:h?`0 18px 44px ${sp.color}14`:"0 1px 6px rgba(0,0,0,.03)",
      display:"flex",flexDirection:"column",cursor:"pointer",
      border:`1px solid ${h?sp.color+"30":"#D0E2E2"}`,
    }}>
      <div style={{ height:175,background:"linear-gradient(160deg,#F0FDFA,#ECFDF5,#F5F3FF)",display:"flex",alignItems:"center",justifyContent:"center",padding:14 }}>
        <Img src={u.img} alt={u.name} style={{ maxHeight:145,maxWidth:"80%",transition:"transform .3s",transform:h?"scale(1.04)":"scale(1)" }} />
      </div>
      <div style={{ padding:"14px 18px 18px",flex:1,display:"flex",flexDirection:"column" }}>
        <div style={{ display:"flex",alignItems:"center",gap:6,marginBottom:5 }}>
          <span style={{ fontSize:9.5,color:sp.color,fontWeight:600,textTransform:"uppercase",letterSpacing:1.5,display:"flex",alignItems:"center",gap:4 }}><SportIcon sport={Object.keys(SPORTS).find(k=>SPORTS[k]===sp)} size={13} color={sp.color} />{sp.name}</span>
          <span style={{ fontSize:9,background:`${sp.color}0F`,color:sp.color,padding:"2px 7px",borderRadius:8,fontWeight:600 }}>{u.type}</span>
        </div>
        <div style={{ fontSize:14,fontWeight:700,color:"#0C1B1B",marginBottom:5,fontFamily:B,letterSpacing:-.2 }}>{u.name}</div>
        <div style={{ fontSize:12,color:"#7A9494",marginBottom:12,flex:1,lineHeight:1.5 }}>{u.desc}</div>
        <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between" }}>
          <span style={{ fontSize:20,fontWeight:800,fontFamily:B,letterSpacing:-.5 }}>
            <span style={{ fontSize:12,fontWeight:500,color:"#7A9494" }}>from </span>${u.price}
          </span>
          <button onClick={e => { e.stopPropagation(); add(u); }} style={{ background:`linear-gradient(135deg,${sp.color},${sp.color}CC)`,color:"#fff",border:"none",borderRadius:8,padding:"8px 14px",fontSize:11.5,fontWeight:700,cursor:"pointer",boxShadow:`0 3px 10px ${sp.color}25` }}>Enquire</button>
        </div>
      </div>
    </div>
  );
}
