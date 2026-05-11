import rss from '@astrojs/rss';

async function test() {
  const feed = await rss({
    title: 'Test',
    description: 'test feed',
    site: 'http://example.com',
    items: [{
      title: 'Item 1',
      link: 'http://example.com/1',
      pubDate: new Date(),
      customData: '<content:encoded><![CDATA[<h1>HI</h1>]]></content:encoded>'
    }]
  });
  console.log(await feed.text());
}
test();