export class Poster {
  constructor({ rootElement, router }) {
    this.$el = rootElement;
    this.router = router;
    this.breadCrumb = this.$el.querySelector('.breadcrumb');

    this.addListeners();
  }

  addListeners() {
    this.navigate = this.navigate.bind(this);
    this.breadCrumb.addEventListener('click', this.navigate);
  }

  removeListeners() {
    this.breadCrumb.removeEventListener('click', this.navigate);
  }

  navigate(event) {
    this.router.navigate(event.currentTarget.href);
    event.preventDefault();
  }

  destroy() {
    this.$el.remove();
    this.removeListeners();
  }

  get element() {
    return this.$el;
  }
}
