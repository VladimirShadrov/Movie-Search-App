import { Search } from './search.component';
import { FilmList } from './list.component';

export class Main {
  constructor({ rootElement, router }) {
    this.$el = rootElement;
    this.router = router;
  }

  init() {
    this.search = new Search({
      input: this.$el.querySelector('.js-search-input'),
      button: this.$el.querySelector('.js-search-btn'),
    });
    this.filmList = new FilmList(this.$el.querySelector('.js-film-list'), this.router);
    this.search.init();
    this.filmList.init();
  }

  destroy() {
    this.search.destroy();
    this.filmList.destroy();
    this.$el.remove();
  }

  get element() {
    return this.$el;
  }
}
