import { eventEmitter } from '../libs/eventEmitter';
import { Loader } from './loader.component';

/**
 * Класс постера фильма
 */
export class Poster {
  /**
   * @param {HTMLElement} rootElement - Корневой элемент
   * @param {Object} router - Роутер
   */
  constructor({ rootElement, router }) {
    this.$el = rootElement;
    this.router = router;
    this.$breadCrumb = this.$el.querySelector('.breadcrumb');
    this.$filmContainer = this.$el.querySelector('.film');
  }
  /**
   * Инициализация класса
   */
  init() {
    this.getFilmData = this.getFilmData.bind(this);
    eventEmitter.subscribe('clickFilmItem', this.getFilmData);
    this.navigate = this.navigate.bind(this);
    this.$breadCrumb.addEventListener('click', this.navigate);
  }

  /**
   * Уничтожение класса
   */
  destroy() {
    this.$breadCrumb.removeEventListener('click', this.navigate);
    eventEmitter.unsubscribe('clickFilmItem', this.getFilmData);
    this.$el.remove();
  }

  /**
   * Получение данных для отрисовки постера
   * @param {String} id
   */
  async getFilmData(id) {
    const apikey = '7eb915aa';
    this.$filmContainer.innerHTML = '';
    const loader = new Loader();

    try {
      const response = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=${apikey}`);

      if (response.ok) {
        const posterData = await response.json();
        this.$filmContainer.append(this.createPoster(posterData));
        loader.hide();
      }
    } catch (error) {
      throw new Error(`Ошибка получения данных: ${error}`);
    }
  }

  /**
   * Создает HTML постера
   * @param {Object} data
   * @returns {DocumentFragment}
   */
  createPoster(data) {
    const fragment = document.createDocumentFragment();
    const tempDiv = document.createElement('div');
    const defaultText = 'В процессе наполнения';
    const stringTemplate = `
      <div class="film__preview">
        <div class="film__image">
          <img src="${data.Poster !== 'N/A' ? data.Poster : './assets/images/not-found.jpg'}" alt="film-image" />
        </div>
        <div class="film__details">
          <h1 class="title">${data.Title !== 'N/A' ? data.Title : defaultText}</h1>
          <div class="param">
            <span class="param__option">Год:</span>
            <span class="param__value">${data.Year !== 'N/A' ? data.Year : defaultText}</span>
          </div>
          <div class="param">
            <span class="param__option">Рейтинг:</span>
            <span class="param__value">${data.Rated !== 'N/A' ? data.Rated : defaultText}</span>
          </div>
          <div class="param">
            <span class="param__option">Дата выхода:</span>
            <span class="param__value">${data.Released !== 'N/A' ? data.Released : defaultText}</span>
          </div>
          <div class="param">
            <span class="param__option">Продолжительность:</span>
            <span class="param__value">${data.Runtime !== 'N/A' ? data.Runtime : defaultText}</span>
          </div>
          <div class="param">
            <span class="param__option">Жанр:</span>
            <span class="param__value">${data.Genre !== 'N/A' ? data.Genre : defaultText}</span>
          </div>
          <div class="param">
            <span class="param__option">Режиссер:</span>
            <span class="param__value">${data.Director !== 'N/A' ? data.Director : defaultText}</span>
          </div>
          <div class="param">
            <span class="param__option">Сценарий:</span>
            <span class="param__value">${data.Writer !== 'N/A' ? data.Writer : defaultText}</span>
          </div>
          <div class="param">
            <span class="param__option">Актеры:</span>
            <span class="param__value">${data.Actors !== 'N/A' ? data.Actors : defaultText}</span>
          </div>
        </div>
      </div>
      <div class="film-description">${data.Plot !== 'N/A' ? data.Plot : defaultText}</div>
    `;

    tempDiv.innerHTML = stringTemplate;

    while (tempDiv.firstChild) {
      fragment.appendChild(tempDiv.firstChild);
    }

    return fragment;
  }

  /**
   * Обработчик клика по хлебной крошке
   * @param {String} event - Название события
   */
  navigate(event) {
    event.preventDefault();
    this.router.navigate(event.currentTarget.href);
  }

  /**
   * HTML компонента
   */
  get element() {
    return this.$el;
  }
}
