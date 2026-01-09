export function getApiUrl(): string {
  const url = process.env.NEXT_PUBLIC_API_URL;
  if (!url) {
    console.error('Critical Error: NEXT_PUBLIC_API_URL is not defined!');
    return '';
  }
  return url;
}
