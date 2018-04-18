import React from 'react'
import ReactDOM from 'react-dom'
import {Button, Glyphicon} from 'react-bootstrap'

import {translate, locales} from 'app/utils/i18n'

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
    <div>Belgium Second campaign 2017</div>
    <div>Charleroi-Sud - Brussels-Zuid</div>
    <div>2017.09.14. 9:56:29-2017.09.14. 11:05:56</div>
    <div>{translate(locales.DISTANCE)}: {props.section.distance}m</div>
    <table className="table table-striped table-bordered table-condensed table-hover">
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
    </table>
  </div>,
  document.getElementById('sectionDataPopup'),
)
