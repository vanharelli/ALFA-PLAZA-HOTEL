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
      e.stopPropagation();
      return false;
    };

    // 3. ATIVANDO AS DEFESAS COM PRIORIDADE MÁXIMA (capture: true)
    window.addEventListener('keydown', handleKeyDown, { capture: true });
    window.addEventListener('contextmenu', handleContextMenu, { capture: true });
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown, { capture: true });
      window.removeEventListener('contextmenu', handleContextMenu, { capture: true });
    };
  }, []);
};