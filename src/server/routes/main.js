import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { StaticRouter } from 'react-router';
import { renderRoutes } from 'react-router-config';
import Routes from '../../frontend/routes/serverRoutes';
import reducer from '../../frontend/reducers/index';
// import initialState from '../../frontend/initialState';
import render from '../render';

const main = (req, res, next) => {
  try {
    let initialState
    try {
      const { token, email, name, id } = req.cookies
      initialState = {
        user: {
          id,
          email,
          name
        },
        playing: [],
        mylist: [],
        search: [],
        trends: [],
        originals: [],
      }

    } catch (err) {
      console.log(err)
    }
    const isLogged = (initialState.user.id);
    const store = createStore(reducer, initialState);
    const html = renderToString(
      <Provider store={store}>
        <StaticRouter location={req.url} context={{}}>
          { renderRoutes(Routes(isLogged)) }
        </StaticRouter>
      </Provider>,
    );
    const preloadedState = store.getState();
    res.send(render(html, preloadedState));
  } catch (err) {
    next(err);
  }
};

export default main;
