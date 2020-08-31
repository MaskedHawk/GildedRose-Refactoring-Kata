import { AgingStrategy } from "./AgingStrategy";
import { TimeStrategy, RegularTimeStrategy } from "./LegacyTimeStrategy";

export class Item {
  constructor(
    public name: string,
    public sellIn: number,
    public quality: number
  ) {}
}

export class ItemWrapper {
  constructor(
    public item: Item,
    private agingStrategy: AgingStrategy,
    private timeStrategy: TimeStrategy = new RegularTimeStrategy()
  ) {}

  updateQuality(): ItemWrapper {
    const sellIn = this.timeStrategy.next(this.item.sellIn);
    const quality = this.agingStrategy.updateQuality(this.item.quality, sellIn);
    const updatedItem = new Item(this.item.name, sellIn, quality);
    return new ItemWrapper(updatedItem, this.agingStrategy, this.timeStrategy);
  }
}

export class GildedRose {
  constructor(private wrappers: ItemWrapper[] = []) {}

  updateQuality(): void {
    this.wrappers = this.wrappers.map((wrapper) => wrapper.updateQuality());
  }

  getItems(): Item[] {
    return this.wrappers.map((wrapper) => wrapper.item);
  }
}
