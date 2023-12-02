import { Loader } from './loader.component';
import { eventEmitter } from '../libs/eventEmitter';

/**
 * Класс блока поиска
 */
export class Search {
  /**
   * @param {HTMLElement} input
   * @param {HTMLElement} button
   */
  constructor({ input, button }) {
    this.$input = input;
    this.$searchButton = button;
  }
  /**
   * Инициализация компонента
   * Привязка контекста к хендлерам
   * Добавление слушателей
   */
  init() {
    this.getFilmsList = this.getFilmsList.bind(this);
    this.handleInputEvent = this.handleInputEvent.bind(this);

    this.addListeners();
  }

  /**
   * Удаление компонента
   */
  destroy() {
    this.removeListeners();
  }

  /**
   * Добавление слушателей
   */
  addListeners() {
    this.$searchButton.addEventListener('click', this.getFilmsList);
    this.$input.addEventListener('input', this.handleInputEvent);
  }

  /**
   * Отписка от слушателей
   */
  removeListeners() {
    this.$searchButton.removeEventListener('click', this.getFilmsList);
    this.$input.removeEventListener('input', this.handleInputEvent);
  }

  /**
   * Хендлер для события "input"
   */
  handleInputEvent() {
    if (this.$input.value.trim()) {
      this.disableButton(false);
    } else {
      this.disableButton(true);
    }
  }

  /**
   * Хендлер для события "click" на кнопке поиска
   */
  async getFilmsList() {
    const apikey = '7eb915aa';
    const inputValue = this.$input.value.trim();
    this.clearInput();
    const loader = new Loader();

    try {
      const response = await fetch(`https://www.omdbapi.com/?apikey=${apikey}&s=${inputValue}`);
      if (response.ok) {
        const filmData = await response.json();

        if (filmData.Response === 'True') {
          eventEmitter.emit('searchUpdated', filmData.Search);
        } else {
          eventEmitter.emit('searchUpdated', false);
        }

        loader.hide();
      }
    } catch (error) {
      loader.hide();
      throw new Error('Что-то пошло не так: ', error);
    }
  }

  /**
   * Очискта текстового поля
   */
  clearInput() {
    this.$input.value = '';
    this.disableButton(true);
  }

  /**
   * Управление доступностью кнопки поиска
   * @param {Boolean} value
   */
  disableButton(value) {
    this.$searchButton.disabled = value;
  }
}
