import React, {Component} from 'react'
import update from 'immutability-helper'
// import * as ol from 'openlayers'
import {
  Navbar,
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

import {api} from './api'

const boolLabel = bool => <Label bsStyle={bool ? 'success' : 'danger'}>{bool ? 'yes' : 'no'}</Label>

class App extends Component {
  state = {
    isOptionsPanelOpened: false,
    sections: [],
    selectedSectorIndex: 10,
    sectors: [
      {
        id: 1,
        name: 'Sector 1',
        selected: true,
      },
      {
        id: 2,
        name: 'Sector 2',
        selected: false,
      },
      {
        id: 3,
        name: 'Sector 3',
        selected: false,
      },
      {
        id: 4,
        name: 'Sector 4',
        selected: false,
      },
      {
        id: 5,
        name: 'Sector 5',
        selected: false,
      },
      {
        id: 6,
        name: 'Sector 6',
        selected: false,
      },
      {
        id: 7,
        name: 'Sector 7',
        selected: false,
      },
      {
        id: 8,
        name: 'Sector 8',
        selected: false,
      },
      {
        id: 9,
        name: 'Sector 9',
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
        key: 'distance',
        label: 'Distance',
        show: true,
      },
      {
        key: 'positionx',
        label: 'Position',
        show: true,
      },
      {
        key: 'sprayed',
        label: 'Sprayed',
        show: true,
      },
      {
        key: 'water',
        label: 'Water',
        show: true,
      },
      {
        key: 'waterDosage',
        label: 'Water dosage',
        show: true,
      },
      {
        key: 'weedInfestation',
        label: 'Weed infestation',
        show: true,
      },
    ],
  }

  componentDidMount() {
    /*let map = new ol.Map({
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      target: 'map',
      view: new ol.View({
        center: [0, 0],
        zoom: 2
      })
    })*/

    api.getSectionData().then(sectionData => {
      const sections = sectionData.map(data => ({
        data,
        checked: false,
      }))

      sections[0].checked = true

      this.setState({sections})
    })
  }

  render() {
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
            {getColumnsLength() > 0 && <th colSpan={getColumnsLength()}>Section data</th>}
            {state.chemicals.map((chemical, index) => chemical.selected ? <th key={index} colSpan="4">Chemical: {chemical.name}</th> : null)}
          </tr>
          <tr>
            {state.columns.map((column, index) => column.show ? (
              <th
                key={index}
              >{column.label}</th>
            ) : null)}
            {state.chemicals.map(chemical => {
              if(!chemical.selected) return null

              const columnHeaders = []

              if(state.selectedSectorIndex === 10) {
                columnHeaders.push(<th key={chemical.name + '1'}>Quantity</th>)
              }
              else {
                columnHeaders.push(<th key={chemical.name + '2'}>Quantity of sector {state.selectedSectorIndex + 1}</th>)
              }

              columnHeaders.push(<th key={chemical.name + '3'}>Dosage</th>)
              columnHeaders.push(<th key={chemical.name + '4'}>Left nozzle majority</th>)
              columnHeaders.push(<th key={chemical.name + '5'}>Right nozzle majority</th>)

              return columnHeaders
            })}
          </tr>
        </thead>
        <tbody>
          {state.sections.slice(0, 10).map((section, sectionIndex) => {
            const data = section.data

            const sectionColumns = []

            state.columns[0].show && sectionColumns.push(<td key={'section' + sectionIndex + 'distance'}>{data.distance}</td>)

            state.columns[1].show && sectionColumns.push(
              <td key={'section' + sectionIndex + 'position'}>
                <a>
                  {data.position.lat + ', ' + data.position.lon}
                </a>
              </td>
            )

            state.columns[2].show && sectionColumns.push(<td key={'section' + sectionIndex + 'sprayed'}>{boolLabel(data.sprayed)}</td>)
            state.columns[3].show && sectionColumns.push(<td key={'section' + sectionIndex + 'water'}>{data.water}</td>)
            state.columns[4].show && sectionColumns.push(<td key={'section' + sectionIndex + 'waterDosage'}>{data.waterDosage}</td>)
            state.columns[5].show && sectionColumns.push(<td key={'section' + sectionIndex + 'weedInfestation'}>{data.weedInfestation}</td>)

            return (
              <tr
                key={sectionIndex}
              >
                {sectionColumns}
                {state.chemicals.map((chemical, chemicalIndex) => {
                  if(chemical.selected) {
                    const chemicalColumns = []
                    const chemicalData = section.data.chemicals.find(c => {
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
          >Table settings</Panel.Title>
        </Panel.Heading>
        <Panel.Collapse>
          <Panel.Body>
            <Grid>
              <Row>
                <Col
                  xs={4}
                >
                  <h4>Sectors</h4>
                  <FormGroup
                    onChange={e => this.setState({selectedSectorIndex: Number(e.target.dataset.index)})}
                  >
                    <Radio
                      defaultChecked
                      name="sector"
                      data-index={10}
                    >
                      All Sectors
                    </Radio>
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
                  <h4>Chemicals</h4>
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
                  <h4>Columns</h4>
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
                        {column.label}
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

    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#home">Spraying</a>
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>
        <Panel>
          <Panel.Body>
            {/*<div
              id='map'
              className='map'
              ref='olmap'
            ></div>*/}
            {control}
            {dataTable}
          </Panel.Body>
        </Panel>
      </div>
    )
  }
}

export default App
