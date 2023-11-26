export class NotFound {
  constructor({ rootElement, router }) {
    this.$el = rootElement;
    this.router = router;
  }
  destroy() {
    this.$el.remove();
  }

  get element() {
    return this.$el;
  }
}
