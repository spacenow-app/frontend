import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const CheckboxWraperStyled = styled.div`
  display: grid;
  grid-template-columns: min-content 1fr;
`

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`

const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
  margin-top: -8px;
`

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`

const StyledCheckbox = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  background: ${props => (props.checked ? '#6ADC91' : '#fff')};
  border: 2px solid ${props => (props.checked ? '#6ADC91' : '#172439')};
  border-radius: 20px;
  transition: all 150ms;
  cursor: ${props => (props.disabled ? 'none' : 'pointer')};

  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 3px #6adc91;
    border: 2px solid #6adc91;
  }

  ${Icon} {
    visibility: ${props => (props.checked ? 'visible' : 'hidden')};
  }
`

const LabelStyled = styled.span`
  font-family: 'Montserrat-Regular';
  color: #172439;
  font-size: 16px;
  margin: 0 8px;

  @media only screen and (max-width: 600px) {
    font-size: 14px;
  }
`

const RadioCheckbox = ({ className, name, checked, label, disabled, ...props }) => (
  <CheckboxWraperStyled>
    <label>
      <CheckboxContainer {...props} className={className}>
        <HiddenCheckbox
          {...props}
          name={name}
          disabled={disabled}
          checked={checked}
        // onChange={e => handleCheckboxChange(e, { checked: !e.target.checked, name })}
        />
        <StyledCheckbox checked={checked} disabled={disabled}>
          <Icon viewBox="0 0 24 24">
            <polyline points="20 6 9 17 4 12" />
          </Icon>
        </StyledCheckbox>
      </CheckboxContainer>
    </label>
    {label && <LabelStyled>{label}</LabelStyled>}
  </CheckboxWraperStyled>
)

RadioCheckbox.defaultProps = {
  checked: false,
}

RadioCheckbox.propTypes = {
  checked: PropTypes.bool,
  label: PropTypes.string
}

export default RadioCheckbox
