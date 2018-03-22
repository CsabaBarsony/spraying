/**
 * @enum {string}
 */
export const SectorName = {
  1: '1',
  2: '2',
  3: '3',
  4: '4',
  5: '5',
  6: '6',
  7: '7',
  8: '8',
  9: '9',
}

/**
 * @enum {string}
 */
export const ChemicalName = {
  KYLEO: 'Kyleo',
  PANIC_FREE: 'Panic Free',
  VIVAL: 'Vival',
  GENOXONE: 'Genoxone',
}

export class Sector {
  /**
   * @param id {number}
   * @param name {SectorName}
   */
  constructor(id, name) {
    this.id = id
    this.name = name
  }
}

export class Chemical {
  /**
   * @param id {number}
   * @param name {ChemicalName}
   */
  constructor(id, name) {
    this.id = id
    this.name = name
  }
}

export class TableSetting {
  /**
   * @param distance {bool}
   * @param position {bool}
   * @param sprayed {bool}
   * @param water {bool}
   * @param waterDosage {bool}
   * @param weedInfestation {bool}
   * @param chemicals [?{Chemical}]
   * @param sector {?Sector}
   */
  constructor(
    distance,
    position,
    sprayed,
    water,
    waterDosage,
    weedInfestation,
    chemicals,
    sector,
  ) {
    this.distance = distance
    this.position = position
    this.sprayed = sprayed
    this.water = water
    this.waterDosage = waterDosage
    this.weedInfestation = weedInfestation
    this.chemicals = chemicals
    this.sector = sector
  }
}
