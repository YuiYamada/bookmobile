import { Handlers } from "$fresh/server.ts";
import { Book } from "../../type.ts";
import { statusCode } from "https://pax.deno.dev/windchime-yk/deno-util@v1.4.0/server.ts";

export const handler: Handlers = {
  async GET() {
    const resArray = [];
    const kv = await Deno.openKv();
    const books = kv.list<Book>({ prefix: ["books"] });
    for await (const book of books) {
      resArray.push(book.value);
    }
    // const deleteAll = async () => {
    //   for await (const entry of kv.list({ prefix: [] })) {
    //     console.log(entry);
    //     await kv.delete(entry.key);
    //   }
    // };

    // deleteAll();
    return new Response(JSON.stringify(resArray), {
      status: statusCode.ok,
    });
  },
};
