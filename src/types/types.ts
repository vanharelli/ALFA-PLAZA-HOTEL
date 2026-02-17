export interface HotelConfig {
  id: string;
  name: string;
  subtitle: string;
  whatsapp: string;
  logoUrl?: string; // Optional for now
  themeColor?: string; // Deprecated, use primaryColor
  primaryColor?: string; // e.g., #D4AF37
  enableMultiLanguage?: boolean;
  enableGarage?: boolean;
  footerText?: string;
  licenseKey?: string;
  createdAt?: string;
  backgroundUrl?: string;
  slug?: string;
  email?: string;
  phone?: string;
  logo?: string;
  background?: string;
  legalTerm?: string;
  pixKey?: string;
  active?: boolean;
}

export const DEFAULT_HOTEL: HotelConfig = {
  id: 'alfa-plaza-Hotel',
  name: 'check-in digital.',
  subtitle: 'Alfa Plaza Hotel',
  whatsapp: '556132639131',
  themeColor: '#D4AF37', // Gold (Standard)
  primaryColor: '#D4AF37', // Gold (Standard)
  enableMultiLanguage: true,
  enableGarage: true,
  footerText: '© 2026 Alfa Plaza Hotel - Todos os direitos reservados',
  backgroundUrl: 'https://static.vecteezy.com/ti/vetor-gratis/t2/8953048-abstract-elegant-gold-lines-diagonal-scene-on-black-background-template-premium-award-design-gratis-vetor.jpg'
};
