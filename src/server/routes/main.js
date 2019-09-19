import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { StaticRouter } from 'react-router';
import { renderRoutes } from 'react-router-config';
import axios from 'axios'
import { config } from '../config'
import Routes from '../../frontend/routes/serverRoutes';
import reducer from '../../frontend/reducers/index';
import render from '../render';

const main = async (req, res, next) => {
  try {
    let initialState
    try {
      const { token, email, name, id } = req.cookies
      let user = {}
      if (email) {
        user = {
          id,
          email,
          name
        }
      }

      let moviesList = await axios({
        url: `${config.apiUrl}/api/movies`,
        headers: {
          Authorization: `Bearer ${token}`
        },
        method: 'get'
      })

      let userMoviesList = await axios({
        url: `${config.apiUrl}/api/user-movies?userId=${id}`,
        headers: {
          Authorization: `Bearer ${token}`
        },
        method: 'get'
      })

      moviesList = await moviesList.data.data
      userMoviesList = await userMoviesList.data.data

      let finalUserMoviesList = []

      userMoviesList.forEach(userMovie => {
        moviesList.forEach(movie => {
          if(userMovie.movieId === movie.id) {
            movie._id = userMovie._id
            finalUserMoviesList.push(movie)
          }
        })
      })

      initialState = {
        user,
        playing: [],
        mylist: finalUserMoviesList,
        search: [],
        trends: moviesList.filter(movie => movie.contentRating === 'PG' && movie.id),
        originals: moviesList.filter(movie => movie.contentRating === 'G' && movie.id),
      }

    } catch (err) {
      initialState = {
        user: {},
        playing: [],
        mylist: [],
        search: [],
        trends: [],
        originals: [],
      }
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
