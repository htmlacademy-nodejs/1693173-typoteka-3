'use strict';

const express = require(`express`);
const path = require(`path`);
const PUBLIC_DIR = `public`;

const articlesRouter = require(`./routes/articles-routes`);
const myRoutes = require(`./routes/my-routes`);
const mainRoutes = require(`./routes/main-routes`);

const DEFAULT_PORT = 8080;

const app = express();

app.set(`views`, path.resolve(__dirname, `templates`));
app.set(`view engine`, `pug`);

app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));
app.use(`/articles`, articlesRouter);
app.use(`/my`, myRoutes);
app.use(`/`, mainRoutes);


app.listen(DEFAULT_PORT);
