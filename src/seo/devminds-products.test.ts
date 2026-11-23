import { describe, expect, it } from 'vitest';
import { DEVMINDS_PRODUCTS, productLogoSrc } from './devminds-products';

describe('DEVMINDS_PRODUCTS registry', () => {
  it('lists all eight products once, with absolute https URLs', () => {
    expect(DEVMINDS_PRODUCTS).toHaveLength(8);
    expect(new Set(DEVMINDS_PRODUCTS.map((p) => p.slug)).size).toBe(8);
    for (const p of DEVMINDS_PRODUCTS) expect(p.url).toMatch(/^https:\/\/([a-z-]+\.)?devminds\.net\/$/);
  });

  it('includes date-converter', () => {
    expect(DEVMINDS_PRODUCTS.find((p) => p.slug === 'date-converter')?.url).toBe('https://date-converter.devminds.net/');
  });

  it('keeps the restaurant maps domain spelling', () => {
    expect(DEVMINDS_PRODUCTS.find((p) => p.slug === 'restaurant-maps')?.url).toBe('https://resturant-maps.devminds.net/');
  });

  it('builds themed logo paths', () => {
    expect(productLogoSrc('notes', 'dark')).toBe('/brand/products/notes-dark.svg');
    expect(productLogoSrc('budget-manager', 'icon-light')).toBe('/brand/products/budget-manager-icon-light.svg');
  });

  it('fills exactly two rows of four footer cards on desktop', () => {
    expect(DEVMINDS_PRODUCTS.length % 4).toBe(0);
    expect(DEVMINDS_PRODUCTS.length / 4).toBe(2);
  });
});
