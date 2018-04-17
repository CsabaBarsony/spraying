export class SectorQuantity {
  /**
   * @param sectorId {number}
   * @param quantity {number}
   */
  constructor(sectorId, quantity) {
    this.sectorId = sectorId
    this.quantity = quantity
  }
}

export class ChemicalSummary {
  /**
   * @param chemicalId {number}
   * @param quantity {number}
   * @param sectorQuantities {SectorQuantity[]}
   */
  constructor(chemicalId, quantity, sectorQuantities) {
    this.chemicalId = chemicalId
    this.quantity = quantity
    this.sectorQuantities = sectorQuantities
  }
}

export class WeedInfestationSummary {
  /**
   * @param quantity {number}
   * @param sectorQuantities {SectorQuantity[]}
   */
  constructor(quantity, sectorQuantities) {
    this.quantity = quantity
    this.sectorQuantities = sectorQuantities
  }
}

export class CampaignSummary {
  /**
   * @param water {number}
   * @param weedInfestationSummary {WeedInfestationSummary}
   * @param chemicalSummaries {ChemicalSummary[]}
   */
  constructor(water, weedInfestationSummary, chemicalSummaries) {
    this.water = water
    this.weedInfestationSummary = weedInfestationSummary
    this.chemicalSummaries = chemicalSummaries
  }
}
