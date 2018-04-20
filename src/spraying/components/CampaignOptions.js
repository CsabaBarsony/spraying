import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import {locales, translate} from 'app/utils/i18n'
import {Nav, NavDropdown, Form, Checkbox} from 'react-bootstrap'
import {sprayingEvents} from 'spraying/spraying.statechart'

export class CampaignOptionsComponent extends Component {
  state = {
    weed: false,
    chemical1: false,
    chemical2: false,
    chemical3: false,
    chemical4: false,
  }

  onChange = (checked, key) => {
    const newState = {...this.state}
    newState[key] = checked

    const chemicalDetails = []

    newState.chemical1 && chemicalDetails.push(1)
    newState.chemical2 && chemicalDetails.push(2)
    newState.chemical3 && chemicalDetails.push(3)
    newState.chemical4 && chemicalDetails.push(4)

    this.props.setCampaignOptions({
      isWeedInfectionDetailsVisible: newState.weed,
      chemicalDetailsVisible: chemicalDetails,
    })

    this.setState(newState)
  }

  render() {
    const state = this.state

    return (
      <Nav>
        <NavDropdown
          id="spraying-options"
          title={translate(locales.SETTINGS)}
        >
          <Form
            style={{
              paddingLeft: 5,
              paddingRight: 5,
            }}
          >
            <Checkbox
              checked={state.weed}
              onChange={e => this.onChange(e.target.checked, 'weed')}
            >
              {translate(locales.WEED_INFESTATION)}
            </Checkbox>
            <Checkbox
              checked={state.chemical1}
              onChange={e => this.onChange(e.target.checked, 'chemical1')}
            >
              {translate(locales.CHEMICAL)} 1
            </Checkbox>
            <Checkbox
              checked={state.chemical2}
              onChange={e => this.onChange(e.target.checked, 'chemical2')}
            >
              {translate(locales.CHEMICAL)} 2
            </Checkbox>
            <Checkbox
              checked={state.chemical3}
              onChange={e => this.onChange(e.target.checked, 'chemical3')}
            >
              {translate(locales.CHEMICAL)} 3
            </Checkbox>
            <Checkbox
              checked={state.chemical4}
              onChange={e => this.onChange(e.target.checked, 'chemical4')}
            >
              {translate(locales.CHEMICAL)} 4
            </Checkbox>
          </Form>
        </NavDropdown>
      </Nav>
    )
  }
}

CampaignOptionsComponent.propTypes = {
  chemicalDetailsVisible: PropTypes.arrayOf(PropTypes.number).isRequired,
  isWeedInfectionDetailsVisible: PropTypes.bool.isRequired,
  setCampaignOptions: PropTypes.func.isRequired,
}

export const CampaignOptions = connect(
  state => ({
    isWeedInfectionDetailsVisible: state.spraying.isWeedInfectionDetailsVisible,
    chemicalDetailsVisible: state.spraying.chemicalDetailsVisible,
  }),
  dispatch => ({
    setCampaignOptions: options => dispatch({
      type: sprayingEvents.SET_OPTIONS,
      ...options,
    }),
  }),
)(CampaignOptionsComponent)
