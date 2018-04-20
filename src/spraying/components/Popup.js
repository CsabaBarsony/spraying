import React from 'react'
import ReactDOM from 'react-dom'
import {Button, Glyphicon, Table} from 'react-bootstrap'
import PropTypes from 'prop-types'

import {translate, locales} from 'app/utils/i18n'
import {Section} from 'spraying/classes/Spraying'

export const Popup = props => ReactDOM.createPortal(
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
    <div>{translate(locales.DISTANCE)}: {props.section.distance}m</div>
    <Table striped bordered condensed hover>
      <thead>
      <tr>
        <th/>
        <th>{translate(locales.DOSE)} [l/ha]</th>
        <th>{translate(locales.QUANTITY)} [l]</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>Kyleo</td>
        <td>{props.section.chemicals[0].dosage}</td>
        <td>{props.section.chemicals[0].quantity}</td>
      </tr>
      <tr>
        <td>Panic Free</td>
        <td>{props.section.chemicals[1].dosage}</td>
        <td>{props.section.chemicals[1].quantity}</td>
      </tr>
      <tr>
        <td>Vival</td>
        <td>{props.section.chemicals[2].dosage}</td>
        <td>{props.section.chemicals[2].quantity}</td>
      </tr>
      <tr>
        <td>Genoxone</td>
        <td>{props.section.chemicals[3].dosage}</td>
        <td>{props.section.chemicals[3].quantity}</td>
      </tr>
      </tbody>
    </Table>
  </div>,
  document.getElementById('sectionDataPopup'),
)

Popup.propTypes = {
  section: PropTypes.instanceOf(Section).isRequired,
  closePopup: PropTypes.func.isRequired,
}
