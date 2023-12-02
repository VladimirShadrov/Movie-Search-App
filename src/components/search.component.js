import { Loader } from './loader.component';
import { eventEmitter } from '../libs/eventEmitter';

export class Search {
  constructor({ input, button }) {
    this.$input = input;
    this.$searchButton = button;
  }
  init() {
    this.getFilmsList = this.getFilmsList.bind(this);
    this.handleInputEvent = this.handleInputEvent.bind(this);

    this.addListeners();
  }

  destroy() {
    this.removeListeners();
  }

  addListeners() {
    this.$searchButton.addEventListener('click', this.getFilmsList);
    this.$input.addEventListener('input', this.handleInputEvent);
  }

  removeListeners() {
    this.$searchButton.removeEventListener('click', this.getFilmsList);
    this.$input.removeEventListener('input', this.handleInputEvent);
  }

  handleInputEvent() {
    if (this.$input.value.trim()) {
      this.disableButton(false);
    } else {
      this.disableButton(true);
    }
  }

  async getFilmsList() {
    const apikey = '7eb915aa';
    const inputValue = this.$input.value.trim();
    this.clearInput();
    const loader = new Loader();

    try {
      const response = await fetch(`http://www.omdbapi.com/?apikey=${apikey}&s=${inputValue}`);
      if (response.ok) {
        const filmData = await response.json();

        if (filmData.Response === 'True') {
          eventEmitter.emit('sendFilmsList', filmData.Search);
        } else {
          eventEmitter.emit('sendFilmsList', false);
        }

        loader.hide();
      }
    } catch (error) {
      loader.hide();
      throw new Error('Что-то пошло не так: ', error);
    }
  }

  clearInput() {
    this.$input.value = '';
    this.disableButton(true);
  }

  disableButton(value) {
    this.$searchButton.disabled = value;
  }
}
