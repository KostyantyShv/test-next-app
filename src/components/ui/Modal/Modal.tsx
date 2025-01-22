import React from 'react';

interface ModalProps {
  children: React.ReactNode;
  content: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ children, content }) => {
  return (
    <div className="relative">
      {children}
      <div className="hidden group-hover:block">{content}</div>
    </div>
  );
}; 