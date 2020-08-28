export function getShortenedString(string: string, length: number) {
  if (string.length > length) {
    return string.substr(0, length) + '...';
  } else {
    return string;
  }
}
