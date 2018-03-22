import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Button, Glyphicon} from 'react-bootstrap'

import {closePopup} from 'actions'

const popupComponent = props => {
  return props.popupIsOpened ? (
    <div
      style={{
        background: '#fff',
        padding: 5,
        boxShadow: '2px 2px 2px #aaa',
      }}
    >
      <Button
        bsSize="xsmall"
        onClick={props.closePopup}
        style={{float: 'right'}}
      >
        <Glyphicon glyph="remove"/>
      </Button>
      <div>Belgium Second campaign 2017</div>
      <div>Charleroi-Sud - Brussels-Zuid</div>
      <div>2017.09.14. 9:56:29-2017.09.14. 11:05:56</div>
      <div>Distance: {props.selectedSection.distance}m</div>
      <table className="table table-striped table-bordered table-condensed table-hover">
        <thead>
          <tr>
            <th></th>
            <th>Dose [l/ha]</th>
            <th>Quantity [l]</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Kyleo</td>
            <td>{props.selectedSection.chemicals[0].dosage}</td>
            <td>{props.selectedSection.chemicals[0].quantity}</td>
          </tr>
          <tr>
            <td>Panic Free</td>
            <td>{props.selectedSection.chemicals[1].dosage}</td>
            <td>{props.selectedSection.chemicals[1].quantity}</td>
          </tr>
          <tr>
            <td>Vival</td>
            <td>{props.selectedSection.chemicals[2].dosage}</td>
            <td>{props.selectedSection.chemicals[2].quantity}</td>
          </tr>
          <tr>
            <td>Genoxone</td>
            <td>{props.selectedSection.chemicals[3].dosage}</td>
            <td>{props.selectedSection.chemicals[3].quantity}</td>
          </tr>
        </tbody>
      </table>
    </div>
  ) : null
}

export const Popup = connect(
  state => ({
    selectedSection: state.selectedSection,
    popupIsOpened: state.popupIsOpened,
  }),
  dispatch => bindActionCreators({
    closePopup,
  }, dispatch),
)(popupComponent)
