import { expect } from "chai";
import { Item, GildedRose, ItemWrapper } from "../app/GildedRose";
import {
  BaselineAgingStrategy,
  BetterWithTimeAgingStrategy,
  LegendaryItemAgingStrategy,
  EventAgingStrategy,
} from "../app/AgingStrategy";
import { LegacyTimeStrategy } from "../app/LegacyTimeStrategy";

// new Item("Conjured Mana Cake", 3, 6)

describe("Golden Master test", function () {
  it("should not modify the output", function () {
    // GIVEN
    const items = [
      new ItemWrapper(
        new Item("+5 Dexterity Vest", 10, 20),
        new BaselineAgingStrategy()
      ),
      new ItemWrapper(
        new Item("Aged Brie", 2, 0),
        new BetterWithTimeAgingStrategy()
      ),
      new ItemWrapper(
        new Item("Elixir of the Mongoose", 5, 7),
        new BaselineAgingStrategy()
      ),
      new ItemWrapper(
        new Item("Sulfuras, Hand of Ragnaros", 0, 80),
        new LegendaryItemAgingStrategy(),
        new LegacyTimeStrategy()
      ),
      new ItemWrapper(
        new Item("Sulfuras, Hand of Ragnaros", -1, 80),
        new LegendaryItemAgingStrategy(),
        new LegacyTimeStrategy()
      ),
      new ItemWrapper(
        new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
        new EventAgingStrategy()
      ),
      new ItemWrapper(
        new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
        new EventAgingStrategy()
      ),
      new ItemWrapper(
        new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),
        new EventAgingStrategy()
      ),
    ];

    const gildedRose = new GildedRose(items);

    // WHEN
    let actual: string = "";
    var days: number = 20;
    for (let i = 0; i < days; i++) {
      actual += "-------- day " + i + " --------\n";
      actual += "name, sellIn, quality\n";
      gildedRose.getItems().forEach(({ name, sellIn, quality }) => {
        actual += name + " " + sellIn + " " + quality + "\n";
      });
      actual += "\n";
      gildedRose.updateQuality();
    }

    // THEN
    const expected = `-------- day 0 --------
name, sellIn, quality
+5 Dexterity Vest 10 20
Aged Brie 2 0
Elixir of the Mongoose 5 7
Sulfuras, Hand of Ragnaros 0 80
Sulfuras, Hand of Ragnaros -1 80
Backstage passes to a TAFKAL80ETC concert 15 20
Backstage passes to a TAFKAL80ETC concert 10 49
Backstage passes to a TAFKAL80ETC concert 5 49

-------- day 1 --------
name, sellIn, quality
+5 Dexterity Vest 9 19
Aged Brie 1 1
Elixir of the Mongoose 4 6
Sulfuras, Hand of Ragnaros 0 80
Sulfuras, Hand of Ragnaros -1 80
Backstage passes to a TAFKAL80ETC concert 14 21
Backstage passes to a TAFKAL80ETC concert 9 50
Backstage passes to a TAFKAL80ETC concert 4 50

-------- day 2 --------
name, sellIn, quality
+5 Dexterity Vest 8 18
Aged Brie 0 2
Elixir of the Mongoose 3 5
Sulfuras, Hand of Ragnaros 0 80
Sulfuras, Hand of Ragnaros -1 80
Backstage passes to a TAFKAL80ETC concert 13 22
Backstage passes to a TAFKAL80ETC concert 8 50
Backstage passes to a TAFKAL80ETC concert 3 50

-------- day 3 --------
name, sellIn, quality
+5 Dexterity Vest 7 17
Aged Brie -1 4
Elixir of the Mongoose 2 4
Sulfuras, Hand of Ragnaros 0 80
Sulfuras, Hand of Ragnaros -1 80
Backstage passes to a TAFKAL80ETC concert 12 23
Backstage passes to a TAFKAL80ETC concert 7 50
Backstage passes to a TAFKAL80ETC concert 2 50

-------- day 4 --------
name, sellIn, quality
+5 Dexterity Vest 6 16
Aged Brie -2 6
Elixir of the Mongoose 1 3
Sulfuras, Hand of Ragnaros 0 80
Sulfuras, Hand of Ragnaros -1 80
Backstage passes to a TAFKAL80ETC concert 11 24
Backstage passes to a TAFKAL80ETC concert 6 50
Backstage passes to a TAFKAL80ETC concert 1 50

-------- day 5 --------
name, sellIn, quality
+5 Dexterity Vest 5 15
Aged Brie -3 8
Elixir of the Mongoose 0 2
Sulfuras, Hand of Ragnaros 0 80
Sulfuras, Hand of Ragnaros -1 80
Backstage passes to a TAFKAL80ETC concert 10 25
Backstage passes to a TAFKAL80ETC concert 5 50
Backstage passes to a TAFKAL80ETC concert 0 50

-------- day 6 --------
name, sellIn, quality
+5 Dexterity Vest 4 14
Aged Brie -4 10
Elixir of the Mongoose -1 0
Sulfuras, Hand of Ragnaros 0 80
Sulfuras, Hand of Ragnaros -1 80
Backstage passes to a TAFKAL80ETC concert 9 27
Backstage passes to a TAFKAL80ETC concert 4 50
Backstage passes to a TAFKAL80ETC concert -1 0

-------- day 7 --------
name, sellIn, quality
+5 Dexterity Vest 3 13
Aged Brie -5 12
Elixir of the Mongoose -2 0
Sulfuras, Hand of Ragnaros 0 80
Sulfuras, Hand of Ragnaros -1 80
Backstage passes to a TAFKAL80ETC concert 8 29
Backstage passes to a TAFKAL80ETC concert 3 50
Backstage passes to a TAFKAL80ETC concert -2 0

-------- day 8 --------
name, sellIn, quality
+5 Dexterity Vest 2 12
Aged Brie -6 14
Elixir of the Mongoose -3 0
Sulfuras, Hand of Ragnaros 0 80
Sulfuras, Hand of Ragnaros -1 80
Backstage passes to a TAFKAL80ETC concert 7 31
Backstage passes to a TAFKAL80ETC concert 2 50
Backstage passes to a TAFKAL80ETC concert -3 0

-------- day 9 --------
name, sellIn, quality
+5 Dexterity Vest 1 11
Aged Brie -7 16
Elixir of the Mongoose -4 0
Sulfuras, Hand of Ragnaros 0 80
Sulfuras, Hand of Ragnaros -1 80
Backstage passes to a TAFKAL80ETC concert 6 33
Backstage passes to a TAFKAL80ETC concert 1 50
Backstage passes to a TAFKAL80ETC concert -4 0

-------- day 10 --------
name, sellIn, quality
+5 Dexterity Vest 0 10
Aged Brie -8 18
Elixir of the Mongoose -5 0
Sulfuras, Hand of Ragnaros 0 80
Sulfuras, Hand of Ragnaros -1 80
Backstage passes to a TAFKAL80ETC concert 5 35
Backstage passes to a TAFKAL80ETC concert 0 50
Backstage passes to a TAFKAL80ETC concert -5 0

-------- day 11 --------
name, sellIn, quality
+5 Dexterity Vest -1 8
Aged Brie -9 20
Elixir of the Mongoose -6 0
Sulfuras, Hand of Ragnaros 0 80
Sulfuras, Hand of Ragnaros -1 80
Backstage passes to a TAFKAL80ETC concert 4 38
Backstage passes to a TAFKAL80ETC concert -1 0
Backstage passes to a TAFKAL80ETC concert -6 0

-------- day 12 --------
name, sellIn, quality
+5 Dexterity Vest -2 6
Aged Brie -10 22
Elixir of the Mongoose -7 0
Sulfuras, Hand of Ragnaros 0 80
Sulfuras, Hand of Ragnaros -1 80
Backstage passes to a TAFKAL80ETC concert 3 41
Backstage passes to a TAFKAL80ETC concert -2 0
Backstage passes to a TAFKAL80ETC concert -7 0

-------- day 13 --------
name, sellIn, quality
+5 Dexterity Vest -3 4
Aged Brie -11 24
Elixir of the Mongoose -8 0
Sulfuras, Hand of Ragnaros 0 80
Sulfuras, Hand of Ragnaros -1 80
Backstage passes to a TAFKAL80ETC concert 2 44
Backstage passes to a TAFKAL80ETC concert -3 0
Backstage passes to a TAFKAL80ETC concert -8 0

-------- day 14 --------
name, sellIn, quality
+5 Dexterity Vest -4 2
Aged Brie -12 26
Elixir of the Mongoose -9 0
Sulfuras, Hand of Ragnaros 0 80
Sulfuras, Hand of Ragnaros -1 80
Backstage passes to a TAFKAL80ETC concert 1 47
Backstage passes to a TAFKAL80ETC concert -4 0
Backstage passes to a TAFKAL80ETC concert -9 0

-------- day 15 --------
name, sellIn, quality
+5 Dexterity Vest -5 0
Aged Brie -13 28
Elixir of the Mongoose -10 0
Sulfuras, Hand of Ragnaros 0 80
Sulfuras, Hand of Ragnaros -1 80
Backstage passes to a TAFKAL80ETC concert 0 50
Backstage passes to a TAFKAL80ETC concert -5 0
Backstage passes to a TAFKAL80ETC concert -10 0

-------- day 16 --------
name, sellIn, quality
+5 Dexterity Vest -6 0
Aged Brie -14 30
Elixir of the Mongoose -11 0
Sulfuras, Hand of Ragnaros 0 80
Sulfuras, Hand of Ragnaros -1 80
Backstage passes to a TAFKAL80ETC concert -1 0
Backstage passes to a TAFKAL80ETC concert -6 0
Backstage passes to a TAFKAL80ETC concert -11 0

-------- day 17 --------
name, sellIn, quality
+5 Dexterity Vest -7 0
Aged Brie -15 32
Elixir of the Mongoose -12 0
Sulfuras, Hand of Ragnaros 0 80
Sulfuras, Hand of Ragnaros -1 80
Backstage passes to a TAFKAL80ETC concert -2 0
Backstage passes to a TAFKAL80ETC concert -7 0
Backstage passes to a TAFKAL80ETC concert -12 0

-------- day 18 --------
name, sellIn, quality
+5 Dexterity Vest -8 0
Aged Brie -16 34
Elixir of the Mongoose -13 0
Sulfuras, Hand of Ragnaros 0 80
Sulfuras, Hand of Ragnaros -1 80
Backstage passes to a TAFKAL80ETC concert -3 0
Backstage passes to a TAFKAL80ETC concert -8 0
Backstage passes to a TAFKAL80ETC concert -13 0

-------- day 19 --------
name, sellIn, quality
+5 Dexterity Vest -9 0
Aged Brie -17 36
Elixir of the Mongoose -14 0
Sulfuras, Hand of Ragnaros 0 80
Sulfuras, Hand of Ragnaros -1 80
Backstage passes to a TAFKAL80ETC concert -4 0
Backstage passes to a TAFKAL80ETC concert -9 0
Backstage passes to a TAFKAL80ETC concert -14 0

`;

    expect(actual).to.equal(expected);
  });
});
