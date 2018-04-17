import React from 'react'

import {CampaignSummary} from 'spraying/classes/CampaignSummary'

export const Summary = props => {
  const chemicalRows = props.campaignSummary.chemicalSummaries.map((chemicalSummary, index) => (
    <tr key={index}>
      <td>C{chemicalSummary.chemicalId}</td>
      <td>{chemicalSummary.quantity}</td>
    </tr>
  ))

  return (
    <table>
      <thead>
      <tr>
        <th/>
        <th>sum</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>weed</td>
        <td>{props.campaignSummary.weedInfestationSummary.quantity}</td>
      </tr>
      {chemicalRows}
      </tbody>
    </table>
  )

}

