import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as ol from 'openlayers'
import {Grid, Row, Col} from 'react-bootstrap'

import {DataTable} from 'spraying/components/DataTable'
import {Map} from 'spraying/components/Map'
import {Description} from 'spraying/components/Description'
import {Summary} from 'spraying/components/Summary'
import {translate, locales} from 'app/utils/i18n'

export class SprayingPageComponent extends Component {
  state = {
    /*isWeedInfectionDetailsVisible: false,
    chemicalDetailsVisible: [],*/
    clickedSectionId: null,
    isPopupOpened: false,
    selectedSectionId: 0,
  }

  onPositionClick = (e, section) => {
    e.preventDefault()

    this.popupOverlay.setPosition(ol.proj.fromLonLat([section.position.lon, section.position.lat]))

    this.map.getView().setCenter(ol.proj.fromLonLat([section.position.lon, section.position.lat]))
    this.map.getView().setZoom(18)
    this.mapNode.scrollIntoView()

    this.setState({
      isPopupOpened: true,
      selectedSectionId: section.id,
    })
  }

  onOpenPopup = selectedSectionId => this.setState({
    isPopupOpened: true,
    selectedSectionId,
  })

  onClosePopup = () => this.setState({isPopupOpened: false})

  render() {
    const props = this.props
    const state = this.state

    return props.isSectionsLoading ? <div>{translate(locales.LOADING)}...</div> : (
      <Grid>

        <Row>
          <Col lg={12}>
            <Row>
              <Col
                sm={12}
                lg={6}
              >
                <Description campaignDescription={props.campaignDescription}/>
              </Col>
              <Col
                sm={12}
                lg={6}
              >
                <Summary
                  campaignSummary={props.campaignSummary}
                  isWeedInfectionDetailsVisible={props.isWeedInfectionDetailsVisible}
                  chemicalDetailsVisible={props.chemicalDetailsVisible}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Map
                  initMap={(map, mapNode, popupOverlay) => {
                    this.map = map
                    this.mapNode = mapNode
                    this.popupOverlay = popupOverlay
                  }}
                  sections={props.sections}
                  openPopup={this.onOpenPopup}
                  closePopup={this.onClosePopup}
                  isPopupOpened={state.isPopupOpened}
                  selectedSectionId={state.selectedSectionId}
                />
              </Col>
            </Row>
          </Col>
          <Col
            style={{
              padding: 0,
              overflowX: 'scroll',
            }}
            lg={12}
          >
            <DataTable
              sections={props.sections}
              isWeedInfectionDetailsVisible={props.isWeedInfectionDetailsVisible}
              chemicalDetailsVisible={props.chemicalDetailsVisible}
              onPositionClick={this.onPositionClick}
            />
          </Col>
        </Row>

        {/*<CampaignOptions
          setCampaignOptions={campaignOptions => this.setState({...campaignOptions})}
          isWeedInfectionDetailsVisible={props.isWeedInfectionDetailsVisible}
          chemicalDetailsVisible={props.chemicalDetailsVisible}
        />*/}

      </Grid>
    )
  }
}

export const SprayingPage = connect(
  state => ({
    sections: state.spraying.sections,
    campaignDescription: state.spraying.campaignDescription,
    campaignSummary: state.spraying.campaignSummary,
    isSectionsLoading: state.spraying.isSectionsLoading,
    isWeedInfectionDetailsVisible: state.spraying.isWeedInfectionDetailsVisible,
    chemicalDetailsVisible: state.spraying.chemicalDetailsVisible,
  }),
)(SprayingPageComponent)
