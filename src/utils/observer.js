class PubSub {
  constructor() {
    this.handlers = []
  }

  sub(event, handler, context) {
    if (typeof context === 'undefined') { context = handler }
    this.handlers.push({ event, handler: handler.bind(context) })
  }

  pub(event, args) {
    this.handlers.forEach(t => {
      if (t.event === event) {
        t.handler(args)
      }
    })
  }
}

export default new PubSub