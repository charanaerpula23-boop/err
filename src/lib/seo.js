// ── SEO utility functions for erripuku.engineer ──────────────────────────────

const SITE_NAME = 'ErriPuku.engineer';
const SITE_URL  = 'https://erripuku.engineer';
const SITE_TAGLINE = 'Telugu Meme Sounds Free Download';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.jpg`;

// ── Title builders ────────────────────────────────────────────────────────────
export function buildSoundTitle(title) {
  return `${title} Telugu Meme Sound Download & MP3 | ${SITE_NAME}`;
}
export function buildCategoryTitle(name, count) {
  return `${name} Telugu Meme Sounds Download (${count}+ Audios) | ${SITE_NAME}`;
}
export function buildTagTitle(tag, count) {
  return `${tag} Telugu Meme Sounds - ${count} Audios Free Download | ${SITE_NAME}`;
}
export function buildHomeTitle() {
  return `Telugu Meme Sounds Free Download - MP3 & Ringtones | ${SITE_NAME}`;
}

// ── Description builders ──────────────────────────────────────────────────────
export function buildSoundDescription(sound) {
  const base = sound.description?.trim() || '';
  const cleanTitle = sound.title.trim();
  const tagStr = (sound.tags || []).slice(0, 4).join(', ');
  const catStr = (sound.categories || []).map(c => c.name || c).join(', ');
  
  // Directly targeting exact Google Search query patterns
  const searchPattern = `Get the "${cleanTitle}" Telugu meme sound download. Play or download "${cleanTitle}" MP3 audio clip for viral videos, ringtones, and edits.`;

  if (base) {
    return `${searchPattern} ${base}. Category: ${catStr}. Tags: ${tagStr}.`.slice(0, 160);
  }
  return `${searchPattern} Stream free online, download MP3, or set as custom WhatsApp ringtone on ${SITE_NAME}.`.slice(0, 160);
}
export function buildCategoryDescription(name, count) {
  return `Browse and download ${count}+ ${name} Telugu meme sounds for free. Best quality MP3 audio downloads for video editing, Instagram reels, and ringtones.`;
}
export function buildTagDescription(tag, count) {
  return `Free download ${count} Telugu meme sounds tagged with "${tag}". Play MP3 audios online, save locally, or share with friends on WhatsApp.`;
}
export function buildHomeDescription() {
  return `Stream, play, and download 484+ viral Telugu meme sounds, funny movie dialogues, audio clips, and MP3 ringtones for free. Perfect for YouTube edits & WhatsApp reels.`;
}

// ── Keywords builder ──────────────────────────────────────────────────────────
export function buildKeywords(sound) {
  const cleanTitle = sound.title.trim().toLowerCase();
  const base = [
    cleanTitle,
    `${cleanTitle} telugu meme sound`,
    `${cleanTitle} telugu meme sound download`,
    `${cleanTitle} meme sound`,
    `${cleanTitle} meme audio download`,
    `${cleanTitle} audio download`,
    `${cleanTitle} sound download`,
    `${cleanTitle} mp3 download`,
    `${cleanTitle} ringtone`,
    `${cleanTitle} dialogue download`,
    `${cleanTitle} dialogue mp3`,
    ...(sound.tags || []).map(t => t.toLowerCase()),
    ...(sound.categories || []).map(c => (c.name || c).toLowerCase()),
    'telugu meme sounds',
    'telugu meme audio download',
    'telugu meme ringtones',
    'telugu memes mp3',
    'telugu soundboard',
    'free telugu audio download',
  ];
  return [...new Set(base)].join(', ');
}
export function buildCategoryKeywords(name) {
  return `${name} telugu meme sounds, ${name} audio download, ${name} memes mp3, telugu ${name} sounds download, free ${name} audio`;
}
export function buildHomeKeywords() {
  return 'telugu meme sounds, telugu meme audio download, telugu meme mp3, free telugu sounds, telugu ringtones download, viral telugu audio, telugu meme ringtones';
}

// ── Schema: AudioObject ───────────────────────────────────────────────────────
export function buildSchemaAudio(sound) {
  const thumbnail = sound.thumbnailUrl || sound.categoryImageUrl || DEFAULT_OG_IMAGE;
  const cats = (sound.categories || []).map(c => c.name || c);
  return {
    '@context': 'https://schema.org',
    '@type': 'AudioObject',
    name: sound.title,
    description: sound.description || `${sound.title} Telugu meme sound`,
    contentUrl: sound.audioUrl,
    thumbnailUrl: thumbnail,
    uploadDate: sound.createdAt,
    inLanguage: 'te',
    genre: 'Meme Sound',
    keywords: (sound.tags || []).join(', '),
    interactionStatistic: [
      {
        '@type': 'InteractionCounter',
        interactionType: 'https://schema.org/ListenAction',
        userInteractionCount: sound.playCount || 0,
      },
      {
        '@type': 'InteractionCounter',
        interactionType: 'https://schema.org/DownloadAction',
        userInteractionCount: sound.downloadCount || 0,
      },
    ],
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    ...(cats.length > 0 && {
      about: cats.map(c => ({ '@type': 'Thing', name: c })),
    }),
  };
}

// ── Schema: BreadcrumbList ────────────────────────────────────────────────────
export function buildSchemaBreadcrumb(crumbs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: `${SITE_URL}${c.path}`,
    })),
  };
}

// ── Schema: WebSite (with SearchAction) ───────────────────────────────────────
export function buildSchemaWebsite() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: buildHomeDescription(),
    inLanguage: ['te', 'en'],
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

// ── Schema: ItemList (for category/tag pages) ─────────────────────────────────
export function buildSchemaItemList(sounds, pageUrl) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    url: `${SITE_URL}${pageUrl}`,
    numberOfItems: sounds.length,
    itemListElement: sounds.slice(0, 50).map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE_URL}/sounds/${s.slug}`,
      name: s.title,
    })),
  };
}

export { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE };
