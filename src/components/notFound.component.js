export class NotFound {
  constructor({ rootElement, router }) {
    this.$el = rootElement;
    this.router = router;
  }
  init() {}
  destroy() {
    this.$el.remove();
  }

  get element() {
    return this.$el;
  }
}
