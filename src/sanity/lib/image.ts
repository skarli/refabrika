import imageUrlBuilder from "@sanity/image-url";
import { client } from "./client";

const builder = imageUrlBuilder(client);

export const PLACEHOLDER_IMAGE = "/assets/imgs/placeholder.svg";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  return builder.image(source);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getImageUrl(source: any, width?: number, height?: number): string {
  if (!source || !source.asset) {
    return PLACEHOLDER_IMAGE;
  }
  try {
    let img = builder.image(source);
    if (width) img = img.width(width);
    if (height) img = img.height(height);
    return img.url();
  } catch {
    return PLACEHOLDER_IMAGE;
  }
}
