import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Box, Text, Avatar, Grid } from 'components'

import { monthNames } from 'variables'

import ReadMoreComponent from './ReadMoreComponent'

const AvatarContainer = styled.div`
  display: block;
  font-family: 'MontSerrat-Bold';
  font-size: 22px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;

  @media (max-width: 945px) {
    margin-bottom: 5px;
    line-height: 1;
    white-space: pre-wrap;
  }
`

const ReadMoreContainer = styled.div`
  .read-more-button {
    color: #6adc91;
    cursor: pointer;
  }
`

const Review = ({ id, userName, userPicture, date, comment, rating }) => {
  return (
    <>
      <Box display="flex" justifyContent="start" mb="15px">
        <AvatarContainer>
          <Avatar width="42px" height="42px" image={userPicture} />
        </AvatarContainer>
        <Grid columns={1}>
          <Text fontSize="12px" ml="10px" fontFamily="medium">
            {`${userName}`}
          </Text>
          <Text fontSize="12px" ml="10px" fontFamily="medium" color="greyscale.1">
            {monthNames[date.getMonth()]} {date.getFullYear()}
          </Text>
        </Grid>
      </Box>
      <Box display="flex" justifyContent="start" mb="15px">
        <ReadMoreContainer>
          <ReadMoreComponent text={comment} min={80} ideal={100} max={280} readMoreText="Read more" />
        </ReadMoreContainer>
      </Box>
    </>
  )
}

Review.propTypes = {
  id: PropTypes.number.isRequired,
  userName: PropTypes.string.isRequired,
  userPicture: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  comment: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired
}

export default Review