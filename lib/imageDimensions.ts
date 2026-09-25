import fs from "node:fs";
import path from "node:path";
import { imageSize } from "image-size";

/**
 * Reads a local public-asset image's intrinsic width/height so inline blog
 * images can render with correct `width`/`height` attributes and avoid
 * layout shift. SVGs are read directly from their `<svg>` tag (or `viewBox`)
 * to avoid decoding overhead; raster formats (webp/jpg/png) go through
 * `image-size`, which reads just the header bytes rather than decoding
 * the full image.
 */
export function getImageDimensions(publicPath: string): { width: number; height: number } | null {
  if (!publicPath.startsWith("/")) return null;

  if (publicPath.toLowerCase().endsWith(".svg")) {
    return getSvgDimensions(publicPath);
  }

  try {
    const filePath = path.join(process.cwd(), "public", publicPath);
    const buffer = fs.readFileSync(filePath);
    const { width, height } = imageSize(buffer);
    if (!width || !height) return null;
    return { width, height };
  } catch {
    return null;
  }
}

function getSvgDimensions(publicPath: string): { width: number; height: number } | null {
  try {
    const filePath = path.join(process.cwd(), "public", publicPath);
    const content = fs.readFileSync(filePath, "utf8");
    const svgTagMatch = content.match(/<svg[^>]*>/);
    if (!svgTagMatch) return null;
    const svgTag = svgTagMatch[0];

    const widthMatch = svgTag.match(/\bwidth="(\d+(?:\.\d+)?)"/);
    const heightMatch = svgTag.match(/\bheight="(\d+(?:\.\d+)?)"/);
    if (widthMatch && heightMatch) {
      return { width: Math.round(Number(widthMatch[1])), height: Math.round(Number(heightMatch[1])) };
    }

    const viewBoxMatch = svgTag.match(/viewBox="[\d.\-]+\s+[\d.\-]+\s+([\d.]+)\s+([\d.]+)"/);
    if (viewBoxMatch) {
      return { width: Math.round(Number(viewBoxMatch[1])), height: Math.round(Number(viewBoxMatch[2])) };
    }

    return null;
  } catch {
    return null;
  }
}
