//The first
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
  console.log(`Top downloads: ${generalTop.join(', ')}`);

  // step 5
  const [mono] = getDeveloper(data);
  console.log(`Top owner: ${mono}`);
};



//The second
const Kukish = (content) => {
  const contentSplit = content.split('\n');
  return contentSplit;
};

const stackcount = (content) => {
  const contentSplit = content.split('\n');
  const stack = ['React', 'Angular', 'Vue.js', 'JQuery', 'Backbone.js', 'Node.js', 'Ember.js', 'Meteor'];
  const lowercontentSplit = contentSplit[5].toLowerCase();
  let res = 0;
  const lowerstack = stack.map((item) => item.toLowerCase());
  for (let i = 0; i < stack.length; i += 1) {
    if (lowercontentSplit.includes(lowerstack[i])) {
      res += 1;
    }
  }
  return res;
};


const getNickName = (socialString, socialNetwork) => {
  const socials = socialString.split(', ');
  for (let i = 0; i < socials.length; i += 1) {
    const parts = socials[i].split(':/');
    const username = parts[parts.length - 1].split('/').pop();
    if (parts[0].includes(socialNetwork)) {
      return username;
    }
  }
  return 'Никнейм не найден';
};


const calculateExp = (startDate, endDate) => {
  const start = new Date(startDate.split('.').reverse().join('-'));
  const end = new Date(endDate.split('.').reverse().join('-'));

  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return `${years} years ${months} months`;
};


const findEducation = (edStr) => {
  const parts = edStr.split(';');
  let result = '';
  const EdPlaces = parts.map((part) => {
    const trimmedPart = part.trim();
    return trimmedPart.split(',')[0];
  });
  if (EdPlaces[0].toLowerCase().includes('education:')) {
    EdPlaces[0] = EdPlaces[0].replace(/education:/gi, '').trim();
  }
  const sortedEd = EdPlaces.sort();
  result = sortedEd.join(', ');
  return result;
};

// Task 2
const candidateAssessment = (content) => {
  const Split = Kukish(content);
  // task2.1
  console.log(`Job seeker: ${Split[0]}, ${Split[1]}`);
  // task2.2
  console.log(`Required stack: ${stackcount(content)}`);
  // task2.3
  console.log(`GitHub nickname: ${getNickName(Split.at(4), 'github')}`);
  // task2.4
  console.log(`Experience: ${calculateExp('01.01.2015', '05.06.2022')}`);
  // task2.5
  console.log(`Education: ${findEducation(Split.at(7))}`);
};

//The third

// task 3
const actorRating = (/* content */) => {

};

export { tableParsing, candidateAssessment, actorRating };
