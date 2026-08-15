import { BirthdayData } from '../types';

export type PersonaType = 'siya' | 'maahi' | 'custom';

export function detectPersona(name: string): PersonaType {
  const normalized = name.trim().toLowerCase().replace(/[^a-z]/g, '');
  if (!normalized) return 'custom';
  
  // Matches ONLY exact variations of Siya / Sia
  const siyaAliases = ['siya', 'sia', 'siyu', 'siyaa', 'siyaaa', 'siaa', 'siaaa', 'siyuu', 'siyuuu'];
  if (
    siyaAliases.includes(normalized) ||
    /^s+i+y+a+$/i.test(normalized) ||
    /^s+i+a+$/i.test(normalized) ||
    /^s+i+y+u+$/i.test(normalized)
  ) {
    return 'siya';
  }
  
  // Matches ONLY exact variations of Maahi / Mahi
  const maahiAliases = ['maahi', 'mahi', 'maahii', 'mahie', 'maahie', 'maahiii', 'mahii'];
  if (
    maahiAliases.includes(normalized) ||
    /^m+a+h+i+$/i.test(normalized) ||
    /^m+a+a+h+i+$/i.test(normalized) ||
    /^m+a+h+i+e+$/i.test(normalized)
  ) {
    return 'maahi';
  }
  
  return 'custom';
}

export function generateBirthdayProfile(inputName: string): BirthdayData {
  const trimmed = inputName.trim();
  const persona = trimmed ? detectPersona(trimmed) : 'custom';

  if (persona === 'siya') {
    const cleanName = trimmed ? (trimmed.charAt(0).toUpperCase() + trimmed.slice(1)) : 'Siya';
    return {
      recipientName: cleanName,
      nickname: 'Manchurian',
      senderName: 'ice-cream 🍦',
      relationship: 'Soul Bestie & Manchurian',
      birthdayDate: 'Today & Always ✨',
      wishes: [
        {
          id: 1,
          frontTitle: 'Jaldi lelo koi dekh lega 💐',
          frontSubtitle: `Fresh roses & sunflowers for ${cleanName}! 🌸`,
          frontTag: 'Tap to flip →',
          frontIllustration: 'bouquet',
          backNumber: '01',
          backText: `Dear ${cleanName}, may this year bring you all the warmth, soft giggles, peaceful quiet moments, and endless happiness that your pure soul so deeply deserves.`,
          isFlipped: false,
        },
        {
          id: 2,
          frontTitle: 'Pakdo na! Free hugs 🤗',
          frontSubtitle: 'Unlimited hugs voucher from ice-cream 🍦',
          frontTag: 'Tap to flip →',
          frontIllustration: 'hug',
          backNumber: '02',
          backText: `May your days be stress-free, your confidence unshakable, and your heart overwhelmed with pure happiness and love, ${cleanName}! You will always have the warmest hug whenever you need.`,
          isFlipped: false,
        },
        {
          id: 3,
          frontTitle: 'Trophy for the Best Person 🏆',
          frontSubtitle: `Awarded to: ${cleanName} ✨ (100% Certified Manchurian)`,
          frontTag: 'Tap to flip →',
          frontIllustration: 'trophy',
          backNumber: '03',
          backText: `Thank you for being the most constant, understanding, and irreplaceable person in my life. You make every ordinary day magical just by being your sweet self, ${cleanName}.`,
          isFlipped: false,
        },
        {
          id: 4,
          frontTitle: '365 Days of Chaos & Coffee ☕',
          frontSubtitle: 'Ready for another year with ice-cream?',
          frontTag: 'Tap to flip →',
          frontIllustration: 'coffee',
          backNumber: '04',
          backText: `Here’s to another 365 days of late-night rants, ridiculous inside jokes nobody else understands, endless food dates, and dreaming big together!`,
          isFlipped: false,
        },
        {
          id: 5,
          frontTitle: 'Forever in Your Corner 🌟',
          frontSubtitle: `A promise from ice-cream to ${cleanName}`,
          frontTag: 'Tap to flip →',
          frontIllustration: 'stars',
          backNumber: '05',
          backText: `No matter where life takes us or what storms come, ice-cream will ALWAYS be in your corner cheering the loudest for you. Happy Birthday ${cleanName}! 💖`,
          isFlipped: false,
        },
      ],
      letterTitle: `A Letter for ${cleanName} 💌`,
      letterGreeting: `Dear ${cleanName} (Manchurian) 🌸,`,
      letterBody: `You mean the world to me. ✨

Tere hone se hi meri khushi hai, tu hai toh sab hai, tere bina kya mera...

Happy Birthday to the most special and precious person! May your life always be filled with endless smiles, peace, warmth, and all the love in the universe. 💖`,
      letterSignoff: 'Loads of love,\nice-cream 🍦',
      photos: [
        {
          id: 'p1',
          url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80',
          caption: 'Main character energy ✨',
          rotation: -2,
          date: 'Memory 01'
        },
        {
          id: 'p2',
          url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80',
          caption: 'Prettiest smile in the world 🌸',
          rotation: 1.5,
          date: 'Memory 02'
        },
        {
          id: 'p3',
          url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&auto=format&fit=crop&q=80',
          caption: 'Pure sunshine moments ☀️',
          rotation: -1,
          date: 'Memory 03'
        },
        {
          id: 'p4',
          url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&auto=format&fit=crop&q=80',
          caption: 'Forever partner in crime 💫',
          rotation: 2,
          date: 'Memory 04'
        }
      ],
      musicTrack: 'Acoustic Birthday Melody & Chimes',
    };
  }

  if (persona === 'maahi') {
    const cleanName = trimmed ? (trimmed.charAt(0).toUpperCase() + trimmed.slice(1)) : 'Maahi';
    return {
      recipientName: cleanName,
      nickname: 'Munchkin',
      senderName: 'Kushal 💌',
      relationship: 'Sweetest Bestie & Munchkin',
      birthdayDate: 'Today & Always ✨',
      wishes: [
        {
          id: 1,
          frontTitle: 'Bouquet for Munchkin 💐',
          frontSubtitle: 'Handpicked sunflowers & lilies for Maahi ✨',
          frontTag: 'Tap to flip →',
          frontIllustration: 'bouquet',
          backNumber: '01',
          backText: 'To the sweetest Munchkin in the universe: may this new chapter bring you endless giggles, peace, sunshine, and all your heart’s desires.',
          isFlipped: false,
        },
        {
          id: 2,
          frontTitle: 'Munchkin Hugs Pass 🤗',
          frontSubtitle: 'Unlimited cuddly hugs voucher from Kushal',
          frontTag: 'Tap to flip →',
          frontIllustration: 'hug',
          backNumber: '02',
          backText: 'Whenever life gets overwhelming, remember your munchkin hug pass never expires. Sending you the warmest, tightest birthday hug today, Maahi!',
          isFlipped: false,
        },
        {
          id: 3,
          frontTitle: 'Cutest Soul on Earth Award 🏆',
          frontSubtitle: 'Awarded to: Maahi ✨ (100% Munchkin)',
          frontTag: 'Tap to flip →',
          frontIllustration: 'trophy',
          backNumber: '03',
          backText: 'Thank you for bringing your wholesome energy, bright smile, and gentle kindness into my world. You make everything so much lighter.',
          isFlipped: false,
        },
        {
          id: 4,
          frontTitle: 'Midnight Talks & Sweet Moments 🌙',
          frontSubtitle: 'Ready for another year of memories, Maahi?',
          frontTag: 'Tap to flip →',
          frontIllustration: 'coffee',
          backNumber: '04',
          backText: 'Here’s to another 365 days of unforgettable conversations, hilarious moments, sharing good food, and celebrating every single milestone together!',
          isFlipped: false,
        },
        {
          id: 5,
          frontTitle: 'Kushal’s Forever Promise 🌟',
          frontSubtitle: 'Always in your corner, Munchkin',
          frontTag: 'Tap to flip →',
          frontIllustration: 'stars',
          backNumber: '05',
          backText: 'No matter how busy life gets or where our paths lead, Kushal will always be here to support, listen, and cheer for you. Happy Birthday Maahi! 💖',
          isFlipped: false,
        },
      ],
      letterTitle: 'A Letter for Munchkin 💌',
      letterGreeting: 'Dear Munchkin (Maahi) 🧸,',
      letterBody: `You mean the world to me. ✨

Tere hone se hi meri khushi hai, tu hai toh sab hai, tere bina kya mera...

Happy Birthday to the sweetest soul! Wishing you endless smiles, peace, and pure happiness always. 💖`,
      letterSignoff: 'Loads of love,\nKushal 💌',
      photos: [
        {
          id: 'p1',
          url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80',
          caption: 'Cutest Munchkin smile ✨',
          rotation: -2,
          date: 'Memory 01'
        },
        {
          id: 'p2',
          url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80',
          caption: 'Radiant energy & pure sunshine 🌸',
          rotation: 1.5,
          date: 'Memory 02'
        },
        {
          id: 'p3',
          url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&auto=format&fit=crop&q=80',
          caption: 'Sweetest moments together 🧸',
          rotation: -1,
          date: 'Memory 03'
        },
        {
          id: 'p4',
          url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&auto=format&fit=crop&q=80',
          caption: 'Partner in crime & best memories 💫',
          rotation: 2,
          date: 'Memory 04'
        }
      ],
      musicTrack: 'Acoustic Birthday Melody & Chimes',
    };
  }

  // Custom or empty input
  const formattedName = trimmed ? (trimmed.charAt(0).toUpperCase() + trimmed.slice(1)) : '';
  const displayName = formattedName || 'you';
  
  return {
    recipientName: formattedName || 'Birthday Star',
    nickname: formattedName ? `${formattedName} 🌸` : '',
    senderName: 'Kushal 💌',
    relationship: 'Best Friend & Forever Person',
    birthdayDate: 'Today & Always ✨',
    wishes: [
      {
        id: 1,
        frontTitle: `Special Bouquet for ${displayName} 💐`,
        frontSubtitle: `Fresh roses & sunflowers for ${displayName}!`,
        frontTag: 'Tap to flip →',
        frontIllustration: 'bouquet',
        backNumber: '01',
        backText: `Dear ${displayName}, may this year bring you all the warmth, soft giggles, and beautiful peaceful moments your pure heart so deeply deserves.`,
        isFlipped: false,
      },
      {
        id: 2,
        frontTitle: 'Pakdo na! Free hugs 🤗',
        frontSubtitle: `Unlimited tightest hugs voucher for ${displayName}`,
        frontTag: 'Tap to flip →',
        frontIllustration: 'hug',
        backNumber: '02',
        backText: `May your days be stress-free, your confidence unshakable, and your heart overwhelmed with pure happiness and love, ${displayName}!`,
        isFlipped: false,
      },
      {
        id: 3,
        frontTitle: 'Best Human Award 🏆',
        frontSubtitle: `Awarded to: ${displayName} ✨ (100% sweetest soul)`,
        frontTag: 'Tap to flip →',
        frontIllustration: 'trophy',
        backNumber: '03',
        backText: `Thank you for being the most constant, understanding, and irreplaceable person in my life. You make every ordinary day magical.`,
        isFlipped: false,
      },
      {
        id: 4,
        frontTitle: '365 Days of Chaos & Coffee ☕',
        frontSubtitle: `Ready for another year of memories, ${displayName}?`,
        frontTag: 'Tap to flip →',
        frontIllustration: 'coffee',
        backNumber: '04',
        backText: `Here’s to another 365 days of late-night rants, inside jokes nobody else gets, endless food dates, and dreaming big together!`,
        isFlipped: false,
      },
      {
        id: 5,
        frontTitle: 'Forever in Your Corner 🌟',
        frontSubtitle: `A promise to ${displayName}`,
        frontTag: 'Tap to flip →',
        frontIllustration: 'stars',
        backNumber: '05',
        backText: `No matter where life takes us or what storms come, I will ALWAYS have your back cheering the loudest for you. Happy Birthday ${displayName}! 💖`,
        isFlipped: false,
      },
    ],
    letterTitle: `A Letter for ${formattedName || 'You'} 💌`,
    letterGreeting: `Dear ${formattedName || 'Birthday Star'} 🌸,`,
    letterBody: `You mean the world to me. ✨

Tere hone se hi meri khushi hai, tu hai toh sab hai, tere bina kya mera...

Happy Birthday! May your special day and the year ahead be as bright and beautiful as you are. 💖`,
    letterSignoff: `Loads of love,\nKushal 💌`,
    photos: [
      {
        id: 'p1',
        url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80',
        caption: `Main character energy always ✨`,
        rotation: -2,
        date: 'Memory 01'
      },
      {
        id: 'p2',
        url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80',
        caption: 'The prettiest smile in the world 🌸',
        rotation: 1.5,
        date: 'Memory 02'
      },
      {
        id: 'p3',
        url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&auto=format&fit=crop&q=80',
        caption: 'Radiant sunshine vibes ☀️',
        rotation: -1,
        date: 'Memory 03'
      },
      {
        id: 'p4',
        url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&auto=format&fit=crop&q=80',
        caption: 'Partner in crime & best memories 💫',
        rotation: 2,
        date: 'Memory 04'
      }
    ],
    musicTrack: 'Acoustic Birthday Melody & Chimes',
  };
}
