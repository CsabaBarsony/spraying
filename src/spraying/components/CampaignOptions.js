import React, {Component} from 'react'
import PropTypes from 'prop-types'

export class CampaignOptions extends Component {
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
      <form>
        <div>
          <input
            type="checkbox"
            checked={state.weed}
            onChange={e => this.onChange(e.target.checked, 'weed')}
          />
          weed
        </div>
        <div>
          <input
            type="checkbox"
            checked={state.chemical1}
            onChange={e => this.onChange(e.target.checked, 'chemical1')}
          />
          chemical 1
        </div>
        <div>
          <input
            type="checkbox"
            checked={state.chemical2}
            onChange={e => this.onChange(e.target.checked, 'chemical2')}
          />
          chemical 2
        </div>
        <div>
          <input
            type="checkbox"
            checked={state.chemical3}
            onChange={e => this.onChange(e.target.checked, 'chemical3')}
          />
          chemical 3
        </div>
        <div>
          <input
            type="checkbox"
            checked={state.chemical4}
            onChange={e => this.onChange(e.target.checked, 'chemical4')}
          />
          chemical 4
        </div>
      </form>
    )
  }
}

CampaignOptions.propTypes = {
  chemicalDetailsVisible: PropTypes.arrayOf(PropTypes.number).isRequired,
  isWeedInfectionDetailsVisible: PropTypes.bool.isRequired,
  setCampaignOptions: PropTypes.func.isRequired,
}
