import React from 'react'
import _ from 'lodash'
import {Table, Label} from 'react-bootstrap'

import {locales, translate} from 'app/utils/i18n'

const boolLabel = bool => <Label bsStyle={bool ? 'success' : 'danger'}>{bool ? 'yes' : 'no'}</Label>

export const DataTable = props => {
  const chemicalSectorDetailsSummaryHeader = _.range(1, 5).map((chemicalId, chemicalIndex) => (
    <th
      key={`chemical${chemicalIndex}`}
      colSpan={2 + (props.chemicalDetailsVisible.includes(chemicalId) ? 11 : 0)}
    >
      {translate(locales.CHEMICAL)} {chemicalId}
    </th>
  ))

  const weedSectorDetailsHeader = props.isWeedInfectionDetailsVisible && _.range(1, 10).map((sectorId, sectorIndex) => (
    <th key={`sector${sectorIndex}`}>{translate(locales.WEED_INFESTATION)} {translate(locales.SECTOR)} {sectorId} [%]</th>
  ))

  const chemicalSectorDetailsHeader = _.range(1, 5).map((chemicalId, chemicalIndex) => {
    const chemicalHeaderCells = [
      <th key={`chemical${chemicalIndex}.quantity`}>{translate(locales.QUANTITY)} [l]</th>,
      <th key={`chemical${chemicalIndex}.dosage`}>{translate(locales.DOSE)} [l/ha]</th>,
    ]

    if(props.chemicalDetailsVisible.includes(chemicalId)) {
      chemicalHeaderCells.push(..._.range(1, 10).map((sectorId, sectorIndex) => (
        <th key={`chemical${chemicalIndex}.sector${sectorIndex}`}>{translate(locales.SECTOR)} {sectorId} {translate(locales.DOSE)} [l/ha]</th>
      )))

      chemicalHeaderCells.push(...[
        <th key={`chemical${chemicalIndex}.leftNozzleMajority`}>{translate(locales.LEFT_NOZZLE_MAJORITY)}</th>,
        <th key={`chemical${chemicalIndex}.rightNozzleMajority`}>{translate(locales.RIGHT_NOZZLE_MAJORITY)}</th>,
      ])
    }

    return chemicalHeaderCells
  })

  const dataTableBody = props.sections.map((section, sectionIndex) => {
    const weedSectorDetails = props.isWeedInfectionDetailsVisible && section.sectors.map((sector, sectorIndex) => (
      <td key={`section${sectionIndex}.sector${sectorIndex}`}>{sector.weedInfestation}</td>
    ))

    const chemicalSectorDetails = section.chemicals.map((chemical, chemicalIndex) => {
      const chemicalCells = [
        <td key={`section${sectionIndex}.chemical${chemicalIndex}.quantity`}>{chemical.quantity}</td>,
        <td key={`section${sectionIndex}.chemical${chemicalIndex}.dosage`}>{chemical.dosage}</td>,
      ]

      if(props.chemicalDetailsVisible.includes(chemical.id)) {
        chemicalCells.push(..._.range(1, 10).map((sectorId, sectorIndex) => (
          <td key={`section${sectionIndex}.chemical${chemicalIndex}.sector${sectorIndex}`}>{chemical.sectors[sectorIndex].dosage}</td>
        )))

        chemicalCells.push(...[
          <td key={`${sectionIndex}.${chemicalIndex}.leftNozzleMajority`}>{boolLabel(chemical.leftNozzleMajority)}</td>,
          <td key={`${sectionIndex}.${chemicalIndex}.rightNozzleMajority`}>{boolLabel(chemical.rightNozzleMajority)}</td>,
        ])
      }

      return chemicalCells
    })

    return (
      <tr key={`section${sectionIndex}`}>
        <td>{section.distance}</td>
        <td>
          <a
            href="#map"
            onClick={e => this.onPositionClick(e, section)}
          >
            {section.position.lat + ', ' + section.position.lon}
          </a>
        </td>
        <td>{boolLabel(section.sprayed)}</td>
        <td>{section.water}</td>
        <td>{section.waterDosage}</td>
        <td>{section.weedInfestation}</td>
        {weedSectorDetails}
        {chemicalSectorDetails}
      </tr>
    )
  })

  return (
    <Table striped bordered condensed hover>
      <thead>
      <tr>
        <th colSpan={6 + (props.isWeedInfectionDetailsVisible ? 9 : 0)}>{translate(locales.SECTION_DATA)}</th>
        {chemicalSectorDetailsSummaryHeader}
      </tr>
      <tr>
        <th>{translate(locales.DISTANCE)} [m]</th>
        <th>{translate(locales.POSITION)}</th>
        <th>{translate(locales.SPRAYED)}</th>
        <th>{translate(locales.WATER)} [l]</th>
        <th>{translate(locales.WATER_DOSE)} [l/ha]</th>
        <th>{translate(locales.WEED_INFESTATION)} [%]</th>
        {weedSectorDetailsHeader}
        {chemicalSectorDetailsHeader}
      </tr>
      </thead>
      <tbody>
      {dataTableBody}
      </tbody>
    </Table>
  )
}
