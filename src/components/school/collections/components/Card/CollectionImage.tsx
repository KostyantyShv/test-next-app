"use client";

import Image, { type ImageProps } from "next/image";
import { useEffect, useState } from "react";

const DEFAULT_COLLECTION_IMAGE = "/images/cat.png";

type CollectionImageProps = Omit<ImageProps, "src" | "alt"> & {
  src?: string | null;
  alt: string;
  fallbackSrc?: string;
};

const getSafeImageSource = (src?: string | null, fallbackSrc = DEFAULT_COLLECTION_IMAGE) => {
  if (!src || src.trim().length === 0) {
    return fallbackSrc;
  }

  return src;
};

export function CollectionImage({
  src,
  alt,
  fallbackSrc = DEFAULT_COLLECTION_IMAGE,
  onError,
  ...props
}: CollectionImageProps) {
  const [resolvedSrc, setResolvedSrc] = useState<string>(() =>
    getSafeImageSource(src, fallbackSrc)
  );

  useEffect(() => {
    setResolvedSrc(getSafeImageSource(src, fallbackSrc));
  }, [src, fallbackSrc]);

  return (
    <Image
      {...props}
      src={resolvedSrc}
      alt={alt}
      onError={(event) => {
        if (resolvedSrc !== fallbackSrc) {
          setResolvedSrc(fallbackSrc);
        }

        onError?.(event);
      }}
    />
  );
}

export const DEFAULT_CARD_IMAGE = DEFAULT_COLLECTION_IMAGE;
