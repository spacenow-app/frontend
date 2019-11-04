import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import _ from 'lodash'
import { space } from 'styled-system'

const IS_ABSORVE = 0.035
const NO_ABSORVE = 0.135

const WrapperStyled = styled.div`
  display: grid;
  grid-row-gap: 8px;
  font-size: 14px;
  margin: 0 0 35px 0;
  ${space}
`

const ContentStyled = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-column-gap: 10px;
`

const LeftTitleStyled = styled.span`
  font-family: 'Montserrat-Bold';
  align-self: center;
  justify-self: start;
`

const LeftStyled = styled.span`
  align-self: center;
  justify-self: start;
`

const RightTitleStyled = styled.span`
  font-family: 'Montserrat-Bold';
  align-self: center;
  justify-self: end;
`

const RightStyled = styled.span`
  align-self: center;
  justify-self: end;
`

const PriceDetail = props => (
  <>
    {props.price && (
      <WrapperStyled {...props}>
        <ContentStyled>
          <LeftTitleStyled>Description</LeftTitleStyled>
          <RightTitleStyled>Value ({`${props.currency} ${props.currencySymbol}`})</RightTitleStyled>
        </ContentStyled>
        <ContentStyled>
          <LeftStyled>{`${props.currency} ${props.currencySymbol} ${props.price
            .toFixed(2)
            .replace(/\d(?=(\d{3})+\.)/g, '$&,')} x ${props.days} ${props.periodLabel}`}</LeftStyled>
          <RightStyled>{`${props.currency} ${props.currencySymbol}${(props.price * props.days)
            .toFixed(2)
            .replace(/\d(?=(\d{3})+\.)/g, '$&,')}`}</RightStyled>
        </ContentStyled>
        <ContentStyled>
          <LeftStyled>Quantity x{props.quantity}</LeftStyled>
          <RightStyled>{`${props.currency} ${props.currencySymbol}${(props.price * props.days * props.quantity)
            .toFixed(2)
            .replace(/\d(?=(\d{3})+\.)/g, '$&,')}`}</RightStyled>
        </ContentStyled>
        <ContentStyled>
          <LeftStyled>Service fee</LeftStyled>
          <RightStyled>
            {props.isAbsorvedFee
              ? `${props.currency} ${props.currencySymbol}${(props.price * props.days * props.quantity * IS_ABSORVE)
                  .toFixed(2)
                  .replace(/\d(?=(\d{3})+\.)/g, '$&,')}`
              : `${props.currency} ${props.currencySymbol}${(props.price * props.days * props.quantity * NO_ABSORVE)
                  .toFixed(2)
                  .replace(/\d(?=(\d{3})+\.)/g, '$&,')}`}
          </RightStyled>
        </ContentStyled>
        <ContentStyled>
          <LeftStyled>Total</LeftStyled>
          <RightStyled>
            {`${props.currency} ${props.currencySymbol}${_.sum([
              props.price * props.days * props.quantity,
              props.isAbsorvedFee
                ? props.price * props.days * props.quantity * IS_ABSORVE
                : props.price * props.days * props.quantity * NO_ABSORVE
            ])
              .toFixed(2)
              .replace(/\d(?=(\d{3})+\.)/g, '$&,')}`}
          </RightStyled>
        </ContentStyled>
      </WrapperStyled>
    )}
  </>
)

PriceDetail.defaultProps = {
  currency: 'AUD',
  currencySymbol: '$',
  price: 0,
  days: 1,
  quantity: 2,
  isAbsorvedFee: false,
  periodLabel: 'Day'
}

PriceDetail.propTypes = {
  currency: PropTypes.string,
  currencySymbol: PropTypes.string,
  price: PropTypes.number,
  days: PropTypes.number,
  quantity: PropTypes.number,
  isAbsorvedFee: PropTypes.bool,
  periodLabel: PropTypes.string
}

export default PriceDetail
