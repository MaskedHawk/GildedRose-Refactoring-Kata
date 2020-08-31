export interface AgingStrategy {
  updateQuality(quality: number, sellIn: number): number;
}

const MINIMUM_QUALITY = 0;
const MAXIMUM_QUALITY = 50;
const LEGENDARY_ITEM_QUALITY = 80;

export class BaselineAgingStrategy implements AgingStrategy {
  public updateQuality(quality: number, sellIn: number): number {
    const temptativeQuality = quality + (sellIn < 0 ? -2 : -1);
    return containBetweenThresholds(temptativeQuality);
  }
}

export class BetterWithTimeAgingStrategy implements AgingStrategy {
  public updateQuality(quality: number, sellIn: number): number {
    const temptativeQuality = quality + (sellIn < 0 ? 2 : 1);
    return containBetweenThresholds(temptativeQuality);
  }
}

export class LegendaryItemAgingStrategy implements AgingStrategy {
  public updateQuality(_quality: number, _sellIn: number): number {
    return LEGENDARY_ITEM_QUALITY;
  }
}

export class EventAgingStrategy implements AgingStrategy {
  public updateQuality(quality: number, sellIn: number): number {
    const temptativeQuality = (function () {
      if (sellIn < 0) {
        return 0;
      }
      if (sellIn < 5) {
        return quality + 3;
      }
      if (sellIn < 10) {
        return quality + 2;
      }
      return quality + 1;
    })();
    return containBetweenThresholds(temptativeQuality);
  }
}

function containBetweenThresholds(quality: number): number {
  return Math.max(MINIMUM_QUALITY, Math.min(MAXIMUM_QUALITY, quality));
}
