export function normalizeUrl(url: string): string {
  try {
    // If the URL doesn't start with a protocol, add https://
    if (!/^https?:\/\//i.test(url)) {
      url = 'https://' + url;
    }

    const urlObject = new URL(url);
    
    // Ensure the protocol is https
    urlObject.protocol = 'https:';
    
    // Remove any trailing slashes
    let hostname = urlObject.hostname;
    let pathname = urlObject.pathname;
    
    if (pathname === '/') {
      pathname = '';
    }

    // Construct the final URL
    return `https://${hostname}${pathname}${urlObject.search}${urlObject.hash}`;
  } catch (error) {
    // If URL parsing fails, return the original input
    return url;
  }
}