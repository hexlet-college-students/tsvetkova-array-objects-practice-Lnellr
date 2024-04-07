const convertToObject = (content) => {
  // отделили шапку от содержимого
  const [keys, ...apps] = content.trim().split('\n');
  // шапку расипилили на массив
  const keysList = keys.split(';').map((key) => (key.startsWith('downloads') ? key.split('_').at(-1) : key.split('_')[0]));
  // создает массив лбъектов
  const appsList = apps.reduce((acc, messenger) => {
  // расспилили каждую строку на массив
    const data = messenger.split(';');
    // создает объект из строки
    acc.push(data.reduce((acc2, value, i) => {
      // в асс добавляем ключ из массива keysList и значение из массива data
      acc2[keysList[i]] = parseFloat(value, 10) || value;
      return acc2;
    }, {}));
    return acc;
  }, []);
  return appsList;
};

const getTopMessenger = (data) => data.reduce((
  top,
  {
    name, developer, playmarket, appstore,
  },
) => (top.at(-1) < playmarket + appstore ? [name, developer, playmarket + appstore] : top), ['', '', 0]);

const getMaxInIndia = (data) => data.reduce((mx, { India }) => Math.max(mx, India), 0);
const getMinInIndia = (data) => data.reduce((mn, { India }) => Math.min(mn, India), Infinity);

const compare = (a, b) => (a[0] > b[0] ? -1 : a[0] === b[0] ? 0 : 1);

const getAustralia = (data) => {
  const temp = data.map(({ name, Australia }) => [Australia, name]).sort(compare);
  return temp.slice(0, 3).map(([, name]) => name).sort();
};

const getAvgTop = (data) => {
  const temp = data.map(({
    name, Russia, Australia, India, England,
  }) => [Russia + Australia + India + England, name]).sort(compare).reverse();
  return temp.map(([, name]) => name);
};

const compareTask5 = (a, b) => (a[1] > b[1] ? -1 : a[1] === b[1] ? 0 : 1);

const getDeveloper = (data) => {
  const temp = data.map(({ developer }) => developer);
  const obj = temp.reduce((objDev, dev) => {
    objDev[dev] = (objDev[dev] || 0) + 1;
    return objDev;
  }, {});
  return Object.entries(obj).sort(compareTask5).at(0);
};

// task 1
const tableParsing = (content) => {
  const data = convertToObject(content);

  // step 1
  const [name, developer] = getTopMessenger(data);
  console.log(`General top messenger: ${name}, Owner: ${developer}`);

  // step 2
  const [mxInd, mnInd] = [getMaxInIndia(data), getMinInIndia(data)];
  console.log(`Download count: Max count: ${mxInd}, Min count: ${mnInd}`);

  // step 3
  const topAustralia = getAustralia(data);
  console.log(`Top-3 Australia: ${topAustralia.join(', ')}`);

  // step 4
  const generalTop = getAvgTop(data);
  console.log(`Top downloads: ${generalTop.join(',')}`);

  // step 5
  const [mono] = getDeveloper(data);
  console.log(`Top owner: ${mono}`);
};

// task 2
const candidateAssessment = (/* content */) => {

};

// task 3
const actorRating = (/* content */) => {

};

export { tableParsing, candidateAssessment, actorRating };
