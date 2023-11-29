class EventEmitter {
  constructor() {
    this.events = {};
  }
  subscribe(eventName, listener) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(listener);
  }

  emit(eventName, data) {
    if (this.events[eventName]) {
      this.events[eventName].forEach((listener) => listener(data));
    }
  }

  unsubscribe(eventName, callback) {
    this.event[eventName] = this.event[eventName].filter((listener) => listener !== callback);
  }
}

export const eventEmitter = new EventEmitter();
