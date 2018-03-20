import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {store} from './store'
import update from 'immutability-helper'
import * as ol from 'openlayers'
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
  Button,
} from 'react-bootstrap'
import _ from 'lodash'

import {api} from './api'
import {testAction} from './actions'
import {Popup} from './Popup'

const boolLabel = bool => <Label bsStyle={bool ? 'success' : 'danger'}>{bool ? 'yes' : 'no'}</Label>

const overlayElement = document.createElement('div')

class App extends Component {
  state = {
    map: null,
    isOptionsPanelOpened: false,
    clickedSectionId: null,
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
        label: 'Distance [m]',
        labelWithoutUnit: 'Distance',
        show: true,
      },
      {
        label: 'Position',
        labelWithoutUnit: 'Position',
        show: true,
      },
      {
        label: 'Sprayed',
        labelWithoutUnit: 'Sprayed',
        show: true,
      },
      {
        label: 'Water [l]',
        labelWithoutUnit: 'Water',
        show: true,
      },
      {
        label: 'Water dose [l/ha]',
        labelWithoutUnit: 'Water dose',
        show: true,
      },
      {
        label: 'Weed infestation [%]',
        labelWithoutUnit: 'Weed infestation',
        show: true,
      },
    ],
  }

  componentDidMount() {
    api.getSectionData().then(sectionData => {
      const vectorSource = new ol.source.Vector({})

      sectionData.forEach((section, index) => {
        const iconFeature = new ol.Feature({
          geometry: new ol.geom.Point(ol.proj.fromLonLat([section.position.lon, section.position.lat])),
          name: 'Section ' + (index + 1),
          sectionId: section.id,
        })

        vectorSource.addFeature(iconFeature)
      })

      const iconStyle = new ol.style.Style({
        image: new ol.style.Icon(({
          anchor: [0.5, 46],
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
          opacity: 0.75,
          src: 'http://openlayers.org/en/v3.9.0/examples/data/icon.png',
        })),
      })

      const vectorLayer = new ol.layer.Vector({
        source: vectorSource,
        style: iconStyle,
      })

      const map = new ol.Map({
        layers: [
          new ol.layer.Tile({
            source: new ol.source.OSM()
          }),
          vectorLayer,
        ],
        target: 'map',
        view: new ol.View({
          center: [0, 0],
          zoom: 2
        })
      })

      overlayElement.setAttribute('id', 'popupComponent')
      const popupOverlay = new ol.Overlay(
        {
          element: overlayElement,
          stopEvent: false,
        })

      map.addOverlay(popupOverlay)

      ReactDOM.render(
        <Provider store={store}>
          <Popup/>
        </Provider>,
        overlayElement)

      map.on('pointermove', e => {
        const hit = map.forEachFeatureAtPixel(e.pixel, () => true)

        map.getTargetElement().style.cursor = hit ? 'pointer' : ''
      })

      map.on('click', e => {
        const feature = map.forEachFeatureAtPixel(e.pixel, feature => feature)

        if(feature) {
          const geometry = feature.getGeometry()
          const position = geometry.getCoordinates()
          popupOverlay.setPosition(position)
          this.props.testAction(feature.get('sectionId'))
        }
      })

      const sections = sectionData.map(data => ({
        data,
        checked: false,
      }))

      sections[0].checked = true

      const bound = map.getLayers().getArray()[1].getSource().getExtent()
      map.getView().fit(bound)

      this.setState({
        sections,
        map,
      })
    })
  }

  componentDidUpdate() {
    if(this.props.popupIsOpened) {
      overlayElement.setAttribute('style', 'display:block')
    }
    else {
      overlayElement.setAttribute('style', 'display:none')
    }
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
                columnHeaders.push(<th key={chemical.name + '1'}>Quantity [l]</th>)
              }
              else {
                columnHeaders.push(<th key={chemical.name + '2'}>Sector {state.selectedSectorIndex + 1} Quantity [l]</th>)
              }

              columnHeaders.push(<th key={chemical.name + '3'}>Dose [l/ha]</th>)
              columnHeaders.push(<th key={chemical.name + '4'}>Left nozzle majority</th>)
              columnHeaders.push(<th key={chemical.name + '5'}>Right nozzle majority</th>)

              return columnHeaders
            })}
          </tr>
        </thead>
        <tbody>
          {state.sections.map((section, sectionIndex) => {
            const data = section.data

            const sectionColumns = []

            state.columns[0].show && sectionColumns.push(<td key={'section' + sectionIndex + 'distance'}>{data.distance}</td>)

            state.columns[1].show && sectionColumns.push(
              <td key={'section' + sectionIndex + 'position'}>
                <a
                  href="#"
                  onClick={e => {
                    e.preventDefault()
                    state.map.getView().setCenter(ol.proj.fromLonLat([section.data.position.lon, section.data.position.lat]))
                    state.map.getView().setZoom(18)
                    this.mapNode.scrollIntoView()
                  }}
                >
                  {data.position.lat + ', ' + data.position.lon}
                </a>
              </td>
            )

            state.columns[2].show && sectionColumns.push(<td key={'section' + sectionIndex + 'sprayed'}>{boolLabel(data.sprayed)}</td>)
            state.columns[3].show && sectionColumns.push(<td key={'section' + sectionIndex + 'water'}>{data.water}</td>)
            state.columns[4].show && sectionColumns.push(<td key={'section' + sectionIndex + 'waterDose'}>{data.waterDosage}</td>)

            const weedInfestationCell = state.selectedSectorIndex === 10 ? (
              <td key={'section' + sectionIndex + 'weedInfestation'}>{data.weedInfestation}</td>
            ) : (
              <td key={'section' + sectionIndex + 'weedInfestation'}>{data.sectors[state.selectedSectorIndex].weedInfestation}</td>
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

    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#home">G&G | Spraying</a>
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>
        <div
          style={{paddingLeft: 10, paddingRight: 10}}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: 450,
              margin: '0 auto',
              marginBottom: 20,
            }}
            id="map"
            className="map"
            ref={node => this.mapNode = node}
          >
            <Button
              style={{
                position: 'absolute',
                zIndex: 1,
                top: 10,
                left: 10,
              }}
              onClick={() => {
                const bound = state.map.getLayers().getArray()[1].getSource().getExtent()
                state.map.getView().fit(bound)
              }}
            >Fit to map</Button>
          </div>
          {control}
          {dataTable}
        </div>
      </div>
    )
  }
}
export default connect(
  state => ({
    popupIsOpened: state.popupIsOpened,
  }),
  dispatch => bindActionCreators({
    testAction,
  }, dispatch),
)(App)
