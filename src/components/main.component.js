import { Search } from './search.component';
import { FilmList } from './list.component';

export class Main {
  constructor({ rootElement, router }) {
    this.$el = rootElement;
    this.router = router;
  }

  /**
   * Инициализация компонентов страницы
   */
  init() {
    this.search = new Search({
      input: this.$el.querySelector('.js-search-input'),
      button: this.$el.querySelector('.js-search-btn'),
    });
    this.filmList = new FilmList(this.$el.querySelector('.js-film-list'), this.router);
    this.search.init();
    this.filmList.init();
  }

  /**
   * Удаление компонентов страницы
   */
  destroy() {
    this.search.destroy();
    this.filmList.destroy();
    this.$el.remove();
  }

  /**
   * HTML главной страцицы
   */
  get element() {
    return this.$el;
  }
}
