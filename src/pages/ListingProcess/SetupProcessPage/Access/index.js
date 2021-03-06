import React, { useEffect } from 'react'
import Helmet from 'react-helmet'
import { withFormik } from 'formik'
import { Wrapper, Box, Title, StepButtons, Select, Text } from 'components'
import { get24HSelect } from '../../../../utils/24HSelect'

const AccessPage = ({ listing, values, handleChange, handleBlur, ...props }) => {
  useEffect(() => {
    props.setFatherValues({ ...values })
  }, [props, values])

  const _handleNext = () => {
    props.setStepCompleted("step6")
    props.history.push(`/listing-process/setup-process/${listing.id}/opening-hours`)
  }

  return (
    <form>
      <Wrapper>
        <Helmet title="Listing Intro - Spacenow - Steps - Access" />
        <Box display="grid" gridGap="30px">
          <Box>
            <Box>
              <Title
                type="h3"
                title="Let your guests book right away"
                subtitle="Allow your guests to book instantly or ask them to send a request first."
                subTitleMargin={10}
              />
            </Box>
            <Box display="grid" gridGap="10px">
              <Box display="grid" gridTemplateColumns={{ _: '1fr', medium: '1fr 1fr 1fr' }} gridGap="30px">
                <Select
                  name="bookingType"
                  label="Select guest booking"
                  value={values.bookingType}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option>Select guest booking</option>
                  <option value={`instant`}>Instantly</option>
                  <option value={`request`}>Request</option>
                  <option value={`enquire`}>Enquiry</option>
                </Select>
              </Box>
              <Box display="grid">
                <Text>TIP: If you want to let a guest book any free date instantly, select the instant option.</Text>
              </Box>
            </Box>
          </Box>

          <Box>
            <Box>
              <Title type="h3" title="What time can guests check-in between?" />
            </Box>
            <Box display="grid">
              <Box display="grid" gridTemplateColumns={{ _: '1fr', medium: '1fr 1fr 1fr' }} gridGap="30px">
                <Select
                  name="listingData.checkInStart"
                  label="From"
                  value={values.listingData.checkInStart}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option>Start:</option>
                  {get24HSelect().map(item => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </Select>
                <Select
                  name="listingData.checkInEnd"
                  label="To"
                  value={values.listingData.checkInEnd}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option>To:</option>
                  {get24HSelect().map(item => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </Select>
              </Box>
            </Box>
          </Box>

          <Box>
            <Box>
              <Title type="h3" title="What time do guests need to check-out?" />
            </Box>
            <Box display="grid">
              <Box display="grid" gridTemplateColumns={{ _: '1fr', medium: '1fr 1fr 1fr' }} gridGap="30px">
                <Select
                  name="listingData.checkOut"
                  label="Check-out"
                  value={values.listingData.checkOut}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option>Check-out:</option>
                  {get24HSelect().map(item => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </Select>
              </Box>
            </Box>
          </Box>

          <Box>
            <Box>
              <Title
                type="h3"
                title="Access information"
                subtitle="Select the way guests will gain access to your space."
                subTitleMargin={10}
              />
            </Box>
            <Box display="grid">
              <Box display="grid" gridTemplateColumns={{ _: '1fr', medium: '1fr 1fr 1fr' }} gridGap="30px">
                <Select
                  name="listingData.accessType"
                  label="Access Type"
                  value={values.listingData.accessType}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value={576}>Swipe Card</option>
                  <option value={577}>Keys</option>
                  <option value={578}>Smart Lock</option>
                  <option value={579}>Person</option>
                  <option value={695}>Receptionist</option>
                  <option value={696}>Pin Code</option>
                  <option value={697}>Host</option>
                  <option value={698}>Secure Code</option>
                </Select>
              </Box>
            </Box>
          </Box>
        </Box>
        <StepButtons
          prev={{
            disabled: false,
            onClick: () => props.history.push(`/listing-process/setup-process/${listing.id}/scene`)
          }}
          next={{
            onClick: _handleNext
          }}
        />
      </Wrapper>
    </form>
  )
}

const formik = {
  displayName: 'SetupProcess_AccessForm',
  mapPropsToValues: ({ listing }) => {
    return {
      ...listing,
      bookingType: listing.bookingType,
      listingData: {
        ...listing.listingData,
        checkInStart: listing.listingData.checkInStart || '',
        checkInEnd: listing.listingData.checkInEnd || '',
        checkOut: listing.listingData.checkOut || '',
        accessType: listing.listingData.accessType || 576
      }
    }
  },
  enableReinitialize: true,
  isInitialValid: true
}

AccessPage.propTypes = {
  ...withFormik.propTypes
}

export default withFormik(formik)(AccessPage)
