import { eventEmitter } from '../libs/eventEmitter';

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
    this.breadCrumb = this.$el.querySelector('.breadcrumb');
  }
  /**
   * Инициализация класса
   */
  init() {
    eventEmitter.subscribe('clickFilmItem', this.getFilmData);
    this.navigate = this.navigate.bind(this);
    this.breadCrumb.addEventListener('click', this.navigate);
  }

  /**
   * Уничтожение класса
   */
  destroy() {
    this.breadCrumb.removeEventListener('click', this.navigate);
    eventEmitter.unsubscribe('clickFilmItem', this.getFilmData);
    this.$el.remove();
  }

  /**
   * Получение данных для отрисовки постера
   * @param {String} id
   */
  getFilmData(id) {
    // console.log('Film id: ', data);
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
