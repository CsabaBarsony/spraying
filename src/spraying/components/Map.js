import React, {Component} from 'react'
import {Button} from 'react-bootstrap'
import * as ol from 'openlayers'
import PropTypes from 'prop-types'

import {Popup} from 'spraying/components/Popup'
import {translate, locales} from 'app/utils/i18n'
import {Section} from 'spraying/classes/Spraying'

const popupContainer = document.getElementById('sectionDataPopup')

export class Map extends Component {
  componentDidMount() {
    const vectorSource = new ol.source.Vector({})

    this.props.sections.forEach((section, index) => {
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

    this.map = new ol.Map({
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

    const popupOverlay = new ol.Overlay(
      {
        element: popupContainer,
        stopEvent: false,
      })

    this.map.addOverlay(popupOverlay)

    this.map.on('pointermove', e => {
      const hit = this.map.forEachFeatureAtPixel(e.pixel, () => true)

      this.map.getTargetElement().style.cursor = hit ? 'pointer' : ''
    })

    this.map.on('click', e => {
      const feature = this.map.forEachFeatureAtPixel(e.pixel, feature => feature)

      if(feature) {
        const geometry = feature.getGeometry()
        const position = geometry.getCoordinates()
        popupOverlay.setPosition(position)
        this.props.openPopup(feature.get('sectionId'))
      }
    })

    const sections = this.props.sections.map(data => ({
      data,
      checked: false,
    }))

    sections[0].checked = true

    const bound = this.map.getLayers().getArray()[1].getSource().getExtent()
    this.map.getView().fit(bound)

    this.props.initMap(this.map, this.mapNode, popupOverlay)
  }

  render() {
    const props = this.props

    return (
      <div>
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
              const bound = this.map.getLayers().getArray()[1].getSource().getExtent()
              this.map.getView().fit(bound)
            }}
          >{translate(locales.FIT_TO_MAP)}</Button>
        </div>
        {props.isPopupOpened && (
          <Popup
            section={props.sections.find(s => s.id === props.selectedSectionId)}
            closePopup={props.closePopup}
          />
        )}
      </div>
    )
  }
}

Map.propTypes = {
  sections: PropTypes.arrayOf(PropTypes.instanceOf(Section)).isRequired,
  initMap: PropTypes.func.isRequired,
  openPopup: PropTypes.func.isRequired,
  closePopup: PropTypes.func.isRequired,
  isPopupOpened: PropTypes.bool.isRequired,
  selectedSectionId: PropTypes.number.isRequired,
}
