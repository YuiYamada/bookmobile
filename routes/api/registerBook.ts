import { Handlers } from "$fresh/server.ts";
import { Book, Item } from "../../type.ts";
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
    const item = typedJsonParse<Item>(decoder.decode(bodyReader?.value));
    const vol = item?.volumeInfo;
    if (null === vol) {
      return new Response("", {
        status: statusCode.badRequest,
      });
    }

    const book: Book = {
      title: vol.title,
      description: vol?.description,
      ISBNcode: vol.industryIdentifiers[1].identifier,
      imageURL: vol?.imageLinks?.thumbnail,
      owner: "",
    };

    const kv = await Deno.openKv();
    await kv.set(["books", book.ISBNcode], book);
    // const res = kv.list<Item>({ prefix: ["books"] });
    // for await (const book of res) console.log(book.value);

    return new Response("", {
      status: statusCode.ok,
    });
  },
};
