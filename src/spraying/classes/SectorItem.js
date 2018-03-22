export class Position {
  /**
   * @param lat {number}
   * @param lon {number}
   */
  constructor(lat, lon) {
    this.lat = lat
    this.lon = lon
  }
}

export class ChemicalSector {
  /**
   * @param id {name}
   * @param dosage {number}
   */
  constructor(id, dosage) {
    this.id = id
    this.dosage = dosage
  }
}

export class Chemical {
  /**
   * @param id {number}
   * @param quantity {number}
   * @param dosage {number}
   * @param leftNozzleMajority {bool}
   * @param rightNozzleMajority {bool}
   * @param sectors {ChemicalSector}
   */
  constructor(
    id,
    quantity,
    dosage,
    leftNozzleMajority,
    rightNozzleMajority,
    sectors,
  ) {
    this.id = id
    this.quantity = quantity
    this.dosage = dosage
    this.leftNozzleMajority = leftNozzleMajority
    this.rightNozzleMajority = rightNozzleMajority
    this.sectors = sectors
  }
}

export class SectorData {
  /**
   * @param id {number}
   * @param weedInfestation {number}
   */
  constructor(id, weedInfestation) {
    this.id = id
    this.weedInfestation = weedInfestation
  }
}

export class SectorItem {
  /**
   * @param id {number}
   * @param distance {number}
   * @param position {Position}
   * @param sprayed {bool}
   * @param water {number}
   * @param waterDosage {number}
   * @param weedInfestation {number}
   * @param chemicals {[Chemical]}
   * @param sectorData {[SectorData]}
   */
  constructor(
    id,
    distance,
    position,
    sprayed,
    water,
    waterDosage,
    weedInfestation,
    chemicals,
    sectorData,
  ) {
    this.id = id
    this.distance = distance
    this.position = position
    this.sprayed = sprayed
    this.water = water
    this.waterDosage = waterDosage
    this.weedInfestation = weedInfestation
    this.chemicals = chemicals
    this.sectorDatas = sectorData
  }
}