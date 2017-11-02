import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Router from './Router';
import reducers from './reducers';

class App extends Component {
  render() {
    const store = createStore(reducers);
    return (
      <Provider store={store} >
        <Router />
      </Provider>
    );
  }
}
export default App;
