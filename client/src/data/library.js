export const GENRES = ["Pop", "Hip-hop", "Rock", "Indie", "Electronic", "Bollywood"];

const ROWS = [
  ["Pop", "Blinding Lights", "The Weeknd", "After Hours", 2020],
  ["Pop", "Save Your Tears", "The Weeknd", "After Hours", 2020],
  ["Pop", "Can't Feel My Face", "The Weeknd", "Beauty Behind the Madness", 2015],
  ["Pop", "Levitating", "Dua Lipa", "Future Nostalgia", 2020],
  ["Pop", "Don't Start Now", "Dua Lipa", "Future Nostalgia", 2019],
  ["Pop", "As It Was", "Harry Styles", "Harry's House", 2022],
  ["Pop", "Watermelon Sugar", "Harry Styles", "Fine Line", 2019],
  ["Pop", "Anti-Hero", "Taylor Swift", "Midnights", 2022],
  ["Pop", "Blank Space", "Taylor Swift", "1989", 2014],
  ["Pop", "Flowers", "Miley Cyrus", "Endless Summer Vacation", 2023],
  ["Pop", "good 4 u", "Olivia Rodrigo", "SOUR", 2021],
  ["Pop", "drivers license", "Olivia Rodrigo", "SOUR", 2021],
  ["Pop", "bad guy", "Billie Eilish", "When We All Fall Asleep, Where Do We Go?", 2019],
  ["Pop", "Happier Than Ever", "Billie Eilish", "Happier Than Ever", 2021],
  ["Pop", "Shape of You", "Ed Sheeran", "Divide", 2017],
  ["Pop", "Perfect", "Ed Sheeran", "Divide", 2017],
  ["Pop", "Easy On Me", "Adele", "30", 2021],
  ["Pop", "Rolling in the Deep", "Adele", "21", 2011],
  ["Pop", "Uptown Funk", "Mark Ronson", "Uptown Special", 2014],
  ["Pop", "Billie Jean", "Michael Jackson", "Thriller", 1982],
  ["Pop", "Beat It", "Michael Jackson", "Thriller", 1982],
  ["Pop", "About Damn Time", "Lizzo", "Special", 2022],
  ["Pop", "Peaches", "Justin Bieber", "Justice", 2021],
  ["Pop", "Señorita", "Shawn Mendes", "Shawn Mendes", 2019],

  ["Hip-hop", "HUMBLE.", "Kendrick Lamar", "DAMN.", 2017],
  ["Hip-hop", "DNA.", "Kendrick Lamar", "DAMN.", 2017],
  ["Hip-hop", "Alright", "Kendrick Lamar", "To Pimp a Butterfly", 2015],
  ["Hip-hop", "Money Trees", "Kendrick Lamar", "good kid, m.A.A.d city", 2012],
  ["Hip-hop", "Sicko Mode", "Travis Scott", "ASTROWORLD", 2018],
  ["Hip-hop", "Goosebumps", "Travis Scott", "Birds in the Trap Sing McKnight", 2016],
  ["Hip-hop", "God's Plan", "Drake", "Scorpion", 2018],
  ["Hip-hop", "One Dance", "Drake", "Views", 2016],
  ["Hip-hop", "Hotline Bling", "Drake", "Views", 2015],
  ["Hip-hop", "In Da Club", "50 Cent", "Get Rich or Die Tryin'", 2003],
  ["Hip-hop", "Lose Yourself", "Eminem", "8 Mile", 2002],
  ["Hip-hop", "Stan", "Eminem", "The Marshall Mathers LP", 2000],
  ["Hip-hop", "Without Me", "Eminem", "The Eminem Show", 2002],
  ["Hip-hop", "Stronger", "Kanye West", "Graduation", 2007],
  ["Hip-hop", "Gold Digger", "Kanye West", "Late Registration", 2005],
  ["Hip-hop", "Power", "Kanye West", "My Beautiful Dark Twisted Fantasy", 2010],
  ["Hip-hop", "Industry Baby", "Lil Nas X", "MONTERO", 2021],
  ["Hip-hop", "Old Town Road", "Lil Nas X", "7", 2019],
  ["Hip-hop", "Juicy", "The Notorious B.I.G.", "Ready to Die", 1994],
  ["Hip-hop", "Empire State of Mind", "Jay-Z", "The Blueprint 3", 2009],

  ["Rock", "Bohemian Rhapsody", "Queen", "A Night at the Opera", 1975],
  ["Rock", "Don't Stop Me Now", "Queen", "Jazz", 1978],
  ["Rock", "Smells Like Teen Spirit", "Nirvana", "Nevermind", 1991],
  ["Rock", "Come As You Are", "Nirvana", "Nevermind", 1991],
  ["Rock", "Wonderwall", "Oasis", "(What's the Story) Morning Glory?", 1995],
  ["Rock", "Hotel California", "Eagles", "Hotel California", 1976],
  ["Rock", "Sweet Child O' Mine", "Guns N' Roses", "Appetite for Destruction", 1987],
  ["Rock", "Back in Black", "AC/DC", "Back in Black", 1980],
  ["Rock", "Seven Nation Army", "The White Stripes", "Elephant", 2003],
  ["Rock", "Mr. Brightside", "The Killers", "Hot Fuss", 2004],
  ["Rock", "Do I Wanna Know?", "Arctic Monkeys", "AM", 2013],
  ["Rock", "Yellow", "Coldplay", "Parachutes", 2000],
  ["Rock", "Fix You", "Coldplay", "X&Y", 2005],
  ["Rock", "Viva La Vida", "Coldplay", "Viva la Vida", 2008],
  ["Rock", "Livin' on a Prayer", "Bon Jovi", "Slippery When Wet", 1986],
  ["Rock", "Don't Stop Believin'", "Journey", "Escape", 1981],
  ["Rock", "Stairway to Heaven", "Led Zeppelin", "Led Zeppelin IV", 1971],
  ["Rock", "Wish You Were Here", "Pink Floyd", "Wish You Were Here", 1975],
  ["Rock", "Enter Sandman", "Metallica", "Metallica", 1991],
  ["Rock", "Nothing Else Matters", "Metallica", "Metallica", 1991],
  ["Rock", "Under the Bridge", "Red Hot Chili Peppers", "Blood Sugar Sex Magik", 1991],
  ["Rock", "Everlong", "Foo Fighters", "The Colour and the Shape", 1997],
  ["Rock", "Zombie", "The Cranberries", "No Need to Argue", 1994],
  ["Rock", "Dream On", "Aerosmith", "Aerosmith", 1973],

  ["Indie", "Electric Feel", "MGMT", "Oracular Spectacular", 2007],
  ["Indie", "Kids", "MGMT", "Oracular Spectacular", 2007],
  ["Indie", "Take Me Out", "Franz Ferdinand", "Franz Ferdinand", 2004],
  ["Indie", "Somebody Else", "The 1975", "I like it when you sleep", 2016],
  ["Indie", "Robbers", "The 1975", "The 1975", 2013],
  ["Indie", "Motion Sickness", "Phoebe Bridgers", "Stranger in the Alps", 2017],
  ["Indie", "Kyoto", "Phoebe Bridgers", "Punisher", 2020],
  ["Indie", "The Less I Know the Better", "Tame Impala", "Currents", 2015],
  ["Indie", "Let It Happen", "Tame Impala", "Currents", 2015],
  ["Indie", "Borderline", "Tame Impala", "The Slow Rush", 2020],
  ["Indie", "Holocene", "Bon Iver", "Bon Iver", 2011],
  ["Indie", "Skinny Love", "Bon Iver", "For Emma, Forever Ago", 2007],
  ["Indie", "Myth", "Beach House", "Bloom", 2012],
  ["Indie", "Space Song", "Beach House", "Depression Cherry", 2015],
  ["Indie", "Dog Days Are Over", "Florence + the Machine", "Lungs", 2009],
  ["Indie", "Shake It Out", "Florence + the Machine", "Ceremonials", 2011],
  ["Indie", "Ribs", "Lorde", "Pure Heroine", 2013],
  ["Indie", "Supercut", "Lorde", "Melodrama", 2017],
  ["Indie", "Riptide", "Vance Joy", "Dream Your Life Away", 2013],
  ["Indie", "Float On", "Modest Mouse", "Good News for People Who Love Bad News", 2004],
  ["Indie", "Fluorescent Adolescent", "Arctic Monkeys", "Favourite Worst Nightmare", 2007],
  ["Indie", "Apocalypse", "Cigarettes After Sex", "Cigarettes After Sex", 2017],

  ["Electronic", "Midnight City", "M83", "Hurry Up, We're Dreaming", 2011],
  ["Electronic", "Strobe", "deadmau5", "For Lack of a Better Name", 2009],
  ["Electronic", "Levels", "Avicii", "Levels", 2011],
  ["Electronic", "Wake Me Up", "Avicii", "True", 2013],
  ["Electronic", "Titanium", "David Guetta", "Nothing but the Beat", 2011],
  ["Electronic", "One More Time", "Daft Punk", "Discovery", 2000],
  ["Electronic", "Get Lucky", "Daft Punk", "Random Access Memories", 2013],
  ["Electronic", "Around the World", "Daft Punk", "Homework", 1997],
  ["Electronic", "Digital Love", "Daft Punk", "Discovery", 2001],
  ["Electronic", "Lean On", "Major Lazer", "Peace Is the Mission", 2015],
  ["Electronic", "Clarity", "Zedd", "Clarity", 2012],
  ["Electronic", "Faded", "Alan Walker", "Faded", 2015],
  ["Electronic", "Latch", "Disclosure", "Settle", 2013],
  ["Electronic", "Innerbloom", "RÜFÜS DU SOL", "Bloom", 2016],
  ["Electronic", "Tadow", "FKJ & Masego", "Tadow", 2018],
  ["Electronic", "Shelter", "Porter Robinson", "Shelter", 2016],
  ["Electronic", "Don't You Worry Child", "Swedish House Mafia", "Until Now", 2012],
  ["Electronic", "Summer", "Calvin Harris", "Motion", 2014],
  ["Electronic", "Feel So Close", "Calvin Harris", "18 Months", 2011],
  ["Electronic", "Animals", "Martin Garrix", "Animals", 2013],

  ["Bollywood", "Kesariya", "Arijit Singh", "Brahmastra", 2022],
  ["Bollywood", "Apna Bana Le", "Arijit Singh", "Bhediya", 2022],
  ["Bollywood", "Channa Mereya", "Arijit Singh", "Ae Dil Hai Mushkil", 2016],
  ["Bollywood", "Tum Hi Ho", "Arijit Singh", "Aashiqui 2", 2013],
  ["Bollywood", "Raabta", "Arijit Singh", "Agent Vinod", 2012],
  ["Bollywood", "Gerua", "Arijit Singh", "Dilwale", 2015],
  ["Bollywood", "Janam Janam", "Arijit Singh", "Dilwale", 2015],
  ["Bollywood", "Agar Tum Saath Ho", "Arijit Singh", "Tamasha", 2015],
  ["Bollywood", "What Jhumka?", "Arijit Singh", "Rocky Aur Rani Kii Prem Kahaani", 2023],
  ["Bollywood", "Ilahi", "Arijit Singh", "Yeh Jawaani Hai Deewani", 2013],
  ["Bollywood", "Kal Ho Naa Ho", "Sonu Nigam", "Kal Ho Naa Ho", 2003],
  ["Bollywood", "Tum Se Hi", "Mohit Chauhan", "Jab We Met", 2007],
  ["Bollywood", "Pee Loon", "Mohit Chauhan", "Once Upon a Time in Mumbaai", 2010],
  ["Bollywood", "Kun Faya Kun", "Mohit Chauhan", "Rockstar", 2011],
  ["Bollywood", "Nadaan Parinde", "Mohit Chauhan", "Rockstar", 2011],
  ["Bollywood", "Badtameez Dil", "Benny Dayal", "Yeh Jawaani Hai Deewani", 2013],
  ["Bollywood", "Kabira", "Tochi Raina", "Yeh Jawaani Hai Deewani", 2013],
  ["Bollywood", "Chaiyya Chaiyya", "Sukhwinder Singh", "Dil Se", 1998],
  ["Bollywood", "Jai Ho", "A.R. Rahman", "Slumdog Millionaire", 2008],
  ["Bollywood", "London Thumakda", "Labh Janjua", "Queen", 2014],
  ["Bollywood", "Bekhayali", "Sachet Tandon", "Kabir Singh", 2019],
  ["Bollywood", "Tera Ban Jaunga", "Akhil Sachdeva", "Kabir Singh", 2019],
  ["Bollywood", "Safarnama", "Papon", "Tamasha", 2015],
  ["Bollywood", "Gallan Goodiyaan", "Sukhwinder Singh", "Dil Dhadakne Do", 2015],
];

function slug(title, artist) {
  return `${title}-${artist}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export const LIBRARY = ROWS.map(([genre, title, artist, album, year]) => ({
  id: slug(title, artist),
  genre,
  title,
  artist,
  album,
  year,
}));

const PALETTES = [
  ["#1E1B4B", "#4338CA"],
  ["#052E16", "#16A34A"],
  ["#2A1230", "#A21CAF"],
  ["#172554", "#2563EB"],
  ["#2A1810", "#C2410C"],
  ["#042F2E", "#0F766E"],
  ["#2A1215", "#BE123C"],
  ["#292018", "#A16207"],
];

export function songLabel(track) {
  return `${track.title} — ${track.artist}`;
}

const BY_LABEL = new Map(LIBRARY.map((track) => [songLabel(track), track]));

export function findTrack(label) {
  return BY_LABEL.get(label) || null;
}

export function coverPalette(seed) {
  let hash = 0;
  const text = String(seed || "");
  for (let i = 0; i < text.length; i += 1) hash = (hash * 31 + text.charCodeAt(i)) >>> 0;
  return PALETTES[hash % PALETTES.length];
}

export function initials(seed) {
  const parts = String(seed || "")
    .split(/\s+/)
    .filter(Boolean);
  return ((parts[0]?.[0] || "?") + (parts[1]?.[0] || "")).toUpperCase();
}
