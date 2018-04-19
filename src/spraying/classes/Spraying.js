export class Chemical {

}

export class Sector {

}

export class Position {
  constructor(lat, lon) {
    this.lat = lat
    this.lon = lon
  }
}

export class Section {
  /**
   * @param id {number}
   * @param distance {number}
   * @param position {Position}
   * @param sprayed {number}
   * @param water {number}
   * @param waterDosage {number}
   * @param weedInfestation {number}
   * @param chemicals {Chemical[]}
   * @param sectors {Sector[]}
   */
  constructor(id, distance, position, sprayed, water, waterDosage, weedInfestation, chemicals, sectors) {
    this.id = id
    this.distance = distance
    this.position = position
    this.sprayed = sprayed
    this.water = water
    this.waterDosage = waterDosage
    this.weedInfestation = weedInfestation
    this.chemicals = chemicals
    this.sectors = sectors
  }
}
