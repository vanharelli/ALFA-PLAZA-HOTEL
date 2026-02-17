import type { HotelConfig } from '../types/types';

export const DEFAULT_HOTEL: HotelConfig = {
  id: "alfaplaza",
  // 1. IDENTIDADE OFICIAL (Corrigido para ALFA com F)
  name: "Alfa Plaza Hotel",
  slug: "alfaplaza", // URL interna
  
  // 2. COR DO SISTEMA (Verde Neon)
  primaryColor: "#25c522", 
  
  // 3. CONTATO DA RECEPÇÃO
  whatsapp: "556132639131", // ⚠️ COLOQUE O NÚMERO REAL AQUI
  email: "reservas@alfaplazahotel.com.br", // Ajustado para Alfa
  phone: "(61) 3263-9131",
  
  // 4. VISUAL (Arquivos na pasta public)
  logo: "/logo.png", 
  background: "/fundo.jpg", 
  
  // 5. BLINDAGEM JURÍDICA
  subtitle: "Check-in Antecipado Oficial",
  legalTerm: "Ferramenta Exclusiva para Gestão de Check-in. Tecnologia Stateless & Zero-Knowledge. A responsabilidade pelo envio à FNRH (Lei 11.771/2008) compete administrativa e unicamente ao Estabelecimento (Alfa Plaza Hotel).",
  
  // 6. TRAVAS TÉCNICAS
  pixKey: "", 
  active: true
};

export const loadHotelConfig = (): HotelConfig => {
  return DEFAULT_HOTEL;
};