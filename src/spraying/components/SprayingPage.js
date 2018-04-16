import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as ol from 'openlayers'
import update from 'immutability-helper'
import {
  Panel,
  FormGroup,
  Checkbox,
  Radio,
  Grid,
  Row,
  Col,
  Table,
  Label,
} from 'react-bootstrap'
import _ from 'lodash'

import {sprayingEvents} from 'spraying/spraying.statechart'
import {Map} from 'spraying/components/Map'
import {translate, locales} from 'app/utils/i18n'

const boolLabel = bool => <Label bsStyle={bool ? 'success' : 'danger'}>{bool ? 'yes' : 'no'}</Label>

export class SprayingPageComponent extends Component {
  state = {
    isOptionsPanelOpened: false,
    clickedSectionId: null,
    selectedSectorIndex: 10,
    sectors: [
      {
        id: 1,
        name: translate(locales.SECTOR) + ' 1',
        selected: true,
      },
      {
        id: 2,
        name: translate(locales.SECTOR) + ' 2',
        selected: false,
      },
      {
        id: 3,
        name: translate(locales.SECTOR) + ' 3',
        selected: false,
      },
      {
        id: 4,
        name: translate(locales.SECTOR) + ' 4',
        selected: false,
      },
      {
        id: 5,
        name: translate(locales.SECTOR) + ' 5',
        selected: false,
      },
      {
        id: 6,
        name: translate(locales.SECTOR) + ' 6',
        selected: false,
      },
      {
        id: 7,
        name: translate(locales.SECTOR) + ' 7',
        selected: false,
      },
      {
        id: 8,
        name: translate(locales.SECTOR) + ' 8',
        selected: false,
      },
      {
        id: 9,
        name: translate(locales.SECTOR) + ' 9',
        selected: false,
      },
    ],
    chemicals: [
      {
        id: 1,
        name: 'Kyleo',
        selected: true,
      },
      {
        id: 2,
        name: 'Panic Free',
        selected: false,
      },
      {
        id: 3,
        name: 'Vival',
        selected: false,
      },
      {
        id: 4,
        name: 'Genoxone',
        selected: false,
      },
    ],
    columns: [
      {
        label: `${translate(locales.DISTANCE)} [m]`,
        labelWithoutUnit: translate(locales.DISTANCE),
        show: true,
      },
      {
        label: translate(locales.POSITION),
        labelWithoutUnit: translate(locales.POSITION),
        show: true,
      },
      {
        label: translate(locales.SPRAYED),
        labelWithoutUnit: translate(locales.SPRAYED),
        show: true,
      },
      {
        label: `${translate(locales.WATER)} [l]`,
        labelWithoutUnit: translate(locales.WATER),
        show: true,
      },
      {
        label: `${translate(locales.WATER_DOSE)} [l/ha]`,
        labelWithoutUnit: translate(locales.WATER_DOSE),
        show: true,
      },
      {
        label: `${translate(locales.WEED_INFESTATION)} [%]`,
        labelWithoutUnit: translate(locales.WEED_INFESTATION),
        show: true,
      },
    ],
  }

  render() {
    const props = this.props
    const state = this.state

    const getColumnsLength = () => {
      let length = 0
      _.each(state.columns, column => {
        if(column.show) length++
      })
      return length
    }

    const dataTable = (
      <Table striped bordered condensed hover>
        <thead>
        <tr>
          {getColumnsLength() > 0 && <th colSpan={getColumnsLength()}>{translate(locales.SECTION_DATA)}</th>}
          {state.chemicals.map((chemical, index) => chemical.selected ? <th key={index} colSpan="4">{translate(locales.CHEMICAL)}: {chemical.name}</th> : null)}
        </tr>
        <tr>
          {state.columns.map((column, index) => {
            if(column.show) {
              if(index === 5 && state.selectedSectorIndex !== 10) {
                return (
                  <th
                    key={index}
                  >Sector {state.selectedSectorIndex + 1} {column.label}</th>
                )
              }
              else {
                return (
                  <th
                    key={index}
                  >{column.label}</th>
                )
              }
            }
            else return null
          })}
          {state.chemicals.map(chemical => {
            if(!chemical.selected) return null

            const columnHeaders = []

            if(state.selectedSectorIndex === 10) {
              columnHeaders.push(<th key={chemical.name + '1'}>{translate(locales.QUANTITY)} [l]</th>)
            }
            else {
              columnHeaders.push(<th key={chemical.name + '2'}>Sector {state.selectedSectorIndex + 1} {translate(locales.QUANTITY)} [l]</th>)
            }

            columnHeaders.push(<th key={chemical.name + '3'}>{translate(locales.DOSE)} [l/ha]</th>)
            columnHeaders.push(<th key={chemical.name + '4'}>{translate(locales.LEFT_NOZZLE_MAJORITY)}</th>)
            columnHeaders.push(<th key={chemical.name + '5'}>{translate(locales.RIGHT_NOZZLE_MAJORITY)}</th>)

            return columnHeaders
          })}
        </tr>
        </thead>
        <tbody>
        {props.sections.map((section, sectionIndex) => {
          const sectionColumns = []

          state.columns[0].show && sectionColumns.push(<td key={'section' + sectionIndex + 'distance'}>{section.distance}</td>)

          state.columns[1].show && sectionColumns.push(
            <td key={'section' + sectionIndex + 'position'}>
              <a
                href="#map"
                onClick={e => {
                  e.preventDefault()
                  state.map.getView().setCenter(ol.proj.fromLonLat([section.position.lon, section.position.lat]))
                  state.map.getView().setZoom(18)
                  this.mapNode.scrollIntoView()
                }}
              >
                {section.position.lat + ', ' + section.position.lon}
              </a>
            </td>
          )

          state.columns[2].show && sectionColumns.push(<td key={'section' + sectionIndex + 'sprayed'}>{boolLabel(section.sprayed)}</td>)
          state.columns[3].show && sectionColumns.push(<td key={'section' + sectionIndex + 'water'}>{section.water}</td>)
          state.columns[4].show && sectionColumns.push(<td key={'section' + sectionIndex + 'waterDose'}>{section.waterDosage}</td>)

          const weedInfestationCell = state.selectedSectorIndex === 10 ? (
            <td key={'section' + sectionIndex + 'weedInfestation'}>{section.weedInfestation}</td>
          ) : (
            <td key={'section' + sectionIndex + 'weedInfestation'}>{section.sectors[state.selectedSectorIndex].weedInfestation}</td>
          )

          state.columns[5].show && sectionColumns.push(weedInfestationCell)

          return (
            <tr
              key={sectionIndex}
            >
              {sectionColumns}
              {state.chemicals.map(chemical => {
                if(chemical.selected) {
                  const chemicalColumns = []
                  const chemicalData = section.chemicals.find(c => {
                    return c.id === chemical.id
                  })

                  if(state.selectedSectorIndex === 10) {
                    chemicalColumns.push(<td key={'section' + sectionIndex + chemical.name + '1'}>{chemicalData.dosage}</td>)
                  }
                  else {
                    chemicalColumns.push(<td key={'section' + sectionIndex + chemical.name + '1'}>{chemicalData.sectors[state.selectedSectorIndex].dosage}</td>)
                  }

                  chemicalColumns.push(<td key={'section' + sectionIndex + chemical.name + '2'}>{chemicalData.dosage}</td>)
                  chemicalColumns.push(<td key={'section' + sectionIndex + chemical.name + '3'}>{boolLabel(chemicalData.leftNozzleMajority)}</td>)
                  chemicalColumns.push(<td key={'section' + sectionIndex + chemical.name + '4'}>{boolLabel(chemicalData.rightNozzleMajority)}</td>)

                  return chemicalColumns
                }
                else return null
              })}
            </tr>
          )
        })}
        </tbody>
      </Table>
    )

    const control = (
      <Panel
        expanded={state.isOptionsPanelOpened}
        onToggle={isOptionsPanelOpened => this.setState({isOptionsPanelOpened})}
      >
        <Panel.Heading>
          <Panel.Title
            toggle
          >{translate(locales.TABLE_SETTINGS)}</Panel.Title>
        </Panel.Heading>
        <Panel.Collapse>
          <Panel.Body>
            <Grid>
              <Row>
                <Col
                  xs={4}
                >
                  <h4>{translate(locales.SECTORS)}</h4>
                  <FormGroup
                    onChange={e => this.setState({selectedSectorIndex: Number(e.target.dataset.index)})}
                  >
                    <Radio
                      defaultChecked
                      name="sector"
                      data-index={10}
                    >{translate(locales.ALL_SECTORS)}</Radio>
                    {state.sectors.map((sector, index) => (
                      <Radio
                        key={index}
                        name="sector"
                        data-index={index}
                      >
                        {sector.name}
                      </Radio>
                    ))}
                  </FormGroup>
                </Col>
                <Col
                  xs={4}
                >
                  <h4>{translate(locales.CHEMICALS)}</h4>
                  <FormGroup
                    onChange={e => {
                      const selected = e.target.checked
                      const index = e.target.dataset.index

                      this.setState(state => update(state, {
                        chemicals: {
                          [index]: {
                            selected: {
                              $set: selected,
                            },
                          },
                        },
                      }))
                    }}
                  >
                    {state.chemicals.map((chemical, index) => (
                      <Checkbox
                        key={index}
                        data-index={index}
                        checked={chemical.selected}
                        onChange={() => {}}
                      >
                        {chemical.name}
                      </Checkbox>
                    ))}
                  </FormGroup>
                </Col>
                <Col
                  xs={4}
                >
                  <h4>{translate(locales.COLUMNS)}</h4>
                  <FormGroup
                    onChange={e => {
                      const show = e.target.checked
                      const index = e.target.dataset.index

                      this.setState(state => update(state, {
                        columns: {
                          [index]: {
                            show: {
                              $set: show,
                            },
                          },
                        },
                      }))
                    }}
                  >
                    {state.columns.map((column, index) => (
                      <Checkbox
                        key={index}
                        data-index={index}
                        checked={column.show}
                        onChange={() => {}}
                      >
                        {column.labelWithoutUnit}
                      </Checkbox>
                    ))}
                  </FormGroup>
                </Col>
              </Row>
            </Grid>
          </Panel.Body>
        </Panel.Collapse>
      </Panel>
    )

    return props.isSectionsLoading ? <div>{translate(locales.LOADING)}...</div> : (
      <div>
        <Map
          sections={props.sections}
          selectSection={props.selectSection}
          popupIsOpened={props.popupIsOpened}
        />
        {control}
        {dataTable}
      </div>
    )
  }
}

export const SprayingPage = connect(
  state => ({
    sections: state.spraying.sections,
    isSectionsLoading: state.spraying.isSectionsLoading,
    popupIsOpened: state.spraying.popupIsOpened,
  }),
  dispatch => ({
    selectSection: sectionId => dispatch({
      type: sprayingEvents.SELECT_SECTION,
      sectionId,
    }),
  }),
)(SprayingPageComponent)
