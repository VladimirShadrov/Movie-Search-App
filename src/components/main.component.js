import { Search } from './search.component';
import { FilmList } from './list.component';

export class Main {
  constructor({ rootElement, router }) {
    this.$el = rootElement;
    this.router = router;

    this.init();
  }

  init() {
    new Search({
      input: this.$el.querySelector('.js-search-input'),
      button: this.$el.querySelector('.js-search-btn'),
    });
    new FilmList(this.$el.querySelector('.js-film-list'), this.router);
  }

  destroy() {
    this.$el.remove();
  }

  get element() {
    return this.$el;
  }
}
