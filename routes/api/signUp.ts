import { Handlers } from "$fresh/server.ts";
export const handler: Handlers = {
  async GET(req) {
    console.log("AAA");

    const urlSearchParams = new URLSearchParams(new URL(req.url).search);
    const name = urlSearchParams.get("name") ?? "";
    console.log("BBB");

    const kv = await Deno.openKv();
    console.log("CCC");
    // kvStoreにユーザが存在する場合は再度入力させる
    const res = await kv.get(["users", name]);
    console.log(res);
    console.log("DDD");

    // const deleteAll = async () => {
    // 	for await (const entry of kv.list({ prefix: [] })) {
    // 		console.log(entry);
    // 		await kv.delete(entry.key);
    // 	}
    // };

    if (res.value) {
      console.log("EEE");
      console.log("すでにユーザが存在します。");
      return new Response("", {
        status: 200,
      });
    } else {
      console.log("FFF");
      await kv.set(["users", name], []);
      console.log("GGG");

      sessionStorage.setItem("name", name);
      console.log("HHH");

      const url = new URL(req.url);
      url.href = url.origin;
      url.pathname = "/mainPage";
      console.log(url);
      console.log("III");

      return Response.redirect(url, 302);
    }
  },
};
