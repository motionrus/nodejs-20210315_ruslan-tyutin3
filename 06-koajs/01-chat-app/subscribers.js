let instance = null


class Observer {
  constructor(ctx, resolve) {
    this.ctx = ctx
    this.resolve = resolve
  }
}

class EventManager {
  subscribers = [];

  subscribe (observer) {
    this.subscribers.push(observer)
  }

  notify(message) {
    this.subscribers.forEach(subscriber => {
      subscriber.ctx.body = message
      subscriber.ctx.status = 200
      subscriber.resolve()
    })
  }

  // Singleton class
  static getInstance() {
    if(!instance) {
      instance = new EventManager()
    }

    return instance
  }
}


module.exports = {Observer, EventManager}