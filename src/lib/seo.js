// ── SEO utility functions for erripuku.engineer ──────────────────────────────

const SITE_NAME = 'ErriPuku.engineer';
const SITE_URL  = 'https://erripuku.engineer';
const SITE_TAGLINE = 'Telugu Meme Sounds Free Download';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.jpg`;

// ── Title builders ────────────────────────────────────────────────────────────
export function buildSoundTitle(title) {
  return `${title} Telugu Meme Sound Download | ${SITE_NAME}`;
}
export function buildCategoryTitle(name, count) {
  return `${name} Telugu Meme Sounds (${count}+ Audios) Free Download | ${SITE_NAME}`;
}
export function buildTagTitle(tag, count) {
  return `${tag} Telugu Meme Sounds - ${count} Audios Free Download | ${SITE_NAME}`;
}
export function buildHomeTitle() {
  return `Telugu Meme Sounds Free Download - 484+ Audio Clips | ${SITE_NAME}`;
}

// ── Description builders ──────────────────────────────────────────────────────
export function buildSoundDescription(sound) {
  const base = sound.description?.trim() || '';
  const tagStr = (sound.tags || []).slice(0, 4).join(', ');
  const catStr = (sound.categories || []).map(c => c.name || c).join(', ');
  if (base) {
    return `${base} Download ${sound.title} Telugu meme sound for free at ${SITE_NAME}. Tags: ${tagStr}.`.slice(0, 160);
  }
  return `Download "${sound.title}" Telugu meme sound for free. Category: ${catStr}. Tags: ${tagStr}. Play online or save as MP3 at ${SITE_NAME}.`.slice(0, 160);
}
export function buildCategoryDescription(name, count) {
  return `Browse and download ${count}+ ${name} Telugu meme sounds for free. Stream online or save as MP3 at ${SITE_NAME}.`.slice(0, 160);
}
export function buildTagDescription(tag, count) {
  return `${count} Telugu meme sounds tagged "${tag}". Free download as MP3 or stream online at ${SITE_NAME}.`.slice(0, 160);
}
export function buildHomeDescription() {
  return `Stream and download 484+ Telugu meme sounds, dialogues, and ringtones for free. Trending meme audios from Telugu movies, web series, and viral clips at ${SITE_NAME}.`;
}

// ── Keywords builder ──────────────────────────────────────────────────────────
export function buildKeywords(sound) {
  const base = [
    sound.title,
    `${sound.title} telugu meme sound`,
    `${sound.title} meme audio download`,
    `${sound.title} mp3 download`,
    `${sound.title} ringtone`,
    ...(sound.tags || []),
    ...(sound.categories || []).map(c => c.name || c),
    'telugu meme sounds',
    'telugu meme audio download',
    'telugu meme ringtones',
    'telugu memes mp3',
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
