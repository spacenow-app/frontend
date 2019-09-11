import React, {
  useEffect
  //  useState
} from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { toast } from 'react-toastify'

import {
  Wrapper,
  Title,
  Grid,
  Cell,
  UserDetails,
  BookingCard,
  Image,
  Box,
  Button,
  ListDates,
  DatesDetail,
  TimeTable,
  Loader
} from 'components'

import { onGetBooking, onGetListingInfo } from 'redux/ducks/booking'

const ImageContainerStyled = styled.div`
  > div {
    border-radius: 15px 15px 0 0;
  }
`

const GridStyled = styled(Grid)`
  @media only screen and (max-width: 991px) {
    grid-template-columns: 100%;
  }
`

const CellStyled = styled(Cell)`
  @media only screen and (max-width: 991px) {
    grid-column-end: span 12;
  }
`

const ButtonStyled = styled(Button)`
  @media only screen and (max-width: 991px) {
    max-width: 350px;
    min-width: 350px;
  }
`

const _getWeekName = days => {
  const { mon, tue, wed, thu, fri, sat, sun } = days
  if (mon && tue && wed && thu && fri & !sat && !sun) return 'Weekdays'
  if (!mon && !tue && !wed && !thu && !fri & sat && sun) return 'Weekends'
  if (mon && tue && wed && thu && fri & sat && sun) return 'Everyday'
  if (!mon && !tue && !wed && !thu && !fri & !sat && !sun) return 'Closed'
  return 'Custom'
}

const ItineraryPage = ({ match, location, history, ...props }) => {
  const dispatch = useDispatch()

  const { user } = useSelector(state => state.auth)
  const { object: booking, isLoading: isBookingLoading } = useSelector(state => state.booking.get)
  const { object: listing, isLoading: isListingLoading } = useSelector(state => state.booking.listing)

  useEffect(() => {
    dispatch(onGetBooking(match.params.id))
  }, [dispatch, match.params.id])

  useEffect(() => {
    booking && dispatch(onGetListingInfo(booking.listingId))
  }, [dispatch, booking])

  if (isBookingLoading) {
    return <Loader text="Loading itinerary" />
  }

  if (booking && booking.bookingState === 'pending') {
    history.replace('/account/booking')
    toast.warning(`Reservation ${booking.confirmationCode} still 'pending'.`)
  }

  if (booking && user && booking.guestId !== user.id) {
    history.replace('/account/booking')
  }

  const listingPhoto = listing && listing.photos.find(photo => photo.isCover).name
  const startDate = booking && booking.reservations[0]
  const endDate = booking && booking.reservations[booking.reservations.length - 1]

  return (
    <Wrapper mt="50px">
      <Helmet title="Itinerary - Spacenow" />
      <Title title="You're all booked in." color="#6adc91" noMargin />
      <Box mb="50px" mt="10px">
        <Title title="Enjoy your space!" noMargin />
      </Box>
      <GridStyled columns="350px auto" columnGap="45px">
        <Cell>
          {isListingLoading ? (
            <Loader sm />
          ) : (
            <BookingCard
              noPadding
              titleComponent={
                <ImageContainerStyled>
                  <Image width="100%" height="100%" src={listingPhoto} />
                </ImageContainerStyled>
              }
              footerComponent={
                <Box p="0 30px 30px 30px">
                  <UserDetails
                    hostname={listing.user.profile.displayName}
                    imageProfile={listing.user.profile.picture}
                    joined="2019"
                  />
                </Box>
              }
            />
          )}
          <Box mt="20px">
            <ButtonStyled outline onClick={() => history.push(`/account/booking`)}>
              View Bookings
            </ButtonStyled>
          </Box>
        </Cell>
        <Cell>
          <Grid columns={12} rows={'auto'} columnGap="20px">
            <CellStyled width={8}>
              <ButtonStyled fluid disabled color="#172439 !important">
                {`Reservation Code: ${booking.confirmationCode.toString()}`}
              </ButtonStyled>
            </CellStyled>
            <CellStyled width={4}>
              <ButtonStyled fluid>See your receipt</ButtonStyled>
            </CellStyled>
            {isListingLoading ? (
              <Loader sm />
            ) : (
              <>
                <Cell width={12}>
                  <Title
                    type="h3"
                    title={listing.title}
                    subtitle={`${listing.location.city}, ${listing.location.country}`}
                    subTitleMargin={5}
                  />
                </Cell>
                <Cell width={12}>
                  <Title
                    type="h6"
                    title="Address"
                    noMargin
                    subtitle={`${listing.location.address1}, ${listing.location.city}, ${listing.location.zipcode}, ${listing.location.state}, ${listing.location.country}`}
                    subTitleMargin={5}
                  />
                </Cell>
              </>
            )}
            <CellStyled width={10}>
              {booking.priceType === 'daily' ? (
                <Box m="0">
                  <Title type="h6" title="Selected dates" />
                  <ListDates dates={booking.reservations} />
                </Box>
              ) : (
                <Box mt="20px">
                  <DatesDetail
                    startDate={startDate}
                    endDate={endDate}
                    period={booking.period}
                    priceType={booking.priceType}
                  />
                </Box>
              )}
            </CellStyled>

            <CellStyled width={10}>
              {isListingLoading ? (
                <Loader sm />
              ) : (
                <Box my="30px">
                  <TimeTable
                    data={listing.accessDays.listingAccessHours}
                    error={_getWeekName(listing.accessDays) === 'Closed'}
                  />
                </Box>
              )}
            </CellStyled>
          </Grid>
        </Cell>
      </GridStyled>
    </Wrapper>
  )
}

ItineraryPage.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
  location: PropTypes.instanceOf(Object).isRequired,
  match: PropTypes.instanceOf(Object).isRequired
}

export default ItineraryPage