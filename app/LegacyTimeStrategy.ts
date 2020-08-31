export interface TimeStrategy {
  next(sellIn: number): number;
}

export class RegularTimeStrategy implements TimeStrategy {
  public next(sellIn: number): number {
    return sellIn - 1;
  }
}

export class LegacyTimeStrategy implements TimeStrategy {
  /*
   * The `sellIn` property doesn't even make sense for the legendary item
   * since its `quality` never lowers nor increases. For this item, time
   * does not exist at all! It's a pitty that the `Item` class cannot be refactored.
   */
  public next(sellIn: number): number {
    return sellIn;
  }
}
