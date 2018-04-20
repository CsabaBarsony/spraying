import React from 'react'
import {Panel, Table} from 'react-bootstrap'

export const Description = props => (
  <Panel bsStyle="info">
    <Panel.Heading>
      <Panel.Title>Description</Panel.Title>
    </Panel.Heading>
    <Table bordered condensed hover>
      <tbody>
        <tr>
          <td>{props.campaignDescription.requestType}</td>
        </tr>
        <tr>
          <td>{props.campaignDescription.databaseName}</td>
        </tr>
        <tr>
          <td>{props.campaignDescription.sectionSprayed}</td>
        </tr>
        <tr>
          <td>{props.campaignDescription.timeSprayed.toString()}</td>
        </tr>
        <tr>
          <td>{props.campaignDescription.distanceSprayed}</td>
        </tr>
      </tbody>
    </Table>
  </Panel>
)
