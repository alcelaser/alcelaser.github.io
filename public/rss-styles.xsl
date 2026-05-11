<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="3.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
      <head>
        <title><xsl:value-of select="/rss/channel/title"/> - RSS Feed</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 2rem; background-color: #f9f9f9; }
          .header { background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); margin-bottom: 2rem; }
          h1 { margin-top: 0; color: #111; }
          .description { color: #666; font-size: 1.1rem; }
          .item { background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); margin-bottom: 1.5rem; transition: transform 0.2s; }
          .item:hover { transform: translateY(-2px); box-shadow: 0 4px 8px rgba(0,0,0,0.1); }
          .item h2 { margin-top: 0; }
          .item h2 a { color: #0066cc; text-decoration: none; }
          .item h2 a:hover { text-decoration: underline; }
          .meta { color: #888; font-size: 0.9rem; margin-bottom: 1rem; }
          .subscribe-box { background: #e3f2fd; padding: 1rem; border-radius: 6px; margin: 1rem 0; border: 1px solid #bbdefb; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1><xsl:value-of select="/rss/channel/title"/></h1>
          <p class="description"><xsl:value-of select="/rss/channel/description"/></p>
          <div class="subscribe-box">
            <strong>Subscribe:</strong> This is an RSS feed. To subscribe, copy the URL from your address bar and paste it into your preferred RSS Reader (like Feedly, Inoreader, or NewsBlur).
          </div>
          <p><a href="{/rss/channel/link}">Visit Website &#x2192;</a></p>
        </div>
        <div class="items">
          <xsl:for-each select="/rss/channel/item">
            <div class="item">
              <h2><a href="{link}"><xsl:value-of select="title"/></a></h2>
              <div class="meta">
                Published: <xsl:value-of select="pubDate"/>
              </div>
              <div class="content">
                <xsl:value-of select="description"/>
              </div>
              <p><a href="{link}">Read full article &#x2192;</a></p>
            </div>
          </xsl:for-each>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
