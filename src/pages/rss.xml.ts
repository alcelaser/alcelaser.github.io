import rss from '@astrojs/rss';
import sanitizeHtml from 'sanitize-html';

export async function GET(context) {
  const posts = import.meta.glob('./blog/*.md', { eager: true });
  
  const items = await Promise.all(Object.values(posts).map(async (post) => {
    // Attempt to extract a date from originalUrl (e.g. https://.../2025/11/18/...)
    let pubDate = post.frontmatter.pubDate;
    if (!pubDate && post.frontmatter.originalUrl) {
      const match = post.frontmatter.originalUrl.match(/(\d{4})\/(\d{2})\/(\d{2})/);
      if (match) {
        pubDate = new Date(`${match[1]}-${match[2]}-${match[3]}`);
      }
    }
    // Fallback date
    if (!pubDate) pubDate = new Date('2026-01-01');

    let htmlContent = '';
    if (typeof post.compiledContent === 'function') {
      htmlContent = await post.compiledContent();
    } else {
      htmlContent = String(post.compiledContent || '');
    }

    return {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      pubDate: pubDate,
      link: post.url,
      // Render full markdown content into the RSS feed
      content: sanitizeHtml(htmlContent, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img'])
      }),
      // Add author info if available
      author: 'Albert Maccanico',
      customData: post.frontmatter.publication ? `<category>${post.frontmatter.publication}</category>` : '',
    };
  }));

  return rss({
    title: 'Albert Maccanico Blog',
    description: 'Discussions on AI, Economics, and Technology by Albert Maccanico.',
    site: context.site || 'https://alcelaser.github.io',
    items: items,
    stylesheet: '/rss-styles.xsl',
    customData: `<language>en-us</language>`,
  });
}