import React, { useEffect } from 'react'
import styled, { css } from 'styled-components'
import { Icon } from 'components'
import _ from 'lodash'

const List = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 130px));
  grid-gap: 10px;
  justify-content: ${props => (props.spaceBetween ? 'space-between' : 'center')};

  ${props =>
    props.circular &&
    css`
      grid-template-columns: repeat(auto-fit, minmax(90px, 90px));
      grid-column-gap: 30px;
    `}
`

const ListItem = styled.div`
  display: grid;
  justify-self: center;
  text-align: center;
  width: 100%;

  ${props =>
    !props.circular &&
    css`
      background-color: ${props.bgItem ? props.bgItem : '#ededed'};
      width: 130px;
      height: 130px;
      border-radius: 8px;
      border: ${props.border && props.border};
      box-shadow: ${props.shadow && '0px 1px 3px 0px rgba(0, 0, 0, 0.1)'};

      :hover {
        background-color: #6adc91;
        cursor: pointer;
      }
    `}
  ${props =>
    !props.circular &&
    props.active &&
    css`
      background-color: #6adc91;
    `}
`

const IconContainer = styled.div`
  border: 1px solid #c4c4c4;
  width: 90px;
  height: 90px;
  border-radius: 100%;
  display: grid;
  justify-self: center;

  ${props =>
    props.active &&
    css`
      background-color: #6adc91;
      border: none;
    `}

  :hover {
    background-color: #6adc91;
    cursor: pointer;
    border: none;
  }
`

const IconStyled = styled(Icon)`
  width: 50px;
  max-width: 50px;
  height: 50px;
  max-height: 50px;
  justify-self: center;
  align-self: center;
  fill: #172439;
`

const TitleStyled = styled.span`
  justify-self: center;
  align-self: start;
  color: #172439;
  font-family: 'Montserrat-Medium';
  font-size: 14px;
  max-height: 22px;

  ${props =>
    props.circular &&
    css`
      margin-top: 15px;
    `}
`

const ListCategory = ({
  category,
  circular,
  isActivity,
  data,
  bgItem,
  border,
  shadow,
  handleItemClick,
  itemSelected,
  spaceBetween,
  ...props
}) => {
  useEffect(() => {}, [data, itemSelected])

  const _parseIconName = (isSub, name) => {
    let prefix = 'category-'
    if (isSub) prefix = 'sub-category-'
    if (isActivity) prefix = `${category}-activity-`
    return prefix + name.replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`)
  }

  if (!data || !data.length) {
    return null
  }

  const _renderCategory = item => (
    <ListItem
      key={item.id}
      shadow={shadow}
      bgItem={bgItem}
      border={border}
      onClick={e => handleItemClick(e, item)}
      active={itemSelected && item.id === itemSelected.id}
    >
      <IconStyled name={_parseIconName(null, item.otherItemName)} fill="#172439" />
      <TitleStyled>{item.itemName}</TitleStyled>
    </ListItem>
  )

  const _renderSubCategory = (item, bookingPeriod) => (
    <ListItem
      key={item.id}
      shadow={shadow}
      bgItem={bgItem}
      border={border}
      circular
      onClick={e => handleItemClick(e, { ...item, bookingPeriod })}
      active={itemSelected && item.id === itemSelected.id}
    >
      <IconContainer active={itemSelected && item.id === itemSelected.id}>
        <IconStyled name={_parseIconName(true, item.otherItemName)} fill="#172439" />
      </IconContainer>
      <TitleStyled circular>{item.itemName}</TitleStyled>
    </ListItem>
  )

  const _renderActivity = item => (
    <ListItem
      key={item.id}
      shadow={shadow}
      bgItem={bgItem}
      border={border}
      circular
      onClick={e => handleItemClick(e, { ...item })}
      active={_.find(itemSelected, i => i === item.id)}
    >
      <IconContainer active={_.find(itemSelected, i => i === item.id)}>
        <IconStyled name={_parseIconName(true, item.otherItemName)} fill="#172439" />
      </IconContainer>
      <TitleStyled circular>{item.itemName}</TitleStyled>
    </ListItem>
  )

  return (
    <List spaceBetween={spaceBetween}>
      {isActivity && data && [].concat(data).map(item => _renderActivity(item))}
      {!isActivity && !circular && data && [].concat(data).map(item => _renderCategory(item))}
      {!isActivity &&
        circular &&
        data &&
        [].concat(data).map(item => _renderSubCategory(item.subCategory, item.bookingPeriod))}
    </List>
  )
}

ListCategory.propsType = {}

ListCategory.defaultProps = {
  circular: false,
  isActivity: false,
  itemSelected: false,
  handleItemClick: () => {}
}

export default ListCategory
