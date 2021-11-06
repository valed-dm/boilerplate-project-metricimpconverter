 const ConvertHandler = function(input) {
  const galToL = 3.78541;
  const lToGal = 0.26417;
  const lbsToKg = 0.453592;
  const kgToLbs = 2.20462;
  const miToKm = 1.60934;
  const kmToMi = 0.62137;
  const letters = /[a-zA-Z]+/g;
  const nonLetters = /[^a-zA-Z]+/g;
  const convertList = {
    gal: galToL,
    L: lToGal,
    lbs: lbsToKg,
    kg: kgToLbs,
    mi: miToKm,
    km: kmToMi
  };
  const unitsSingular = {
    gal: "gallon",
    L: "liter",
    lbs: "pound",
    kg: "kilogram",
    mi: "mile",
    km: "kilometer"
  };
  const unitsPlural = {
    gal: "gallons",
    L: "liters",
    lbs: "pounds",
    kg: "kilograms",
    mi: "miles",
    km: "kilometers"
  };
  const unitsLinks = {
    gal: "L",
    L: "gal",
    lbs: "kg",
    kg: "lbs",
    mi: "km",
    km: "mi"
  };

  let initNum,
    initUnit,
    returnNum,
    returnUnit,
    string,
    spellOutInput,
    spellOutOutput,
    spellOutUnits,
    inputCheck,
    inputSequence;

  this.getNum = function(input) {
    inputCheck = nonLetters.exec(input);
    inputSequence = inputCheck === null ? "1" : inputCheck[0];
    let fractionIdx = inputSequence.indexOf("/");
    let twoNumbers =
      fractionIdx === -1
        ? [inputSequence, undefined]
        : inputSequence.split("/");
    let numATest = !isNaN(twoNumbers[0]);
    let numBTest = !isNaN(twoNumbers[1]);
    let fractionSign = [];
    while (fractionIdx !== -1) {
      fractionSign.push(fractionIdx);
      fractionIdx = inputSequence.indexOf("/", fractionIdx + 1);
    }
    this.initNum =
      fractionSign.length === 0 && !isNaN(inputSequence)
        ? Math.round(parseFloat(inputSequence) * 100000) / 100000
        : fractionSign.length === 1 && numATest && numBTest
        ? Math.round(
            (parseFloat(twoNumbers[0]) / parseFloat(twoNumbers[1])) * 100000
          ) / 100000
        : "invalid number";
    return this.initNum;
  };

  this.getUnit = function(input) {
    inputCheck = letters.exec(input);
    inputSequence = inputCheck === null ? null : inputCheck[0].toLowerCase();
    inputSequence = inputSequence === "l" ? "L" : inputSequence;
    this.initUnit = convertList[inputSequence] ? inputSequence : "invalid unit";
    return this.initUnit;
  };

  this.getReturnUnit = function(initUnit) {
    this.returnUnit = unitsLinks[initUnit];
    return this.returnUnit;
  };

  this.spellOutUnit = function(initNum, initUnit, returnNum, returnUnit) {
    spellOutInput =
      initNum <= 1 ? unitsSingular[initUnit] : unitsPlural[initUnit];
    spellOutOutput =
      returnNum <= 1 ? unitsSingular[returnUnit] : unitsPlural[returnUnit];
    spellOutUnits = [spellOutInput, spellOutOutput];
    return spellOutUnits;
  };

  this.convert = function(initNum, initUnit) {
    this.returnNum =
      Math.round(initNum * convertList[initUnit] * 100000) / 100000;
    return this.returnNum;
  };

  this.getString = function(initNum, returnNum) {
    this.string =
      initNum +
      " " +
      spellOutUnits[0] +
      " converts to " +
      returnNum +
      " " +
      spellOutUnits[1];
    return this.string;
  };
};

module.exports = ConvertHandler;
