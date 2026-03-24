import React from "react";

const MODAL_UNDERLAY_STYLE: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  background: "rgba(0, 0, 0, 0.75)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999,
  padding: 24,
};

const MODAL_CONTENT_STYLE: React.CSSProperties = {
  position: "relative",
  width: "70vw",
  height: "50vh",
  maxWidth: 900,
  maxHeight: 520,
  minWidth: 320,
  minHeight: 200,
  background: "#111",
  border: "3px solid var(--green)",
  boxShadow: "0 0 24px rgba(0, 0, 0, 0.6)",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxSizing: "border-box",
};

const MODAL_CONTENT_INNER_STYLE: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100%",
  position: "relative",
};

const MODAL_CLOSE_STYLE: React.CSSProperties = {
  position: "absolute",
  top: 0,
  right: 0,
  width: 23,
  height: 23,
  border: "2px solid var(--amber)",
  background: "var(--amber)",
  color: "var(--black)",
  boxShadow: "0 0 12px rgba(255, 176, 0, 0.35)",
  fontSize: 13,
  cursor: "pointer",
};

const MODAL_VIDEO_STYLE: React.CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "contain",
};

type Props = {
  Modal: React.ComponentType<{
    children: React.ReactNode;
    underlayStyle?: React.CSSProperties;
    contentStyle?: React.CSSProperties;
  }>;
  onClose: () => void;
  videoUrl: string;
  posterUrl?: string;
};

export default function DemoVideoModal({
  Modal,
  onClose,
  videoUrl,
  posterUrl,
}: Props) {
  return (
    <Modal underlayStyle={MODAL_UNDERLAY_STYLE} contentStyle={MODAL_CONTENT_STYLE}>
      <div style={MODAL_CONTENT_INNER_STYLE}>
        <video
          src={videoUrl}
          poster={posterUrl}
          controls
          autoPlay
          muted
          preload="none"
          style={MODAL_VIDEO_STYLE}
        />
        <button
          type="button"
          style={MODAL_CLOSE_STYLE}
          onClick={onClose}
          aria-label="Close modal">
          ×
        </button>
      </div>
    </Modal>
  );
}
