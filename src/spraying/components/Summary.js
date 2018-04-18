import React from 'react'
import PropTypes from 'prop-types'

import {CampaignSummary} from 'spraying/classes/CampaignSummary'

const sectorValueKey = (index, sector) => `Summary-${index}-${sector}`

export const Summary = props => {
  const chemicalRows = props.campaignSummary.chemicalSummaries.map((chemicalSummary, summaryIndex) => (
    <tr key={summaryIndex}>
      <td>C{chemicalSummary.chemicalId}</td>
      <td>{chemicalSummary.quantity}</td>
      {props.chemicalDetailsVisible.includes(chemicalSummary.chemicalId) && chemicalSummary.sectorQuantities.map((sector, sectorIndex) => (
        <td key={sectorValueKey(summaryIndex, sectorIndex)}>{sector.quantity}</td>
      ))}
    </tr>
  ))

  const weedRow = (
    <tr>
      <td>weed</td>
      <td>{props.campaignSummary.weedInfestationSummary.quantity}</td>
      {props.isWeedInfectionDetailsVisible && props.campaignSummary.weedInfestationSummary.sectorQuantities.map((sector, index) => (
        <td key={`Summary-weed-sector-${index}`}>{sector.quantity}</td>
      ))}
    </tr>
  )

  const sectorHeader = (props.chemicalDetailsVisible.length || props.isWeedInfectionDetailsVisible) && ([
    <th key="Summary-chemical-sector-1">Sector 1</th>,
    <th key="Summary-chemical-sector-2">Sector 2</th>,
    <th key="Summary-chemical-sector-3">Sector 3</th>,
    <th key="Summary-chemical-sector-4">Sector 4</th>,
    <th key="Summary-chemical-sector-5">Sector 5</th>,
    <th key="Summary-chemical-sector-6">Sector 6</th>,
    <th key="Summary-chemical-sector-7">Sector 7</th>,
    <th key="Summary-chemical-sector-8">Sector 8</th>,
    <th key="Summary-chemical-sector-9">Sector 9</th>,
  ])

  return (
    <table>
      <thead>
      <tr>
        <th/>
        <th>sum</th>
        {sectorHeader}
      </tr>
      </thead>
      <tbody>
      {weedRow}
      {chemicalRows}
      </tbody>
    </table>
  )

}

Summary.propTypes = {
  campaignSummary: PropTypes.instanceOf(CampaignSummary).isRequired,
  chemicalDetailsVisible: PropTypes.arrayOf(PropTypes.number).isRequired,
  isWeedInfectionDetailsVisible: PropTypes.bool.isRequired,
}
