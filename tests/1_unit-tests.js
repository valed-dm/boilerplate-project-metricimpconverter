const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");
let input, actual, expected, convertHandler, a, b, c, d;

suite("Unit Tests", function() {
  //#1
  test("whole number input", function() {
    input = "2mi";
    expected = 2;
    convertHandler = new ConvertHandler(input);
    actual = convertHandler.getNum(input);
    assert.equal(expected, actual);
  });
  //#2
  test("decimal number input", function() {
    input = "1/3mi";
    expected = 0.33333;
    convertHandler = new ConvertHandler(input);
    actual = convertHandler.getNum(input);
    assert.equal(expected, actual);
  });
  //#3
  test("fractional input", function() {
    input = "1/4mi";
    expected = 0.25;
    convertHandler = new ConvertHandler(input);
    actual = convertHandler.getNum(input);
    assert.equal(expected, actual);
  });
  //#4
  test("fractional input with a decimal", function() {
    input = "1.5/0.5mi";
    expected = 3;
    convertHandler = new ConvertHandler(input);
    actual = convertHandler.getNum(input);
    assert.equal(expected, actual);
  });
  //#5
  test("double-fraction input", function() {
    input = "3/2/3mi";
    expected = "invalid number";
    convertHandler = new ConvertHandler(input);
    actual = convertHandler.getNum(input);
    assert.equal(expected, actual);
  });
  //#6
  test("no numerical input", function() {
    input = "mi";
    expected = 1;
    convertHandler = new ConvertHandler(input);
    actual = convertHandler.getNum(input);
    assert.equal(expected, actual);
  });
  //#7
  test("correctly read each valid input unit", function() {
    input = "l";
    expected = "L";
    convertHandler = new ConvertHandler(input);
    actual = convertHandler.getUnit(input);
    assert.strictEqual(expected, actual);
  });
  //#8
  test("correctly return an error for an invalid input unit", function() {
    input = "kMkgMiLBS";
    expected = "invalid unit";
    convertHandler = new ConvertHandler(input);
    actual = convertHandler.getUnit(input);
    assert.equal(expected, actual);
  });
  //#9
  test("return the correct return unit for each valid input unit", function() {
    input = "LbS";
    expected = "kg";
    convertHandler = new ConvertHandler(input);
    actual = convertHandler.getReturnUnit(convertHandler.getUnit(input));
    assert.equal(expected, actual);
  });

  //#10
  test("correctly return the spelled-out string unit for each valid input unit", function() {
    input = "5LBs";
    expected = "5 pounds converts to 2.26796 kilograms";
    convertHandler = new ConvertHandler(input);
    a = convertHandler.getNum(input);
    b = convertHandler.getUnit(input);
    c = convertHandler.convert(a, b);
    d = convertHandler.getReturnUnit(b);
    convertHandler.spellOutUnit(a, b, c, d);
    actual = convertHandler.getString(a, b, c);
    assert.equal(expected, actual);
  });
  //#11
  test("correctly convert gal to l", function() {
    input = "gal";
    expected = "1 gallons converts to 3.78541 liters";
    convertHandler = new ConvertHandler(input);
    a = convertHandler.getNum(input);
    b = convertHandler.getUnit(input);
    c = convertHandler.convert(a, b);
    d = convertHandler.getReturnUnit(b);
    convertHandler.spellOutUnit(a, b, c, d);
    actual = convertHandler.getString(a, b, c);
    assert.equal(expected, actual);
  });
  //#12
  test("correctly convert l to gal", function() {
    input = "l";
    expected = "1 liters converts to 0.26417 gallons";
    convertHandler = new ConvertHandler(input);
    a = convertHandler.getNum(input);
    b = convertHandler.getUnit(input);
    c = convertHandler.convert(a, b);
    d = convertHandler.getReturnUnit(b);
    convertHandler.spellOutUnit(a, b, c, d);
    actual = convertHandler.getString(a, b, c);
    assert.equal(expected, actual);
  });
  //#13
  test("correctly convert mi to km", function() {
    input = "mi";
    expected = "1 miles converts to 1.60934 kilometers";
    convertHandler = new ConvertHandler(input);
    a = convertHandler.getNum(input);
    b = convertHandler.getUnit(input);
    c = convertHandler.convert(a, b);
    d = convertHandler.getReturnUnit(b);
    convertHandler.spellOutUnit(a, b, c, d);
    actual = convertHandler.getString(a, b, c);
    assert.equal(expected, actual);
  });
  //#14
  test("correctly convert km to mi", function() {
    input = "km";
    expected = "1 kilometers converts to 0.62137 miles";
    convertHandler = new ConvertHandler(input);
    a = convertHandler.getNum(input);
    b = convertHandler.getUnit(input);
    c = convertHandler.convert(a, b);
    d = convertHandler.getReturnUnit(b);
    convertHandler.spellOutUnit(a, b, c, d);
    actual = convertHandler.getString(a, b, c);
    assert.equal(expected, actual);
  });
  //#15
  test("correctly convert lbs to kg", function() {
    input = "lbs";
    expected = "1 pounds converts to 0.45359 kilograms";
    convertHandler = new ConvertHandler(input);
    a = convertHandler.getNum(input);
    b = convertHandler.getUnit(input);
    c = convertHandler.convert(a, b);
    d = convertHandler.getReturnUnit(b);
    convertHandler.spellOutUnit(a, b, c, d);
    actual = convertHandler.getString(a, b, c);
    assert.equal(expected, actual);
  });
  //#16
  test("correctly convert kg to lbs", function() {
    input = "kg";
    expected = "1 kilograms converts to 2.20462 pounds";
    convertHandler = new ConvertHandler(input);
    a = convertHandler.getNum(input);
    b = convertHandler.getUnit(input);
    c = convertHandler.convert(a, b);
    d = convertHandler.getReturnUnit(b);
    convertHandler.spellOutUnit(a, b, c, d);
    actual = convertHandler.getString(a, b, c);
    assert.equal(expected, actual);
  });
});
