/**
 * ID and date utilities
 */

/**
 * Generate a unique ID with prefix
 */
export function generateId(prefix: string): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `${prefix}_${timestamp}_${random}`.toUpperCase();
}

/**
 * Get current date time in ISO format
 */
export function getCurrentDateTime(): string {
  return new Date().toISOString();
}
