/**
 * https://stackoverflow.com/questions/105034/how-to-create-guid-uuid
 */
export function generateGuid(): string {
  return Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
}
