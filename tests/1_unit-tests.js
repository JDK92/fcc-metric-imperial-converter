const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {
  // convertHandler should correctly read a whole number input.
  test("Whole number input", () => {
    assert.equal(convertHandler.getNum("10kg"), 10, "Must be equal to 10");
  });

  // convertHandler should correctly read a decimal number input.
  test("Decimal number input", () => {
    assert.equal(convertHandler.getNum("10.50gal"), 10.50, "Must be equal to 10.5");
  });

  // convertHandler should correctly read a fractional input.
  test("Fractional input", () => {
    assert.equal(convertHandler.getNum("1/5lbs"), 0.2, "Must be equal to 0.2");
  });

  // convertHandler should correctly read a fractional input with a decimal.
  test("Fractional input with a decimal", () => {
    assert.equal(convertHandler.getNum("1.5/2.5mi"), 0.6, "Must be equal to 0.6");
  });

  // convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).
  test("double-fraction", () => {
    assert.isNotOk(convertHandler.getNum("1/2/3km"), "Double fraction = false");
  });

  // convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.
  test("input of 1 when no numerical input is provided", () => {
    assert.isOk(convertHandler.getNum("L"))
  });

  // convertHandler should correctly read each valid input unit.
  suite("Valid input units", () => {
    test("Get L unit", () => {
      assert.equal(convertHandler.getUnit("L"), "L", "The unit must be L");
    });
    test("Get gal unit", () => {
      assert.equal(convertHandler.getUnit("gal"), "gal", "The unit must be gal");
    });
    test("Get km unit", () => {
      assert.equal(convertHandler.getUnit("km"), "km", "The unit must be km");
    });
    test("Get mi unit", () => {
      assert.equal(convertHandler.getUnit("mi"), "mi", "The unit must be mi");
    });
    test("Get lbs unit", () => {
      assert.equal(convertHandler.getUnit("lbs"), "lbs", "The unit must be lbs");
    });
    test("Get kg unit", () => {
      assert.equal(convertHandler.getUnit("kg"), "kg", "The unit must be kg");
    });
  });

  // convertHandler should correctly return an error for an invalid input unit.
  test("Invalid unit input", () => {
    assert.isNotOk(convertHandler.getUnit("aaa"), "aaa is an invalid unit input");
  });

  // convertHandler should return the correct return unit for each valid input unit.
  suite("Return units tests", () => {
    test("L to gal", () => {
      assert.equal(convertHandler.getReturnUnit("L"), "gal", "L must convert to gal");
    });
    test("gal to L", () => {
      assert.equal(convertHandler.getReturnUnit("gal"), "L", "gal must convert to L");
    });
    test("km to mi", () => {
      assert.equal(convertHandler.getReturnUnit("km"), "mi", "km must convert to mi");
    });
    test("mi to km", () => {
      assert.equal(convertHandler.getReturnUnit("mi"), "km", "mi must convert to km");
    });
    test("lbs to kg", () => {
      assert.equal(convertHandler.getReturnUnit("lbs"), "kg", "lbs must convert to kg");
    });
    test("kg to lbs", () => {
      assert.equal(convertHandler.getReturnUnit("kg"), "lbs", "kg must convert to lbs");
    });
  });

  // convertHandler should correctly return the spelled-out string unit for each valid input unit.
  suite("Spelled-out units", () => {
    test("Spelled-out unit: L", () => {
      assert.equal(convertHandler.spellOutUnit("L"), "liters", "L must spell liters");
    });
    test("Spelled-out unit: gal", () => {
      assert.equal(convertHandler.spellOutUnit("gal"), "gallons", "gal must spell gallons");
    });
    test("Spelled-out unit: km", () => {
      assert.equal(convertHandler.spellOutUnit("km"), "kilometers", "km must spell kilometers");
    });
    test("Spelled-out unit: mi", () => {
      assert.equal(convertHandler.spellOutUnit("mi"), "miles", "mi must spell miles");
    });
    test("Spelled-out unit: lbs", () => {
      assert.equal(convertHandler.spellOutUnit("lbs"), "pounds", "lbs must spell pounds");
    });
    test("Spelled-out unit: kg", () => {
      assert.equal(convertHandler.spellOutUnit("kg"), "kilograms", "kg must spell kilograms");
    });
  });

  // convertHandler should correctly convert valid units.
  suite("Unit conversions", () => {
    test("Convert: L to gal", () => {
      assert.equal(convertHandler.convert(1, "L"), 0.26417);
    });
    test("Convert: gal to L", () => {
      assert.equal(convertHandler.convert(1, "gal"), 3.78541);
    });
    test("Convert: lbs to kg", () => {
      assert.equal(convertHandler.convert(1, "lbs"), 0.45359);
    });
    test("Convert: kg to lbs", () => {
      assert.equal(convertHandler.convert(1, "kg"), 2.20462);
    });
    test("Convert: km to mi", () => {
      assert.equal(convertHandler.convert(1, "km"), 0.62137);
    });
    test("Convert: mi to km", () => {
      assert.equal(convertHandler.convert(1, "mi"), 1.60934);
    });
  });
});