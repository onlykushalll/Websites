export type StepId = 
  | 'intro'           // "Do you want to see it?" + Name Input Picker
  | 'loading'         // "Come on! have a look at it... Setting everything up"
  | 'dark_room'       // "SHHH... The room is dark" -> "Turn on the lights" (Hover or Click)
  | 'lights_on'       // "That's much better!" -> "Set the mood"
  | 'celebration'     // "Celebration Mode... Happy Birthday" -> "Release the balloons"
  | 'cake'            // "Cake Time... Blow candle & Drag across cake to cut it"
  | 'make_wish'       // "Make a Wish... Close your eyes" -> "I Made My Wish"
  | 'wishes_deck'     // 3D Flip cards deck (1 of 5 wishes)
  | 'letter'          // Heartfelt letter, Polaroid strip, hugs counter
  | 'final_love';     // "Final Page of Love": Love vouchers, reasons, secret gift box & fireworks


export interface WishCard {
  id: number;
  frontTitle: string;
  frontSubtitle: string;
  frontTag?: string;
  frontIllustration: string; // SVG or illustration key
  backNumber: string;
  backText: string;
  isFlipped?: boolean;
}

export interface MemoryPhoto {
  id: string;
  url: string;
  caption: string;
  rotation: number;
  date?: string;
}

export interface BirthdayData {
  recipientName: string;
  nickname: string;
  senderName: string;
  relationship: string;
  age?: number | string;
  birthdayDate: string;
  wishes: WishCard[];
  letterTitle: string;
  letterGreeting: string;
  letterBody: string;
  letterSignoff: string;
  photos: MemoryPhoto[];
  musicTrack: string;
  customAudioNoteUrl?: string;
}

export interface AiGenerationRequest {
  recipientName: string;
  senderName: string;
  relationship: string;
  vibe: 'emotional' | 'funny' | 'cute' | 'poetic';
  insideJokes?: string;
  memories?: string;
}
