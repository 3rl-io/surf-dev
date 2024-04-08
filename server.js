import { Elysia } from 'elysia'
import { staticPlugin } from "@elysiajs/static";

new Elysia()
    .get("/", () => Bun.file("public/index.html"))
    .use(staticPlugin({
        assets: "public",
        prefix: "/",
    }))
    .listen(8000);

console.log(`Running on http://localhost:8000`)