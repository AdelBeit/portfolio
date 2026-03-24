type MediaType = "image" | "video" | "";

const IMAGE_FORMATS = ["jpeg", "jpg", "png", "gif", "bmp", "webp"];
const VIDEO_FORMATS = ["mp4", "avi", "mov", "wmv", "mkv"];

export function getMediaType(filePath: string): [MediaType, string] {
  const s = filePath.split(".");
  const fileType = s[s.length - 1];
  if (IMAGE_FORMATS.includes(fileType.toLowerCase())) {
    return ["image", fileType];
  }
  if (VIDEO_FORMATS.includes(fileType.toLowerCase())) {
    return ["video", fileType];
  }
  if (fileType === "") return ["", ""];
  throw new Error("file type unknown");
}
