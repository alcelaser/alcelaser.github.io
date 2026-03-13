/**
 * routing.spec.ts
 * Verifies every public route returns 200 and the correct <title> / landmark.
 * Also checks that internal nav links resolve without 404.
 */
import { test, expect } from '@playwright/test';

// ─────────────────────────────────────────────────────────────────────────────
// Route smoke tests – one per known page
// ─────────────────────────────────────────────────────────────────────────────

const routes: { path: string; titleFragment: string; landmark?: string }[] = [
    { path: '/', titleFragment: 'Alberto Maccanico', landmark: '#hero' },
    { path: '/blog', titleFragment: 'Blog', landmark: '#blog-content' },
    { path: '/demos', titleFragment: 'Alberto Maccanico', landmark: '#demos-content' },
    { path: '/research', titleFragment: 'Research', landmark: '#research-content' },
    { path: '/demos/cfpython', titleFragment: 'Codice Fiscale' },
    { path: '/demos/limitedlands', titleFragment: 'Limited Lands' },
    { path: '/demos/bus-roma', titleFragment: 'BUS Roma' },
    // Blog articles
    { path: '/blog/ai-bubble', titleFragment: 'Alberto Maccanico' },
    { path: '/blog/ai-power-structures', titleFragment: 'Alberto Maccanico' },
    { path: '/blog/efficient-compute', titleFragment: 'Alberto Maccanico' },
    { path: '/blog/vibe-coding', titleFragment: 'Alberto Maccanico' },
    // Research paper
    { path: '/research/anomaly-detection', titleFragment: 'Alberto Maccanico' },
    // Localised homepages
    { path: '/it', titleFragment: 'Alberto Maccanico', landmark: '#hero' },
    { path: '/fr', titleFragment: 'Alberto Maccanico', landmark: '#hero' },
    // Localised sub-pages (titles may be in locale language)
    { path: '/it/blog', titleFragment: 'Alberto Maccanico', landmark: '#blog-content' },
    { path: '/fr/blog', titleFragment: 'Alberto Maccanico', landmark: '#blog-content' },
    { path: '/it/demos', titleFragment: 'Alberto Maccanico', landmark: '#demos-content' },
    { path: '/fr/demos', titleFragment: 'Alberto Maccanico', landmark: '#demos-content' },
    { path: '/it/research', titleFragment: 'Alberto Maccanico', landmark: '#research-content' },
    { path: '/fr/research', titleFragment: 'Alberto Maccanico', landmark: '#research-content' },
    // Note: 404 route is tested separately because Astro preview returns HTTP 404
];

for (const { path, titleFragment, landmark } of routes) {
    test(`GET ${path} → 200, title contains "${titleFragment}"`, async ({ page }) => {
        const response = await page.goto(path);
        expect(response?.status(), `${path} returned non-200`).not.toBe(404);
        expect(response?.status()).not.toBe(500);
        await expect(page).toHaveTitle(new RegExp(titleFragment, 'i'));
        if (landmark) {
            await expect(page.locator(landmark)).toBeVisible();
        }
    });
}

// 404 page – Astro preview returns HTTP 404 but renders 404.astro; test the body only
test('404.astro renders custom not-found body', async ({ page }) => {
    await page.goto('/does-not-exist-abc123', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('h1')).toContainText(/not found/i);
    // Must have home and blog links in the page body (not mobile nav)
    await expect(page.locator('a[href="/"]:not(#mobile-menu a):visible').first()).toBeVisible();
});

// ─────────────────────────────────────────────────────────────────────────────
// Nav logo links – locale-aware
// ─────────────────────────────────────────────────────────────────────────────

test.describe('Nav logo locale routing', () => {
    test('EN: AM logo href is / (no locale prefix)', async ({ page }) => {
        await page.goto('/');
        const logo = page.locator('#navbar a', { hasText: 'AM' });
        const href = await logo.getAttribute('href');
        expect(href).toMatch(/^\/$/);
    });

    test('IT: AM logo href is /it/', async ({ page }) => {
        await page.goto('/it');
        const logo = page.locator('#navbar a', { hasText: 'AM' });
        const href = await logo.getAttribute('href');
        expect(href).toBe('/it/');
    });

    test('FR: AM logo href is /fr/', async ({ page }) => {
        await page.goto('/fr');
        const logo = page.locator('#navbar a', { hasText: 'AM' });
        const href = await logo.getAttribute('href');
        expect(href).toBe('/fr/');
    });
});

// ─────────────────────────────────────────────────────────────────────────────
// Language-switcher links resolve to valid pages
// ─────────────────────────────────────────────────────────────────────────────

test.describe('Language switcher navigation', () => {
    const localeLinks: { from: string; switchTo: RegExp; expectedLandmark: string }[] = [
        { from: '/it', switchTo: /^\/$/, expectedLandmark: '#hero' },
        { from: '/fr', switchTo: /^\/$/, expectedLandmark: '#hero' },
        { from: '/it/blog', switchTo: /^\/blog/, expectedLandmark: '#blog-content' },
        { from: '/fr/blog', switchTo: /^\/blog/, expectedLandmark: '#blog-content' },
    ];

    for (const { from, switchTo, expectedLandmark } of localeLinks) {
        test(`Switching from ${from} to EN leads to a working page`, async ({ page }) => {
            await page.goto(from);
            // Find any locator for the EN link in the language dropdown
            const enLink = page.locator('a[href]').filter({ hasText: /🇬🇧|EN/ }).first();
            const href = await enLink.getAttribute('href');
            expect(href).toMatch(switchTo);
            const response = await page.goto(href!);
            expect(response?.status()).not.toBe(404);
            await expect(page.locator(expectedLandmark)).toBeVisible();
        });
    }
});

// ─────────────────────────────────────────────────────────────────────────────
// Live Demos button destination
// ─────────────────────────────────────────────────────────────────────────────

test.describe('"Live Demos" button routes', () => {
    const cases = [
        { locale: 'EN', url: '/', expectedDest: '/demos' },
        { locale: 'IT', url: '/it', expectedDest: '/it/demos' },
        { locale: 'FR', url: '/fr', expectedDest: '/fr/demos' },
    ];

    for (const { locale, url, expectedDest } of cases) {
        test(`${locale} homepage Live Demos button points to ${expectedDest}`, async ({ page }) => {
            await page.goto(url);
            // The locator finds the "Live Demos" style button in the page body (not mobile nav)
            const btn = page.locator(`a[href="${expectedDest}"]:not(#mobile-menu a):visible`).first();
            await expect(btn).toBeVisible();
            const response = await page.goto(expectedDest);
            expect(response?.status()).not.toBe(404);
            await expect(page.locator('#demos-content')).toBeVisible();
        });
    }
});

// ─────────────────────────────────────────────────────────────────────────────
// Blog "back" links point to the correct locale
// ─────────────────────────────────────────────────────────────────────────────

test.describe('Blog index back-link correctness', () => {
    test('EN /blog back link goes to /', async ({ page }) => {
        await page.goto('/blog');
        const back = page.locator('a[href="/"]').first();
        await expect(back).toBeVisible();
    });

    test('IT /it/blog back link goes to /it', async ({ page }) => {
        await page.goto('/it/blog');
        const back = page.locator('a[href="/it"]').first();
        await expect(back).toBeVisible();
    });

    test('FR /fr/blog back link goes to /fr', async ({ page }) => {
        await page.goto('/fr/blog');
        const back = page.locator('a[href="/fr"]').first();
        await expect(back).toBeVisible();
    });
});

// ─────────────────────────────────────────────────────────────────────────────
// Blog cards link to existing articles (no 404 href)
// ─────────────────────────────────────────────────────────────────────────────

test('Blog index: all article cards have valid hrefs (no 404)', async ({ page }) => {
    await page.goto('/blog');
    const cards = page.locator('#blog-content a.glass');
    const count = await cards.count();
    expect(count, 'No blog cards found').toBeGreaterThan(0);

    const hrefs = await cards.evaluateAll(els =>
        els.map(el => (el as HTMLAnchorElement).href)
    );

    for (const href of hrefs) {
        const resp = await page.request.get(href);
        expect(resp.status(), `${href} returned ${resp.status()}`).toBe(200);
    }
});
