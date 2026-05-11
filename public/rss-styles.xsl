<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="3.0" 
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:atom="http://www.w3.org/2005/Atom" 
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
      <head>
        <title><xsl:value-of select="/rss/channel/title"/> - RSS Feed</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
        <style>
          :root {
            --bauhaus-red: #D22630;
            --bauhaus-yellow: #EDB71A;
            --bauhaus-blue: #003882;
            --bauhaus-white: #F4F4F4;
            --bauhaus-black: #1A1A1A;
          }
          body { 
            font-family: ui-monospace, SFPro-Regular, Menlo, Monaco, Consolas, "Liberation Sans", "Courier New", monospace; 
            line-height: 1.6; 
            color: var(--bauhaus-black); 
            max-width: 900px; 
            margin: 0 auto; 
            padding: 2rem; 
            background-color: #e5e5e5; 
            background-image: radial-gradient(#d5d5d5 1px, transparent 0);
            background-size: 20px 20px;
          }
          .header { 
            background: var(--bauhaus-white); 
            padding: 2rem; 
            border: 4px solid var(--bauhaus-black);
            box-shadow: 8px 8px 0px var(--bauhaus-black);
            margin-bottom: 3rem; 
          }
          h1 { 
            margin-top: 0; 
            color: var(--bauhaus-black); 
            text-transform: uppercase;
            font-weight: 900;
            font-size: 2.5rem;
            letter-spacing: -1px;
            border-bottom: 4px solid var(--bauhaus-red);
            display: inline-block;
            padding-bottom: 0.5rem;
            margin-bottom: 1rem;
          }
          .description { color: var(--bauhaus-black); font-size: 1.2rem; font-weight: bold; }
          .item { 
            background: var(--bauhaus-white); 
            padding: 2rem; 
            border: 4px solid var(--bauhaus-black);
            box-shadow: 8px 8px 0px var(--bauhaus-black);
            margin-bottom: 2.5rem; 
          }
          .item h2 { 
            margin-top: 0; 
            font-size: 2rem;
            text-transform: uppercase;
          }
          .item h2 a { color: var(--bauhaus-red); text-decoration: none; border-bottom: 4px solid transparent; transition: border-bottom 0.1s;}
          .item h2 a:hover { border-bottom: 4px solid var(--bauhaus-red); }
          .meta { 
            color: var(--bauhaus-blue); 
            font-size: 1rem; 
            font-weight: bold;
            border: 2px solid var(--bauhaus-blue);
            padding: 0.5rem;
            display: inline-block;
            margin-bottom: 1.5rem; 
            background: rgba(0, 56, 130, 0.1);
          }
          .subscribe-box { 
            background: var(--bauhaus-yellow); 
            padding: 1.5rem; 
            margin: 1.5rem 0; 
            border: 3px solid var(--bauhaus-black); 
            font-weight: bold;
            color: var(--bauhaus-black);
          }
          .content {
            margin-top: 1.5rem;
            padding-top: 1.5rem;
            border-top: 4px dashed var(--bauhaus-black);
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            font-size: 1.1rem;
          }
          .content p {
            margin-bottom: 1.5rem;
          }
          .content h2, .content h3 {
            color: var(--bauhaus-black);
          }
          .site-link {
            display: inline-block;
            background: var(--bauhaus-black);
            color: var(--bauhaus-white) !important;
            text-decoration: none;
            padding: 0.75rem 1.5rem;
            font-weight: bold;
            text-transform: uppercase;
            border: 2px solid var(--bauhaus-black);
            box-shadow: 4px 4px 0px var(--bauhaus-blue);
            transition: transform 0.1s, box-shadow 0.1s;
          }
          .site-link:hover {
            transform: translate(2px, 2px);
            box-shadow: 2px 2px 0px var(--bauhaus-blue);
          }
          .read-more {
            display: inline-block;
            margin-top: 1.5rem;
            background: var(--bauhaus-blue);
            color: var(--bauhaus-white) !important;
            text-decoration: none;
            padding: 0.5rem 1rem;
            font-weight: bold;
            text-transform: uppercase;
            border: 2px solid var(--bauhaus-black);
            box-shadow: 4px 4px 0px var(--bauhaus-black);
            transition: transform 0.1s, box-shadow 0.1s;
          }
          .read-more:hover {
            transform: translate(2px, 2px);
            box-shadow: 2px 2px 0px var(--bauhaus-black);
          }
        </style>
        <script>
          document.addEventListener("DOMContentLoaded", function() {
            var contents = document.querySelectorAll('.content');
            contents.forEach(function(el) {
              // The browser rendered escaped HTML tags as plain text. 
              // Setting innerHTML to itself parses the tags into real DOM nodes.
              // We use textContent because disable-output-escaping failed fallback.
              if (el.textContent) {
                var txt = el.textContent;
                // Basic cleanup of leading/trailing spaces
                el.innerHTML = txt;
              }
            });
          });
        </script>
      </head>
      <body>
        <div class="header">
          <h1><xsl:value-of select="/rss/channel/title"/></h1>
          <p class="description"><xsl:value-of select="/rss/channel/description"/></p>
          <div class="subscribe-box">
            <strong>RSS FEED:</strong> This is a styled XML feed. Copy this page's URL and paste it into your favorite RSS reader to subscribe!
          </div>
          <p><a class="site-link" href="{/rss/channel/link}">Visit Main Website</a></p>
        </div>
        <div class="items">
          <xsl:for-each select="/rss/channel/item">
            <div class="item">
              <h2><a href="{link}"><xsl:value-of select="title"/></a></h2>
              <div class="meta">
                Published: <xsl:value-of select="substring(pubDate, 1, 16)"/>
              </div>
              <div class="content">
                <xsl:value-of select="content:encoded" disable-output-escaping="yes"/>
                
                <xsl:if test="not(content:encoded)">
                  <xsl:value-of select="description" disable-output-escaping="yes"/>
                </xsl:if>
              </div>
              <a class="read-more" href="{link}">Read Original Article</a>
            </div>
          </xsl:for-each>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
