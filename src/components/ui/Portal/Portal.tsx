import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: React.ReactNode;
  containerId?: string;
}

export const Portal: React.FC<PortalProps> = ({ 
  children, 
  containerId = 'portal-root' 
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    let container = document.getElementById(containerId);
    if (!container) {
      container = document.createElement('div');
      container.id = containerId;
      document.body.appendChild(container);
    }

    return () => {
      const container = document.getElementById(containerId);
      if (container && container.parentNode && container.parentNode === document.body && container.childNodes.length === 0) {
        try {
          if (container.remove) {
            container.remove();
          } else if (container.parentNode) {
            container.parentNode.removeChild(container);
          }
        } catch (error) {
          // Container might have been removed already, ignore the error
          console.warn('Failed to remove portal container:', error);
        }
      }
    };
  }, [containerId]);

  if (!mounted) return null;

  const container = document.getElementById(containerId);
  if (!container) return null;

  return createPortal(children, container);
}; 