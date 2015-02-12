'use strict';

module.exports = {
  getInitialState: function() {
    if (this.getStateFromStores) {
      return this.getStateFromStores();
    }

    return {};
  },

  componentDidMount: function() {
    this.stores.forEach(function(store) {
      store.addChangeListener(this._onChange);
    }.bind(this));
  },

  componentWillUnmount: function() {
    this.stores.forEach(function(store) {
      store.removeChangeListener(this._onChange);
    }.bind(this));
  },

  _onChange: function() {
    if (this.getStateFromStores) {
      this.setState(this.getStateFromStores());
    }
  }
};

