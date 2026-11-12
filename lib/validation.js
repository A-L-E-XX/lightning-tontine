// Server-side input validation (NFR-3). Each function returns
// { value } on success or { error } with a plain-language message.

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const LIGHTNING_ADDRESS = /^[a-z0-9._-]+@[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,}$/;

function text(input) {
  return typeof input === 'string' ? input.trim() : '';
}

export function validateEmail(input) {
  const value = text(input).toLowerCase();
  if (!value) return { error: 'Enter your email address.' };
  if (value.length > 254 || !EMAIL.test(value)) {
    return { error: 'That does not look like an email address. Check it and try again.' };
  }
  return { value };
}

export function validateDisplayName(input) {
  const value = text(input).replace(/\s+/g, ' ');
  if (value.length < 2 || value.length > 30) {
    return { error: 'Your display name must be 2 to 30 characters.' };
  }
  return { value };
}

export function validateLightningAddress(input) {
  const value = text(input).toLowerCase();
  if (!value) return { error: 'Enter your Lightning address.' };
  if (value.length > 120 || !LIGHTNING_ADDRESS.test(value)) {
    return {
      error: 'A Lightning address looks like name@domain, for example amaka@blink.sv.',
    };
  }
  return { value };
}
