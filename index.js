const convertToObject = (content) => {
  const [keys, ...apps] = content.trim().split('\n');
  const keysList = keys.split(';').map((key) => key.startsWith('downloads') ? key.split('_').at(-1) : key.split('_')[0]));
//создает массив объектов
  const appsList = apps.reduce((acc, messenger) => {
    const data = messenger.split(';');
// создает объект из строки
    acc.push (data.reduce((acc2, value, i) => {
      acc2[keysList[i]] = parseFloat(value, 10);
      return acc2;   
      }, {}));
    return acc;
    }, []);
return appsList;
};

const getTopMessenger = (data) => data.reduce((top, 
  {name, developer, playmarket, appstore}
  ) => {
    return top.at(-1) < playmarket + appstore ? [name, developer, playmarket + appstore] : top;
}, ['', '', 0]);

const getMaxInIndia = (data) => data.reduce((mx, {India}) => Math.max(mx, India), 0);
const getMinInIndia = (data) => data.reduce((mn, {India}) => Math.min(mn, India), Infinity);

const compare = (a, b) => a > b ? -1 : a === b ? 0 : 1;

const getAustralia = (data) => {
  const temp = data.map(({name, Australia}) => [Australia, name]).sort(compare);
  return temp.slice(0, 3).map(([, name]) => name).sort();
};

const getAvgTop = (data) => {
  const temp = data.map(({
    name, Russia, Australia, India, England
  }) => [Russia + Australia + India + England, name]).sort(compare).reverse();
  return temp.map(([, name]) => name);
};

     // task 1
const tableParsing = (content) => {
  const data = convertToObject(content);

    // step1
  const [name, developer] = getTopMessenger(data);
  console.log(`General top messenger: ${name}, Owner: ${developer}`);
    // step 2
  const[mxInd, mnInd] = [getMaxInIndia(data), getMinInIndia(data)];
  console.log(`Download count: Max count: ${mxInd}, Min count: ${mnInd}`);
   // step 3
 const topAustralia = getAustralia(data);
 console.log(`Top-3 Australia: ${topAustralia.join(', ')}`);
  // step 4
  const generalTop = getAvgTop(data);
  console.log(`Top downloads: ${generalTop.join(', ')}`); 
};


// task 2
const candidateAssessment = (/* content */) => {

};

// task 3
const actorRating = (/* content */) => {

};

export { tableParsing, candidateAssessment, actorRating };
