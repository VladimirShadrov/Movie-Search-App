export class Main {
  constructor({ rootElement, router }) {
    this.$el = rootElement;
    this.router = router;

    //========== TEMP ==================
    this.$films = this.$el.querySelectorAll('.film');
    this.$films.forEach((film) => {
      film.addEventListener('click', () => this.router.navigate(film.dataset.route));
    });
    //========== TEMP ==================
  }

  destroy() {
    this.$el.remove();
  }

  get element() {
    return this.$el;
  }
}
