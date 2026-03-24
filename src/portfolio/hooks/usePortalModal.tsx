import React, { useCallback, useEffect, useState } from "react";
import ReactDOM from "react-dom";

type ModalProps = {
  children: React.ReactNode;
  underlayStyle?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
};

export function usePortalModal() {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [isOpen, close]);

  const Modal = ({
    children,
    underlayStyle,
    contentStyle,
  }: ModalProps) => {
    if (!isOpen || typeof document === "undefined") return null;
    return ReactDOM.createPortal(
      <div style={underlayStyle} onClick={close}>
        <div
          style={contentStyle}
          onClick={(event) => event.stopPropagation()}>
          {children}
        </div>
      </div>,
      document.body
    );
  };

  return { isOpen, open, close, Modal };
}
