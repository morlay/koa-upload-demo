"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger = require("koa-static");
const serve = require("koa-static");
const Koa = require("koa");
const path = require("path");
const app = new Koa();
app.use(logger());
app.use(serve(path.join(__dirname, "/public")));
app.use((ctx, next) => __awaiter(this, void 0, void 0, function* () {
    if ("POST" !== ctx.method) {
        return next();
    }
    // while ((part = yield parts)) {
    //   var stream = fs.createWriteStream(path.join(os.tmpdir(), Math.random().toString()));
    //   part.pipe(stream);
    //   console.log("uploading %s -> %s", part.filename, stream.path);
    // }
}));
app.listen(3000);
console.log("listening on port 3000");
