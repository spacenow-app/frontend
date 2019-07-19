import React from 'react'
import styled from 'styled-components'
import { Title, Grid, Cell, TimeTable, Calendar, Switch } from 'components'

const SwitchStyled = styled.div`
  justify-self: end;
`

const ItemSwitchStyled = styled.div`
  height: 65px;
  border-radius: 75px;
  border: 1px solid ${({ checked }) => (checked ? '#6adc91' : '#E2E2E2')};
  padding: 20px;
  display: grid;
  grid-template-columns: auto auto;
`

const timeTable = [
  {
    day: 1,
    description: 'Monday',
    active: false,
    fulltime: false,
    open: `${new Date()}`,
    close: `${new Date()}`
  },
  {
    day: 2,
    description: 'Thuesday',
    active: true,
    fulltime: false,
    open: `${new Date()}`,
    close: `${new Date()}`
  },
  {
    day: 3,
    description: 'Thrusday',
    active: false,
    fulltime: true,
    open: `${new Date()}`,
    close: `${new Date()}`
  }
]

const AvailabilityTab = () => {
  return (
    <Grid columns={1} rowGap="80px">
      <Cell>
        <Title type="h3" title="Timetable*" subtitle="Let guests know the times your space is open." />
        <TimeTable editable data={timeTable} />
      </Cell>
      <Cell>
        <Title
          type="h3"
          title="Blocked dates"
          subtitle="Block out times when the space is not available within business opening hours."
        />
        <Calendar />
      </Cell>
      <Cell>
        <Title
          type="h3"
          title="Holidays"
          subtitle="Are you closed on all Australian holidays? Or Just a few of them?"
        />
        <Grid columns={12} gap="20px" columnGap="40px" style={{ margin: '30px 0' }}>
          <Cell width={3}>
            <ItemSwitchStyled>
              <span>Block all</span>
              <SwitchStyled>
                <Switch name="blockAll" disabled={false} handleCheckboxChange={() => {}} checked={false} />
              </SwitchStyled>
            </ItemSwitchStyled>
          </Cell>
        </Grid>
      </Cell>
    </Grid>
  )
}

export default AvailabilityTab
