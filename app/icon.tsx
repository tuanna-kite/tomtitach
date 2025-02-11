import { ImageResponse } from "next/og";
import Image from "next/image";

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/jpg";

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <Image src="/logo.jpg" alt="logo" />
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported icons size metadata
      // config to also set the ImageResponse's width and height.
      ...size,
    },
  );
}
