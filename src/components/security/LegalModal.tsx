import React, { useState } from 'react';
import { ShieldCheck } from 'lucide-react';

interface LegalModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div 
                className="w-full max-w-2xl bg-[#0a0a0a] border border-[#D4AF37]/30 rounded-lg shadow-2xl relative overflow-hidden animate-in fade-in zoom-in duration-300"
                style={{ boxShadow: '0 0 40px rgba(212, 175, 55, 0.1)' }}
            >
                {/* Header */}
                <div className="p-6 border-b border-[#D4AF37]/10 flex justify-between items-center bg-[#0a0a0a]">
                    <div className="flex items-center gap-3">
                        <ShieldCheck size={20} className="text-[#D4AF37]" />
                        <h2 className="text-[#D4AF37] text-xs font-bold tracking-[0.2em] uppercase">
                            Segurança e Privacidade - Alfa Plaza Hotel
                        </h2>
                    </div>
                    <button 
                        onClick={onClose}
                        className="text-white/40 hover:text-white transition-colors text-xl leading-none"
                    >
                        &times;
                    </button>
                </div>

                {/* Content */}
                <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar text-white/80">
                    <div className="flex items-center justify-center mb-6">
                        <ShieldCheck size={48} className="text-[#D4AF37] drop-shadow-[0_0_15px_rgba(212,175,55,0.5)]" />
                    </div>

                    <h1 className="text-xl font-bold text-center mb-2 text-white">Termos de Privacidade e Uso</h1>
                    <p className="text-center text-gray-400 text-xs mb-8 uppercase tracking-widest">Alfa Plaza Hotel • Check-in Digital</p>

                    <div className="space-y-8 text-gray-300">
                        <section className="bg-white/[0.02] p-5 rounded border border-white/5">
                            <h3 className="font-bold text-[#D4AF37] mb-3 text-xs uppercase tracking-wide">1. Natureza do Serviço</h3>
                            <p className="text-xs leading-relaxed text-gray-400">
                                Esta plataforma atua exclusivamente como uma Interface de Conexão Transitória para formatação e envio de dados via WhatsApp. 
                                Não operamos como banco de dados e não retemos informações pessoais em nossos servidores (Tecnologia Stateless).
                            </p>
                        </section>

                        <section className="bg-white/[0.02] p-5 rounded border border-white/5">
                            <h3 className="font-bold text-[#D4AF37] mb-3 text-xs uppercase tracking-wide">2. Responsabilidade Legal (FNRH)</h3>
                            <p className="text-xs leading-relaxed text-gray-400">
                                O preenchimento da Ficha Nacional de Registro de Hóspedes (FNRH) e sua submissão aos órgãos competentes (MTur) é de responsabilidade exclusiva da gestão do estabelecimento hoteleiro, 
                                conforme Lei nº 11.771/2008 e Decreto nº 7.381/2010.
                            </p>
                        </section>

                        <section className="bg-white/[0.02] p-5 rounded border border-white/5">
                            <h3 className="font-bold text-[#D4AF37] mb-3 text-xs uppercase tracking-wide">3. Tratamento de Dados (LGPD)</h3>
                            <p className="text-xs leading-relaxed text-gray-400">
                                Ao utilizar este sistema, o usuário consente com o processamento temporário de seus dados exclusivamente para a geração do link de check-in. 
                                Nenhum dado é vendido, compartilhado ou armazenado pelo Alfa Plaza Hotel. A segurança da informação é gerida pelas políticas do sistema Bitz Softwares Ltda.
                            </p>
                        </section>

                        <section className="bg-white/[0.02] p-5 rounded border border-white/5">
                            <h3 className="font-bold text-[#D4AF37] mb-3 text-xs uppercase tracking-wide">4. Disposições Gerais</h3>
                            <p className="text-xs leading-relaxed text-gray-400">
                                O uso desta ferramenta implica na aceitação integral destes termos. Em caso de dúvidas sobre o tratamento de seus dados pelo hotel, 
                                solicite a Política de Privacidade interna diretamente na recepção física.
                            </p>
                        </section>
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/5 text-center">
                        <p className="text-[10px] text-gray-600 uppercase tracking-widest">
                            Atualizado em: Fevereiro de 2026<br/>
                            Alfa Plaza Hotel
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-[#D4AF37]/10 bg-[#0a0a0a] text-center">
                    <button 
                        onClick={onClose}
                        className="text-[10px] text-white/40 hover:text-[#D4AF37] transition-colors uppercase tracking-widest px-8 py-3 border border-white/5 hover:border-[#D4AF37]/30 rounded hover:bg-white/[0.02]"
                    >
                        Fechar e Continuar
                    </button>
                </div>
            </div>
        </div>
    );
};

export const PrivacyLink: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div className="text-center mt-6 relative z-10 px-8">
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="text-[10px] text-[#D4AF37]/80 hover:text-[#D4AF37] underline decoration-[#D4AF37]/30 hover:decoration-[#D4AF37] underline-offset-4 transition-all uppercase tracking-wider"
                >
                    Termos de Uso e Política de Privacidade
                </button>
            </div>
            <LegalModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
};

interface LegalShieldProps {
    isChecked: boolean;
    onChange: (checked: boolean) => void;
}

export const LegalShield: React.FC<LegalShieldProps> = ({ isChecked, onChange }) => {
    const theme = {
        check: 'checked:bg-gold-500 checked:border-gold-500 focus:ring-gold-500/30',
    };

    return (
        <div className="flex flex-row items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10 mt-6 transition-colors hover:bg-white/[0.07] w-full">
            <div className="relative flex items-center shrink-0">
                <input
                    type="checkbox"
                    id="legal-check"
                    checked={isChecked}
                    onChange={(e) => onChange(e.target.checked)}
                    className={`peer w-5 h-5 appearance-none rounded border border-white/30 bg-black/20 cursor-pointer transition-all ${theme.check}`}
                />
                <svg
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 text-black pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
            </div>
            <div className="px-2 w-full flex-1">
                <p className="text-[10px] font-bold leading-tight text-white uppercase tracking-tighter text-left">
                    Protocolo de Privacidade Alfa Plaza Hotel.
                </p>
                <p className="mt-1 text-[9px] font-bold leading-tight text-white text-left">
                    Esta interface atua estritamente como um redirecionador facilitador para o 
                    <span className="text-white"> Check-in via WhatsApp</span>. 
                    O sistema <span className="text-[#D4AF37]">não realiza a coleta ou armazenamento</span> de dados pessoais. 
                    A segurança da informação é processada diretamente pelo canal oficial do hotel.
                </p>
            </div>
        </div>
    );
};

export const LegalFooter: React.FC = () => {
    return (
        <div className="mt-8 text-center opacity-60 hover:opacity-100 transition-opacity duration-300 relative z-10 px-8">
            <p className="text-[10px] text-white uppercase tracking-[0.2em] font-bold">
                Tecnologia de Fluxo Temporário • Arquitetura de Dados Nulos
            </p>
    
            <p className="text-[11px] text-gray-400 mt-2 leading-relaxed">
                Interface de redirecionamento imediato. 
                <span className="block mt-1">
                    Garantimos a não retenção de informações sob o protocolo de exclusão automática.
                </span>
            </p>

            <p className="text-[9px] text-gray-500 mt-3 uppercase tracking-tighter">
                Conformidade FNRH (Lei 11.771/2008) processada diretamente pelo Alfa Plaza Hotel via sistema Bitz Softwares Ltda.
            </p>
        </div>
    );
};
