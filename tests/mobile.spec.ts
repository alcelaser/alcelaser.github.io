/**
 * site.spec.ts – comprehensive Playwright test suite for alcelaser.github.io
 *
 * All selectors are grounded in the actual HTML from the Astro build.
 * "hidden" links (mobile-menu off-canvas) are excluded from visibility checks
 * by scoping to :not(#mobile-menu) parents.
 */
import { test, expect, type Page } from '@playwright/test';

// ─────────────────────────────────────────────────────────────────────────────
//  Helpers
// ─────────────────────────────────────────────────────────────────────────────

async function checkNoOverflow(page: Page) {
  const vw = page.viewportSize()!.width;
  const scrollW = await page.evaluate(() => document.documentElement.scrollWidth);
  expect(scrollW, 'Horizontal overflow detected').toBeLessThanOrEqual(vw + 1);
}

/** Find a visible `<a>` link that has the given href, outside the hidden mobile-menu. */
function visibleLink(page: Page, href: string) {
  return page.locator(`a[href="${href}"]:not(#mobile-menu a):visible`).first();
}

// ─────────────────────────────────────────────────────────────────────────────
//  NAVIGATION BAR (all viewports)
// ─────────────────────────────────────────────────────────────────────────────

test.describe('Navbar', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('renders and is fixed', async ({ page }) => {
    const nav = page.locator('#navbar');
    await expect(nav).toBeVisible();
    const pos = await nav.evaluate(el => getComputedStyle(el).position);
    expect(pos).toBe('fixed');
  });

  test('AM logo is visible', async ({ page }) => {
    await expect(page.locator('#navbar a', { hasText: 'AM' })).toBeVisible();
  });

  test('hamburger toggle exists on mobile', async ({ page }, info) => {
    test.skip(info.project.name === 'desktop', 'Mobile only');
    await expect(page.locator('#menu-toggle')).toBeVisible();
  });

  test('hamburger is hidden on desktop', async ({ page }, info) => {
    test.skip(info.project.name !== 'desktop', 'Desktop only');
    await expect(page.locator('#menu-toggle')).toBeHidden();
  });

  test('desktop nav links count ≥ 7', async ({ page }, info) => {
    test.skip(info.project.name !== 'desktop', 'Desktop only');
    const links = page.locator('#navbar .hidden.md\\:flex a.nav-link');
    expect(await links.count()).toBeGreaterThanOrEqual(7);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
//  MOBILE MENU
// ─────────────────────────────────────────────────────────────────────────────

test.describe('Mobile menu', () => {
  test('opens on toggle click and closes again', async ({ page }, info) => {
    test.skip(info.project.name === 'desktop', 'Mobile only');
    await page.goto('/');
    const toggle = page.locator('#menu-toggle');
    const menu = page.locator('#mobile-menu');

    await expect(toggle).toBeVisible();

    // Initially offscreen
    await expect(menu).not.toBeInViewport();

    // Open
    await toggle.click();
    // Increase wait since transition is 500ms
    await page.waitForTimeout(600);
    await expect(menu).toBeInViewport();

    // Close
    await toggle.click();
    await page.waitForTimeout(600);
    await expect(menu).not.toBeInViewport();
  });

  test('mobile nav links count ≥ 7', async ({ page }, info) => {
    test.skip(info.project.name === 'desktop', 'Mobile only');
    await page.goto('/');
    expect(await page.locator('#mobile-menu a.mobile-nav-link').count()).toBeGreaterThanOrEqual(7);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
//  HOMEPAGE SECTIONS
// ─────────────────────────────────────────────────────────────────────────────

test.describe('Homepage – section presence', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('no horizontal overflow', async ({ page }) => { await checkNoOverflow(page); });
  test('<html> lang is "en"', async ({ page }) => {
    expect(await page.locator('html').getAttribute('lang')).toBe('en');
  });
  test('hero renders with name', async ({ page }) => {
    await expect(page.locator('#hero')).toBeVisible();
    await expect(page.locator('#hero-name')).toBeVisible();
  });
  test('hero has 3 social links', async ({ page }) => {
    expect(await page.locator('#hero-socials a').count()).toBe(3);
  });
  test('hero CTA has ≥3 buttons', async ({ page }) => {
    expect(await page.locator('#hero-cta a').count()).toBeGreaterThanOrEqual(3);
  });
  test('about section renders', async ({ page }) => {
    await expect(page.locator('#about')).toBeVisible();
  });
  test('4 stat counters', async ({ page }) => {
    await expect(page.locator('.stat-number')).toHaveCount(4);
  });
  test('experience section renders', async ({ page }) => {
    await expect(page.locator('#experience')).toBeVisible();
  });
  test('education section renders', async ({ page }) => {
    await expect(page.locator('#education')).toBeVisible();
  });
  test('skills section renders', async ({ page }) => {
    await expect(page.locator('#skills')).toBeVisible();
  });
  test('awards section renders', async ({ page }) => {
    await expect(page.locator('#awards')).toBeVisible();
  });
  test('articles section renders with ≥1 card', async ({ page }) => {
    await expect(page.locator('#articles')).toBeVisible({ timeout: 10000 });
    expect(await page.locator('#articles a.glass').count()).toBeGreaterThan(0);
  });
  test('contact section renders', async ({ page }) => {
    await expect(page.locator('#contact')).toBeVisible({ timeout: 10000 });
  });
  test('contact has mailto link', async ({ page }) => {
    await expect(page.locator('#contact a[href^="mailto:"]').first()).toBeVisible({ timeout: 10000 });
  });
  test('footer is present', async ({ page }) => {
    await expect(page.locator('footer')).toBeVisible();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
//  HOMEPAGE – desktop layout
// ─────────────────────────────────────────────────────────────────────────────

test.describe('Homepage – desktop layout', () => {
  test('experience section has 96px padding-top', async ({ page }, info) => {
    test.skip(info.project.name !== 'desktop', 'Desktop only');
    await page.goto('/');
    await expect(page.locator('#experience')).toBeVisible();
    const pt = await page.locator('#experience').evaluate(
      el => parseInt(getComputedStyle(el).paddingTop)
    );
    expect(pt).toBe(96);
  });

  test('stat card has 24px padding-top', async ({ page }, info) => {
    test.skip(info.project.name !== 'desktop', 'Desktop only');
    await page.goto('/');
    await expect(page.locator('.stat-number').first()).toBeVisible();
    const pt = await page.locator('.stat-number').first()
      .locator('..').evaluate(el => parseInt(getComputedStyle(el).paddingTop));
    expect(pt).toBe(24);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
//  BLOG INDEX
// ─────────────────────────────────────────────────────────────────────────────

test.describe('Blog index (/blog)', () => {
  test.beforeEach(async ({ page }) => { await page.goto('/blog'); });

  test('no horizontal overflow', async ({ page }) => { await checkNoOverflow(page); });
  test('<html> lang is "en"', async ({ page }) => {
    expect(await page.locator('html').getAttribute('lang')).toBe('en');
  });
  test('heading says "Articles"', async ({ page }) => {
    await expect(page.locator('#blog-content h1')).toContainText(/articles/i);
  });
  test('≥4 blog cards render', async ({ page }) => {
    expect(await page.locator('#blog-content a.glass').count()).toBeGreaterThanOrEqual(4);
  });
  test('back link to / is visible (desktop nav)', async ({ page }) => {
    // The back link in the page header (not the mobile menu)
    await expect(visibleLink(page, '/')).toBeVisible();
  });
  test('each card has a non-empty title', async ({ page }) => {
    const titles = page.locator('#blog-content h2');
    const count = await titles.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      const text = await titles.nth(i).textContent();
      expect(text?.trim().length, `Card ${i} title empty`).toBeGreaterThan(0);
    }
  });
});

// ─────────────────────────────────────────────────────────────────────────────
//  BLOG ARTICLES
// ─────────────────────────────────────────────────────────────────────────────

test.describe('Blog article pages', () => {
  const articles = [
    '/blog/ai-bubble',
    '/blog/ai-power-structures',
    '/blog/efficient-compute',
    '/blog/vibe-coding',
  ];

  for (const url of articles) {
    test(`${url} – h1, back link, prose`, async ({ page }) => {
      await page.goto(url);
      const h1 = page.locator('article h1');
      await expect(h1).toBeVisible();
      expect((await h1.textContent())!.trim().length).toBeGreaterThan(5);
      // Back link anchored inside article.markdown-content (ArticleLayout.astro line 15)
      const back = page.locator('article.markdown-content a.text-accent-blue[href="/blog"]').first();
      await expect(back).toBeVisible();
      await expect(page.locator('article .prose')).toBeVisible();
    });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
//  RESEARCH INDEX
// ─────────────────────────────────────────────────────────────────────────────

test.describe('Research index (/research)', () => {
  test.beforeEach(async ({ page }) => { await page.goto('/research'); });

  test('no horizontal overflow', async ({ page }) => { await checkNoOverflow(page); });
  test('heading says "Research"', async ({ page }) => {
    await expect(page.locator('#research-content h1')).toContainText(/research/i);
  });
  test('≥1 research card', async ({ page }) => {
    expect(await page.locator('#research-content a.glass').count()).toBeGreaterThanOrEqual(1);
  });
  test('back link visible', async ({ page }) => {
    await expect(visibleLink(page, '/')).toBeVisible();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
//  DEMOS INDEX
// ─────────────────────────────────────────────────────────────────────────────

test.describe('Demos index (/demos)', () => {
  test.beforeEach(async ({ page }) => { await page.goto('/demos'); });

  test('no horizontal overflow', async ({ page }) => { await checkNoOverflow(page); });
  test('heading says "Demo"', async ({ page }) => {
    await expect(page.locator('#demos-content h1')).toContainText(/demo/i);
  });
  test('4 demo cards', async ({ page }) => {
    await expect(page.locator('#demos-content a.glass')).toHaveCount(4);
  });
  test('LimitedLands Showcase badge', async ({ page }) => {
    await expect(
      page.locator('a', { hasText: 'Limited Lands' }).locator('span', { hasText: /showcase/i })
    ).toBeVisible();
  });
  test('BUS Roma Showcase badge', async ({ page }) => {
    await expect(
      page.locator('a', { hasText: 'BUS Roma' }).locator('span', { hasText: /showcase/i })
    ).toBeVisible();
  });
  test('back link visible', async ({ page }) => {
    await expect(visibleLink(page, '/')).toBeVisible();
  });
  test('internal demo card hrefs return 200', async ({ page }) => {
    const cards = page.locator('#demos-content a.glass');
    const count = await cards.count();
    const hrefs: string[] = [];
    for (let i = 0; i < count; i++) {
      const href = await cards.nth(i).getAttribute('href');
      if (href && !href.startsWith('http')) hrefs.push(href);
    }
    for (const href of hrefs) {
      const r = await page.request.get(href);
      expect(r.status(), `${href} → ${r.status()}`).toBe(200);
    }
  });
});

// ─────────────────────────────────────────────────────────────────────────────
//  DEMO – Codice Fiscale
// ─────────────────────────────────────────────────────────────────────────────

test.describe('Codice Fiscale demo (/demos/cfpython)', () => {
  test.beforeEach(async ({ page }) => { await page.goto('/demos/cfpython'); });

  test('no horizontal overflow', async ({ page }) => { await checkNoOverflow(page); });
  test('heading contains "Codice Fiscale"', async ({ page }) => {
    await expect(page.locator('h1')).toContainText(/codice fiscale/i);
  });
  test('form inputs visible', async ({ page }) => {
    for (const id of ['#surname', '#name', '#day', '#month', '#year', '#birthplace']) {
      await expect(page.locator(id)).toBeVisible();
    }
  });
  test('empty state prompt visible', async ({ page }) => {
    await expect(page.locator('#result-empty')).toBeVisible();
    await expect(page.locator('#result-code')).toBeHidden();
  });
  test('surname input accepts text', async ({ page }) => {
    await page.locator('#surname').fill('ROSSI');
    await expect(page.locator('#surname')).toHaveValue('ROSSI');
  });
  test('algorithm footer visible', async ({ page }) => {
    await expect(page.locator('span', { hasText: 'surname' }).first()).toBeVisible();
  });
  test('GitHub source link', async ({ page }) => {
    await expect(page.locator('a[href*="github.com/alcelaser/cfpython"]')).toBeVisible();
  });
  test('back-to-demos link is in the page header (not mobile menu)', async ({ page }) => {
    // The page header link (top-left, non-nav)
    const back = page.locator('a[href="/demos"]:not(#mobile-menu a):visible').first();
    await expect(back).toBeVisible();
  });
  test('CF computes 16-char code for ROMA', async ({ page }) => {
    await page.locator('#surname').fill('ROSSI');
    await page.locator('#name').fill('MARIO');
    await page.locator('#day').fill('1');
    await page.locator('#month').selectOption('1');
    await page.locator('#year').fill('1990');
    await page.locator('#birthplace').fill('ROMA');
    await page.waitForTimeout(2500);
    await expect(page.locator('#result-empty')).toBeHidden();
    await expect(page.locator('#result-code')).toBeVisible();
    const code = await page.locator('#cf-display').textContent();
    expect(code?.replace(/\s/g, '').length).toBe(16);
  });
  test('copy button visible after computing', async ({ page }) => {
    await page.locator('#surname').fill('ROSSI');
    await page.locator('#name').fill('MARIO');
    await page.locator('#day').fill('1');
    await page.locator('#month').selectOption('1');
    await page.locator('#year').fill('1990');
    await page.locator('#birthplace').fill('ROMA');
    await page.waitForTimeout(2500);
    await expect(page.locator('#copy-btn')).toBeVisible();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
//  DEMO – Limited Lands
// ─────────────────────────────────────────────────────────────────────────────

test.describe('Limited Lands demo (/demos/limitedlands)', () => {
  test.beforeEach(async ({ page }) => { await page.goto('/demos/limitedlands'); });

  test('no horizontal overflow', async ({ page }) => { await checkNoOverflow(page); });
  test('heading says "Limited Lands"', async ({ page }) => {
    await expect(page.locator('h1')).toContainText(/limited lands/i);
  });
  test('"Android app" badge exact text', async ({ page }) => {
    const badge = page.locator('.font-mono', { hasText: 'Android app' }).first();
    await expect(badge).toBeVisible();
    expect((await badge.textContent())!.replace(/\s+/g, ' ').trim()).toBe('Android app');
  });
  test('phone screen with ≥2 slides', async ({ page }) => {
    const screen = page.locator('#phone-screen');
    await expect(screen).toBeVisible();
    expect(await screen.locator('.screen-slide').count()).toBeGreaterThanOrEqual(2);
  });
  test('3 navigation dots', async ({ page }) => {
    await expect(page.locator('.screen-dot')).toHaveCount(3);
  });
  test('≥4 feature cards', async ({ page }) => {
    expect(await page.locator('.divide-y > div').count()).toBeGreaterThanOrEqual(4);
  });
  test('Flutter in tech footer', async ({ page }) => {
    await expect(page.locator('span', { hasText: /flutter/i }).first()).toBeVisible();
  });
  test('back-to-demos link in page header', async ({ page }) => {
    await expect(page.locator('a[href="/demos"]:not(#mobile-menu a):visible').first()).toBeVisible();
  });
  test('dot 2 transitions slide 1 into view', async ({ page }) => {
    await page.locator('.screen-dot').nth(1).click();
    await page.waitForTimeout(500);
    const opacity = await page.locator('.screen-slide[data-screen="1"]')
      .evaluate(el => parseFloat(getComputedStyle(el).opacity));
    expect(opacity).toBeGreaterThan(0.8);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
//  DEMO – BUS Roma
// ─────────────────────────────────────────────────────────────────────────────

test.describe('BUS Roma demo (/demos/bus-roma)', () => {
  test.beforeEach(async ({ page }) => { await page.goto('/demos/bus-roma'); });

  test('no horizontal overflow', async ({ page }) => { await checkNoOverflow(page); });
  test('heading says "BUS Roma"', async ({ page }) => {
    await expect(page.locator('h1')).toContainText(/bus roma/i);
  });
  test('"Android app" badge exact text', async ({ page }) => {
    const badge = page.locator('.font-mono', { hasText: 'Android app' }).first();
    await expect(badge).toBeVisible();
    expect((await badge.textContent())!.replace(/\s+/g, ' ').trim()).toBe('Android app');
  });
  test('phone screen exists', async ({ page }) => {
    await expect(page.locator('#phone-screen')).toBeVisible();
  });
  test('slideshow has ≥2 slides', async ({ page }) => {
    expect(await page.locator('#phone-screen .screen-slide').count()).toBeGreaterThanOrEqual(2);
  });
  test('feature cards ≥3', async ({ page }) => {
    expect(await page.locator('.divide-y > div').count()).toBeGreaterThanOrEqual(3);
  });
  test('Flutter in tech footer', async ({ page }) => {
    await expect(page.locator('span', { hasText: /flutter/i }).first()).toBeVisible();
  });
  test('back-to-demos link in page header', async ({ page }) => {
    await expect(page.locator('a[href="/demos"]:not(#mobile-menu a):visible').first()).toBeVisible();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
//  LOCALISED ROUTES – Italian
// ─────────────────────────────────────────────────────────────────────────────

test.describe('Italian locale (/it)', () => {
  test('<html> lang is "it"', async ({ page }) => {
    await page.goto('/it');
    expect(await page.locator('html').getAttribute('lang')).toBe('it');
  });
  test('hero renders', async ({ page }) => {
    await page.goto('/it');
    await expect(page.locator('#hero')).toBeVisible();
  });
  test('no overflow on /it', async ({ page }) => {
    await page.goto('/it');
    await checkNoOverflow(page);
  });
  test('/it/blog shows ≥1 card', async ({ page }) => {
    await page.goto('/it/blog');
    await expect(page.locator('html')).toHaveAttribute('lang', 'it');
    expect(await page.locator('#blog-content a.glass').count()).toBeGreaterThan(0);
  });
  test('/it/demos shows 4 cards', async ({ page }) => {
    await page.goto('/it/demos');
    await expect(page.locator('#demos-content a.glass')).toHaveCount(4);
  });
  test('/it/research loads', async ({ page }) => {
    await page.goto('/it/research');
    await expect(page.locator('#research-content')).toBeVisible();
  });
  test('IT "Live Demos" button (page body) links to /it/demos', async ({ page }) => {
    await page.goto('/it');
    // The Live Demos button in the page body (not mobile nav)
    await expect(
      page.locator('a[href="/it/demos"]:not(#mobile-menu a):visible').first()
    ).toBeVisible();
  });
  test('/it desktop navbar blog link → /it/blog', async ({ page }, info) => {
    test.skip(info.project.name !== 'desktop', 'Desktop only');
    await page.goto('/it');
    await expect(
      page.locator('#navbar .hidden.md\\:flex a[href="/it/blog"]').first()
    ).toBeVisible();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
//  LOCALISED ROUTES – French
// ─────────────────────────────────────────────────────────────────────────────

test.describe('French locale (/fr)', () => {
  test('<html> lang is "fr"', async ({ page }) => {
    await page.goto('/fr');
    expect(await page.locator('html').getAttribute('lang')).toBe('fr');
  });
  test('hero renders', async ({ page }) => {
    await page.goto('/fr');
    await expect(page.locator('#hero')).toBeVisible();
  });
  test('no overflow on /fr', async ({ page }) => {
    await page.goto('/fr');
    await checkNoOverflow(page);
  });
  test('/fr/blog shows ≥1 card', async ({ page }) => {
    await page.goto('/fr/blog');
    expect(await page.locator('#blog-content a.glass').count()).toBeGreaterThan(0);
  });
  test('/fr/demos shows 4 cards', async ({ page }) => {
    await page.goto('/fr/demos');
    await expect(page.locator('#demos-content a.glass')).toHaveCount(4);
  });
  test('/fr/research loads', async ({ page }) => {
    await page.goto('/fr/research');
    await expect(page.locator('#research-content')).toBeVisible();
  });
  test('FR "Live Demos" button (page body) links to /fr/demos', async ({ page }) => {
    await page.goto('/fr');
    await expect(
      page.locator('a[href="/fr/demos"]:not(#mobile-menu a):visible').first()
    ).toBeVisible();
  });
  test('/fr desktop navbar blog link → /fr/blog', async ({ page }, info) => {
    test.skip(info.project.name !== 'desktop', 'Desktop only');
    await page.goto('/fr');
    await expect(
      page.locator('#navbar .hidden.md\\:flex a[href="/fr/blog"]').first()
    ).toBeVisible();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
//  404 PAGE
// ─────────────────────────────────────────────────────────────────────────────

test.describe('404 page', () => {
  test.beforeEach(async ({ page }) => {
    // Astro static preview returns HTTP 404 but still renders 404.astro body
    await page.goto('/this-does-not-exist-xyz', { waitUntil: 'domcontentloaded' });
  });

  test('custom 404 page body renders', async ({ page }) => {
    // The page body should mention "Not Found"
    await expect(page.locator('h1')).toContainText(/not found/i);
  });
  test('404 has working Home link (not in mobile menu)', async ({ page }) => {
    await expect(
      page.locator('a[href="/"]:not(#mobile-menu a):visible').first()
    ).toBeVisible();
  });
  test('404 has Blog link', async ({ page }) => {
    await expect(
      page.locator('a[href="/blog"]:not(#mobile-menu a):visible').first()
    ).toBeVisible();
  });
  test('404 has Demos link', async ({ page }) => {
    await expect(
      page.locator('a[href="/demos"]:not(#mobile-menu a):visible').first()
    ).toBeVisible();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
//  SEO / ACCESSIBILITY
// ─────────────────────────────────────────────────────────────────────────────

test.describe('SEO / accessibility', () => {
  const pages = ['/', '/blog', '/demos', '/research', '/it', '/fr'];

  for (const path of pages) {
    test(`${path} – has meta description`, async ({ page }) => {
      await page.goto(path);
      const meta = await page.locator('meta[name="description"]').getAttribute('content');
      expect(meta?.trim().length, `${path} missing meta description`).toBeGreaterThan(10);
    });
    test(`${path} – exactly one <h1>`, async ({ page }) => {
      await page.goto(path);
      expect(await page.locator('h1').count(), `${path} should have 1 <h1>`).toBe(1);
    });
    test(`${path} – <html> has lang attribute`, async ({ page }) => {
      await page.goto(path);
      expect((await page.locator('html').getAttribute('lang'))?.trim().length).toBeGreaterThan(0);
    });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
//  PARTICLE CANVAS
// ─────────────────────────────────────────────────────────────────────────────

test('Particle canvas exists in DOM', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#particle-canvas')).toBeAttached();
});
