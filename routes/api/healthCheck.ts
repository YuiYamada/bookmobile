import { Handlers } from "$fresh/server.ts";
export const handler: Handlers = {
  GET() {
    console.log("OK");
    return new Response("", {
      status: 200,
    });
  },
};
