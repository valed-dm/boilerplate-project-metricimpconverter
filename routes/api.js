'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function(app) {
  app.route('/api/convert').get((req, res) => {
    let a, b, c, d, actual;
    let input = req.query.input;
    let convertHandler = new ConvertHandler(input);

    a = convertHandler.getNum(input);
    b = convertHandler.getUnit(input);
    c = convertHandler.convert(a,b);
    d = convertHandler.getReturnUnit(b);
    
    convertHandler.spellOutUnit(a,b,c,d);
    actual = convertHandler.getString(a,c);
    res.json({initNum: a, initUnit: b, returnNum: c, returnUnit: d, string: actual});
  });
};
