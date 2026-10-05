import { Cover } from "./Cover";
import { findTrack } from "../data/library";

export function TrackRow({ track, label, index, children }) {
  const known = track || (label ? findTrack(label) : null);
  const title = known?.title || label || "Untitled";
  const artist = known?.artist || "Custom title";
  const detail = known ? `${known.album} · ${known.year}` : "Typed in, not from the library";

  return (
    <div className="track">
      {index !== undefined ? <span className="track-index">{index + 1}</span> : null}
      <Cover seed={known?.title || title} />
      <div className="track-copy">
        <p className="track-title">{title}</p>
        <p className="track-sub">
          {artist}
          <span className="track-detail"> · {detail}</span>
        </p>
      </div>
      {known ? <span className="track-genre">{known.genre}</span> : null}
      {children ? <div className="track-actions">{children}</div> : null}
    </div>
  );
}
