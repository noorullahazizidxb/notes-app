// src/utils/extractTags.ts

/**
 * Extracts unique hashtags from HTML content.
 * Example: "<p>Hello #world #world</p>" → ["world"]
 */
export const extractTagsFromHTML = (html: string): string[] => {
    const tagRegex = /#(\w+)/g;
    const matches = html.match(tagRegex);
    return matches ? Array.from(new Set(matches.map((tag) => tag.slice(1)))) : [];
  };
  