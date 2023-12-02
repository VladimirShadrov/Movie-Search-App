class EventEmitter {
  constructor() {
    this.events = {};
  }
  subscribe(eventName, listener) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    if (!this.events[eventName].includes(listener)) {
      this.events[eventName].push(listener);
    }
  }

  emit(eventName, data) {
    console.log('Emit: ', data);
    if (this.events[eventName]) {
      this.events[eventName].forEach((listener) => listener(data));
    }
  }

  unsubscribe(eventName, callback) {
    // console.log('До отписки: ', this.events);
    this.events[eventName] = this.events[eventName].filter((listener) => listener !== callback);

    if (!this.events[eventName].length) {
      delete this.events[eventName];
    }

    // console.log('После отписки: ', this.events);
  }
}

export const eventEmitter = new EventEmitter();
