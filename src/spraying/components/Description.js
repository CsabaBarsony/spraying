import React from 'react'

export const Description = props => (
  <div>
    <div>{props.campaignDescription.requestType}</div>
    <div>{props.campaignDescription.databaseName}</div>
    <div>{props.campaignDescription.sectionSprayed}</div>
    <div>{props.campaignDescription.timeSprayed.toString()}</div>
    <div>{props.campaignDescription.distanceSprayed}</div>
  </div>
)
