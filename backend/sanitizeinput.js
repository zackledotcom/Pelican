export function sanitizeInput(text) {
  if (typeof text !== 'string') return '';
  return text
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/javascript:/gi, '')
    .replace(/on\w+="[^"]*"/gi, '')
    .replace(/script/gi, '');
}
