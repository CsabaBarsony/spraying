export class CampaignDescription {
  /**
   * @param requestType {string}
   * @param databaseName {string}
   * @param sectionSprayed {string}
   * @param timeSprayed {Date}
   * @param distanceSprayed {string}
   */
  constructor(requestType, databaseName, sectionSprayed, timeSprayed, distanceSprayed) {
    this.requestType = requestType
    this.databaseName = databaseName
    this.sectionSprayed = sectionSprayed
    this.timeSprayed = timeSprayed
    this.distanceSprayed = distanceSprayed
  }
}
