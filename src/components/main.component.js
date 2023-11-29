import { Search } from './search.component';

export class Main {
  constructor({ rootElement, router }) {
    this.$el = rootElement;
    this.router = router;

    this.init();

    //========== TEMP ==================
    this.$films = this.$el.querySelectorAll('.film');
    this.$films.forEach((film) => {
      film.addEventListener('click', () => this.router.navigate(film.dataset.route));
    });
    //========== TEMP ==================
  }

  init() {
    new Search({
      input: this.$el.querySelector('.js-search-input'),
      button: this.$el.querySelector('.js-search-btn'),
    });
  }

  destroy() {
    this.$el.remove();
  }

  get element() {
    return this.$el;
  }
}
