function ConvertHandler() {

  this.getNum = function (input) {
    const numRule = /^\d*[.]?\d*[\/]?\d*[.]?\d*(?=[a-z]*$)/g;
    const matchNum = input.match(numRule);

    if (!matchNum) return false;
    let [num] = matchNum;

    //  CHECK IF NO NUMBER IS GIVEN
    if (!num) return 1;

    //  CHECK FRACTIONS
    if (num.includes("/")) {
      const [x, y] = num.split("/");
      //  CHECK IF NUM IS VALID
      if (isNaN(+x) || isNaN(+y) || !y) return false;

      return parseFloat(x) / parseFloat(y);

    } else {
      return (isNaN(+num)) ? false : parseFloat(num);
    }

  };

  this.getUnit = function (input) {
    let result;
    const units = ['gal', 'l', 'lbs', 'kg', 'mi', 'km'];

    const unitRule = /[a-z]+$(?<=\d*[.]?\d*[\/]?\d*[.]?\d*)/i;
    const matchUnit = input.match(unitRule);

    if (!matchUnit) return false;

    let [unit] = matchUnit;
    unit = unit.toLowerCase();

    result = (units.includes(unit)) ? unit : false;

    return result;

  };

  this.getReturnUnit = function (initUnit) {
    let result;

    switch (initUnit) {
      case 'gal':
        result = 'l';
        break;
      case 'l':
        result = 'gal';
        break;
      case 'lbs':
        result = 'kg';
        break;
      case 'kg':
        result = 'lbs';
        break;
      case 'mi':
        result = 'km';
        break;
      case 'km':
        result = 'mi';
        break;
    }


    return result;
  };

  this.spellOutUnit = function (unit) {
    let result;

    switch (unit) {
      case 'gal':
        result = 'gallons';
        break;
      case 'l':
        result = 'liters';
        break;
      case 'lbs':
        result = 'pounds';
        break;
      case 'kg':
        result = 'kilograms';
        break;
      case 'mi':
        result = 'miles';
        break;
      case 'km':
        result = 'kilometers';
        break;
    }

    return result;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    switch (initUnit) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'l':
        result = initNum / galToL;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
    }

    return result;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    const initUnitName = this.spellOutUnit(initUnit);
    const returnUnitName = this.spellOutUnit(returnUnit);

    return `${initNum} ${initUnitName} converts to ${returnNum} ${returnUnitName}`;
  };

}

module.exports = ConvertHandler;