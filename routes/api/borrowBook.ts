import { Handlers } from "$fresh/server.ts";
import { Book, OwnBooks } from "../../type.ts";
import { typedJsonParse } from "https://pax.deno.dev/windchime-yk/deno-util@v1.4.0/object.ts";
import { statusCode } from "https://pax.deno.dev/windchime-yk/deno-util@v1.4.0/server.ts";

export const handler: Handlers = {
  async POST(req) {
    await console.log(req.body);

    if (null === req.body) {
      return new Response("", {
        status: statusCode.badRequest,
      });
    }
    const urlSearchParams = new URLSearchParams(new URL(req.url).search);
    const userName = urlSearchParams.get("user") ?? "";

    const bodyReader = await req.body?.getReader().read();
    const decoder = new TextDecoder();
    const reqBook = typedJsonParse<Book>(decoder.decode(bodyReader?.value));
    console.log(userName);

    if (!reqBook || !userName) {
      return new Response("", {
        status: statusCode.badRequest,
      });
    }
    const kv = await Deno.openKv();

    //本のOwnerを更新
    const bookData: Book = { ...reqBook, owner: userName };
    await kv.set(["books", bookData.ISBNcode], bookData);

    //借りたユーザの所持している本を更新
    const ownBooks = (await kv.get<OwnBooks>(["users", userName])).value;
    ownBooks?.books.push(bookData.ISBNcode);
    await kv.set(["users", userName], ownBooks);

    // const res = kv.list<Item>({ prefix: ["books"] });
    // for await (const book of res) console.log(book.value);

    return new Response("", {
      status: statusCode.ok,
    });
  },
};
