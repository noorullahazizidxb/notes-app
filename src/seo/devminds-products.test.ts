import { describe, expect, it } from 'vitest';
import { DEVMINDS_PRODUCTS, hasWideLogo, productLogoSrc } from './devminds-products';

describe('DEVMINDS_PRODUCTS registry', () => {
  it('lists all seven products once, with absolute https URLs', () => {
    expect(DEVMINDS_PRODUCTS).toHaveLength(7);
    expect(new Set(DEVMINDS_PRODUCTS.map((p) => p.slug)).size).toBe(7);
    for (const p of DEVMINDS_PRODUCTS) expect(p.url).toMatch(/^https:\/\/([a-z-]+\.)?devminds\.net\/$/);
  });

  it('keeps the restaurant maps domain spelling', () => {
    expect(DEVMINDS_PRODUCTS.find((p) => p.slug === 'restaurant-maps')?.url).toBe('https://resturant-maps.devminds.net/');
  });

  it('builds themed logo paths and flags wide logos', () => {
    expect(productLogoSrc('notes', 'dark')).toBe('/brand/products/notes-dark.svg');
    expect(hasWideLogo(DEVMINDS_PRODUCTS.find((p) => p.slug === 'ourworks')!)).toBe(true);
    expect(hasWideLogo(DEVMINDS_PRODUCTS.find((p) => p.slug === 'notes')!)).toBe(false);
  });
});
