/**
 * Pretext utilities for the portfolio site.
 *
 * Uses @chenglou/pretext to pre-measure text dimensions without triggering
 * DOM layout reflow. This eliminates layout shift in dynamic text areas
 * like the hero typewriter and accordion animations.
 */
import { prepare, layout } from '@chenglou/pretext';

/** The site's canonical font declaration (must match CSS) */
const SITE_FONT = '900 16px "Product Sans", sans-serif';

/**
 * Build a CSS font shorthand string at a given size.
 * Product Sans with weight 900 matches the site's headings.
 */
export function siteFont(sizePx: number, weight: number = 900): string {
  return `${weight} ${sizePx}px "Product Sans", sans-serif`;
}

/**
 * Measure the display dimensions of a single line of text.
 * Returns { width, height } without touching the DOM.
 *
 * For single-line text (like the typewriter variants), we use a very
 * large maxWidth so no wrapping occurs, giving us the natural width.
 */
export function measureSingleLine(
  text: string,
  font: string,
  lineHeight: number
): { width: number; height: number } {
  const prepared = prepare(text, font);
  // Use a huge maxWidth to prevent wrapping — we want the natural single-line width
  const result = layout(prepared, 99999, lineHeight);
  return { width: result.height > lineHeight ? 99999 : 0, height: result.height };
}

/**
 * Given an array of text variants (e.g. typewriter positions), compute
 * the maximum height any variant would need at the given container width
 * and line height. This is ideal for setting a stable min-height.
 */
export function measureMaxHeight(
  variants: string[],
  containerWidth: number,
  font: string,
  lineHeight: number
): number {
  let maxHeight = 0;
  for (const text of variants) {
    const prepared = prepare(text, font);
    const { height } = layout(prepared, containerWidth, lineHeight);
    if (height > maxHeight) maxHeight = height;
  }
  return maxHeight;
}

/**
 * Pre-measure all typewriter variants and return the tallest height.
 * Designed to be called once on page load to stabilise the hero subtitle.
 */
export function stabiliseTypewriterHeight(
  variants: string[],
  containerWidth: number,
  fontSizePx: number,
  lineHeightPx: number
): number {
  const font = siteFont(fontSizePx);
  return measureMaxHeight(variants, containerWidth, font, lineHeightPx);
}
