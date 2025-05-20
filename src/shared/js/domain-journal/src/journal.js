class Journal {
  constructor() {
    this.entries = [];
    this.callbacks = [];
  }

  append(message) {
    const entry = {
      timestamp: Date.now(),
      message
    };
    this.entries.push(entry);
    this.callbacks.forEach(cb => cb(entry));
  }

  getAll() {
    return [...this.entries];
  }

  onEntryAdded(callback) {
    this.callbacks.push(callback);
  }

  clear() {
    this.entries = [];
  }

  
}

module.exports = { Journal };