class EventEmitter {
  constructor() {
    this.events = {};
  }
  /**
   * Подписка на событие
   * @param {String} eventName - Имя события
   * @param {Function} listener - Обработчик
   */
  subscribe(eventName, listener) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    if (!this.events[eventName].includes(listener)) {
      this.events[eventName].push(listener);
    }
  }

  /**
   * Оповещение слушателей при наступлении события
   * @param {String} eventName - Имя события
   * @param {any} data - Данные, передаваемые в обработчик
   */
  emit(eventName, data) {
    if (this.events[eventName]) {
      this.events[eventName].forEach((listener) => listener(data));
    }
  }

  /**
   * Отписка от событий
   * @param {String} eventName - Имя события
   * @param {Function} callback - Обработчик
   */
  unsubscribe(eventName, callback) {
    this.events[eventName] = this.events[eventName].filter((listener) => listener !== callback);

    if (!this.events[eventName].length) {
      delete this.events[eventName];
    }
  }
}

export const eventEmitter = new EventEmitter();
