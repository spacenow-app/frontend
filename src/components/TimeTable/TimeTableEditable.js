import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { format } from 'date-fns'
import { Grid, Cell, Switch, TimePicker } from 'components'

const WrapperStyled = styled.div``

const TitleStyled = styled.span`
  color: #1f252a;
  font-size: 14px;
  font-family: 'Montserrat-SemiBold';
  padding: 0 0 0 20px;
  margin-bottom: 15px;
`
TitleStyled.displayName = 'Title'

const ItemStyled = styled.div`
  height: 65px;
  border-radius: 75px;
  border: 1px solid ${({ checked, disabled }) => (checked || !disabled ? '#6adc91' : '#E2E2E2')};
  padding: 20px;
  text-align: center;

  ${props =>
    props.error &&
    css`
      border-color: #e05252;
    `}
`

const ItemSwitchStyled = styled.div`
  height: 65px;
  border-radius: 75px;
  border: 1px solid ${({ checked }) => (checked ? '#6adc91' : '#E2E2E2')};
  padding: 20px;
  display: grid;
  grid-template-columns: auto auto;
`

const SwitchStyled = styled.div`
  justify-self: end;
`

const TimeTableEditable = ({
  data,
  fullTime,
  handleClickDay,
  handleChangeTime,
  handleClickOpenFullTime,
  handleClick24hours
}) => {
  const onHandleClickDay = (e, obj) => {
    handleClickDay(e, obj)
  }

  const onHandleChangeTime = (name, value, item, index) => {
    handleChangeTime({ name, value, item, index })
  }

  const onHandleClick24hours = (e, obj) => {
    handleClick24hours(e, obj)
  }

  const onHandleClickOpenFullTime = (e, obj) => {
    handleClickOpenFullTime(e, obj)
  }

  return (
    <WrapperStyled>
      {/* <Grid columns={12} columnGap="40px" style={{ margin: '30px 0' }}>
        <Cell width={4}>
          <ItemSwitchStyled>
            <span>Open 24 / 7</span>
            <SwitchStyled>
              <Switch name="fulltime" handleCheckboxChange={onHandleClickOpenFullTime} checked={fullTime} />
            </SwitchStyled>
          </ItemSwitchStyled>
        </Cell>
      </Grid> */}
      <Grid columns={12} columnGap="40px" left>
        <Cell width={4} middle>
          <TitleStyled>Days</TitleStyled>
        </Cell>
        <Cell width={2} middle>
          <TitleStyled>Open</TitleStyled>
        </Cell>
        <Cell width={2} middle>
          <TitleStyled>Close</TitleStyled>
        </Cell>
        <Cell width={4} middle>
          <TitleStyled>Working hours</TitleStyled>
        </Cell>
      </Grid>
      <Grid columns={12} rows={7} rowGap="20px" columnGap="40px">
        {data.map((item, index) => (
          <Fragment key={item.day}>
            <Cell width={4}>
              <ItemSwitchStyled checked={item.active}>
                <span>{item.description}</span>
                <SwitchStyled>
                  <Switch name={item.day} handleCheckboxChange={onHandleClickDay} checked={item.active} />
                </SwitchStyled>
              </ItemSwitchStyled>
            </Cell>
            <Cell width={2}>
              <ItemStyled disabled={item.fulltime || !item.active} error={item.error.open}>
                <TimePicker
                  value={format(item.open, 'HH:mm')}
                  disabled={item.fulltime || !item.active}
                  onChange={time => onHandleChangeTime('open', time, item, index)}
                />
              </ItemStyled>
            </Cell>
            <Cell width={2}>
              <ItemStyled disabled={item.fulltime || !item.active} error={item.error.close}>
                <TimePicker
                  value={format(item.close, 'HH:mm')}
                  disabled={item.fulltime || !item.active}
                  onChange={time => onHandleChangeTime('close', time, item, index)}
                />
              </ItemStyled>
            </Cell>
            <Cell width={4}>
              <ItemSwitchStyled>
                <span>Open 24 hours</span>
                <SwitchStyled>
                  <Switch
                    name={`${item.day}-24h`}
                    disabled={!item.active}
                    handleCheckboxChange={onHandleClick24hours}
                    checked={item.fulltime}
                  />
                </SwitchStyled>
              </ItemSwitchStyled>
            </Cell>
          </Fragment>
        ))}
      </Grid>
    </WrapperStyled>
  )
}

TimeTableEditable.defaultProps = {}

TimeTableEditable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      day: PropTypes.string,
      description: PropTypes.string,
      active: PropTypes.bool,
      fulltime: PropTypes.bool,
      open: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.instanceOf(Date)]),
      close: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.instanceOf(Date)])
    })
  ),
  fullTime: PropTypes.bool,
  handleClickDay: PropTypes.func,
  handleChangeTime: PropTypes.func,
  handleClickOpenFullTime: PropTypes.func,
  handleClick24hours: PropTypes.func
}

export default TimeTableEditable
