import { useEffect } from 'react';

export const useSystemArmor = () => {
  useEffect(() => {
    // 1. BLOQUEIO DE TECLAS DE "HACKER" (F12, Ctrl+Shift+I, Ctrl+U, etc)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === 'F12' || 
        (e.ctrlKey && e.shiftKey && e.key === 'I') || // Inspect
        (e.ctrlKey && e.shiftKey && e.key === 'J') || // Console
        (e.ctrlKey && e.shiftKey && e.key === 'C') || // Elements
        (e.ctrlKey && e.key === 'u') || // View Source
        (e.ctrlKey && e.key === 's') // Save Page
      ) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    // 2. BLOQUEIO DE BOTÃO DIREITO (Context Menu)
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    // 3. ARMADILHA DE DEBUGGER (O "Loop da Morte")
    // Se o cara conseguir abrir o Console, isso aqui trava o navegador dele
    // num loop infinito de "Paused in Debugger".
    const antiDebug = () => {
      setInterval(() => {
        const start = new Date().getTime();
        debugger; // <--- O PONTO CHAVE
        const end = new Date().getTime();
        
        // Se o tempo entre start e end for alto, significa que o DevTools parou a execução
        if (end - start > 100) {
          // Punição: Redireciona para o nada ou limpa a tela
          document.body.innerHTML = '<h1 style="color:red;text-align:center;margin-top:20%">ACESSO NEGADO: SISTEMA BLINDADO</h1>';
          window.location.href = "about:blank"; 
        }
      }, 1000);
    };

    // ATIVANDO AS DEFESAS
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('contextmenu', handleContextMenu);
    
    // Só ativa a armadilha do debugger em Produção (pra não te travar)
    if (import.meta.env.PROD) {
        // Descomente a linha abaixo se quiser ser EXTREMAMENTE AGRESSIVO
        // antiDebug(); 
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);
};