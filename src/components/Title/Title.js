import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

const baseStyle = css`
  font-family: 'Montserrat-Bold';
  font-weight: bold;
  color: ${props => (props.color ? props.color : '#172439')};
  margin: 0;
  max-width: 100%;
  text-align: ${props => {
    if (props.center) return 'center'
    if (props.right) return 'right'
    return 'left'
  }};
`

const TitleStyled = styled.div`
  display: ${props => (props.subtitle ? 'grid' : 'block')};
  margin: ${props => (props.noMargin ? '0' : '30px 0;')};
`

const H1Styled = styled.h1`
  font-size: 50px;
  ${baseStyle}
`

const H2Styled = styled.h2`
  font-size: 40px;
  ${baseStyle}
`

const H3Styled = styled.h3`
  font-size: 34px;
  ${baseStyle}
`

const H4Styled = styled.h4`
  font-size: 28px;
  ${baseStyle}
`
const H5Styled = styled.h5`
  font-size: 24px;
  ${baseStyle}
`
const H6Styled = styled.h6`
  font-size: 18px;
  ${baseStyle}
`

const SubtitleStyled = styled.p`
  color: #707070;
  font-size: ${props => `${props.subTitleSize}px`};
  margin-top: 30px;
  color: ${props => (props.subTitlecolor ? props.subTitlecolor : '#172439')};
  width: 80%;
  margin-bottom: 0px;
  line-height: 26px;
`

const Title = ({ type, title, subtitle, subTitleSize, noMargin, right, center, ...props }) => {
  if (type === 'h1') {
    return (
      <TitleStyled className={props.className}>
        <H1Styled noMargin={noMargin} right={right} center={center} {...props}>
          {title}
        </H1Styled>
        <SubtitleStyled subTitleSize={subTitleSize}>{subtitle}</SubtitleStyled>
      </TitleStyled>
    )
  }
  if (type === 'h2') {
    return (
      <TitleStyled className={props.className}>
        <H2Styled noMargin={noMargin} right={right} center={center} {...props}>
          {title}
        </H2Styled>
        <SubtitleStyled subTitleSize={subTitleSize}>{subtitle}</SubtitleStyled>
      </TitleStyled>
    )
  }
  if (type === 'h3') {
    return (
      <TitleStyled className={props.className}>
        <H3Styled noMargin={noMargin} right={right} center={center} {...props}>
          {title}
        </H3Styled>
        <SubtitleStyled subTitleSize={subTitleSize}>{subtitle}</SubtitleStyled>
      </TitleStyled>
    )
  }
  if (type === 'h4') {
    return (
      <TitleStyled className={props.className}>
        <H4Styled noMargin={noMargin} right={right} center={center} {...props}>
          {title}
        </H4Styled>
        <SubtitleStyled subTitleSize={subTitleSize}>{subtitle}</SubtitleStyled>
      </TitleStyled>
    )
  }
  if (type === 'h5') {
    return (
      <TitleStyled className={props.className}>
        <H5Styled noMargin={noMargin} right={right} center={center} {...props}>
          {title}
        </H5Styled>
        <SubtitleStyled subTitleSize={subTitleSize}>{subtitle}</SubtitleStyled>
      </TitleStyled>
    )
  }
  if (type === 'h6') {
    return (
      <TitleStyled className={props.className}>
        <H6Styled noMargin={noMargin} right={right} center={center} {...props}>
          {title}
        </H6Styled>
        <SubtitleStyled subTitleSize={subTitleSize}>{subtitle}</SubtitleStyled>
      </TitleStyled>
    )
  }
  return (
    <TitleStyled className={props.className}>
      <H1Styled noMargin={noMargin} right={right} center={center} {...props}>
        {title}
      </H1Styled>
      <SubtitleStyled subTitleSize={subTitleSize}>{subtitle}</SubtitleStyled>
    </TitleStyled>
  )
}

Title.defaultProps = {
  type: 'h1',
  subtitle: null,
  subTitleSize: 14,
  className: null,
  noMargin: null,
  right: null,
  center: null,
  color: null
}

Title.propTypes = {
  type: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4']),
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  subTitleSize: PropTypes.number,
  className: PropTypes.string,
  noMargin: PropTypes.bool,
  right: PropTypes.bool,
  center: PropTypes.bool,
  color: PropTypes.string
}

export default Title