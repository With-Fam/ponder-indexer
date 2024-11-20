import { StackClient } from "@stackso/js-core";

if (!process.env.STACK_API_KEY) {
  throw new Error("STACK_API_KEY environment variable is not set");
}

if (!process.env.STACK_POINT_SYSTEM_ID) {
  throw new Error("STACK_POINT_SYSTEM_ID environment variable is not set");
}

export const stack = new StackClient({
  apiKey: process.env.STACK_API_KEY,
  pointSystemId: parseInt(process.env.STACK_POINT_SYSTEM_ID),
});
