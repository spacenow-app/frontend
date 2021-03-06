import React, { memo } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

const RadioItem = styled.div`
  font-family: 'Montserrat-Regular';
  font-size: 16px;
  width: fit-content;
  cursor: pointer;

  ${props =>
    props.box &&
    css`
      font-family: 'Montserrat-SemiBold';
      border: 1px solid ${props.checked ? '#6adc91' : '#c4c4c4'};
      display: grid;
      padding: 40px;
      border-radius: 10px;

      :hover {
        border-color: #6adc91;
        transition: border 0.2s ease;
      }
    `}
  ${props =>
    props.disabled &&
    css`
      pointer-events: none;
      opacity: 0.5;
    `}
`

const RadioStyled = styled.div`
  display: grid;
  position: relative;
  grid-template-columns: auto 1fr;
  align-items: center;
  justify-items: start;
  grid-column-gap: 12px;
  color: #172439;
  font-size: ${props => props.fontSize};
`

const RadioButtonLabel = styled.label`
  position: absolute;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: white;
  border: 2px solid #172439;
  margin: 0;
`

const RadioButton = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  cursor: pointer;

  &:hover ~ ${RadioButtonLabel}, ${RadioItem}:hover & ~ ${RadioButtonLabel}, &:checked + ${RadioButtonLabel} {
    background: #fff;
    border: 2px solid #6adc91;

    &::after {
      content: '';
      display: block;
      border-radius: 50%;
      width: 12px;
      height: 12px;
      margin: 4px;
      background: #6adc91;
      transition: background 1.2s ease;
    }
  }
`

const RadioContent = styled.div`
  display: grid;

  ${props =>
    props.image &&
    css`
      display: grid;
      grid-template-columns: 1fr auto;
      grid-column-gap: 20px;
    `}
`

const RadioText = styled.span`
  color: #172439
  font-size: 14px;
  margin-top: 20px;
  font-family: 'Montserrat-Regular';
`

const ImageStyled = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 100%;
`

const RadioLabel = styled.div`
  font-family: ${props => (props.mediumLabel ? 'Montserrat-Medium' : 'Montserrat-Regular')};
`

const Radio = ({ handleChange, box, value, name, checked, label, text, image, disabled, fontSize, mediumLabel }) => {
  const handleRadioChange = (e, obj) => {
    if (handleChange) {
      handleChange(e, { value: obj.value, name: obj.name, disabled })
    }
  }

  return (
    <RadioItem box={box} checked={checked} disabled={disabled} onClick={e => handleRadioChange(e, { value, name })}>
      <RadioStyled disabled={disabled} fontSize={fontSize}>
        <RadioButton
          type="radio"
          disabled={disabled}
          name={name}
          value={value}
          checked={checked}
          onChange={e => handleRadioChange(e, { value, name })}
        />
        <RadioButtonLabel />
        <RadioLabel mediumLabel={mediumLabel}>{label}</RadioLabel>
      </RadioStyled>

      {box && (
        <RadioContent image={image}>
          {text && <RadioText>{text}</RadioText>}
          {image && <ImageStyled src={image} />}
        </RadioContent>
      )}
    </RadioItem>
  )
}

Radio.defaultProps = {
  checked: false,
  fontSize: '16px'
}

Radio.propTypes = {
  handleChange: PropTypes.func,
  box: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
  name: PropTypes.string,
  checked: PropTypes.bool,
  label: PropTypes.string,
  text: PropTypes.string,
  image: PropTypes.string,
  disabled: PropTypes.bool,
  fontSize: PropTypes.string
}

export default memo(Radio, (prevProps, nextProps) => {
  if (prevProps.label !== nextProps.label) {
    return false
  }
  if (prevProps.checked === nextProps.checked) {
    return true
  }
  return false
})
