export function getShortenedString(string: string, length: number) {
  if (string.length > length) {
    return string.substr(0, length) + '...';
  } else {
    return string;
  }
}

export function getQueryVariable(url, key) {
  if (url.split('?').length === 2) {
    const queryParams = url.split('?')[1];
    const vars = queryParams.split('&');
    for (let i = 0; i < vars.length; i++) {
      const pair = vars[i].split('=');
      if (pair[0] === key) {
        return pair[1];
      }
    }
  }
  return '';
}
