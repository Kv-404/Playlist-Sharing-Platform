# Playlist Sharing Platform

Case study 162 for B.Tech CSE Backend Development (Node.js, Express.js, and MongoDB).

People register, publish playlists of song titles, and other people like and comment on them. Edit and delete are limited to the playlist owner. Like and comment rules live in the API.

## What maps to the brief

| Requirement | Where |
| --- | --- |
| User, Playlist, and Comment schemas | `backend/src/models` |
| Playlist CRUD | `backend/src/controllers/playlistController.js` |
| Owner-only edit and delete | `backend/src/middleware/authorizeOwner.js` |
| Like toggle | `POST /api/playlists/:id/like` |
| Comments | `POST /api/playlists/:id/comments` |
| Validation before save | `backend/src/validators.js` and the Mongoose schemas |
| JWT authentication | `backend/src/middleware/auth.js` |
| Referenced collections | `owner`, `likes`, `playlist`, and `user` fields |
| Environment config | `backend/.env.example` |
| Postman collection | `backend/postman/Playlist-Sharing-Platform.postman_collection.json` |
| React pages | Login, Register, feed, song library, create playlist, playlist details |

## Run it locally

MongoDB must be running on `mongodb://127.0.0.1:27017`.

```bash
cd backend
npm install
npm start
```

`backend/.env` is already filled for this machine. On another machine, copy `.env.example` to `.env` and set `JWT_SECRET`.

In a second terminal:

```bash
cd client
npm install
npm run dev
```

Open http://localhost:5173. The dev server proxies `/api` to http://localhost:4000.

API checks:

```bash
cd backend
npm test
```

## API

| Method | Path | Auth |
| --- | --- | --- |
| POST | `/api/auth/register` | no |
| POST | `/api/auth/login` | no |
| GET | `/api/auth/me` | JWT |
| POST | `/api/playlists` | JWT |
| GET | `/api/playlists` | optional |
| GET | `/api/playlists/:id` | optional |
| PATCH | `/api/playlists/:id` | owner |
| DELETE | `/api/playlists/:id` | owner |
| POST | `/api/playlists/:id/like` | JWT, toggles |
| POST | `/api/playlists/:id/comments` | JWT |
| DELETE | `/api/comments/:id` | comment author |

Send `Authorization: Bearer <token>`. A playlist needs a title and 1–50 song titles. A comment needs text of 1–500 characters.

The React library is a catalog of real songs (title, artist, album). Picking one saves a title string such as `Blinding Lights — The Weeknd`. The API and the Postman collection still send `songs` as an array of strings.

Like responses look like `{ "liked": true, "likeCount": 1 }`. Liking again removes that user and the count drops by one. The same user cannot be counted twice.

## Postman

Import `backend/postman/Playlist-Sharing-Platform.postman_collection.json`. Run the requests from top to bottom with the API on port 4000. Login requests save `token` and `otherToken`. The listener's update and delete requests expect `403`.

## Deploy

The site and the API are one Vercel project. `vercel.json` sends `/api` to the Express app and every other path to the Vite client, so the browser keeps calling `/api` on the same origin. Leave `VITE_API_URL` unset.

Vercel cannot reach MongoDB on your laptop. Create a free MongoDB Atlas cluster, allow access from anywhere (`0.0.0.0/0`), and set these environment variables on the Vercel project:

- `MONGO_URI`: the Atlas connection string
- `JWT_SECRET`: a long random string
- `JWT_EXPIRES_IN`: `7d`
- `CLIENT_URL`: the Vercel site origin, with no trailing slash

`/api/health` answers without a database. Register, login, playlists, likes, and comments stay unavailable until `MONGO_URI` points at Atlas.

The React app only calls these REST endpoints. It does not calculate likes or store comments itself.
