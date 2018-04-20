import React from 'react'
import PropTypes from 'prop-types'
import {Table, Panel} from 'react-bootstrap'

import {CampaignSummary} from 'spraying/classes/CampaignSummary'
import {translate, locales} from 'app/utils/i18n'

const sectorValueKey = (index, sector) => `Summary-${index}-${sector}`

export const Summary = props => {
  const chemicalRows = props.campaignSummary.chemicalSummaries.map((chemicalSummary, summaryIndex) => (
    <tr key={summaryIndex}>
      <td>{translate(locales.CHEMICAL)} {chemicalSummary.chemicalId} [l]</td>
      <td>{chemicalSummary.quantity}</td>
      {props.chemicalDetailsVisible.includes(chemicalSummary.chemicalId) && chemicalSummary.sectorQuantities.map((sector, sectorIndex) => (
        <td key={sectorValueKey(summaryIndex, sectorIndex)}>{sector.quantity}</td>
      ))}
    </tr>
  ))

  const weedRow = (
    <tr>
      <td>{translate(locales.WEED_INFESTATION)} [%]</td>
      <td>{props.campaignSummary.weedInfestationSummary.quantity}</td>
      {props.isWeedInfectionDetailsVisible && props.campaignSummary.weedInfestationSummary.sectorQuantities.map((sector, index) => (
        <td key={`Summary-weed-sector-${index}`}>{sector.quantity}</td>
      ))}
    </tr>
  )

  const sectorHeader = (props.chemicalDetailsVisible.length || props.isWeedInfectionDetailsVisible) && ([
    <th key="Summary-chemical-sector-1">{translate(locales.SECTOR)} 1</th>,
    <th key="Summary-chemical-sector-2">{translate(locales.SECTOR)} 2</th>,
    <th key="Summary-chemical-sector-3">{translate(locales.SECTOR)} 3</th>,
    <th key="Summary-chemical-sector-4">{translate(locales.SECTOR)} 4</th>,
    <th key="Summary-chemical-sector-5">{translate(locales.SECTOR)} 5</th>,
    <th key="Summary-chemical-sector-6">{translate(locales.SECTOR)} 6</th>,
    <th key="Summary-chemical-sector-7">{translate(locales.SECTOR)} 7</th>,
    <th key="Summary-chemical-sector-8">{translate(locales.SECTOR)} 8</th>,
    <th key="Summary-chemical-sector-9">{translate(locales.SECTOR)} 9</th>,
  ])

  return (
    <Panel bsStyle="info">
      <Panel.Heading>
        <Panel.Title>Summary</Panel.Title>
      </Panel.Heading>
      <div
        style={{overflowX: 'auto'}}
      >
        <Table
          striped
          bordered
          condensed
          hover
        >
          <thead>
          <tr>
            <th/>
            <th>Sum</th>
            {sectorHeader}
          </tr>
          </thead>
          <tbody>
          {weedRow}
          {chemicalRows}
          </tbody>
        </Table>
      </div>
    </Panel>
  )

}

Summary.propTypes = {
  campaignSummary: PropTypes.instanceOf(CampaignSummary).isRequired,
  chemicalDetailsVisible: PropTypes.arrayOf(PropTypes.number).isRequired,
  isWeedInfectionDetailsVisible: PropTypes.bool.isRequired,
}
