import { useEffect } from 'react';

const ScreenProtection = () => {
  useEffect(() => {
    // Disable right-click context menu
    const handleContextMenu = (e) => {
      e.preventDefault();
      return false;
    };

    // Disable common screenshot shortcuts
    const handleKeyDown = (e) => {
      // Disable Print Screen, Alt+Print Screen, Windows+Print Screen
      if (e.key === 'PrintScreen' || 
          (e.altKey && e.key === 'PrintScreen') || 
          (e.metaKey && e.shiftKey && e.key === 'S') || // Mac screenshot
          (e.ctrlKey && e.shiftKey && e.key === 'S') || // Some screenshot tools
          e.key === 'F12' || // Developer tools
          (e.ctrlKey && e.shiftKey && e.key === 'I') || // Developer tools
          (e.ctrlKey && e.key === 'U') || // View source
          (e.ctrlKey && e.shiftKey && e.key === 'S') || // View source
          (e.ctrlKey && e.shiftKey && e.key === 'C')) { // Inspect element
        e.preventDefault();
        alert('Screenshots and developer tools are disabled on this platform.');
        return false;
      }
    };

    // Blur content when window loses focus (potential screen recording)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.body.style.filter = 'blur(10px)';
      } else {
        document.body.style.filter = 'none';
      }
    };

    // Add event listeners
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // CSS to prevent text selection and drag
    const style = document.createElement('style');
    style.textContent = `
      * {
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        -ms-user-select: none !important;
        user-select: none !important;
        -webkit-user-drag: none !important;
        -khtml-user-drag: none !important;
        -moz-user-drag: none !important;
        -o-user-drag: none !important;
        user-drag: none !important;
      }
      
      input, textarea {
        -webkit-user-select: text !important;
        -moz-user-select: text !important;
        -ms-user-select: text !important;
        user-select: text !important;
      }
    `;
    document.head.appendChild(style);

    // Cleanup
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.head.removeChild(style);
      document.body.style.filter = 'none';
    };
  }, []);

  return null;
};

export default ScreenProtection;