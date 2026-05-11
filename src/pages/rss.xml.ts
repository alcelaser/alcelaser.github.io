import rss from '@astrojs/rss';

export async function GET(context) {
  const posts = import.meta.glob('./blog/*.md', { eager: true });
  
  const items = Object.values(posts).map((post) => ({
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    pubDate: post.frontmatter.pubDate || new Date('2026-01-01'), // Default date if missing
    link: post.url,
  }));

  return rss({
    title: 'Albert Maccanico Blog',
    description: 'Discussions on AI, Economics, and Technology by Albert Maccanico.',
    site: context.site || 'https://alcelaser.github.io',
    items: items,
    customData: `<language>en-us</language>`,
  });
}