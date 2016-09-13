import './main.html';

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { reducer as formReducer, Field, reduxForm } from 'redux-form';
import { Provider } from 'react-redux';
import { Promise } from 'bluebird';

const reducers = {
  form: formReducer
};

const reducer = combineReducers(reducers);
const store = createStore(reducer);

class Form extends React.Component {
  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Field name="username" component="input" type="text" />
        <button>Submit</button>
      </form>
    );
  }
}

const ValidatedForm = reduxForm({
  form: 'username',
  asyncValidate(values) {
    console.log(values);
    return Promise.resolve(true);
  }
})(Form);


class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <ValidatedForm />
      </Provider>
    );
  }
}

window.addEventListener('load', () => {
  ReactDOM.render(<App />, document.getElementById('react-root'));
});

