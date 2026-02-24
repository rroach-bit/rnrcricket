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
const LOGO_SRC = "data:image/png;base64,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";


const LogoFull = ({ height = 80 }) => (
  <img src={LOGO_SRC} alt="RNR Cricket - Cayman Islands" style={{ height, width: "auto", objectFit: "contain", filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.15))" }} />
);

const LogoNav = ({ height = 40 }) => (
  <img src={LOGO_SRC} alt="RNR Cricket" style={{ height, width: "auto", objectFit: "contain", filter: "brightness(0) invert(1) drop-shadow(0 0 1px rgba(255,255,255,0.5))" }} />
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
          {/* Dramatic hero background layers */}
          <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 120% 80% at 50% 40%, ${B.navy} 0%, ${B.deepNavy} 70%)` }}/>
          {/* Cricket pitch lines */}
          <div style={{ position: "absolute", top: "50%", left: "50%", width: 2, height: "100%", background: `${B.silver}08`, transform: "translateX(-50%)" }}/>
          <div style={{ position: "absolute", top: "40%", left: "50%", width: 120, height: 1, background: `${B.silver}10`, transform: "translateX(-50%)" }}/>
          <div style={{ position: "absolute", top: "60%", left: "50%", width: 120, height: 1, background: `${B.silver}10`, transform: "translateX(-50%)" }}/>
          {/* Red accent diagonal stripes */}
          <div style={{ position: "absolute", top: 0, left: "-10%", width: "120%", height: "100%", background: `repeating-linear-gradient(135deg, transparent, transparent 80px, ${B.red}05 80px, ${B.red}05 82px)` }}/>
          {/* Large cricket seam arc */}
          <div style={{ position: "absolute", top: "-20%", right: "-15%", width: 600, height: 600, borderRadius: "50%", border: `2px solid ${B.red}12` }}/>
          <div style={{ position: "absolute", bottom: "-30%", left: "-10%", width: 500, height: 500, borderRadius: "50%", border: `2px solid ${B.red}08` }}/>
          {/* Red glow accent */}
          <div style={{ position: "absolute", top: "30%", left: "15%", width: 300, height: 300, borderRadius: "50%", background: `radial-gradient(circle, ${B.red}0a 0%, transparent 70%)` }}/>
          <div style={{ position: "absolute", bottom: "20%", right: "10%", width: 400, height: 400, borderRadius: "50%", background: `radial-gradient(circle, ${B.red}06 0%, transparent 70%)` }}/>
          {/* Gold accent line */}
          <div style={{ position: "absolute", top: "25%", left: 0, width: "40%", height: 1, background: `linear-gradient(to right, transparent, ${B.gold}20, transparent)` }}/>
          <div style={{ position: "absolute", bottom: "25%", right: 0, width: "40%", height: 1, background: `linear-gradient(to left, transparent, ${B.gold}20, transparent)` }}/>
          {/* Hero content */}
          <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "2rem", opacity: heroReady ? 1 : 0, transform: heroReady ? "translateY(0)" : "translateY(40px)", transition: "all 1s cubic-bezier(0.16,1,0.3,1)" }}>
            <div className="hero-logo-full" style={{ marginBottom: 32 }}><LogoFull height={100}/></div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 16, marginTop: 12 }}>
              <div style={{ width: 50, height: 2, background: `linear-gradient(to right, transparent, ${B.red})` }}/>
              <span style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 600, fontSize: "clamp(1rem,2.5vw,1.5rem)", color: B.white, letterSpacing: "0.15em", textTransform: "uppercase" }}>Take Your Game to the Next Level</span>
              <div style={{ width: 50, height: 2, background: `linear-gradient(to left, transparent, ${B.red})` }}/>
            </div>
            <div style={{ marginTop: 48, display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <button onClick={() => goShop("bats")} style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 600, fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", background: B.red, color: B.white, border: "none", padding: "14px 36px", borderRadius: 4, cursor: "pointer", transition: "all 0.3s" }}
                onMouseEnter={e => { e.target.style.background = B.redDark; e.target.style.transform = "translateY(-2px)"; }} onMouseLeave={e => { e.target.style.background = B.red; e.target.style.transform = "none"; }}>Shop Now</button>
              <button onClick={() => setPage("about")} style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 600, fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", background: "transparent", color: B.white, border: `1px solid ${B.silver}44`, padding: "14px 36px", borderRadius: 4, cursor: "pointer", transition: "all 0.3s" }}
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
