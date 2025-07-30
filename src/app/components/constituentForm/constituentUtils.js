export function formatPhoneNumber(value) {
  const cleaned = value.replace(/\D/g, '').slice(0, 10); // remove non-digits, limit to 10
  if (cleaned.length < 10) return cleaned; // return digits if not enough for full format
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return value;
}

export function isValidEmail(emailInput) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput);
}

export function isValidPhone(phoneInput) {
    return /^\(\d{3}\) \d{3}-\d{4}$/.test(phoneInput);
}

