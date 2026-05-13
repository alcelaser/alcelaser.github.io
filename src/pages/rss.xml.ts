import sanitizeHtml from 'sanitize-html';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async (context) => {
  const posts = import.meta.glob('./blog/*.md', { eager: true });
  
  const baseUrl = (context.site || new URL('https://alcelaser.github.io')).toString().replace(/\/$/, '');
  
  const items = await Promise.all(Object.values(posts).map(async (post: any) => {
    // Attempt to extract a date from originalUrl (e.g. https://.../2025/11/18/...)
    let pubDate = post.frontmatter.pubDate ? new Date(post.frontmatter.pubDate) : null;
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

    const sanitizedHtml = sanitizeHtml(htmlContent, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img'])
    });

    const categoryStr = post.frontmatter.publication 
      ? `<category>${post.frontmatter.publication}</category>` 
      : '';

    const postLink = `${baseUrl}${post.url || ''}`;

    return `
    <item>
      <title><![CDATA[${post.frontmatter.title || ''}]]></title>
      <link>${postLink}</link>
      <guid isPermaLink="true">${postLink}</guid>
      <description><![CDATA[${post.frontmatter.description || ''}]]></description>
      <pubDate>${pubDate.toUTCString()}</pubDate>
      ${categoryStr}
      <content:encoded><![CDATA[${sanitizedHtml}]]></content:encoded>
    </item>`;
  }));

  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet href="/rss-styles.xsl" type="text/xsl"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>Albert Maccanico Blog and Articles</title>
    <description>Discussions on AI, Ethics, Economics, and Technology.</description>
    <link>${baseUrl}/</link>
    <language>en-us</language>
${items.join('\n')}
  </channel>
</rss>`;

  return new Response(rssFeed, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}