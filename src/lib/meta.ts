export interface PageMeta {
  title: string;
  description: string;
  url: string;
  image?: string;
}

const BASE = 'https://www.manasvitours.com';

export function setPageMeta({ title, description, url, image = '/og-image.jpg' }: PageMeta) {
  document.title = title;

  // Canonical URL
  let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', `${BASE}${url}`);

  const setMeta = (name: string, content: string, isProperty = false) => {
    const attr = isProperty ? 'property' : 'name';
    let el = document.querySelector(`meta[${attr}="${name}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attr, name);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  setMeta('description', description);

  setMeta('og:title', title, true);
  setMeta('og:description', description, true);
  setMeta('og:type', 'website', true);
  setMeta('og:url', `${BASE}${url}`, true);
  setMeta('og:image', `${BASE}${image}`, true);

  setMeta('twitter:card', 'summary_large_image');
  setMeta('twitter:title', title);
  setMeta('twitter:description', description);
  setMeta('twitter:image', `${BASE}${image}`);
}
