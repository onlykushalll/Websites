/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const COMPANY = {
  name: "Dcozi Enterprises",
  tagline: "High-Performance Digital Podium & Industrial Locker Systems",
  gst: "00XXXXX0000X0Z0",
  location: "Industrial Corridor, Tech Zone",
  address: "Facility 4, Sector 12, Enterprise Manufacturing Hub",
  phone: "+1 (555) 019-2834",
  whatsapp: "+1 (555) 019-2834",
  email: "inquiries#dcozi.internal",
  director: "Operations Directorate",
  established: 2021,
  indiamart: "#",
  trustLink: "#",
};

export interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  description: string;
  features: string[];
  specifications?: Record<string, string>;
  image: string;
}

export const PRODUCTS: Product[] = [
  {
    id: "digital-standee",
    name: "Digital Standee",
    category: "Digital Displays",
    price: "₹25,000 – ₹55,000",
    description: "Freestanding vertical interactive kiosk with full HD touchscreen. Ideal for retail, hotels, and corporate lobbies.",
    features: ["Full HD Touchscreen", "Android / Windows OS", "Portrait Orientation", "Remote Content Management"],
    image: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=800&q=80",
  },
  {
    id: "digital-podium",
    name: "Digital Podium",
    category: "Digital Displays",
    price: "₹45,000 – ₹85,000",
    description: "Sleek presentation podium with built-in display, HDMI connectivity, and premium brushed steel chassis.",
    features: ["Built-in HD Display", "HDMI Connectivity", "Brushed Steel Chassis", "Integrated Speaker"],
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80",
  },
  {
    id: "steel-locker",
    name: "Steel Locker (Multi-Door)",
    category: "Lockers",
    price: "₹12,000 – ₹40,000",
    description: "Heavy-gauge MS steel lockers — 6, 9, 12-door variants. Powder-coated finish, slam-lock mechanism, ventilated.",
    features: ["6 / 9 / 12-Door Variants", "Powder-Coated Finish", "Slam-Lock Mechanism", "Ventilated Design"],
    specifications: { Material: "Heavy-gauge MS Steel", Finish: "Powder Coated", Doors: "6, 9, or 12" },
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  },
  {
    id: "digital-mobile-locker",
    name: "Digital Mobile Locker",
    category: "Lockers",
    price: "Price on Request",
    description: "Secure electronic locker with OTP/RFID unlock. Perfect for gyms, coworking spaces, and corporate offices.",
    features: ["OTP / RFID Unlock", "Electronic Locking", "Mild Steel Body", "1-Year Warranty"],
    specifications: { Unlock: "OTP + RFID", Material: "Mild Steel", Alarm: "5-second alert" },
    image: "https://images.unsplash.com/photo-1580983559367-0dc2f8934365?w=800&q=80",
  },
  {
    id: "digital-signage",
    name: "Digital Signage Display",
    category: "Digital Displays",
    price: "₹18,000 – ₹65,000",
    description: "Commercial-grade LED display panels (32\"–86\") for advertising, wayfinding, and digital menus. Brightness: 500–2500 nits.",
    features: ["32\" to 86\" Screen Sizes", "500–2500 Nits Brightness", "Remote Management", "24/7 Commercial Operation"],
    specifications: { Sizes: "32\" – 86\"", Brightness: "500–2500 nits", Usage: "Commercial 24/7" },
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
  },
];
