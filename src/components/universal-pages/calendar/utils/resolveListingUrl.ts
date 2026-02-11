export const resolveListingUrl = (listingId?: string): string | null => {
  if (!listingId) return null;

  const normalized = listingId.trim();
  if (!normalized) return null;

  if (normalized.startsWith("http://") || normalized.startsWith("https://")) {
    return normalized;
  }

  if (normalized.startsWith("/")) {
    return normalized;
  }

  if (normalized.startsWith("schools/") || normalized.startsWith("listing/")) {
    return `/${normalized}`;
  }

  return `/schools/listing/${encodeURIComponent(normalized)}`;
};
