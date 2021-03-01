const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const axios = require('axios');

const Url= 'https://en.wikipedia.org/wiki/List_of_Florida%27s_highest_points';

axios.get(Url).then(response => {
  const dom = new JSDOM(response.data);
  const selection = dom.window.document.querySelectorAll('.wikitable > tbody > tr > td');
  let values = [];
  selection.forEach((x, i) => {
    const content = x.textContent;
    if(content.length <= 5){
        values.push(Number(content));
    }
  });
  values = values.filter(x => x.toString() !== "NaN"? true: false);
  var average = values.reduce((total, num) => {
      return total + Number(num);
  })/Number(values.length);
  console.log(`average elevation from Florida's top ${values.length} highest locations: ${average} ft`);
}).catch(err => {
  console.log(err);
});