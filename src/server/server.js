/* eslint-disable import/no-unresolved */
/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
import express from 'express';
import dotenv from 'dotenv';
import webpack from 'webpack';
import helmet from 'helmet';
import main from './routes/main';
import axios from 'axios'
import Cookies from 'js-cookie'
const passport = require("passport");
const boom = require('@hapi/boom')
const { config } = require('./config')
const cookies = require('cookie-parser')

dotenv.config();

const ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 3000;

const app = express();
app.use(cookies())
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

if (ENV === 'development') {
  console.log('Loading dev config');
  const webpackConfig = require('../../webpack.config');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const compiler = webpack(webpackConfig);
  const serverConfig = {
    contentBase: `http://localhost${PORT}`,
    port: PORT,
    publicPath: webpackConfig.output.publicPath,
    hot: true,
    historyApiFallback: true,
    stats: { colors: true },
  };

  app.use(webpackDevMiddleware(compiler, serverConfig));
  app.use(webpackHotMiddleware(compiler));
} else {
  console.log('Loading prod config');
  app.use(helmet());
  app.use(helmet.permittedCrossDomainPolicies());
  app.disable('x-powered-by');
}

/* Basic strategy */
require("./utils/auth/strategies/basic");

/* OAuth strategy */
require("./utils/auth/strategies/oauth");

/* Google strategy */
require("./utils/auth/strategies/google");

/* Twitter strategy */
// require("./utils/auth/strategies/twitter");

/* Facebook strategy */
require("./utils/auth/strategies/facebook");

app.post("/auth/sign-in", async function(req, res, next) {
  passport.authenticate("basic", function(error, data) {
    try {
      if (error || !data) {
        next(boom.unauthorized());
      }

      req.login(data, { session: false }, async function(error) {
        if (error) {
          next(error);
        }

        const { token, ...user } = data;

        res.cookie("token", token, {
          httpOnly: !(ENV === 'development'),
          secure: !(ENV === 'development'),
        });

        res.status(200).json(user);
      });
    } catch (err) {
      next(err);
    }
  })(req, res, next);
});

app.post("/auth/sign-up", async function(req, res, next) {
  const { body: user } = req;

  try {
    await axios({
      url: `${config.apiUrl}/api/auth/sign-up`,
      method: "post",
      data: user
    });

    res.status(201).json({
      message: "user created"
    });
  } catch (error) {
    next(error);
  }
});

app.get(
  "/auth/google-oauth",
  passport.authenticate("google-oauth", {
    scope: ["email", "profile", "openid"]
  })
);

app.get(
  "/auth/google-oauth/callback",
  passport.authenticate("google-oauth", {
    session: false
  }),
  function(req, res, next) {
    if (!req.user) {
      next(boom.unauthorized());
    }

    const { token, ...user } = req.user;

    res.cookie("token", token, {
      httpOnly: !config.dev,
      secure: !config.dev
    });

    res.cookie("name", user.user.name)
    res.cookie("email", user.user.email)
    res.cookie("id", user.user.id)
    res.cookie("token", token)

    res.redirect('back')
  }
);

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["email", "profile", "openid"]
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false }),
  function(req, res, next) {
    if (!req.user) {
      next(boom.unauthorized());
    }

    const { token, ...user } = req.user;

    res.cookie("token", token, {
      httpOnly: !config.dev,
      secure: !config.dev
    });

    res.status(200).json(user);
  }
);

app.get("/auth/facebook", passport.authenticate("facebook"));

app.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", { session: false }),
  function(req, res, next) {
    if (!req.user) {
      next(boom.unauthorized());
    }

    const { token, ...user } = req.user;

    res.cookie("token", token, {
      httpOnly: !config.dev,
      secure: !config.dev
    });

    res.cookie("name", user.user.name)
    res.cookie("email", user.user.email)
    res.cookie("id", user.user.id)

    res.redirect('back')

    // res.status(200).json(user);
  }
);

app.post('/api/user-movies', async function (req, res, next) {
  const { body: data } = req;

  try {
    const { token } = req.cookies
    await axios({
      url: `${config.apiUrl}/api/user-movies`,
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`
      },
      data
    });

    res.status(201).json({
      message: "user movie created"
    });
  } catch (error) {
    next(error);
  }
})

app.delete('/api/user-movies/:userMovieId', async function (req, res, next) {
  const { body: data } = req;

  try {
    const { userMovieId } = req.params
    const { token } = req.cookies
    await axios({
      url: `${config.apiUrl}/api/user-movies/${userMovieId}`,
      method: "delete",
      headers: {
        Authorization: `Bearer ${token}`
      },
      data
    });

    res.status(200).json({
      message: "user movie delete"
    });
  } catch (error) {
    next(error);
  }
})

app.get('*', main);


app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  }

  console.log(`Server running on ${PORT}`);
});
