const path = require('path');
const Koa = require('koa');
const {Observer, EventManager} = require('./subscribers')
const app = new Koa();

app.use(require('koa-static')(path.join(__dirname, 'public')));
app.use(require('koa-bodyparser')());

const Router = require('koa-router');
const router = new Router();

router.get('/subscribe', async (ctx, next) => {
  await new Promise((resolve, reject) => {
    const observer = new Observer(ctx, resolve)
    const manager = EventManager.getInstance()
    manager.subscribe(observer)
  })
});

router.post('/publish', async (ctx, next) => {
  ctx.response.status = 200
  if (!ctx.request.body.message) return

  const manager = EventManager.getInstance()
  manager.notify(ctx.request.body.message)
});

app.use(router.routes());

module.exports = app;
