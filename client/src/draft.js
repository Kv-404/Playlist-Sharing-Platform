import { useEffect, useState } from "react";

const KEY = "playlist-draft-songs";

export function readDraft() {
  try {
    const parsed = JSON.parse(sessionStorage.getItem(KEY) || "[]");
    return Array.isArray(parsed) ? parsed.filter((item) => typeof item === "string") : [];
  } catch {
    return [];
  }
}

export function writeDraft(songs) {
  sessionStorage.setItem(KEY, JSON.stringify(songs));
  window.dispatchEvent(new Event("draft:songs"));
}

export function clearDraft() {
  writeDraft([]);
}

export function useDraft() {
  const [songs, setSongs] = useState(readDraft);

  useEffect(() => {
    function sync() {
      setSongs(readDraft());
    }
    window.addEventListener("draft:songs", sync);
    window.addEventListener("focus", sync);
    return () => {
      window.removeEventListener("draft:songs", sync);
      window.removeEventListener("focus", sync);
    };
  }, []);

  function update(next) {
    writeDraft(next);
    setSongs(next);
  }

  return [songs, update];
}
