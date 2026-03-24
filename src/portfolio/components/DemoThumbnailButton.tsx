import React from "react";

const DEMO_TILE_STYLE: React.CSSProperties = {
  position: "relative",
  width: "100%",
  height: "100%",
  border: 0,
  background: "transparent",
  padding: 0,
  cursor: "pointer",
};

const DEMO_THUMB_STYLE: React.CSSProperties = {
  width: "100%",
  height: "auto",
  display: "block",
  border: "3px solid var(--green)",
  boxShadow: "0 0 18px rgba(0, 0, 0, 0.45)",
};

const DEMO_PLAY_STYLE: React.CSSProperties = {
  position: "absolute",
  top: "50%",
  left: "50%",
  width: 70,
  height: 70,
  transform: "translate(-50%, -50%)",
  background: "rgba(0, 0, 0, 0.65)",
  borderRadius: "50%",
};

const DEMO_PLAY_TRIANGLE_STYLE: React.CSSProperties = {
  position: "absolute",
  top: "50%",
  left: "53%",
  transform: "translate(-50%, -50%)",
  width: 0,
  height: 0,
  borderTop: "12px solid transparent",
  borderBottom: "12px solid transparent",
  borderLeft: "18px solid #fff",
};

const DEMO_THUMB_PLACEHOLDER_STYLE: React.CSSProperties = {
  width: "100%",
  height: "100%",
  display: "block",
};

const DEMO_ERROR_STYLE: React.CSSProperties = {
  backgroundColor: "var(--black)",
  border: "2px solid var(--black)",
  color: "var(--green)",
  padding: 10,
  margin: 10,
};

type Props = {
  title: string;
  thumbnailUrl?: string;
  onClick: () => void;
  showThumbnail?: boolean;
};

export default function DemoThumbnailButton({
  title,
  thumbnailUrl,
  onClick,
  showThumbnail = true,
}: Props) {
  const hasThumbnail = Boolean(thumbnailUrl);
  const shouldShowThumbnail = hasThumbnail && showThumbnail;

  return (
    <button
      type="button"
      style={DEMO_TILE_STYLE}
      onClick={onClick}
      aria-label={`Open ${title} demo`}>
      {shouldShowThumbnail && (
        <img
          src={thumbnailUrl}
          alt={`${title} demo thumbnail`}
          style={DEMO_THUMB_STYLE}
        />
      )}
      {!shouldShowThumbnail && hasThumbnail && (
        <span style={DEMO_THUMB_PLACEHOLDER_STYLE} aria-hidden="true" />
      )}
      {!hasThumbnail && (
        <span style={DEMO_ERROR_STYLE}>Showcase video coming soon!</span>
      )}
      {shouldShowThumbnail && (
        <span style={DEMO_PLAY_STYLE}>
          <span style={DEMO_PLAY_TRIANGLE_STYLE} />
        </span>
      )}
    </button>
  );
}
