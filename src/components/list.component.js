import { eventEmitter } from '../libs/eventEmitter';

export class FilmList {
  constructor(container, router) {
    this.$el = container;
    this.router = router;
    this.eventEmitter = eventEmitter;

    this.subscribeOnEvent();
  }

  subscribeOnEvent() {
    this.eventEmitter.subscribe('sendFilmsList', this.renderList.bind(this));
  }

  renderList(data) {
    this.$el.innerHTML = '';

    if (data) {
      data.forEach((filmData) => {
        const film = this.createListElements(filmData);
        film.addEventListener('click', () => this.router.navigate(film.dataset.route));
        this.$el.append(film);
      });
    } else {
      this.$el.append(this.createListElements(data));
    }
  }

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
