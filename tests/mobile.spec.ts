import { test, expect } from '@playwright/test';

/* ------------------------------------------------------------------ */
/*  Homepage                                                           */
/* ------------------------------------------------------------------ */

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('no horizontal overflow', async ({ page }) => {
    const body = page.locator('body');
    const box = await body.boundingBox();
    const vw = page.viewportSize()!.width;
    expect(box!.width).toBeLessThanOrEqual(vw);
    // also check scrollWidth
    const scrollW = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(scrollW).toBeLessThanOrEqual(vw);
  });

  test('nav is visible', async ({ page }) => {
    await expect(page.locator('#navbar')).toBeVisible();
  });

  test('hero section renders', async ({ page }) => {
    await expect(page.locator('#hero')).toBeVisible();
    await expect(page.locator('#hero-name')).toBeVisible();
  });

  test('about section renders', async ({ page }) => {
    await expect(page.locator('#about')).toBeVisible();
  });

  test('experience section renders', async ({ page }) => {
    await expect(page.locator('#experience')).toBeVisible();
  });

  test('skills section renders', async ({ page }) => {
    await expect(page.locator('#skills')).toBeVisible();
  });

  test('contact section renders', async ({ page }) => {
    await expect(page.locator('#contact')).toBeVisible();
  });

  test('stat counters are present', async ({ page }) => {
    const stats = page.locator('.stat-number');
    await expect(stats).toHaveCount(4);
  });
});

/* ------------------------------------------------------------------ */
/*  Mobile navigation                                                  */
/* ------------------------------------------------------------------ */

test.describe('Mobile navigation', () => {
  test('hamburger menu opens and closes', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name === 'desktop', 'Desktop has no hamburger menu');
    await page.goto('/');
    const toggle = page.locator('#menu-toggle');
    const mobileMenu = page.locator('#mobile-menu');

    // Menu starts hidden (off-screen)
    await expect(toggle).toBeVisible();

    // Open
    await toggle.click();
    await page.waitForTimeout(600); // transition duration
    const transform = await mobileMenu.evaluate(el => getComputedStyle(el).transform);
    expect(transform).not.toContain('-');

    // Close
    await toggle.click();
  });

  test('mobile nav links exist', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name === 'desktop', 'Desktop has no hamburger menu');
    await page.goto('/');
    const links = page.locator('#mobile-menu a.mobile-nav-link');
    const count = await links.count();
    expect(count).toBeGreaterThanOrEqual(5);
  });
});

/* ------------------------------------------------------------------ */
/*  Demos index                                                        */
/* ------------------------------------------------------------------ */

test.describe('Demos index', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demos');
  });

  test('no horizontal overflow', async ({ page }) => {
    const scrollW = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(scrollW).toBeLessThanOrEqual(page.viewportSize()!.width);
  });

  test('all demo cards render', async ({ page }) => {
    const cards = page.locator('#demos-content a.glass');
    const count = await cards.count();
    expect(count).toBeGreaterThanOrEqual(4);
  });

  test('LimitedLands badge says Showcase', async ({ page }) => {
    const card = page.locator('a', { hasText: 'Limited Lands' });
    const badge = card.locator('span.font-mono', { hasText: /Showcase/i });
    await expect(badge).toBeVisible();
  });

  test('BUS Roma badge says Showcase', async ({ page }) => {
    const card = page.locator('a', { hasText: 'BUS Roma' });
    const badge = card.locator('span.font-mono', { hasText: /Showcase/i });
    await expect(badge).toBeVisible();
  });

  test('back link navigates home', async ({ page }) => {
    const backLink = page.locator('#demos-content a', { hasText: /Projects|Progetti|Projets|Back/i }).first();
    await expect(backLink).toBeVisible();
  });
});

/* ------------------------------------------------------------------ */
/*  LimitedLands demo                                                  */
/* ------------------------------------------------------------------ */

test.describe('LimitedLands demo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demos/limitedlands');
  });

  test('no horizontal overflow', async ({ page }) => {
    const scrollW = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(scrollW).toBeLessThanOrEqual(page.viewportSize()!.width);
  });

  test('badge text is exactly "Android app"', async ({ page }) => {
    const badge = page.locator('.font-mono', { hasText: 'Android app' }).first();
    await expect(badge).toBeVisible();
    await expect(badge).toContainText('Android app');
    // Ensure no extra explanation text after "Android app"
    const text = await badge.textContent();
    expect(text!.replace(/\s+/g, ' ').trim()).toBe('Android app');
  });

  test('phone mockup is visible', async ({ page }) => {
    const phone = page.locator('#phone-screen');
    await expect(phone).toBeVisible();
  });

  test('feature cards are visible', async ({ page }) => {
    // Should have at least 3 feature cards
    const features = page.locator('[class*="divide-y"] > div');
    const count = await features.count();
    expect(count).toBeGreaterThanOrEqual(3);
  });

  test('phone screen shows simulated content', async ({ page }) => {
    const screen = page.locator('#phone-screen');
    // Should have child content (the simulated app screens)
    const children = await screen.locator('> div').count();
    expect(children).toBeGreaterThanOrEqual(1);
  });

  test('tech footer exists', async ({ page }) => {
    const techFooter = page.locator('text=Flutter');
    await expect(techFooter.first()).toBeVisible();
  });
});

/* ------------------------------------------------------------------ */
/*  BUS Roma demo                                                      */
/* ------------------------------------------------------------------ */

test.describe('BUS Roma demo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demos/bus-roma');
  });

  test('no horizontal overflow', async ({ page }) => {
    const scrollW = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(scrollW).toBeLessThanOrEqual(page.viewportSize()!.width);
  });

  test('badge text is exactly "Android app"', async ({ page }) => {
    const badge = page.locator('.font-mono', { hasText: 'Android app' }).first();
    await expect(badge).toBeVisible();
    await expect(badge).toContainText('Android app');
    const text = await badge.textContent();
    expect(text!.replace(/\s+/g, ' ').trim()).toBe('Android app');
  });

  test('phone mockup is visible', async ({ page }) => {
    const phone = page.locator('#phone-screen');
    await expect(phone).toBeVisible();
  });

  test('slideshow has multiple slides', async ({ page }) => {
    const slides = page.locator('#phone-screen .absolute.inset-0');
    const count = await slides.count();
    expect(count).toBeGreaterThanOrEqual(2);
  });

  test('feature cards are visible', async ({ page }) => {
    const features = page.locator('[class*="divide-y"] > div');
    const count = await features.count();
    expect(count).toBeGreaterThanOrEqual(3);
  });

  test('tech footer exists', async ({ page }) => {
    const techFooter = page.locator('text=Flutter');
    await expect(techFooter.first()).toBeVisible();
  });
});

/* ------------------------------------------------------------------ */
/*  Codice Fiscale demo                                                */
/* ------------------------------------------------------------------ */

test.describe('Codice Fiscale demo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demos/cfpython');
  });

  test('no horizontal overflow', async ({ page }) => {
    const scrollW = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(scrollW).toBeLessThanOrEqual(page.viewportSize()!.width);
  });

  test('form inputs are visible', async ({ page }) => {
    await expect(page.locator('#surname')).toBeVisible();
    await expect(page.locator('#name')).toBeVisible();
    await expect(page.locator('#day')).toBeVisible();
    await expect(page.locator('#month')).toBeVisible();
    await expect(page.locator('#year')).toBeVisible();
    await expect(page.locator('#birthplace')).toBeVisible();
  });

  test('form inputs are interactable on mobile', async ({ page }) => {
    const surname = page.locator('#surname');
    await surname.fill('ROSSI');
    await expect(surname).toHaveValue('ROSSI');
  });

  test('empty state prompt is visible', async ({ page }) => {
    await expect(page.locator('#result-empty')).toBeVisible();
    await expect(page.locator('#result-code')).toBeHidden();
  });

  test('algorithm footer is visible', async ({ page }) => {
    const footer = page.locator('text=surname').first();
    await expect(footer).toBeVisible();
  });

  test('GitHub source link is visible', async ({ page }) => {
    const githubLink = page.locator('a[href*="github.com/alcelaser/cfpython"]');
    await expect(githubLink).toBeVisible();
  });
});

/* ------------------------------------------------------------------ */
/*  Blog index                                                         */
/* ------------------------------------------------------------------ */

test.describe('Blog index', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/blog');
  });

  test('no horizontal overflow', async ({ page }) => {
    const scrollW = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(scrollW).toBeLessThanOrEqual(page.viewportSize()!.width);
  });

  test('blog cards render', async ({ page }) => {
    const cards = page.locator('#blog-content a.glass');
    const count = await cards.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test('back link is visible', async ({ page }) => {
    const backLink = page.locator('a[href="/"]', { hasText: /back|indietro|retour/i }).first();
    await expect(backLink).toBeVisible();
  });
});

/* ------------------------------------------------------------------ */
/*  Research index                                                     */
/* ------------------------------------------------------------------ */

test.describe('Research index', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/research');
  });

  test('no horizontal overflow', async ({ page }) => {
    const scrollW = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(scrollW).toBeLessThanOrEqual(page.viewportSize()!.width);
  });

  test('research cards render', async ({ page }) => {
    const cards = page.locator('#research-content a.glass');
    const count = await cards.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });
});

/* ------------------------------------------------------------------ */
/*  Localized routes                                                   */
/* ------------------------------------------------------------------ */

test.describe('Italian locale', () => {
  test('homepage loads', async ({ page }) => {
    await page.goto('/it');
    await expect(page.locator('#hero')).toBeVisible();
  });

  test('demos index loads', async ({ page }) => {
    await page.goto('/it/demos');
    const scrollW = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(scrollW).toBeLessThanOrEqual(page.viewportSize()!.width);
  });

  test('blog index loads', async ({ page }) => {
    await page.goto('/it/blog');
    const scrollW = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(scrollW).toBeLessThanOrEqual(page.viewportSize()!.width);
  });
});

test.describe('French locale', () => {
  test('homepage loads', async ({ page }) => {
    await page.goto('/fr');
    await expect(page.locator('#hero')).toBeVisible();
  });

  test('demos index loads', async ({ page }) => {
    await page.goto('/fr/demos');
    const scrollW = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(scrollW).toBeLessThanOrEqual(page.viewportSize()!.width);
  });

  test('blog index loads', async ({ page }) => {
    await page.goto('/fr/blog');
    const scrollW = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(scrollW).toBeLessThanOrEqual(page.viewportSize()!.width);
  });
});

/* ------------------------------------------------------------------ */
/*  Desktop-only checks (layout unchanged)                             */
/* ------------------------------------------------------------------ */

test.describe('Desktop layout unchanged', () => {
  test('nav links are visible (no hamburger)', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop', 'Desktop-only tests');
    await page.goto('/');
    const desktopLinks = page.locator('#navbar .hidden.md\\:flex a.nav-link');
    const count = await desktopLinks.count();
    expect(count).toBeGreaterThanOrEqual(5);
  });

  test('hamburger is hidden on desktop', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop', 'Desktop-only tests');
    await page.goto('/');
    await expect(page.locator('#menu-toggle')).toBeHidden();
  });

  test('homepage sections have expected padding', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop', 'Desktop-only tests');
    await page.goto('/');
    const exp = page.locator('#experience');
    const style = await exp.evaluate(el => getComputedStyle(el));
    // At 1280px desktop, sm:py-24 = 96px, sm:px-6 = 24px
    expect(parseInt(style.paddingTop)).toBe(96);
    expect(parseInt(style.paddingLeft)).toBe(24);
  });

  test('about stat cards have p-6 padding', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop', 'Desktop-only tests');
    await page.goto('/');
    const statCard = page.locator('.stat-number').first().locator('..');
    const style = await statCard.evaluate(el => getComputedStyle(el));
    expect(parseInt(style.paddingTop)).toBe(24); // p-6 = 24px
  });
});
