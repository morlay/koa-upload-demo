import * as logger from "koa-logger";
import * as serve from "koa-static";
import * as cors from "koa-cors";
import * as Koa from "koa";
import * as path from "path";
import * as fs from "fs";
import * as parse from "async-busboy";

const app = new Koa();

app.use(cors());
app.use(logger());

app.use(serve(path.join(__dirname, "/public")));

app.use(async(ctx, next) => {
  if ("POST" !== ctx.method) {
    return next();
  }

  const { files } = await parse(ctx.req);

  files.forEach((file) => {
    if (file.filename) {
      const stream = fs.createWriteStream(path.join(__dirname, "public", path.basename(file.filename)));
      file.pipe(stream);
      console.log('uploading %s -> %s', file.filename, stream.path);
    }
  });

  ctx.status = 204;
});

app.listen(3000);
console.log("listening on port 3000");