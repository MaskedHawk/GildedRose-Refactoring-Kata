import { expect } from "chai";
import {
  BaselineAgingStrategy,
  BetterWithTimeAgingStrategy,
  LegendaryItemAgingStrategy,
  EventAgingStrategy,
} from "../app/AgingStrategy";

describe("Test of BaselineAgingStrategy", function () {
  it("should loose quality every day at a baseline rate up to expiration date", function () {
    const strategy = new BaselineAgingStrategy();
    expect(strategy.updateQuality(10, 5)).to.equal(9);
    expect(strategy.updateQuality(10, 0)).to.equal(9);
  });

  it("should loose quality twice as fast once expiration date has passed", function () {
    const strategy = new BaselineAgingStrategy();
    expect(strategy.updateQuality(10, -1)).to.equal(8);
  });

  it("quality should not be lower than 0", function () {
    const strategy = new BaselineAgingStrategy();
    expect(strategy.updateQuality(0, 5)).to.equal(0);
    expect(strategy.updateQuality(1, -1)).to.equal(0);
  });
});

describe("Test of BetterWithTimeAgingStrategy", function () {
  it("should gain in quality every day at a baseline rate up to expiration date", function () {
    const strategy = new BetterWithTimeAgingStrategy();
    expect(strategy.updateQuality(10, 5)).to.equal(11);
    expect(strategy.updateQuality(10, 0)).to.equal(11);
  });

  it("should gain quality twice as fast once expiration date has passed", function () {
    const strategy = new BetterWithTimeAgingStrategy();
    expect(strategy.updateQuality(10, -1)).to.equal(12);
  });

  it("quality should not be greater than 50", function () {
    const strategy = new BetterWithTimeAgingStrategy();
    expect(strategy.updateQuality(50, 5)).to.equal(50);
    expect(strategy.updateQuality(49, -1)).to.equal(50);
  });
});

describe("Test of LegendaryItemAgingStrategy", function () {
  it("should have constant quality", function () {
    const strategy = new LegendaryItemAgingStrategy();
    expect(strategy.updateQuality(10, -5)).to.equal(80);
    expect(strategy.updateQuality(10, 5)).to.equal(80);
  });
});

describe("Test of EventAgingStrategy", function () {
  it("should gain in quality every day at a baseline rate up to 10 days before expiration date", function () {
    const strategy = new EventAgingStrategy();
    expect(strategy.updateQuality(10, 11)).to.equal(11);
    expect(strategy.updateQuality(10, 10)).to.equal(11);
  });

  it("should gain more in quality every day up to 5 days before expiration date", function () {
    const strategy = new EventAgingStrategy();
    expect(strategy.updateQuality(10, 9)).to.equal(12);
    expect(strategy.updateQuality(10, 5)).to.equal(12);
  });

  it("should gain even more in quality every day up to the expiration date", function () {
    const strategy = new EventAgingStrategy();
    expect(strategy.updateQuality(10, 4)).to.equal(13);
    expect(strategy.updateQuality(10, 0)).to.equal(13);
  });

  it("quality should drop to 0 after the expiration date", function () {
    const strategy = new EventAgingStrategy();
    expect(strategy.updateQuality(10, -1)).to.equal(0);
    expect(strategy.updateQuality(10, -5)).to.equal(0);
  });

  it("quality should not be greater than 50", function () {
    const strategy = new EventAgingStrategy();
    expect(strategy.updateQuality(50, 11)).to.equal(50);
    expect(strategy.updateQuality(49, 9)).to.equal(50);
    expect(strategy.updateQuality(48, 4)).to.equal(50);
  });
});
