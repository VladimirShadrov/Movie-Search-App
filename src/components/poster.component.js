import { eventEmitter } from '../libs/eventEmitter';

export class Poster {
  constructor({ rootElement, router }) {
    this.$el = rootElement;
    this.router = router;
    this.breadCrumb = this.$el.querySelector('.breadcrumb');
  }
  init() {
    eventEmitter.subscribe('clickFilmItem', this.getFilmData);
    this.navigate = this.navigate.bind(this);
    this.breadCrumb.addEventListener('click', this.navigate);
  }

  destroy() {
    this.breadCrumb.removeEventListener('click', this.navigate);
    eventEmitter.unsubscribe('clickFilmItem', this.getFilmData);
    this.$el.remove();
  }

  getFilmData(data) {
    // console.log('Film id: ', data);
  }

  navigate(event) {
    event.preventDefault();
    this.router.navigate(event.currentTarget.href);
  }

  get element() {
    return this.$el;
  }
}
