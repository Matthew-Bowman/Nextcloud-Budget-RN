export function normaliseHost(input: string): string | null {
  const trimmed = input.trim();

  if (!trimmed) return null;

  // Add https if user forgot protocol
  if (!/^https?:\/\//i.test(trimmed)) {
    return `https://${trimmed}`;
  }

  return trimmed;
}

export function validateHostFormat(input: string): string | undefined {
  const normalised = normaliseHost(input);

  if (!normalised) {
    return 'Nextcloud server host is required.';
  }

  try {
    new URL(normalised);
  } catch {
    return 'Please enter a valid URL (e.g. https://cloud.example.com).';
  }

  return undefined;
}