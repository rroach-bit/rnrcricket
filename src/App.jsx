import { useState, useEffect, useRef } from "react";

const B = {
  navy: "#0A1628", deepNavy: "#060F1D", red: "#E2203C", redDark: "#B91830",
  white: "#FFFFFF", silver: "#C8CDD5", lightGray: "#F0F2F5", gold: "#D4A843",
};

// ── SVG Icon Components (replacing all emojis) ──
const Icons = {
  bat: (s = 24, c = "currentColor") => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 20L8 16M8 16L14.5 9.5C15.5 8.5 17 7 18 5.5C19 4 20 3 20 3L21 4C21 4 20 5 18.5 6C17 7 15.5 8.5 14.5 9.5L8 16Z"/>
      <path d="M14.5 9.5L17 12"/>
      <rect x="5" y="14" width="5" height="5" rx="1" transform="rotate(-45 7.5 16.5)"/>
    </svg>
  ),
  glove: (s = 24, c = "currentColor") => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 13V7C6 6.45 6.45 6 7 6C7.55 6 8 6.45 8 7V12"/>
      <path d="M8 8V4C8 3.45 8.45 3 9 3C9.55 3 10 3.45 10 4V12"/>
      <path d="M10 7V3C10 2.45 10.45 2 11 2C11.55 2 12 2.45 12 3V12"/>
      <path d="M12 8V5C12 4.45 12.45 4 13 4C13.55 4 14 4.45 14 5V12"/>
      <path d="M14 12V13C14 13 16 14 16 17C16 20 14 21 11 21H9C6 21 4 19 4 16V13"/>
    </svg>
  ),
  pad: (s = 24, c = "currentColor") => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="7" y="2" width="10" height="20" rx="3"/>
      <line x1="7" y1="7" x2="17" y2="7"/>
      <line x1="7" y1="12" x2="17" y2="12"/>
      <line x1="7" y1="17" x2="17" y2="17"/>
      <line x1="12" y1="7" x2="12" y2="17"/>
    </svg>
  ),
  helmet: (s = 24, c = "currentColor") => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 13C4 8.58 7.58 5 12 5C16.42 5 20 8.58 20 13V14H4V13Z"/>
      <path d="M20 14C20 14 20 17 18 18H6C4 17 4 14 4 14"/>
      <line x1="15" y1="11" x2="20" y2="11"/>
      <circle cx="18" cy="11" r="1"/>
    </svg>
  ),
  keeper: (s = 24, c = "currentColor") => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 14V8C5 7.45 5.45 7 6 7C6.55 7 7 7.45 7 8V13"/>
      <path d="M7 9V5C7 4.45 7.45 4 8 4C8.55 4 9 4.45 9 5V13"/>
      <path d="M9 7V4C9 3.45 9.45 3 10 3C10.55 3 11 3.45 11 4V13"/>
      <path d="M11 8V5C11 4.45 11.45 4 12 4C12.55 4 13 4.45 13 5V13"/>
      <path d="M13 13V14.5C13 14.5 18 15 18 18C18 21 14 21 12 21H8C5 21 3 19 3 16V14"/>
      <circle cx="17" cy="10" r="4"/>
      <path d="M15.5 10H18.5"/>
      <path d="M17 8.5V11.5"/>
    </svg>
  ),
  shoe: (s = 24, c = "currentColor") => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 18H21V16C21 16 19 15 17 15C15 15 14 16 12 16C10 16 9 14 7 13C5 12 3 12 3 12V18Z"/>
      <path d="M3 12V9C3 8 4 7 5 7H8L10 10"/>
      <line x1="6" y1="18" x2="6" y2="20"/>
      <line x1="10" y1="18" x2="10" y2="20"/>
      <line x1="14" y1="18" x2="14" y2="20"/>
      <line x1="18" y1="18" x2="18" y2="20"/>
    </svg>
  ),
  shield: (s = 24, c = "currentColor") => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L20 6V12C20 17 16 21 12 22C8 21 4 17 4 12V6L12 2Z"/>
      <path d="M12 8V13M12 13L9 16M12 13L15 16"/>
    </svg>
  ),
  bag: (s = 24, c = "currentColor") => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="7" width="18" height="14" rx="2"/>
      <path d="M8 7V5C8 3.9 8.9 3 10 3H14C15.1 3 16 3.9 16 5V7"/>
      <line x1="3" y1="12" x2="21" y2="12"/>
      <circle cx="12" cy="12" r="1.5" fill={c}/>
    </svg>
  ),
  ball: (s = 24, c = "currentColor") => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9"/>
      <path d="M7 5.5C9 8 9 16 7 18.5"/>
      <path d="M17 5.5C15 8 15 16 17 18.5"/>
    </svg>
  ),
  shirt: (s = 24, c = "currentColor") => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 2L2 6V10L5 9V21H19V9L22 10V6L16 2H8Z"/>
      <path d="M8 2C8 2 9.5 5 12 5C14.5 5 16 2 16 2"/>
    </svg>
  ),
  wrench: (s = 24, c = "currentColor") => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
    </svg>
  ),
  search: (s = 20, c = "currentColor") => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7"/><path d="M21 21L16.65 16.65"/></svg>
  ),
  cart: (s = 20, c = "currentColor") => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
      <path d="M1 1H5L7.68 14.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
    </svg>
  ),
  close: (s = 20, c = "currentColor") => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
  ),
  minus: (s = 16, c = "currentColor") => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>
  ),
  plus: (s = 16, c = "currentColor") => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
  ),
  check: (s = 14, c = "currentColor") => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
  ),
  island: (s = 24, c = "currentColor") => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 4C13 4 14 2 15 2C16 2 16.5 3 16.5 3"/>
      <path d="M13 4C13 4 11 3 10 4C9 5 10 6 10 6"/>
      <path d="M13 4V10"/>
      <path d="M9 10L13 8L17 10"/>
      <path d="M3 17C6 14 9 13 12 13C15 13 18 14 21 17"/>
      <path d="M2 20C5 18 8 17 12 17C16 17 19 18 22 20"/>
    </svg>
  ),
  plane: (s = 24, c = "currentColor") => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 2L11 13"/><path d="M22 2L15 22L11 13L2 9L22 2Z"/>
    </svg>
  ),
  chat: (s = 24, c = "currentColor") => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  ),
  pin: (s = 20, c = "currentColor") => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
  ),
  mail: (s = 20, c = "currentColor") => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4L12 13L2 4"/>
    </svg>
  ),
  phone: (s = 20, c = "currentColor") => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  ),
  cartEmpty: (s = 48, c = B.silver) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
      <path d="M1 1H5L7.68 14.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
      <line x1="3" y1="3" x2="21" y2="21" strokeWidth="1.5"/>
    </svg>
  ),
};

// Actual logo image as base64 data URI
const LOGO_SRC = "data:image/webp;base64,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";


const LogoFull = ({ height = 80 }) => (
  <img src={LOGO_SRC} alt="RNR Cricket - Cayman Islands" style={{ height, width: "auto", objectFit: "contain", filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.15))" }} />
);

const LogoNav = ({ height = 40 }) => (
  <img src={LOGO_SRC} alt="RNR Cricket" style={{ height, width: "auto", objectFit: "contain", filter: "drop-shadow(0 1px 4px rgba(0,0,0,0.3))" }} />
);

const LogoNavColor = ({ height = 40 }) => (
  <img src={LOGO_SRC} alt="RNR Cricket" style={{ height, width: "auto", objectFit: "contain" }} />
);

// Category icon mapping
const catIcons = {
  bats: Icons.bat, gloves: Icons.glove, pads: Icons.pad, helmets: Icons.helmet,
  keeping: Icons.keeper, shoes: Icons.shoe, protection: Icons.shield,
  bags: Icons.bag, balls: Icons.ball, clothing: Icons.shirt, accessories: Icons.wrench,
};

// ── Product Database ──
const PRODUCTS = {
  bats: {
    title: "Cricket Bats", subcategories: ["All Bats", "English Willow", "Kashmir Willow", "Junior Bats", "Women's Bats"],
    items: [
      { id: 1, name: "Havoc 1.0 Players Edition", brand: "Gray-Nicolls", price: 489.99, rating: 5, badge: "PRO", desc: "Mid-high profile, light pick-up. As used by Ollie Pope.", sub: "English Willow" },
      { id: 2, name: "Havoc HB317 Players Edition", brand: "Gray-Nicolls", price: 489.99, rating: 5, badge: "NEW", desc: "Harry Brook's signature bat. Blue & yellow Leeds colourway.", sub: "English Willow" },
      { id: 3, name: "Imperia 1.0 Players Edition", brand: "Gray-Nicolls", price: 469.99, rating: 5, badge: "PRO", desc: "Low-mid sweet spot, Powercurve face. Used by Zak Crawley.", sub: "English Willow" },
      { id: 4, name: "Imperia 1.1 Players Edition", brand: "Gray-Nicolls", price: 469.99, rating: 5, badge: null, desc: "Stunning yellow colourway with identical performance specs.", sub: "English Willow" },
      { id: 5, name: "Legend Gold", brand: "Gray-Nicolls", price: 799.99, rating: 5, badge: "PREMIUM", desc: "Top 1% willow. Premium carry case included. Iconic profile.", sub: "English Willow" },
      { id: 6, name: "Legend Platinum", brand: "Gray-Nicolls", price: 599.99, rating: 5, badge: "PREMIUM", desc: "Top 5% willow with clean straight grains. Classic round toe.", sub: "English Willow" },
      { id: 7, name: "Legend Silver", brand: "Gray-Nicolls", price: 449.99, rating: 4, badge: null, desc: "Top 10% willow. Beautiful straight grains, exceptional balance.", sub: "English Willow" },
      { id: 8, name: "GEM 3.0 Players Edition", brand: "Gray-Nicolls", price: 429.99, rating: 5, badge: "WOMEN'S", desc: "Designed specifically for women's cricket. Used by Tammy Beaumont.", sub: "Women's Bats" },
      { id: 9, name: "GEM 3.1 Players Edition", brand: "Gray-Nicolls", price: 429.99, rating: 5, badge: "WOMEN'S", desc: "Alternate colourway GEM. Used by Heather Knight & Sophia Dunkley.", sub: "Women's Bats" },
      { id: 10, name: "Classic Pro Performance", brand: "Gray-Nicolls", price: 349.99, rating: 4, badge: null, desc: "Traditional styling with modern performance. Timeless design.", sub: "English Willow" },
      { id: 11, name: "NEOCORE Players Edition", brand: "Gray-Nicolls", price: 459.99, rating: 5, badge: "NEW", desc: "Carbon-infused handle technology for ultimate performance.", sub: "English Willow" },
      { id: 12, name: "Longbow Players Edition", brand: "Gray-Nicolls", price: 439.99, rating: 4, badge: null, desc: "Retro-inspired iconic shaping with modern edge profile.", sub: "English Willow" },
      { id: 13, name: "PowerScoop Players Edition", brand: "Gray-Nicolls", price: 439.99, rating: 4, badge: null, desc: "Double scoop design for lightning-fast bat speed.", sub: "English Willow" },
      { id: 14, name: "Havoc 1.0 Test", brand: "Gray-Nicolls", price: 299.99, rating: 4, badge: null, desc: "Test-grade Havoc with stunning blue design.", sub: "English Willow" },
      { id: 15, name: "Imperia 1.0 Test", brand: "Gray-Nicolls", price: 289.99, rating: 4, badge: null, desc: "Test-grade Imperia. Excellent value performance bat.", sub: "English Willow" },
      { id: 16, name: "Havoc 1.3 Players Edition", brand: "Gray-Nicolls", price: 489.99, rating: 5, badge: null, desc: "Green colourway. Used by Shan Masood & Mohammad Rizwan.", sub: "English Willow" },
      { id: 17, name: "Classic Academy", brand: "Gray-Nicolls", price: 129.99, rating: 4, badge: null, desc: "Perfect for club and academy cricketers. Great value.", sub: "English Willow" },
      { id: 18, name: "SS TON Player Edition", brand: "SS", price: 399.99, rating: 5, badge: "PRO", desc: "Premium English Willow. Massive edges, superb balance.", sub: "English Willow" },
      { id: 19, name: "SS TON Gutsy", brand: "SS", price: 199.99, rating: 4, badge: null, desc: "Lightweight English Willow bat. Great for all-rounders.", sub: "English Willow" },
      { id: 20, name: "SS TON Maximus", brand: "SS", price: 349.99, rating: 5, badge: null, desc: "Power-profile bat with thick edges and huge sweet spot.", sub: "English Willow" },
      { id: 21, name: "SS TON Gladiator", brand: "SS", price: 259.99, rating: 4, badge: null, desc: "Mid-blade profile. Balanced for stroke play and power.", sub: "English Willow" },
      { id: 22, name: "SS Kashmir Willow Premium", brand: "SS", price: 89.99, rating: 3, badge: null, desc: "Excellent starter bat. Lightweight Kashmir Willow.", sub: "Kashmir Willow" },
      { id: 23, name: "SS Vintage Finisher 7", brand: "SS", price: 329.99, rating: 5, badge: null, desc: "Signature edition. Top-grade English Willow.", sub: "English Willow" },
      { id: 24, name: "Havoc 1.0 Junior 600", brand: "Gray-Nicolls", price: 89.99, rating: 4, badge: "JUNIOR", desc: "Junior Havoc for young cricketers. Sizes 1-6 & Harrow.", sub: "Junior Bats" },
      { id: 25, name: "Imperia 1.0 Junior 600", brand: "Gray-Nicolls", price: 89.99, rating: 4, badge: "JUNIOR", desc: "Junior Imperia with same pro design DNA.", sub: "Junior Bats" },
      { id: 26, name: "GEM Junior", brand: "Gray-Nicolls", price: 79.99, rating: 4, badge: "JUNIOR", desc: "Specifically designed for young girls' cricket.", sub: "Junior Bats" },
      { id: 27, name: "SS TON Junior Range", brand: "SS", price: 69.99, rating: 4, badge: "JUNIOR", desc: "Kashmir Willow junior bat. Perfect for beginners.", sub: "Junior Bats" },
      { id: 28, name: "Cloud Catcher", brand: "Gray-Nicolls", price: 49.99, rating: 3, badge: "STARTER", desc: "Beginner-friendly bat for school cricket.", sub: "Junior Bats" },
    ],
  },
  gloves: { title: "Batting Gloves", subcategories: ["All Gloves", "Pro", "Club", "Junior", "Women's"], items: [
    { id: 101, name: "NEOCORE Players Batting Gloves", brand: "Gray-Nicolls", price: 119.99, rating: 5, badge: "PRO", desc: "Carbon-infused protection. Ultimate pro-level gloves.", sub: "Pro" },
    { id: 102, name: "Havoc Players Batting Gloves", brand: "Gray-Nicolls", price: 99.99, rating: 5, badge: "PRO", desc: "Worn by Ollie Pope. Exceptional grip and protection.", sub: "Pro" },
    { id: 103, name: "Imperia Players Batting Gloves", brand: "Gray-Nicolls", price: 99.99, rating: 5, badge: null, desc: "Premium leather palm. Used by Zak Crawley.", sub: "Pro" },
    { id: 104, name: "Classic Pro Performance Gloves", brand: "Gray-Nicolls", price: 69.99, rating: 4, badge: null, desc: "Traditional design with modern protection.", sub: "Club" },
    { id: 105, name: "GEM Players Batting Gloves", brand: "Gray-Nicolls", price: 89.99, rating: 5, badge: "WOMEN'S", desc: "Designed for women's hands. Premium feel.", sub: "Women's" },
    { id: 106, name: "Classic Academy Batting Gloves", brand: "Gray-Nicolls", price: 34.99, rating: 4, badge: null, desc: "Great value club-level gloves.", sub: "Club" },
    { id: 107, name: "GN100 Batting Gloves", brand: "Gray-Nicolls", price: 24.99, rating: 3, badge: "STARTER", desc: "Entry level batting gloves for beginners.", sub: "Junior" },
    { id: 108, name: "SS TON Test Batting Gloves", brand: "SS", price: 79.99, rating: 5, badge: "PRO", desc: "Premium leather construction. Excellent protection.", sub: "Pro" },
    { id: 109, name: "SS TON Gutsy Batting Gloves", brand: "SS", price: 49.99, rating: 4, badge: null, desc: "Lightweight gloves with great ventilation.", sub: "Club" },
    { id: 110, name: "SS Matrix Batting Gloves", brand: "SS", price: 39.99, rating: 4, badge: null, desc: "Comfortable fit with reinforced finger protection.", sub: "Club" },
    { id: 111, name: "Havoc Junior Batting Gloves", brand: "Gray-Nicolls", price: 24.99, rating: 4, badge: "JUNIOR", desc: "Junior pro-style gloves.", sub: "Junior" },
  ]},
  pads: { title: "Batting Pads", subcategories: ["All Pads", "Pro", "Club", "Junior", "Women's", "Coloured"], items: [
    { id: 201, name: "Havoc Players Batting Pads", brand: "Gray-Nicolls", price: 109.99, rating: 5, badge: "PRO", desc: "Lightweight pro-level pads. Superior protection.", sub: "Pro" },
    { id: 202, name: "Imperia Players Batting Pads", brand: "Gray-Nicolls", price: 109.99, rating: 5, badge: "PRO", desc: "Traditional cane & HDF construction.", sub: "Pro" },
    { id: 203, name: "Classic Pro Performance Pads", brand: "Gray-Nicolls", price: 79.99, rating: 4, badge: null, desc: "Excellent club-level pads.", sub: "Club" },
    { id: 204, name: "GEM Players Batting Pads", brand: "Gray-Nicolls", price: 89.99, rating: 5, badge: "WOMEN'S", desc: "Specifically shaped for women.", sub: "Women's" },
    { id: 205, name: "Classic Academy Batting Pads", brand: "Gray-Nicolls", price: 39.99, rating: 4, badge: null, desc: "Great value for club cricketers.", sub: "Club" },
    { id: 206, name: "SS TON Test Batting Pads", brand: "SS", price: 89.99, rating: 5, badge: null, desc: "Lightweight with excellent protection.", sub: "Pro" },
    { id: 207, name: "SS TON Gutsy Lightweight Pads", brand: "SS", price: 54.99, rating: 4, badge: null, desc: "Featherlight pads for quick running.", sub: "Club" },
    { id: 208, name: "Havoc Coloured Batting Pads", brand: "Gray-Nicolls", price: 89.99, rating: 4, badge: "NEW", desc: "Available in navy, red, black colourways.", sub: "Coloured" },
    { id: 209, name: "Havoc Junior Batting Pads", brand: "Gray-Nicolls", price: 29.99, rating: 4, badge: "JUNIOR", desc: "Junior sized pads with pro DNA.", sub: "Junior" },
  ]},
  helmets: { title: "Helmets", subcategories: ["All Helmets", "Senior", "Junior", "Accessories"], items: [
    { id: 301, name: "Ultimate 360 Pro Helmet", brand: "Gray-Nicolls", price: 179.99, rating: 5, badge: "PRO", desc: "Used by Harry Brook. Maximum 360° protection.", sub: "Senior" },
    { id: 302, name: "Ultimate 360 Senior Helmet", brand: "Gray-Nicolls", price: 139.99, rating: 5, badge: null, desc: "Full 360° titanium grille protection.", sub: "Senior" },
    { id: 303, name: "EVO Pro Helmet", brand: "Gray-Nicolls", price: 129.99, rating: 5, badge: null, desc: "Used by Kraigg Brathwaite. Excellent visibility.", sub: "Senior" },
    { id: 304, name: "Atomic 360 Helmet", brand: "Gray-Nicolls", price: 99.99, rating: 4, badge: null, desc: "Mid-range 360° protection helmet.", sub: "Senior" },
    { id: 305, name: "Atomic Helmet", brand: "Gray-Nicolls", price: 69.99, rating: 4, badge: null, desc: "Reliable protection for club cricket.", sub: "Senior" },
    { id: 306, name: "SS Professional Helmet", brand: "SS", price: 89.99, rating: 4, badge: null, desc: "Adjustable fit with titanium grille.", sub: "Senior" },
    { id: 307, name: "SS Junior Helmet", brand: "SS", price: 49.99, rating: 4, badge: "JUNIOR", desc: "Lightweight protection for young players.", sub: "Junior" },
    { id: 308, name: "Atomic Junior Helmet", brand: "Gray-Nicolls", price: 54.99, rating: 4, badge: "JUNIOR", desc: "Junior 360° protection.", sub: "Junior" },
    { id: 309, name: "Neckguard - Ultimate 360", brand: "Gray-Nicolls", price: 19.99, rating: 4, badge: null, desc: "Add-on neckguard protection.", sub: "Accessories" },
    { id: 310, name: "Helmet Clad", brand: "Gray-Nicolls", price: 12.99, rating: 4, badge: null, desc: "Custom colour helmet clad.", sub: "Accessories" },
  ]},
  keeping: { title: "Wicketkeeping", subcategories: ["All Keeping", "Gloves", "Pads", "Inners", "Junior"], items: [
    { id: 401, name: "Classic Players WK Gloves", brand: "Gray-Nicolls", price: 149.99, rating: 5, badge: "PRO", desc: "Used by Mo Rizwan. Premium Australian leather.", sub: "Gloves" },
    { id: 402, name: "Classic Players Edition WK Gloves", brand: "Gray-Nicolls", price: 139.99, rating: 5, badge: null, desc: "Used by Sam Billings & Kyle Verreynne.", sub: "Gloves" },
    { id: 403, name: "Classic Pro Performance WK Gloves", brand: "Gray-Nicolls", price: 99.99, rating: 4, badge: null, desc: "Used by Ellie Threlkeld. Excellent feel.", sub: "Gloves" },
    { id: 404, name: "Classic GEM WK Gloves", brand: "Gray-Nicolls", price: 109.99, rating: 5, badge: "WOMEN'S", desc: "Women's keeping gloves. Used by Sarah Bryce.", sub: "Gloves" },
    { id: 405, name: "SS TON Pro WK Gloves", brand: "SS", price: 89.99, rating: 4, badge: null, desc: "Genuine leather palms. Excellent grip.", sub: "Gloves" },
    { id: 406, name: "Classic Players WK Pads", brand: "Gray-Nicolls", price: 89.99, rating: 5, badge: "PRO", desc: "Lightweight keeper's pads. Pro level.", sub: "Pads" },
    { id: 407, name: "Classic Pro Performance WK Pads", brand: "Gray-Nicolls", price: 59.99, rating: 4, badge: null, desc: "Excellent club-level keeping pads.", sub: "Pads" },
    { id: 408, name: "SS TON WK Pads", brand: "SS", price: 54.99, rating: 4, badge: null, desc: "Lightweight keeper pads.", sub: "Pads" },
    { id: 409, name: "WK Chamois Inners", brand: "Gray-Nicolls", price: 19.99, rating: 4, badge: null, desc: "Pure chamois leather inner gloves.", sub: "Inners" },
    { id: 410, name: "WK Cotton Inners", brand: "Gray-Nicolls", price: 9.99, rating: 3, badge: null, desc: "Cotton inner gloves for comfort.", sub: "Inners" },
    { id: 411, name: "Junior WK Set", brand: "Gray-Nicolls", price: 49.99, rating: 4, badge: "JUNIOR", desc: "Junior keeping gloves and pads set.", sub: "Junior" },
  ]},
  shoes: { title: "Cricket Shoes", subcategories: ["All Shoes", "Spikes", "Rubber Studs", "Indoor", "Junior"], items: [
    { id: 501, name: "Revo Pro 3.0 Spikes", brand: "Gray-Nicolls", price: 139.99, rating: 5, badge: "PRO", desc: "Premium cricket spike shoe. Lightweight & responsive.", sub: "Spikes" },
    { id: 502, name: "Revo Pro 3.0 Rubber", brand: "Gray-Nicolls", price: 119.99, rating: 5, badge: null, desc: "Rubber stud version for all surfaces.", sub: "Rubber Studs" },
    { id: 503, name: "Players Spikes", brand: "Gray-Nicolls", price: 99.99, rating: 4, badge: null, desc: "Mid-range spike shoe with great support.", sub: "Spikes" },
    { id: 504, name: "Velocity Rubber", brand: "Gray-Nicolls", price: 69.99, rating: 4, badge: null, desc: "Entry-level rubber stud shoe.", sub: "Rubber Studs" },
    { id: 505, name: "Velocity Indoor", brand: "Gray-Nicolls", price: 59.99, rating: 4, badge: null, desc: "Designed for indoor nets and matches.", sub: "Indoor" },
    { id: 506, name: "SS TON Pro Spikes", brand: "SS", price: 89.99, rating: 4, badge: null, desc: "Full spike cricket shoes.", sub: "Spikes" },
    { id: 507, name: "SS TON Rubber Studs", brand: "SS", price: 69.99, rating: 4, badge: null, desc: "All-surface rubber stud shoes.", sub: "Rubber Studs" },
    { id: 508, name: "Junior Velocity", brand: "Gray-Nicolls", price: 44.99, rating: 4, badge: "JUNIOR", desc: "Junior cricket shoes. Rubber studs.", sub: "Junior" },
  ]},
  protection: { title: "Body Protection", subcategories: ["All Protection", "Thigh Pads", "Arm Guards", "Abdo Guards", "Chest Guards"], items: [
    { id: 601, name: "Pro Performance Thigh Pad Set", brand: "Gray-Nicolls", price: 44.99, rating: 4, badge: null, desc: "Inner and outer thigh protection.", sub: "Thigh Pads" },
    { id: 602, name: "Academy Thigh Pads", brand: "Gray-Nicolls", price: 18.99, rating: 3, badge: null, desc: "Basic thigh protection for club cricket.", sub: "Thigh Pads" },
    { id: 603, name: "Pro Performance Arm Guard", brand: "Gray-Nicolls", price: 24.99, rating: 4, badge: null, desc: "Forearm protection against short balls.", sub: "Arm Guards" },
    { id: 604, name: "Pro Performance Upperbody Guard", brand: "Gray-Nicolls", price: 49.99, rating: 4, badge: null, desc: "Full upper body protection.", sub: "Chest Guards" },
    { id: 605, name: "Abdo Guard - Senior", brand: "Gray-Nicolls", price: 9.99, rating: 4, badge: null, desc: "Essential protection. Senior size.", sub: "Abdo Guards" },
    { id: 606, name: "Female Abdo Guard", brand: "Gray-Nicolls", price: 8.99, rating: 4, badge: null, desc: "Women's protective guard.", sub: "Abdo Guards" },
    { id: 607, name: "SS Abdo Guard Premium", brand: "SS", price: 12.99, rating: 4, badge: null, desc: "Lightweight moulded cup.", sub: "Abdo Guards" },
    { id: 608, name: "SS Arm Guard", brand: "SS", price: 19.99, rating: 4, badge: null, desc: "Foam-padded arm protection.", sub: "Arm Guards" },
    { id: 609, name: "SS Chest Guard", brand: "SS", price: 29.99, rating: 4, badge: null, desc: "Lightweight chest protection.", sub: "Chest Guards" },
  ]},
  bags: { title: "Kit Bags & Luggage", subcategories: ["All Bags", "Wheelie Bags", "Duffle Bags", "Backpacks", "Team Luggage"], items: [
    { id: 701, name: "Team 1500 Wheelie", brand: "Gray-Nicolls", price: 129.99, rating: 5, badge: null, desc: "Full-size wheelie bag. Fits complete kit.", sub: "Wheelie Bags" },
    { id: 702, name: "Team 900 Wheelie", brand: "Gray-Nicolls", price: 99.99, rating: 4, badge: null, desc: "Mid-size wheelie for regular players.", sub: "Wheelie Bags" },
    { id: 703, name: "Team 200 Duffle", brand: "Gray-Nicolls", price: 39.99, rating: 4, badge: null, desc: "Compact duffle bag for training.", sub: "Duffle Bags" },
    { id: 704, name: "Team Travel Bag", brand: "Gray-Nicolls", price: 79.99, rating: 4, badge: null, desc: "Travel-friendly cricket bag.", sub: "Team Luggage" },
    { id: 705, name: "SS Professional Wheelie", brand: "SS", price: 109.99, rating: 4, badge: null, desc: "Large wheelie bag with bat compartment.", sub: "Wheelie Bags" },
    { id: 706, name: "SS Kit Bag Large", brand: "SS", price: 79.99, rating: 4, badge: null, desc: "Spacious kit bag with shoulder straps.", sub: "Duffle Bags" },
    { id: 707, name: "SS Backpack", brand: "SS", price: 44.99, rating: 4, badge: null, desc: "Cricket backpack for essentials.", sub: "Backpacks" },
    { id: 708, name: "SS Vintage Bag", brand: "SS", price: 89.99, rating: 4, badge: null, desc: "Retro-styled cricket kit bag.", sub: "Duffle Bags" },
  ]},
  balls: { title: "Balls & Training", subcategories: ["All Balls", "Match Balls", "Practice Balls", "Training Equipment"], items: [
    { id: 801, name: "Crest Special Match Ball", brand: "Gray-Nicolls", price: 24.99, rating: 5, badge: null, desc: "4-piece premium match ball.", sub: "Match Balls" },
    { id: 802, name: "Crest Academy Ball", brand: "Gray-Nicolls", price: 14.99, rating: 4, badge: null, desc: "Training-grade leather ball.", sub: "Practice Balls" },
    { id: 803, name: "Wonderball", brand: "Gray-Nicolls", price: 9.99, rating: 4, badge: null, desc: "All-weather practice ball.", sub: "Practice Balls" },
    { id: 804, name: "SS Crown Match Ball", brand: "SS", price: 22.99, rating: 5, badge: null, desc: "Premium 4-piece match ball.", sub: "Match Balls" },
    { id: 805, name: "SS Club Ball", brand: "SS", price: 12.99, rating: 4, badge: null, desc: "Practice and club match ball.", sub: "Practice Balls" },
    { id: 806, name: "Bowling Machine Ball (6 pack)", brand: "Gray-Nicolls", price: 29.99, rating: 4, badge: null, desc: "Durable balls for bowling machines.", sub: "Training Equipment" },
    { id: 807, name: "Portable Scoreboard", brand: "Gray-Nicolls", price: 134.99, rating: 4, badge: null, desc: "Manual flip scoreboard.", sub: "Training Equipment" },
    { id: 808, name: "Training Stumps & Base", brand: "Gray-Nicolls", price: 49.99, rating: 4, badge: null, desc: "Spring-loaded training stumps.", sub: "Training Equipment" },
    { id: 809, name: "Cricket Stump Set", brand: "SS", price: 39.99, rating: 4, badge: null, desc: "Full stump set with bails.", sub: "Training Equipment" },
    { id: 810, name: "SS Bowling Machine", brand: "SS", price: 699.99, rating: 5, badge: "PRO", desc: "Programmable bowling machine.", sub: "Training Equipment" },
    { id: 811, name: "Fielding Cone Set", brand: "SS", price: 19.99, rating: 4, badge: null, desc: "Training cones - pack of 10.", sub: "Training Equipment" },
    { id: 812, name: "Practice Net (Full Size)", brand: "SS", price: 399.99, rating: 4, badge: null, desc: "Portable full-size practice net.", sub: "Training Equipment" },
  ]},
  clothing: { title: "Clothing", subcategories: ["All Clothing", "Match Whites", "Coloured Kit", "Training Wear", "Caps & Hats"], items: [
    { id: 901, name: "Pro Performance Shirt LS", brand: "Gray-Nicolls", price: 39.99, rating: 4, badge: null, desc: "Long sleeve match whites shirt.", sub: "Match Whites" },
    { id: 902, name: "Pro Performance Shirt SS", brand: "Gray-Nicolls", price: 37.99, rating: 4, badge: null, desc: "Short sleeve match whites shirt.", sub: "Match Whites" },
    { id: 903, name: "Pro Performance Trousers", brand: "Gray-Nicolls", price: 34.99, rating: 4, badge: null, desc: "Traditional cricket trousers.", sub: "Match Whites" },
    { id: 904, name: "Matrix Slim Fit Trousers", brand: "Gray-Nicolls", price: 29.99, rating: 4, badge: null, desc: "Modern slim-fit white trousers.", sub: "Match Whites" },
    { id: 905, name: "GTS Training T-Shirt", brand: "Gray-Nicolls", price: 29.99, rating: 4, badge: "NEW", desc: "Moisture-wicking training tee.", sub: "Training Wear" },
    { id: 906, name: "GTS Polo Shirt", brand: "Gray-Nicolls", price: 34.99, rating: 4, badge: null, desc: "Smart cricket polo for on and off field.", sub: "Training Wear" },
    { id: 907, name: "Pro Performance Sweater", brand: "Gray-Nicolls", price: 44.99, rating: 4, badge: null, desc: "Classic V-neck cricket sweater.", sub: "Training Wear" },
    { id: 908, name: "Storm Jacket", brand: "Gray-Nicolls", price: 49.99, rating: 4, badge: null, desc: "Waterproof cricket jacket.", sub: "Training Wear" },
    { id: 909, name: "SS Match Whites Full Set", brand: "SS", price: 59.99, rating: 4, badge: null, desc: "Shirt and trousers set.", sub: "Match Whites" },
    { id: 910, name: "SS Training Polo", brand: "SS", price: 24.99, rating: 4, badge: null, desc: "Breathable training polo.", sub: "Training Wear" },
    { id: 911, name: "Classic Cap", brand: "Gray-Nicolls", price: 14.99, rating: 4, badge: null, desc: "Traditional cricket cap.", sub: "Caps & Hats" },
    { id: 912, name: "Floppy Sun Hat", brand: "Gray-Nicolls", price: 19.99, rating: 4, badge: null, desc: "Wide-brim sun protection.", sub: "Caps & Hats" },
    { id: 913, name: "SS Cricket Cap", brand: "SS", price: 12.99, rating: 4, badge: null, desc: "Classic cricket cap.", sub: "Caps & Hats" },
  ]},
  accessories: { title: "Accessories", subcategories: ["All Accessories", "Grips", "Bat Care", "Sundries", "Gift Cards"], items: [
    { id: 1001, name: "TRACTION Pro Grip", brand: "Gray-Nicolls", price: 7.99, rating: 4, badge: null, desc: "High-performance bat grip.", sub: "Grips" },
    { id: 1002, name: "Chevron Grip", brand: "Gray-Nicolls", price: 5.99, rating: 4, badge: null, desc: "Classic chevron pattern grip.", sub: "Grips" },
    { id: 1003, name: "Deluxe Wood Mallet", brand: "Gray-Nicolls", price: 14.99, rating: 4, badge: null, desc: "Premium bat knocking-in mallet.", sub: "Bat Care" },
    { id: 1004, name: "Bat Repair Kit", brand: "Gray-Nicolls", price: 12.99, rating: 4, badge: null, desc: "Includes toe guard, glue, and tape.", sub: "Bat Care" },
    { id: 1005, name: "Anti-Scuff Sheet", brand: "Gray-Nicolls", price: 4.99, rating: 4, badge: null, desc: "Protective face sheet.", sub: "Bat Care" },
    { id: 1006, name: "Bat Wax/Oil", brand: "Gray-Nicolls", price: 6.99, rating: 4, badge: null, desc: "Raw linseed oil for bat care.", sub: "Bat Care" },
    { id: 1007, name: "Rubber Cricket Spikes (20 pack)", brand: "Gray-Nicolls", price: 8.99, rating: 4, badge: null, desc: "Replacement rubber spikes.", sub: "Sundries" },
    { id: 1008, name: "SS Bat Grip (3 pack)", brand: "SS", price: 9.99, rating: 4, badge: null, desc: "Premium bat grips.", sub: "Grips" },
    { id: 1009, name: "SS Face Tape", brand: "SS", price: 4.99, rating: 4, badge: null, desc: "Fibre face protection tape.", sub: "Bat Care" },
    { id: 1010, name: "SS Cricket Socks (3 pack)", brand: "SS", price: 14.99, rating: 4, badge: null, desc: "Performance cricket socks.", sub: "Sundries" },
    { id: 1011, name: "RNR Cricket Gift Card $25", brand: "RNR", price: 25.00, rating: 5, badge: null, desc: "KYD $25 Gift Card.", sub: "Gift Cards" },
    { id: 1012, name: "RNR Cricket Gift Card $50", brand: "RNR", price: 50.00, rating: 5, badge: null, desc: "KYD $50 Gift Card.", sub: "Gift Cards" },
    { id: 1013, name: "RNR Cricket Gift Card $100", brand: "RNR", price: 100.00, rating: 5, badge: null, desc: "KYD $100 Gift Card.", sub: "Gift Cards" },
  ]},
};

const CATEGORIES = Object.keys(PRODUCTS);

const Stars = ({ rating }) => (
  <div style={{ display: "flex", gap: 1 }}>
    {[1,2,3,4,5].map(i => (
      <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill={i <= rating ? B.gold : "#DDD"} stroke="none">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ))}
  </div>
);

const Badge = ({ text }) => {
  if (!text) return null;
  const c = { PRO: B.red, NEW: "#22C55E", PREMIUM: B.gold, "WOMEN'S": "#A855F7", JUNIOR: "#3B82F6", STARTER: B.silver };
  return <span style={{ background: c[text] || B.red, color: "#fff", fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", padding: "3px 8px", borderRadius: 3, textTransform: "uppercase", fontFamily: "'Outfit',sans-serif" }}>{text}</span>;
};

const ProductCard = ({ item, onAdd }) => {
  const [h, setH] = useState(false);
  const IconFn = catIcons.bats;
  return (
    <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{
      background: h ? `${B.red}04` : B.white, border: `1px solid ${h ? B.red + "33" : "#E5E7EB"}`,
      borderRadius: 8, overflow: "hidden", transition: "all 0.3s ease",
      transform: h ? "translateY(-4px)" : "none",
      boxShadow: h ? "0 12px 40px rgba(10,22,40,0.12)" : "0 1px 3px rgba(0,0,0,0.05)",
      display: "flex", flexDirection: "column",
    }}>
      <div style={{ height: 190, background: `linear-gradient(135deg, ${B.navy}06 0%, ${B.navy}12 100%)`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", borderBottom: "1px solid #f0f0f0" }}>
        <div style={{ opacity: 0.12 }}>{Icons.bat(64, B.navy)}</div>
        {item.badge && <div style={{ position: "absolute", top: 12, left: 12 }}><Badge text={item.badge}/></div>}
        <div style={{ position: "absolute", top: 12, right: 12, fontSize: 9, color: B.silver, fontFamily: "'Outfit',sans-serif", fontWeight: 600, letterSpacing: "0.05em", background: "rgba(255,255,255,0.9)", padding: "3px 8px", borderRadius: 3 }}>{item.brand}</div>
      </div>
      <div style={{ padding: "16px 16px 20px", flex: 1, display: "flex", flexDirection: "column" }}>
        <Stars rating={item.rating}/>
        <h4 style={{ fontFamily: "'Outfit',sans-serif", fontSize: 14, fontWeight: 600, color: B.navy, margin: "8px 0 4px", lineHeight: 1.3 }}>{item.name}</h4>
        <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: 12, color: B.silver, lineHeight: 1.4, flex: 1, margin: "0 0 12px" }}>{item.desc}</p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 22, color: B.red, letterSpacing: "0.02em" }}>KYD ${item.price.toFixed(2)}</div>
          <button onClick={() => onAdd(item)} style={{ background: B.navy, color: B.white, border: "none", padding: "8px 16px", borderRadius: 4, fontFamily: "'Outfit',sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: "0.05em", cursor: "pointer", transition: "background 0.2s" }}
            onMouseEnter={e => e.target.style.background = B.red} onMouseLeave={e => e.target.style.background = B.navy}>ADD TO CART</button>
        </div>
      </div>
    </div>
  );
};

export default function RNRCricket() {
  const [page, setPage] = useState("home");
  const [activeCat, setActiveCat] = useState("bats");
  const [activeSub, setActiveSub] = useState("All Bats");
  const [cart, setCart] = useState([]);
  const [showCartToast, setShowCartToast] = useState(false);
  const [searchQ, setSearchQ] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [heroReady, setHeroReady] = useState(false);

  useEffect(() => { setTimeout(() => setHeroReady(true), 100); }, []);

  const addToCart = (item) => {
    setCart(p => { const ex = p.find(c => c.id === item.id); return ex ? p.map(c => c.id === item.id ? {...c, qty: c.qty+1} : c) : [...p, {...item, qty: 1}]; });
    setShowCartToast(true); setTimeout(() => setShowCartToast(false), 2000);
  };
  const rmCart = (id) => setCart(p => p.filter(c => c.id !== id));
  const updQty = (id, d) => setCart(p => p.map(c => c.id === id ? {...c, qty: Math.max(1, c.qty+d)} : c));
  const cartTotal = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const cartCount = cart.reduce((s, c) => s + c.qty, 0);

  const curProds = PRODUCTS[activeCat];
  const filtered = curProds?.items.filter(i => {
    const ms = activeSub.startsWith("All") || i.sub === activeSub;
    const mq = !searchQ || i.name.toLowerCase().includes(searchQ.toLowerCase()) || i.brand.toLowerCase().includes(searchQ.toLowerCase());
    return ms && mq;
  }) || [];

  const allProds = Object.values(PRODUCTS).flatMap(c => c.items);
  const searchRes = searchQ ? allProds.filter(i => i.name.toLowerCase().includes(searchQ.toLowerCase()) || i.brand.toLowerCase().includes(searchQ.toLowerCase()) || i.desc.toLowerCase().includes(searchQ.toLowerCase())) : [];

  const navItems = [{ key: "home", label: "Home" }, { key: "shop", label: "Shop" }, { key: "about", label: "About" }, { key: "contact", label: "Contact" }];
  const catNavItems = CATEGORIES.map(k => ({ key: k, label: PRODUCTS[k].title }));

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Outfit:wght@300;400;500;600;700;800&display=swap');
    *{margin:0;padding:0;box-sizing:border-box;}
    ::-webkit-scrollbar{width:6px}::-webkit-scrollbar-track{background:${B.deepNavy}}::-webkit-scrollbar-thumb{background:${B.red}44;border-radius:3px}::-webkit-scrollbar-thumb:hover{background:${B.red}}
    @keyframes fadeUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
    @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}
    @keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
    .shop-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:20px}
    @media(max-width:768px){.shop-grid{grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px}.sidebar-desktop{display:none!important}}
    @media(max-width:640px){.hero-logo-full{transform:scale(0.65)}.nav-links-desktop{display:none!important}}
  `;

  const goShop = (cat) => { setPage("shop"); setActiveCat(cat || "bats"); setActiveSub(PRODUCTS[cat || "bats"].subcategories[0]); setSearchQ(""); };

  return (
    <div style={{ fontFamily: "'Outfit',sans-serif", background: B.lightGray, minHeight: "100vh" }}>
      <style>{css}</style>

      {/* ═══ NAV ═══ */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, background: `${B.deepNavy}f0`, backdropFilter: "blur(20px)", borderBottom: `1px solid ${B.red}22` }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div onClick={() => { setPage("home"); setSearchQ(""); }} style={{ cursor: "pointer" }}><LogoNav height={36}/></div>
          <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
            <div className="nav-links-desktop" style={{ display: "flex", gap: 24 }}>
              {navItems.map(n => (
                <button key={n.key} onClick={() => { setPage(n.key); setSearchQ(""); if (n.key === "shop") goShop(); }}
                  style={{ background: "none", border: "none", fontFamily: "'Outfit',sans-serif", fontSize: 13, fontWeight: page === n.key ? 600 : 400, color: page === n.key ? B.red : B.silver, cursor: "pointer", letterSpacing: "0.05em", textTransform: "uppercase", transition: "color 0.2s", position: "relative", padding: "4px 0" }}
                  onMouseEnter={e => { if (page !== n.key) e.target.style.color = B.white; }} onMouseLeave={e => { if (page !== n.key) e.target.style.color = B.silver; }}>
                  {n.label}
                  {page === n.key && <div style={{ position: "absolute", bottom: -2, left: 0, right: 0, height: 2, background: B.red, borderRadius: 1 }}/>}
                </button>
              ))}
            </div>
            <div style={{ position: "relative" }}>
              <button onClick={() => setShowSearch(!showSearch)} style={{ background: "none", border: "none", color: B.silver, cursor: "pointer", padding: 4, display: "flex" }}>{Icons.search(20, B.silver)}</button>
              {showSearch && (
                <div style={{ position: "absolute", top: "100%", right: 0, marginTop: 8, background: B.white, borderRadius: 8, boxShadow: "0 20px 60px rgba(0,0,0,0.3)", padding: 16, width: 320, zIndex: 1001 }}>
                  <input autoFocus placeholder="Search products..." value={searchQ} onChange={e => setSearchQ(e.target.value)}
                    style={{ width: "100%", padding: "10px 14px", border: "1px solid #ddd", borderRadius: 6, fontFamily: "'Outfit',sans-serif", fontSize: 14, outline: "none" }}
                    onKeyDown={e => { if (e.key === "Enter" && searchQ) { setPage("shop"); setShowSearch(false); } }}/>
                  {searchQ && searchRes.length > 0 && (
                    <div style={{ marginTop: 8, maxHeight: 240, overflowY: "auto" }}>
                      {searchRes.slice(0, 8).map(i => (
                        <div key={i.id} onClick={() => { setPage("shop"); setShowSearch(false); }} style={{ padding: "8px 10px", borderBottom: "1px solid #f0f0f0", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <div><div style={{ fontSize: 13, fontWeight: 500, color: B.navy }}>{i.name}</div><div style={{ fontSize: 11, color: B.silver }}>{i.brand}</div></div>
                          <div style={{ fontFamily: "'Bebas Neue',sans-serif", color: B.red, fontSize: 16 }}>${i.price.toFixed(2)}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
            <button onClick={() => setPage("cart")} style={{ background: "none", border: "none", color: B.silver, cursor: "pointer", position: "relative", padding: 4, display: "flex" }}>
              {Icons.cart(20, B.silver)}
              {cartCount > 0 && <span style={{ position: "absolute", top: -4, right: -8, background: B.red, color: B.white, fontSize: 10, fontWeight: 700, width: 18, height: 18, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>{cartCount}</span>}
            </button>
          </div>
        </div>
        {showCartToast && <div style={{ position: "fixed", top: 72, right: 24, background: B.navy, color: B.white, padding: "12px 20px", borderRadius: 8, fontFamily: "'Outfit',sans-serif", fontSize: 13, fontWeight: 500, boxShadow: "0 10px 40px rgba(0,0,0,0.4)", border: `1px solid ${B.red}44`, animation: "fadeUp 0.3s ease", zIndex: 1002, display: "flex", alignItems: "center", gap: 8 }}>{Icons.check(14, "#22C55E")} Item added to cart</div>}
      </nav>

      {/* ═══ HOME ═══ */}
      {page === "home" && <div>
        <section style={{ minHeight: "100vh", background: B.deepNavy, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", paddingTop: 64 }}>
          {/* Base gradient */}
          <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 140% 90% at 50% 30%, #12233d 0%, ${B.deepNavy} 70%)` }}/>
          {/* Large cricket ball seam curves */}
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.06 }} viewBox="0 0 1200 800" preserveAspectRatio="none">
            <path d="M-100,400 Q300,100 600,400 Q900,700 1300,400" fill="none" stroke={B.red} strokeWidth="3"/>
            <path d="M-100,400 Q300,700 600,400 Q900,100 1300,400" fill="none" stroke={B.red} strokeWidth="3"/>
            <line x1="240" y1="200" x2="260" y2="180" stroke={B.red} strokeWidth="1.5"/>
            <line x1="280" y1="220" x2="300" y2="200" stroke={B.red} strokeWidth="1.5"/>
            <line x1="320" y1="250" x2="340" y2="230" stroke={B.red} strokeWidth="1.5"/>
            <line x1="360" y1="285" x2="380" y2="265" stroke={B.red} strokeWidth="1.5"/>
            <line x1="400" y1="320" x2="420" y2="300" stroke={B.red} strokeWidth="1.5"/>
            <line x1="800" y1="480" x2="820" y2="500" stroke={B.red} strokeWidth="1.5"/>
            <line x1="840" y1="510" x2="860" y2="530" stroke={B.red} strokeWidth="1.5"/>
            <line x1="880" y1="540" x2="900" y2="560" stroke={B.red} strokeWidth="1.5"/>
            <line x1="920" y1="570" x2="940" y2="590" stroke={B.red} strokeWidth="1.5"/>
          </svg>
          {/* Red glow spots */}
          <div style={{ position: "absolute", top: "15%", left: "10%", width: 400, height: 400, borderRadius: "50%", background: `radial-gradient(circle, ${B.red}0c 0%, transparent 65%)` }}/>
          <div style={{ position: "absolute", bottom: "10%", right: "5%", width: 500, height: 500, borderRadius: "50%", background: `radial-gradient(circle, ${B.red}08 0%, transparent 65%)` }}/>
          {/* Gold accent lines */}
          <div style={{ position: "absolute", top: "30%", left: 0, width: "35%", height: 1, background: `linear-gradient(to right, transparent, ${B.gold}30, transparent)` }}/>
          <div style={{ position: "absolute", bottom: "30%", right: 0, width: "35%", height: 1, background: `linear-gradient(to left, transparent, ${B.gold}30, transparent)` }}/>
          {/* Subtle grid pattern */}
          <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${B.silver}05 1px, transparent 1px), linear-gradient(90deg, ${B.silver}05 1px, transparent 1px)`, backgroundSize: "60px 60px" }}/>
          {/* Hero content */}
          <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "2rem", maxWidth: 800, opacity: heroReady ? 1 : 0, transform: heroReady ? "translateY(0)" : "translateY(40px)", transition: "all 1s cubic-bezier(0.16,1,0.3,1)" }}>
            <div className="hero-logo-full" style={{ marginBottom: 24 }}><LogoFull height={110}/></div>
            <div style={{ marginTop: 8, marginBottom: 32 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 20 }}>
                <div style={{ width: 60, height: 1, background: `linear-gradient(to right, transparent, ${B.gold})` }}/>
                <span style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 600, fontSize: "clamp(0.85rem,2vw,1.15rem)", color: `${B.silver}cc`, letterSpacing: "0.2em", textTransform: "uppercase" }}>Take Your Game to the Next Level</span>
                <div style={{ width: 60, height: 1, background: `linear-gradient(to left, transparent, ${B.gold})` }}/>
              </div>
            </div>
            <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: "clamp(0.9rem,1.5vw,1.05rem)", color: `${B.silver}88`, maxWidth: 500, margin: "0 auto 40px", lineHeight: 1.7, fontWeight: 300 }}>
              Official stockists of Gray-Nicolls & SS TON.<br/>Premium cricket equipment delivered across the Cayman Islands.
            </p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <button onClick={() => goShop("bats")} style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 600, fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", background: B.red, color: B.white, border: "none", padding: "14px 40px", borderRadius: 4, cursor: "pointer", transition: "all 0.3s" }}
                onMouseEnter={e => { e.target.style.background = B.redDark; e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = `0 8px 24px ${B.red}40`; }} onMouseLeave={e => { e.target.style.background = B.red; e.target.style.transform = "none"; e.target.style.boxShadow = "none"; }}>Shop Now</button>
              <button onClick={() => setPage("about")} style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 600, fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", background: "transparent", color: B.white, border: `1px solid ${B.silver}44`, padding: "14px 40px", borderRadius: 4, cursor: "pointer", transition: "all 0.3s" }}
                onMouseEnter={e => { e.target.style.borderColor = B.red; e.target.style.color = B.red; }} onMouseLeave={e => { e.target.style.borderColor = `${B.silver}44`; e.target.style.color = B.white; }}>About Us</button>
            </div>
          </div>
          <div style={{ position: "absolute", bottom: 32, display: "flex", flexDirection: "column", alignItems: "center", gap: 8, opacity: 0.4, animation: "pulse 2s ease-in-out infinite" }}>
            <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: 10, letterSpacing: "0.3em", color: B.silver, textTransform: "uppercase" }}>Scroll</span>
            <div style={{ width: 1, height: 30, background: `linear-gradient(to bottom,${B.silver},transparent)` }}/>
          </div>
        </section>

        {/* Marquee */}
        <div style={{ background: B.red, padding: "12px 0", overflow: "hidden", whiteSpace: "nowrap" }}>
          <div style={{ display: "inline-block", animation: "marquee 25s linear infinite" }}>
            {Array(6).fill("").map((_, i) => <span key={i} style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 16, color: B.white, letterSpacing: "0.1em", marginRight: 60 }}>
              {"\u25C6"} GRAY-NICOLLS &nbsp; {"\u25C6"} SS TON &nbsp; {"\u25C6"} FREE SHIPPING OVER $150 KYD &nbsp; {"\u25C6"} CAYMAN'S PREMIER CRICKET STORE &nbsp; {"\u25C6"} NEW 2026 RANGE IN STOCK &nbsp;
            </span>)}
          </div>
        </div>

        {/* Categories */}
        <section style={{ maxWidth: 1400, margin: "0 auto", padding: "80px 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 600, fontSize: 11, letterSpacing: "0.3em", color: B.red, textTransform: "uppercase" }}>Shop By Category</span>
            <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(2.5rem,5vw,4rem)", color: B.navy, letterSpacing: "0.03em", marginTop: 8 }}>Everything You Need</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 16 }}>
            {catNavItems.map(cat => (
              <button key={cat.key} onClick={() => goShop(cat.key)} style={{ background: B.white, border: "1px solid #E5E7EB", borderRadius: 8, padding: "28px 20px", cursor: "pointer", textAlign: "center", transition: "all 0.3s", position: "relative", overflow: "hidden" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 12px 40px ${B.red}15`; e.currentTarget.style.borderColor = `${B.red}44`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "#E5E7EB"; }}>
                <div style={{ marginBottom: 12, display: "flex", justifyContent: "center" }}>{(catIcons[cat.key] || Icons.bat)(36, B.navy)}</div>
                <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 13, fontWeight: 600, color: B.navy, textTransform: "uppercase", letterSpacing: "0.05em" }}>{cat.label}</div>
                <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 11, color: B.silver, marginTop: 4 }}>{PRODUCTS[cat.key].items.length} Products</div>
              </button>
            ))}
          </div>
        </section>

        {/* Featured */}
        <section style={{ background: B.white, padding: "80px 24px" }}>
          <div style={{ maxWidth: 1400, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <span style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 600, fontSize: 11, letterSpacing: "0.3em", color: B.red, textTransform: "uppercase" }}>New Arrivals</span>
              <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(2.5rem,5vw,4rem)", color: B.navy, letterSpacing: "0.03em", marginTop: 8 }}>2026 Pro Range</h2>
            </div>
            <div className="shop-grid">
              {PRODUCTS.bats.items.filter(i => i.badge === "PRO" || i.badge === "NEW" || i.badge === "PREMIUM").slice(0, 4).map(i => <ProductCard key={i.id} item={i} onAdd={addToCart}/>)}
            </div>
            <div style={{ textAlign: "center", marginTop: 40 }}>
              <button onClick={() => goShop("bats")} style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 600, fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", background: B.navy, color: B.white, border: "none", padding: "14px 40px", borderRadius: 4, cursor: "pointer", transition: "all 0.3s" }}
                onMouseEnter={e => e.target.style.background = B.red} onMouseLeave={e => e.target.style.background = B.navy}>View All Cricket Bats</button>
            </div>
          </div>
        </section>

        {/* Brands */}
        <section style={{ background: B.navy, padding: "60px 24px", textAlign: "center" }}>
          <span style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 300, fontSize: 12, letterSpacing: "0.3em", color: B.silver, textTransform: "uppercase" }}>Official Stockists</span>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 60, marginTop: 24, flexWrap: "wrap", opacity: 0.6 }}>
            <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 32, color: B.white, letterSpacing: "0.05em" }}>GRAY-NICOLLS</span>
            <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 32, color: B.white, letterSpacing: "0.05em" }}>SS TON</span>
          </div>
        </section>

        {/* Why RNR */}
        <section style={{ maxWidth: 1400, margin: "0 auto", padding: "80px 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(2.5rem,5vw,4rem)", color: B.navy }}>Why RNR Cricket?</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 24 }}>
            {[
              { icon: () => Icons.island(40, B.red), title: "Caribbean's Finest", text: "The Cayman Islands' premier cricket equipment supplier. We know island cricket." },
              { icon: () => Icons.plane(40, B.red), title: "Island-Wide Delivery", text: "Free delivery across Grand Cayman on orders over KYD $150. Same-week delivery." },
              { icon: () => Icons.bat(40, B.red), title: "Pro Equipment", text: "Official stockists of Gray-Nicolls and SS TON. The same gear used by internationals." },
              { icon: () => Icons.chat(40, B.red), title: "Expert Advice", text: "Our team plays the game. Get genuine advice on the right kit for your level." },
            ].map((item, i) => (
              <div key={i} style={{ background: B.white, padding: 32, borderRadius: 8, border: "1px solid #E5E7EB", textAlign: "center" }}>
                <div style={{ marginBottom: 16, display: "flex", justifyContent: "center" }}>{item.icon()}</div>
                <h3 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 22, color: B.navy, letterSpacing: "0.04em", marginBottom: 8 }}>{item.title}</h3>
                <p style={{ fontSize: 14, color: B.silver, lineHeight: 1.6 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </section>
      </div>}

      {/* ═══ SHOP ═══ */}
      {page === "shop" && <div style={{ paddingTop: 64 }}>
        <div style={{ background: `linear-gradient(135deg,${B.deepNavy} 0%,${B.navy} 100%)`, padding: "40px 24px 0" }}>
          <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", gap: 8, overflowX: "auto", paddingBottom: 0, WebkitOverflowScrolling: "touch" }}>
            {catNavItems.map(cat => (
              <button key={cat.key} onClick={() => { setActiveCat(cat.key); setActiveSub(PRODUCTS[cat.key].subcategories[0]); setSearchQ(""); }}
                style={{ background: activeCat === cat.key ? B.red : "transparent", border: `1px solid ${activeCat === cat.key ? B.red : B.silver + "33"}`, color: activeCat === cat.key ? B.white : B.silver, fontFamily: "'Outfit',sans-serif", fontSize: 12, fontWeight: 600, padding: "10px 18px", borderRadius: "6px 6px 0 0", cursor: "pointer", whiteSpace: "nowrap", transition: "all 0.2s", letterSpacing: "0.03em", display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ display: "flex" }}>{(catIcons[cat.key] || Icons.bat)(14, activeCat === cat.key ? B.white : B.silver)}</span> {cat.label}
              </button>
            ))}
          </div>
        </div>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: 24 }}>
          <div style={{ display: "flex", gap: 32, alignItems: "flex-start" }}>
            <div className="sidebar-desktop" style={{ width: 220, flexShrink: 0, position: "sticky", top: 88 }}>
              <h3 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 28, color: B.navy, marginBottom: 4, letterSpacing: "0.03em" }}>{curProds.title}</h3>
              <p style={{ fontSize: 12, color: B.silver, marginBottom: 20 }}>{filtered.length} products</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {curProds.subcategories.map(sub => (
                  <button key={sub} onClick={() => setActiveSub(sub)} style={{ background: activeSub === sub ? `${B.red}10` : "transparent", border: "none", textAlign: "left", padding: "8px 12px", borderRadius: 4, fontFamily: "'Outfit',sans-serif", fontSize: 13, fontWeight: activeSub === sub ? 600 : 400, color: activeSub === sub ? B.red : B.navy, cursor: "pointer", transition: "all 0.2s", borderLeft: activeSub === sub ? `3px solid ${B.red}` : "3px solid transparent" }}>{sub}</button>
                ))}
              </div>
              <div style={{ marginTop: 24, background: `${B.navy}08`, borderRadius: 8, padding: 16 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: B.navy, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>All Prices in KYD</div>
                <div style={{ fontSize: 12, color: B.silver, lineHeight: 1.5 }}>Cayman Islands Dollar. Free delivery on orders over KYD $150.</div>
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ marginBottom: 20 }}>
                <input placeholder={`Search ${curProds.title.toLowerCase()}...`} value={searchQ} onChange={e => setSearchQ(e.target.value)}
                  style={{ width: "100%", maxWidth: 400, padding: "10px 16px", border: "1px solid #E5E7EB", borderRadius: 6, fontFamily: "'Outfit',sans-serif", fontSize: 13, outline: "none", transition: "border-color 0.2s" }}
                  onFocus={e => e.target.style.borderColor = B.red} onBlur={e => e.target.style.borderColor = "#E5E7EB"}/>
              </div>
              {filtered.length > 0 ? <div className="shop-grid">{filtered.map(i => <ProductCard key={i.id} item={i} onAdd={addToCart}/>)}</div>
                : <div style={{ textAlign: "center", padding: 80, color: B.silver }}><div style={{ marginBottom: 16, display: "flex", justifyContent: "center" }}>{Icons.bat(48, B.silver)}</div><p>No products found. Try a different search or category.</p></div>}
            </div>
          </div>
        </div>
      </div>}

      {/* ═══ CART ═══ */}
      {page === "cart" && <div style={{ paddingTop: 88, maxWidth: 900, margin: "0 auto", padding: "88px 24px 40px" }}>
        <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 42, color: B.navy, marginBottom: 4 }}>Your Cart</h2>
        <p style={{ color: B.silver, fontSize: 14, marginBottom: 32 }}>{cartCount} {cartCount === 1 ? "item" : "items"} in your cart</p>
        {cart.length === 0 ? <div style={{ textAlign: "center", padding: 80 }}>
          <div style={{ marginBottom: 16, display: "flex", justifyContent: "center" }}>{Icons.cartEmpty(64, B.silver)}</div>
          <p style={{ color: B.silver, fontSize: 16, marginBottom: 24 }}>Your cart is empty</p>
          <button onClick={() => goShop()} style={{ background: B.red, color: B.white, border: "none", padding: "12px 32px", borderRadius: 4, fontFamily: "'Outfit',sans-serif", fontWeight: 600, cursor: "pointer", letterSpacing: "0.05em" }}>BROWSE SHOP</button>
        </div> : <>
          {cart.map(item => (
            <div key={item.id} style={{ display: "flex", alignItems: "center", gap: 20, padding: "20px 0", borderBottom: "1px solid #E5E7EB" }}>
              <div style={{ width: 70, height: 70, background: `${B.navy}10`, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{Icons.bat(28, B.navy)}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 14, color: B.navy }}>{item.name}</div>
                <div style={{ fontSize: 12, color: B.silver }}>{item.brand}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <button onClick={() => updQty(item.id, -1)} style={{ width: 28, height: 28, border: "1px solid #ddd", borderRadius: 4, background: B.white, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>{Icons.minus(14, B.navy)}</button>
                <span style={{ width: 28, textAlign: "center", fontWeight: 600, fontSize: 14 }}>{item.qty}</span>
                <button onClick={() => updQty(item.id, 1)} style={{ width: 28, height: 28, border: "1px solid #ddd", borderRadius: 4, background: B.white, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>{Icons.plus(14, B.navy)}</button>
              </div>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 20, color: B.red, width: 100, textAlign: "right" }}>${(item.price * item.qty).toFixed(2)}</div>
              <button onClick={() => rmCart(item.id)} style={{ background: "none", border: "none", color: B.silver, cursor: "pointer", padding: 4, display: "flex" }}>{Icons.close(18, B.silver)}</button>
            </div>
          ))}
          <div style={{ marginTop: 32, padding: 28, background: B.white, borderRadius: 8, border: "1px solid #E5E7EB" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}><span style={{ color: B.silver }}>Subtotal</span><span style={{ fontWeight: 600 }}>KYD ${cartTotal.toFixed(2)}</span></div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}><span style={{ color: B.silver }}>Delivery</span><span style={{ fontWeight: 600, color: cartTotal >= 150 ? "#22C55E" : B.navy }}>{cartTotal >= 150 ? "FREE" : "KYD $15.00"}</span></div>
            <div style={{ height: 1, background: "#E5E7EB", margin: "16px 0" }}/>
            <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 24, color: B.navy }}>Total</span><span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 24, color: B.red }}>KYD ${(cartTotal + (cartTotal >= 150 ? 0 : 15)).toFixed(2)}</span></div>
            <button style={{ width: "100%", marginTop: 24, background: B.red, color: B.white, border: "none", padding: "14px 0", borderRadius: 4, fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: 14, letterSpacing: "0.1em", cursor: "pointer", textTransform: "uppercase", transition: "background 0.2s" }}
              onMouseEnter={e => e.target.style.background = B.redDark} onMouseLeave={e => e.target.style.background = B.red}>Proceed to Checkout</button>
            <p style={{ textAlign: "center", fontSize: 11, color: B.silver, marginTop: 12 }}>All prices in KYD (Cayman Islands Dollar)</p>
          </div>
        </>}
      </div>}

      {/* ═══ ABOUT ═══ */}
      {page === "about" && <div style={{ paddingTop: 64 }}>
        <section style={{ background: `linear-gradient(135deg,${B.deepNavy} 0%,${B.navy} 100%)`, padding: "80px 24px", textAlign: "center" }}>
          <h1 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(3rem,6vw,5rem)", color: B.white }}>About <span style={{ color: B.red }}>RNR Cricket</span></h1>
          <p style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 600, color: B.silver, fontSize: 16, letterSpacing: "0.15em", textTransform: "uppercase", marginTop: 8 }}>Cayman Islands' Premier Cricket Store</p>
        </section>
        <section style={{ maxWidth: 800, margin: "0 auto", padding: "60px 24px" }}>
          <p style={{ fontSize: 16, color: B.navy, lineHeight: 1.8, marginBottom: 24 }}>RNR Cricket is the Cayman Islands' dedicated cricket equipment specialist. Based in Grand Cayman, we serve cricketers across the Caribbean with the finest equipment from the world's leading brands including Gray-Nicolls and SS TON.</p>
          <p style={{ fontSize: 16, color: B.navy, lineHeight: 1.8, marginBottom: 24 }}>Whether you're a seasoned professional competing at the international level, a passionate club player, or a junior just picking up the bat for the first time, we stock the complete range of cricket equipment to suit every level and budget.</p>
          <p style={{ fontSize: 16, color: B.navy, lineHeight: 1.8, marginBottom: 24 }}>Our team are cricketers ourselves — we understand the game and can provide genuine, expert advice on selecting the right kit. From choosing between an English and Kashmir Willow bat to finding the perfect pair of batting gloves, we're here to help.</p>
          <div style={{ background: B.navy, borderRadius: 12, padding: 40, marginTop: 40, textAlign: "center" }}>
            <h3 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 32, color: B.white, marginBottom: 16 }}>Visit Our Store</h3>
            <p style={{ color: B.silver, lineHeight: 1.8 }}>Grand Cayman, Cayman Islands<br/>Open: Mon–Sat 9AM–6PM<br/>Email: info@rnrcricket.com<br/>Phone: +1 (345) 000-0000</p>
          </div>
        </section>
      </div>}

      {/* ═══ CONTACT ═══ */}
      {page === "contact" && <div style={{ paddingTop: 64 }}>
        <section style={{ background: `linear-gradient(135deg,${B.deepNavy} 0%,${B.navy} 100%)`, padding: "80px 24px", textAlign: "center" }}>
          <h1 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(3rem,6vw,5rem)", color: B.white }}>Get In <span style={{ color: B.red }}>Touch</span></h1>
        </section>
        <section style={{ maxWidth: 700, margin: "0 auto", padding: "60px 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
            <input placeholder="First Name" style={{ padding: "12px 16px", border: "1px solid #ddd", borderRadius: 6, fontFamily: "'Outfit',sans-serif", fontSize: 14, outline: "none" }}/>
            <input placeholder="Last Name" style={{ padding: "12px 16px", border: "1px solid #ddd", borderRadius: 6, fontFamily: "'Outfit',sans-serif", fontSize: 14, outline: "none" }}/>
          </div>
          <input placeholder="Email Address" style={{ width: "100%", padding: "12px 16px", border: "1px solid #ddd", borderRadius: 6, fontFamily: "'Outfit',sans-serif", fontSize: 14, marginBottom: 16, outline: "none" }}/>
          <input placeholder="Phone Number" style={{ width: "100%", padding: "12px 16px", border: "1px solid #ddd", borderRadius: 6, fontFamily: "'Outfit',sans-serif", fontSize: 14, marginBottom: 16, outline: "none" }}/>
          <select style={{ width: "100%", padding: "12px 16px", border: "1px solid #ddd", borderRadius: 6, fontFamily: "'Outfit',sans-serif", fontSize: 14, marginBottom: 16, outline: "none", color: "#999" }}>
            <option>What can we help with?</option><option>Product Enquiry</option><option>Order Status</option><option>Team Kit / Bulk Order</option><option>Sponsorship</option><option>General Question</option>
          </select>
          <textarea placeholder="Your Message" rows={5} style={{ width: "100%", padding: "12px 16px", border: "1px solid #ddd", borderRadius: 6, fontFamily: "'Outfit',sans-serif", fontSize: 14, marginBottom: 16, outline: "none", resize: "vertical" }}/>
          <button style={{ width: "100%", background: B.red, color: B.white, border: "none", padding: "14px 0", borderRadius: 4, fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: 14, letterSpacing: "0.1em", cursor: "pointer", textTransform: "uppercase" }}>Send Message</button>
          <div style={{ marginTop: 40, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24, textAlign: "center" }}>
            {[
              { icon: () => Icons.pin(28, B.red), label: "Visit Us", text: "Grand Cayman, KY" },
              { icon: () => Icons.mail(28, B.red), label: "Email", text: "info@rnrcricket.com" },
              { icon: () => Icons.phone(28, B.red), label: "Call", text: "+1 (345) 000-0000" },
            ].map((item, i) => <div key={i}><div style={{ marginBottom: 8, display: "flex", justifyContent: "center" }}>{item.icon()}</div><div style={{ fontWeight: 600, fontSize: 14, color: B.navy, marginBottom: 4 }}>{item.label}</div><div style={{ fontSize: 13, color: B.silver }}>{item.text}</div></div>)}
          </div>
        </section>
      </div>}

      {/* ═══ FOOTER ═══ */}
      <footer style={{ background: B.deepNavy, borderTop: `1px solid ${B.red}22`, padding: "60px 24px 32px", marginTop: 40 }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 40, marginBottom: 40 }}>
            <div>
              <div style={{ marginBottom: 16 }}><LogoNav height={32}/></div>
              <p style={{ fontSize: 13, color: B.silver, lineHeight: 1.6 }}>Cayman Islands' premier cricket equipment store. Official stockists of Gray-Nicolls and SS TON.</p>
            </div>
            <div>
              <h4 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: "0.15em", color: B.white, textTransform: "uppercase", marginBottom: 16 }}>Shop</h4>
              {["Cricket Bats","Batting Gloves","Batting Pads","Helmets","Shoes","Wicketkeeping","Kit Bags"].map((t,i) => <div key={i} style={{ fontSize: 13, color: B.silver, padding: "4px 0", cursor: "pointer" }}>{t}</div>)}
            </div>
            <div>
              <h4 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: "0.15em", color: B.white, textTransform: "uppercase", marginBottom: 16 }}>Information</h4>
              {["About Us","Contact","Shipping & Delivery","Returns Policy","Size Guides","Bat Care Guide"].map((t,i) => <div key={i} style={{ fontSize: 13, color: B.silver, padding: "4px 0", cursor: "pointer" }}>{t}</div>)}
            </div>
            <div>
              <h4 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: "0.15em", color: B.white, textTransform: "uppercase", marginBottom: 16 }}>Contact</h4>
              <div style={{ fontSize: 13, color: B.silver, lineHeight: 1.8 }}>Grand Cayman<br/>Cayman Islands<br/>info@rnrcricket.com<br/>+1 (345) 000-0000</div>
            </div>
          </div>
          <div style={{ borderTop: `1px solid ${B.silver}15`, paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <p style={{ fontSize: 12, color: B.silver, opacity: 0.5 }}>&copy; 2026 RNR Cricket. All rights reserved. All prices in KYD (Cayman Islands Dollar).</p>
            <p style={{ fontSize: 12, color: B.silver, opacity: 0.5 }}>@rnrcricket_ky</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
