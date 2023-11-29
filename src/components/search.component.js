import { Loader } from './loader.component';

export class Search {
  constructor({ input, button }) {
    this.$input = input;
    this.$searchButton = button;

    this.addListeners();
  }
  addListeners() {
    this.$searchButton.addEventListener('click', this.getFilmsList.bind(this));
    this.$input.addEventListener('input', () => {
      if (this.$input.value.trim()) {
        this.disableButton(false);
      } else {
        this.disableButton(true);
      }
    });
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
        console.log(filmData);
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
