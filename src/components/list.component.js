import { eventEmitter } from '../libs/eventEmitter';

/**
 * Класс списка фильмов
 */
export class FilmList {
  /**
   * @param {HTMLElement} container - Корневой элемент
   * @param {Object} router - Инстанс класса Роутер
   */
  constructor(container, router) {
    this.$el = container;
    this.router = router;

    this.renderList = this.renderList.bind(this);
  }

  /**
   * Подписка на события
   */
  init() {
    eventEmitter.subscribe('searchUpdated', this.renderList);
  }

  /**
   * Отписка от событий
   */
  destroy() {
    eventEmitter.unsubscribe('searchUpdated', this.renderList);
  }

  /**
   * Хендлер отрисовки списка
   * @param {Object[]} data - Объект с данными для отрисовки списка
   */
  renderList(data) {
    this.$el.innerHTML = '';

    if (data) {
      data.forEach((filmData) => {
        const film = this.createListElements(filmData);
        film.addEventListener('click', () => {
          this.router.navigate(film.dataset.route);
          eventEmitter.emit('clickFilmItem', film.dataset.filmId);
        });
        this.$el.append(film);
      });
    } else {
      this.$el.append(this.createListElements(data));
    }
  }

  /**
   * Создание HTML карточки фильма
   * @param {Object} data - Данные для заполнения карточки
   * @returns {HTMLElement} - HTML карточки фильма
   */
  createListElements(data) {
    const parser = new DOMParser();

    if (data) {
      const filmString = `
        <div class="film" data-route="/detail" data-film-id="${data.imdbID}">
            <div class="film__image">
                <img class="image" src="${data.Poster !== 'N/A' ? data.Poster : './assets/images/not-found.jpg'}" alt="poster" />
            </div>
            <div class="film__description">
                <h3 class="film__title">${data.Title}</h3>
                <div class="film__year">${data.Year}</div>
                <div class="film__type">${data.Type}</div>
            </div>
        </div>
        `;
      return parser.parseFromString(filmString, 'text/html').body.firstChild;
    } else {
      const notFoundString = '<div class="not-found">Фильмы не найдены</div>';
      return parser.parseFromString(notFoundString, 'text/html').body.firstChild;
    }
  }
}
