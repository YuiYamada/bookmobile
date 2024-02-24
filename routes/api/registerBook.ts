import { Handlers } from "$fresh/server.ts";
import { Book } from "../../type.ts";
import { typedJsonParse } from "https://pax.deno.dev/windchime-yk/deno-util@v1.4.0/object.ts";
import { statusCode } from "https://pax.deno.dev/windchime-yk/deno-util@v1.4.0/server.ts";

export const handler: Handlers = {
  async POST(req) {
    if (null === req.body) {
      return new Response("", {
        status: statusCode.badRequest,
      });
    }
    const bodyReader = await req.body?.getReader().read();
    const decoder = new TextDecoder();
    const book = typedJsonParse<Book>(decoder.decode(bodyReader?.value));
    if (null === book) {
      return new Response("", {
        status: statusCode.badRequest,
      });
    }

    const kv = await Deno.openKv();
    await kv.set(["books", book.ISBNcode], book);
    // const res = kv.list<Item>({ prefix: ["books"] });
    // for await (const book of res) console.log(book.value);

    return new Response("", {
      status: statusCode.ok,
    });
  },
};
