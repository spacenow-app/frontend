import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { format } from 'date-fns'
import { SubTitle, Caption } from 'components'

const Grid = styled.div`
  display: grid;
  grid-template-columns: 200px 250px;
  @media (max-width: 680px) {
    grid-template-columns: 140px 210px;
  }
`

const Column = styled.div``

const TimeTableView = ({ timeTable }) => {
  if (!timeTable) {
    return 'No Data'
  }

  const renderOpeningData = weekDayIndex => {
    const dayOf = timeTable.find(o => o.weekday === weekDayIndex)
    if (dayOf && dayOf.allday) return '24 Hours'
    if (dayOf) {
      const hourOpen = format(dayOf.openHour, 'hh:mm a')
      const hourClose = format(dayOf.closeHour, 'hh:mm a')
      return `${hourOpen} to ${hourClose}`
    }
    return 'Closed'
  }

  return (
    <Grid>
      <Column>
        <Caption type="large">Weekday</Caption>
        <br />
        <SubTitle type="xSmall" color="#172439">
          Monday
        </SubTitle>
        <SubTitle type="xSmall" color="#172439">
          Tuesday
        </SubTitle>
        <SubTitle type="xSmall" color="#172439">
          Wednesday
        </SubTitle>
        <SubTitle type="xSmall" color="#172439">
          Thursday
        </SubTitle>
        <SubTitle type="xSmall" color="#172439">
          Friday
        </SubTitle>
        <SubTitle type="xSmall" color="#172439">
          Saturday
        </SubTitle>
        <SubTitle type="xSmall" color="#172439">
          Sunday
        </SubTitle>
      </Column>
      <Column>
        <Caption type="large">Opening hours</Caption>
        <br />
        <SubTitle type="xSmall" color="#172439">
          {renderOpeningData(1)}
        </SubTitle>
        <SubTitle type="xSmall" color="#172439">
          {renderOpeningData(2)}
        </SubTitle>
        <SubTitle type="xSmall" color="#172439">
          {renderOpeningData(3)}
        </SubTitle>
        <SubTitle type="xSmall" color="#172439">
          {renderOpeningData(4)}
        </SubTitle>
        <SubTitle type="xSmall" color="#172439">
          {renderOpeningData(5)}
        </SubTitle>
        <SubTitle type="xSmall" color="#172439">
          {renderOpeningData(6)}
        </SubTitle>
        <SubTitle type="xSmall" color="#172439">
          {renderOpeningData(0)}
        </SubTitle>
      </Column>
    </Grid>
  )
}

TimeTableView.defaultProps = {
  timeTable: [
    {
      weekday: 1,
      allday: true,
      openHour: new Date(),
      closeHour: new Date()
    },
    {
      weekday: 2,
      allday: false,
      openHour: new Date(),
      closeHour: new Date()
    },
    {
      weekday: 3,
      allday: false,
      openHour: new Date(),
      closeHour: new Date()
    },

    {
      weekday: 5,
      allday: false,
      openHour: new Date(),
      closeHour: new Date()
    },

    {
      weekday: 7,
      allday: false,
      openHour: new Date(),
      closeHour: new Date()
    }
  ]
}

TimeTableView.propTypes = {
  timeTable: PropTypes.arrayOf(
    PropTypes.shape({
      weekday: PropTypes.number.isRequired,
      allday: PropTypes.bool.isRequired,
      openHour: PropTypes.string.isRequired,
      closeHour: PropTypes.string.isRequired
    })
  )
}

export default TimeTableView