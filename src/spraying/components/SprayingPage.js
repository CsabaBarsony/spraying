import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as ol from 'openlayers'

import {DataTable} from 'spraying/components/DataTable'
import {Map} from 'spraying/components/Map'
import {Description} from 'spraying/components/Description'
import {CampaignOptions} from 'spraying/components/CampaignOptions'
import {Summary} from 'spraying/components/Summary'
import {translate, locales} from 'app/utils/i18n'

export class SprayingPageComponent extends Component {
  state = {
    isWeedInfectionDetailsVisible: false,
    chemicalDetailsVisible: [],
    isOptionsPanelOpened: false,
    clickedSectionId: null,
  }

  onPositionClick = (e, section) => {
    e.preventDefault()
    this.map.getView().setCenter(ol.proj.fromLonLat([section.position.lon, section.position.lat]))
    this.map.getView().setZoom(18)
    this.mapNode.scrollIntoView()
  }

  render() {
    const props = this.props
    const state = this.state

    return props.isSectionsLoading ? <div>{translate(locales.LOADING)}...</div> : (
      <div>
        <CampaignOptions
          setCampaignOptions={campaignOptions => this.setState({...campaignOptions})}
          isWeedInfectionDetailsVisible={state.isWeedInfectionDetailsVisible}
          chemicalDetailsVisible={state.chemicalDetailsVisible}
        />
        <Description campaignDescription={props.campaignDescription}/>
        <Summary
          campaignSummary={props.campaignSummary}
          isWeedInfectionDetailsVisible={state.isWeedInfectionDetailsVisible}
          chemicalDetailsVisible={state.chemicalDetailsVisible}
        />
        <Map
          initMap={(map, mapNode) => {
            this.map = map
            this.mapNode = mapNode
          }}
          sections={props.sections}
        />
        <DataTable
          sections={props.sections}
          isWeedInfectionDetailsVisible={state.isWeedInfectionDetailsVisible}
          chemicalDetailsVisible={state.chemicalDetailsVisible}
        />
      </div>
    )
  }
}

export const SprayingPage = connect(
  state => ({
    sections: state.spraying.sections,
    campaignDescription: state.spraying.campaignDescription,
    campaignSummary: state.spraying.campaignSummary,
    isSectionsLoading: state.spraying.isSectionsLoading,
  }),
)(SprayingPageComponent)
