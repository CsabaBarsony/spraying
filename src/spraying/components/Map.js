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
    const sprayedVectorSource = new ol.source.Vector({})
    const notSprayedVectorSource = new ol.source.Vector({})

    this.props.sections.forEach((section, index) => {
      const iconFeature = new ol.Feature({
        geometry: new ol.geom.Point(ol.proj.fromLonLat([section.position.lon, section.position.lat])),
        name: 'Section ' + (index + 1),
        sectionId: section.id,
      })

      if(section.sprayed === 1) {
        sprayedVectorSource.addFeature(iconFeature)
      }
      else {
        notSprayedVectorSource.addFeature(iconFeature)
      }
    })

    const sprayedIconStyle = new ol.style.Style({
      image: new ol.style.Icon(({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        opacity: 0.8,
        src: 'img/icon_red_small.png',
      })),
    })

    const notSprayedIconStyle = new ol.style.Style({
      image: new ol.style.Icon(({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        opacity: 0.8,
        src: 'img/icon_green_small.png',
      })),
    })

    const sprayedVectorLayer = new ol.layer.Vector({
      source: sprayedVectorSource,
      style: sprayedIconStyle,
    })

    const notSprayedVectorLayer = new ol.layer.Vector({
      source: notSprayedVectorSource,
      style: notSprayedIconStyle,
    })

    this.map = new ol.Map({
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        }),
        sprayedVectorLayer,
        notSprayedVectorLayer,
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

    const boundSprayed = this.map.getLayers().getArray()[1].getSource().getExtent()
    const boundNotSprayed = this.map.getLayers().getArray()[2].getSource().getExtent()
    this.map.getView().fit(ol.extent.extend(boundSprayed, boundNotSprayed))

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
              const boundSprayed = this.map.getLayers().getArray()[1].getSource().getExtent()
              const boundNotSprayed = this.map.getLayers().getArray()[2].getSource().getExtent()
              this.map.getView().fit(ol.extent.extend(boundSprayed, boundNotSprayed))
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
