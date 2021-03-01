'use strict';

const express = require(`express`);

const articlesRouter = require(`./routes/articles-routes`);
const myRoutes = require(`./routes/my-routes`);
const mainRoutes = require(`./routes/main-routes`);

const DEFAULT_PORT = 8080;

const app = express();

app.use(`/articles`, articlesRouter);
app.use(`/my`, myRoutes);
app.use(`/`, mainRoutes);


app.listen(DEFAULT_PORT);
