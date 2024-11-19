import { StackClient } from "@stackso/js-core";

export const stack = new StackClient({
  apiKey: process.env.STACK_API_KEY!,
  pointSystemId: parseInt(process.env.STACK_POINT_SYSTEM_ID!),
});
