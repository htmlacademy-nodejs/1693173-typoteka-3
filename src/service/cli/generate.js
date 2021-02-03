'use strict';

const chalk = require(`chalk`);

const {
  getRandomInt,
  shuffle,
} = require(`../../utils`);

const fs = require(`fs`).promises;

const DEFAULT_COUNT = 1;
const FILE_NAME = `mocks.json`;
const FILE_SENTENCES_PATH = `./data/sentences.txt`;
const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);
    return content.split(`\n`);
  } catch (err) {
    console.error(chalk.red(err));
    return [];
  }
};

const generateDate = () => {
  const date = new Date(getRandomInt(Date.now() - 7889400000, Date.now()));
  return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
}

const generateOffers = (count, titles, categories, sentences) => (
  Array(count).fill({}).map(() => ({
    title: titles[getRandomInt(0, titles.length - 1)],
    createdDate: generateDate(),
    announce: shuffle(sentences).slice(0, (sentences.length - 1))[0],
    fullText: shuffle(sentences).slice(0, (getRandomInt(0, sentences.length - 1))).join(` `),
    category: shuffle(categories).slice(0, (getRandomInt(0, categories.length - 1))),
  }))
);

module.exports = {
  name: `--generate`,
  async run(args) {
    let sentences;
    let titles;
    let categories;

    await Promise.all([readContent(FILE_SENTENCES_PATH), readContent(FILE_TITLES_PATH), readContent(FILE_CATEGORIES_PATH)]).then((values) => {
      [sentences, titles, categories] = values;
    });

    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    if (countOffer > 1000) {
      console.error(chalk.red(`Не больше 1000 публикаций...`));
      return;
    }

    const content = JSON.stringify(generateOffers(countOffer, titles, categories, sentences));
    try {
      await fs.writeFile(FILE_NAME, content);
      console.info(chalk.green(`Файл успешно создан.`));
    } catch (err) {
        console.error(chalk.red(`Не могу создать файл...`));
    }
  }
};
