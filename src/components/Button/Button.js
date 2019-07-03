import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { Button as ButtonExternal, Spinner } from 'react-bootstrap'

const ButtonStyled = styled(ButtonExternal)`
  &&& {
    background-color: #6adc91;
    border-color: #6adc91;
    height: 54px;
    border-radius: 37px;
    font-family: 'Montserrat-Medium';
    font-size: 14px;
    width: 180px;

    :hover {
      &&& {
        background-color: #51c482;
        border: #51c482;
      }
    }
    :focus {
      &&& {
        background-color: #51c482;
        border: #51c482;
        box-shadow: 0 0 0 0.2rem rgba(106, 220, 145, 0.5);
      }
    }
    :active {
      &&& {
        background-color: #51c482;
        border: #51c482;
      }
    }
  }
`

const ButtonOldStyled = styled.button`
  background-color: ${props =>
    (props.outline && props.theme.button.outline.active.backgroundColor) ||
    (props.disabled && props.theme.button.default.inactive.backgroundColor) ||
    props.theme.button.default.active.backgroundColor}
  color: ${props =>
    (props.outline && props.theme.button.outline.active.textColor) || props.theme.button.default.active.textColor};
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  border-radius: ${props => props.theme.button.baseRadius};
  border: ${props => (props.outline ? `1px solid ${props.theme.button.outline.active.borderColor}` : 'none')};
  font-size: ${props => {
    const { baseFontSize } = props.theme.button
    const baseFontSizeParsed = parseInt(baseFontSize, 10)
    return (
      (props.small && `${baseFontSizeParsed * 0.875}px`) ||
      (props.large && `${baseFontSizeParsed * 1.375}px`) ||
      baseFontSize
    )
  }};
  font-weight: ${props => props.theme.button.fontSemibold};
  line-height: ${props => (props.small && '2.2') || (props.large && '1.25') || '2.5'};
  padding: ${props => (props.large ? '16px 25px 17px' : '0 12px')};
  width: ${props =>
    (props.fluid && '100%') ||
    (props.width && props.width) ||
    (props.small && props.theme.button.size.small.width) ||
    (props.large && props.theme.button.size.large.width) ||
    props.theme.button.size.default.width};
  height: ${props =>
    (props.small && props.theme.button.size.small.height) ||
    (props.large && props.theme.button.size.large.height) ||
    props.theme.button.size.default.height};
  font-weight: 600;
  display: inline-block;
  padding: 6px 12px;
  margin-bottom: 0;
  line-height: 1.42857143;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  touch-action: manipulation;
  user-select: none;
  background-image: none;
  outline: none;
  outline-offset: -2px;

  ${props =>
    props.circular &&
    css`
      border: 1px solid #6dde94;
      border-radius: 50 %;
      width: 20px;
      height: 20px;
      color: #6dde94;
      padding: 0px;
      background-color: #fff;
    `}

  ${props =>
    props.icon &&
    css`
      display: inline-flex;
      padding: 17px 12px;
    `}
  :hover {
    background-color: ${props =>
      (props.outline && props.theme.button.outline.hover.backgroundColor) ||
      props.theme.button.default.hover.backgroundColor}
    border: ${props => (props.outline ? `1px solid ${props.theme.button.outline.hover.borderColor}` : 'none')};
    color: ${props =>
      (props.outline && props.theme.button.outline.hover.textColor) || props.theme.button.default.active.textColor};

  }
  :focus {
    background-color: ${props =>
      (props.outline && props.theme.button.outline.focus.backgroundColor) ||
      props.theme.button.default.focus.backgroundColor}
    border: ${props => (props.outline ? `1px solid ${props.theme.button.outline.focus.borderColor}` : 'none')};
    color: ${props =>
      (props.outline && props.theme.button.outline.focus.textColor) || props.theme.button.default.focus.textColor};
  }
  :disabled {
    background-color: ${props => props.theme.button.default.inactive.backgroundColor};
    border: 1px solid ${props => props.theme.button.default.inactive.borderColor};
    color: ${props => props.theme.button.default.inactive.textColor};
  }
`

const Button = ({ children, isLoading, disabled, ...props }) => {
  return (
    <ButtonStyled {...props} disabled={disabled || isLoading}>
      {isLoading && (
        <>
          <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
          <span className="sr-only">Loading...</span>
        </>
      )}
      {!isLoading && children}
    </ButtonStyled>
  )
}

Button.defaultProps = {
  isLoading: false,
  disabled: false
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool
}

export default Button