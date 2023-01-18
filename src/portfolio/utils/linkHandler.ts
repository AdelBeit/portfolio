export function linkHandler(url: string) {
   return () => window.open(url, '_blank', 'noopener,noreferrer');
}