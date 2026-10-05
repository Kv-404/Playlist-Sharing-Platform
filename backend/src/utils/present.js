function asObject(doc) {
  return doc.toObject ? doc.toObject() : doc;
}

export function presentPlaylist(playlist, userId) {
  const doc = asObject(playlist);
  const likes = doc.likes || [];
  const viewer = userId ? String(userId) : null;

  return {
    _id: doc._id,
    title: doc.title,
    description: doc.description || "",
    songs: doc.songs,
    owner: doc.owner,
    likeCount: likes.length,
    likedByMe: viewer
      ? likes.some((like) => String(like._id || like) === viewer)
      : false,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
}

export function presentComment(comment) {
  const doc = asObject(comment);
  return {
    _id: doc._id,
    text: doc.text,
    user: doc.user,
    playlist: doc.playlist,
    createdAt: doc.createdAt,
  };
}
