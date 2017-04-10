import * as parse from "async-busboy"
import * as fse from "fs-extra"
import * as Koa from "koa"
import * as cors from "koa-cors"
import * as logger from "koa-logger"
import * as Router from "koa-router"
import * as serve from "koa-static"
import * as path from "path"

const app = new Koa()
const router = new Router()

app.use(cors())
app.use(logger())

app.use(serve(path.join(__dirname, "/public")))

const fileRootFolder = path.join(__dirname, "public/files")

// 上传文件
router.post("/files", async (ctx) => {
  const { files } = await parse(ctx.req)
  const file = files[0]

  if (file.filename) {
    const stream = fse.createWriteStream(path.join(fileRootFolder, path.basename(file.filename)))
    file.pipe(stream)
    console.log("uploading %s -> %s", file.filename, stream.path)

    ctx.body = {
      name: file.filename,
    }
  } else {
    ctx.status = 400
    ctx.body = {
      error: "上传文件不能为空",
    }
  }
})

// 获取文件列表
router.get("/files", async (ctx) => {
  const files = fse.readdirSync(fileRootFolder)

  ctx.body = {
    files: files.map((name: string) => ({ name })),
  }
})

// 删除单个文件
router.delete("/files/:name", async (ctx) => {
  try {
    fse.removeSync(path.join(fileRootFolder, ctx.params.name))
    ctx.status = 204
  } catch (e) {
    console.log(e)
    ctx.status = 404
    ctx.body = {
      error: "没有该文件",
    }
  }
})

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3000)
console.log("listening on port 3000")