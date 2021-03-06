/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { addMinutes, format, addHours, isAfter } from 'date-fns'
import { useSelector, useDispatch } from 'react-redux'
import Helmet from 'react-helmet'
import { onGetBookingsByUser } from 'redux/ducks/account'
import { onDeclineBooking, onAcceptBooking, onAcceptDeclineByEmail } from 'redux/ducks/booking'
import { TypesModal, openModal } from 'redux/ducks/modal'
import { Card, Text, Icon, Loader, BackgroundImage, Grid, Cell, Title, Dropdown, Price } from 'components'
import { convertedDate } from 'utils/date'
import { cropPicture } from 'utils/images'

const _parseCategoryIconName = (name, isSub) => {
  let prefix = 'category-'
  if (isSub) prefix = 'sub-category-'
  return prefix + name.replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`)
}

const _bookingDetails = dispatch => (booking, userType) => {
  dispatch(
    openModal(TypesModal.MODAL_TYPE_BOOKING_DETAILS, {
      options: {
        title: 'Booking Details',
        text: ''
      },
      booking,
      userType
    })
  )
}

const _goToSpacePage = listingId => {
  window.location.href = `/space/${listingId}`
}

const _goToCheckoutPage = bookingId => {
  window.location.href = `/checkout/${bookingId}/info`
}

const _getTip = (status, userType) => {
  switch (status) {
    case 'expired':
      return userType === 'guest'
        ? 'Your host didn’t confirm in time. We’ll let them know they missed their chance. If you still want to book this space, please re-enquire.'
        : 'You missed the 24 hour window to reply to this booking. You can contact the guest to see if they want to re-enquire'
    case 'cancelled':
      return userType === 'guest'
        ? 'This booking has been cancelled by you or the host.'
        : 'This booking has been cancelled by you or the guest.'
    case 'pending':
      return userType === 'guest'
        ? 'You’ve started this booking, but you need to enter your payment details before we send your request to the host.'
        : 'A guest has created a booking, but hasn’t completed their payment. We’ll chase them up.'
    case 'requested':
      return userType === 'guest'
        ? 'Your booking is with the host for approval.'
        : 'Please either approve or reject this booking within 24 hours, or it’ll expire.'
    case 'approved':
      return userType === 'guest'
        ? 'Your booking is now in progress.'
        : 'This booking and its payments are currently in progress.'
    default:
      return userType === 'guest' ? 'This booking is now finished.' : 'This booking is now finished.'
  }
}

const _getCoverPhoto = object => {
  if (object.photos.length <= 0) {
    return ''
  }
  const photoCover = object.photos.find(e => e.isCover)
  if (photoCover) {
    return cropPicture(photoCover.name)
  }
  return cropPicture(object.photos[0].name)
}

const BookingCard = (dispatch, item, index, userType, userId) => {
  let expire = addHours(convertedDate(item.createdAt), 24)

  if (userType === 'guest') expire = addMinutes(convertedDate(item.createdAt), 30)

  if (userType === 'guest') expire = addMinutes(convertedDate(item.createdAt), 15)

  const expiryDate = `${format(expire, 'dd/MM/yyyy')} at ${format(expire, 'HH:mm')}`

  const _acceptBooking = bookingId => {
    dispatch(onAcceptBooking(bookingId)).then(() => dispatch(onGetBookingsByUser(userId, userType)))
  }

  const _declineBooking = bookingId => {
    dispatch(onDeclineBooking(bookingId)).then(() => dispatch(onGetBookingsByUser(userId, userType)))
  }

  return (
    <Card.Horizontal key={index}>
      <Card.Horizontal.Image src={_getCoverPhoto(item.listing)} handleClick={() => _goToSpacePage(item.listingId)} />
      <Card.Horizontal.Body>
        <Card.Horizontal.Title
          noMargin
          subTitleMargin={0}
          type="h6"
          title={<Text width={{ _: '220px', medium: '250px', large: '270px' }}>{item.listing.title || ''}</Text>}
          subtitle={
            <Text width="300px">{`${item.listing.location.address1 ? `${item.listing.location.address1}, ` : ''} 
            ${item.listing.location.city}, ${item.listing.location.state}`}</Text>
          }
        />
        <Card.Horizontal.Price
          noMargin
          subTitleMargin={0}
          type="h6"
          title={
            <Price
              currency={item.currency}
              price={userType !== 'host' ? item.totalPrice : item.basePrice * item.period * 0.89}
              currencySymbol="$"
              bookingType={item.bookingType}
              size="18px"
            />
          }
        />
        {(item.bookingState === 'pending' || item.bookingState === 'requested') && (
          <Card.Horizontal.ExpireOn
            noMargin
            subTitleMargin={0}
            type="h6"
            title="Expires on"
            subtitle={<Text>{expiryDate}</Text>}
          />
        )}
      </Card.Horizontal.Body>
      <Card.Horizontal.Dropdown alignRight size="sm">
        <Card.Horizontal.Dropdown.Toggle>
          <Text color="primary" fontSize="12px">
            Option
          </Text>
        </Card.Horizontal.Dropdown.Toggle>
        <Card.Horizontal.Dropdown.Menu>
          {item.bookingState === 'approved' &&
            item.paymentState === 'pending' &&
            userType === 'guest' &&
            isAfter(new Date(), expire) && (
              <Card.Horizontal.Dropdown.Item onClick={() => _goToCheckoutPage(item.bookingId)}>
                Continue Booking
              </Card.Horizontal.Dropdown.Item>
            )}
          <Card.Horizontal.Dropdown.Item onClick={() => _bookingDetails(dispatch)(item, userType)}>
            Booking Details
          </Card.Horizontal.Dropdown.Item>
          {item.bookingState === 'requested' && userType === 'host' && (
            <>
              <Card.Horizontal.Dropdown.Item onClick={() => _acceptBooking(item.bookingId)}>
                Accept Booking
              </Card.Horizontal.Dropdown.Item>
              <Card.Horizontal.Dropdown.Item onClick={() => _declineBooking(item.bookingId)}>
                Decline Booking
              </Card.Horizontal.Dropdown.Item>
            </>
          )}
        </Card.Horizontal.Dropdown.Menu>
      </Card.Horizontal.Dropdown>
      <Card.Horizontal.Footer>
        {/* <Card.Horizontal.Tag
          small
          icon={
            <Icon
              width="24px"
              name={_parseCategoryIconName(item.listing.settingsParent.category.otherItemName, false)}
            />
          }
        >
          {item.listing.settingsParent.category.itemName}
        </Card.Horizontal.Tag> */}
        <Card.Horizontal.Tag
          small
          icon={
            <Icon
              width="24px"
              name={_parseCategoryIconName(item.listing.settingsParent.subcategory.otherItemName, true)}
            />
          }
        >
          {item.listing.settingsParent.subcategory.itemName}
        </Card.Horizontal.Tag>
        <Card.Horizontal.OverlayTrigger
          overlay={<Card.Horizontal.ToolTip>{_getTip(item.bookingState, userType)}</Card.Horizontal.ToolTip>}
        >
          <Card.Horizontal.Label bg={item.bookingState} color="white">
            {item.bookingState}
          </Card.Horizontal.Label>
        </Card.Horizontal.OverlayTrigger>
      </Card.Horizontal.Footer>
    </Card.Horizontal>
  )
}

const BookingPage = ({ location, ...props }) => {
  const dispatch = useDispatch()

  const [userType, setUserType] = useState('guest')

  const {
    user: { id }
  } = useSelector(state => state.account.get)

  const {
    isLoading,
    get: { bookings }
  } = useSelector(state => state.account)

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    if (queryParams.get('b') && queryParams.get('a')) {
      dispatch(onAcceptDeclineByEmail(queryParams.get('b'), queryParams.get('a'), id)).then(() => {
        setUserType('host')
        dispatch(onGetBookingsByUser(id, 'host'))
      })
    } else {
      dispatch(onGetBookingsByUser(id))
    }
  }, [dispatch, location, id])

  const _handleChange = type => {
    setUserType(type)
    dispatch(onGetBookingsByUser(id, type))
  }

  if (isLoading) return <Loader text="Loading bookings process" />

  return (
    <>
      <Helmet title="Your Bookings - Spacenow" />
      <Grid column="12">
        <Cell width={6}>
          <Title type="h4" title="Your Bookings" />
        </Cell>
        <Cell width={6} middle justifySelf="end">
          <Dropdown alignRight size="sm" style={{ margin: '30px 0' }}>
            <Dropdown.Toggle size="sm">
              <Text color="primary">User Type</Text>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => _handleChange('guest')}>Guest</Dropdown.Item>
              <Dropdown.Item onClick={() => _handleChange('host')}>Host</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Cell>
      </Grid>
      {!bookings || bookings.count === 0 ? (
        <BackgroundImage text="We didn't find any bookings :(" />
      ) : (
        <Grid columns={1} rowGap="30px">
          {[].concat(bookings.items).map((item, index) => BookingCard(dispatch, item, index, userType, id))}
        </Grid>
      )}
    </>
  )
}

export default BookingPage
