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
  <img src={LOGO_SRC} alt="RNR Cricket - Cayman Islands" style={{ height, width: "auto", objectFit: "contain", filter: "drop-shadow(0 2px 12px rgba(255,255,255,0.15)) drop-shadow(0 0 30px rgba(255,255,255,0.08))" }} />
);

const LogoNav = ({ height = 40 }) => (
  <img src={LOGO_SRC} alt="RNR Cricket" style={{ height, width: "auto", objectFit: "contain", filter: "drop-shadow(0 1px 4px rgba(0,0,0,0.3))" }} />
);

const LogoNavColor = ({ height = 40 }) => (
  <img src={LOGO_SRC} alt="RNR Cricket" style={{ height, width: "auto", objectFit: "contain" }} />
);

// Category icon mapping
const catEmojis = {
  bats: "🏏", gloves: "🧤", pads: "🦵", helmets: "⛑️",
  keeping: "🥅", shoes: "👟", protection: "🛡️",
  bags: "🎒", balls: "🔴", clothing: "👕", accessories: "🔧",
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
  const IconFn = Icons.bat;
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
            <div className="hero-logo-full" style={{ marginBottom: 28 }}><LogoFull height={130}/></div>
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
                <div style={{ marginBottom: 12, fontSize: 36, lineHeight: 1 }}>{catEmojis[cat.key] || "🏏"}</div>
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
                <span style={{ fontSize: 14 }}>{catEmojis[cat.key] || "🏏"}</span> {cat.label}
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
