import { Handlers } from "$fresh/server.ts";
export const handler: Handlers = {
  async GET(req) {
    const urlSearchParams = new URLSearchParams(new URL(req.url).search);
    const name = urlSearchParams.get("name") ?? "";

    const kv = await Deno.openKv();
    // kvStoreにユーザが存在しない場合は再度入力させる
    const res = await kv.get(["users", name]);
    console.log(res);

    // const deleteAll = async () => {
    // 	for await (const entry of kv.list({ prefix: [] })) {
    // 		console.log(entry);
    // 		await kv.delete(entry.key);
    // 	}
    // };

    if (res.value) {
      // await kv.set(["users", name], []);

      sessionStorage.setItem("name", name);

      const url = new URL(req.url);
      url.href = url.origin;
      url.pathname = "/mainPage";
      console.log(url);

      return Response.redirect(url, 302);
    } else {
      console.log("このユーザは存在しません");
      return new Response("", {
        status: 200,
      });
    }
  },
};
