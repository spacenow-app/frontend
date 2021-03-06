import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { format } from 'date-fns'
import { SubTitle, Caption, Box, Text } from 'components'

const Grid = styled.div`
  display: grid;
  grid-template-columns: 37% 63%;
`

const Column = styled.div``

const TimeTableView = ({ data, error }) => {
  const renderOpeningData = weekDayIndex => {
    const dayOf = data.find(o => o.weekday === weekDayIndex)
    if (dayOf && dayOf.allday) return '24 Hours'
    if (dayOf) {
      const hourOpen = format(new Date(dayOf.openHour), 'hh:mm a')
      const hourClose = format(new Date(dayOf.closeHour), 'hh:mm a')
      return `${hourOpen} to ${hourClose}`
    }
    return 'Closed'
  }

  return (
    <Grid>
      <Column>
        <Box mb="5px">
          <Caption type="large" color={error ? '#E05252' : '#172439'}>
            <Text fontFamily="semiBold">Weekday</Text>
          </Caption>
        </Box>
        <SubTitle type="xSmall" color={error ? '#E05252' : '#172439'}>
          Monday
        </SubTitle>
        <SubTitle type="xSmall" color={error ? '#E05252' : '#172439'}>
          Tuesday
        </SubTitle>
        <SubTitle type="xSmall" color={error ? '#E05252' : '#172439'}>
          Wednesday
        </SubTitle>
        <SubTitle type="xSmall" color={error ? '#E05252' : '#172439'}>
          Thursday
        </SubTitle>
        <SubTitle type="xSmall" color={error ? '#E05252' : '#172439'}>
          Friday
        </SubTitle>
        <SubTitle type="xSmall" color={error ? '#E05252' : '#172439'}>
          Saturday
        </SubTitle>
        <SubTitle type="xSmall" color={error ? '#E05252' : '#172439'}>
          Sunday
        </SubTitle>
      </Column>
      <Column>
        <Box mb="5px">
          <Caption type="large" color={error ? '#E05252' : '#172439'}>
            <Text fontFamily="semiBold"> Opening hours</Text>
          </Caption>
        </Box>
        <SubTitle type="xSmall" color={error ? '#E05252' : '#172439'}>
          {renderOpeningData(1)}
        </SubTitle>
        <SubTitle type="xSmall" color={error ? '#E05252' : '#172439'}>
          {renderOpeningData(2)}
        </SubTitle>
        <SubTitle type="xSmall" color={error ? '#E05252' : '#172439'}>
          {renderOpeningData(3)}
        </SubTitle>
        <SubTitle type="xSmall" color={error ? '#E05252' : '#172439'}>
          {renderOpeningData(4)}
        </SubTitle>
        <SubTitle type="xSmall" color={error ? '#E05252' : '#172439'}>
          {renderOpeningData(5)}
        </SubTitle>
        <SubTitle type="xSmall" color={error ? '#E05252' : '#172439'}>
          {renderOpeningData(6)}
        </SubTitle>
        <SubTitle type="xSmall" color={error ? '#E05252' : '#172439'}>
          {renderOpeningData(0)}
        </SubTitle>
      </Column>
    </Grid>
  )
}

TimeTableView.defaultProps = {}

TimeTableView.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      weekday: PropTypes.number.isRequired,
      allday: PropTypes.bool.isRequired,
      openHour: PropTypes.string.isRequired,
      closeHour: PropTypes.string.isRequired
    })
  )
}

export default TimeTableView
