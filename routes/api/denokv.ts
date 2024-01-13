import { FreshContext, Handlers } from "$fresh/server.ts";
export const handler: Handlers = {
  async GET(req, ctx) {
    const urlSearchParams = new URLSearchParams(new URL(req.url).search);
    const name = urlSearchParams.get("name");
    // console.log(name);

    const kv = await Deno.openKv();
    const books: Array<number> = [];
    await kv.set(["users", name], books);
    const entry = await kv.get(["users", name]);
    const entries = kv.list({ prefix: ["users"] });

    // console.log(name);
    // const uuid = crypto.randomUUID();
    return new Response(JSON.stringify(entry.key), {
      headers: { "Content-Type": "application/json" },
    });
  },
};
