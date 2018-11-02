/**
 * @flow
 */

export function createErrorFromErrorData(errorData: { message: string }): Error {
  const { message } = errorData || {};
  return new Error(message);
}
