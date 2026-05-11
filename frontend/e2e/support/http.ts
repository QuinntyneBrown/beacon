import { expect, Response } from '@playwright/test';

export async function expectSuccessfulResponse(responsePromise: Promise<Response>): Promise<Response> {
  const response = await responsePromise;
  expect(response.ok(), `${response.status()} ${response.url()}`).toBe(true);
  return response;
}
