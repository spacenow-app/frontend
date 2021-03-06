import React, { useEffect } from 'react'
import Helmet from 'react-helmet'
import { withFormik } from 'formik'
import { Wrapper, Box, Title, StepButtons, Select, Input, Icon, Text } from 'components'

const PricingPage = ({ listing, values, handleChange, handleBlur, ...props }) => {
  useEffect(() => {
    props.setFatherValues({ ...values })
  }, [props, values])

  const _handleNext = () => {
    props.setStepCompleted("step5")
    props.history.push(`/listing-process/setup-process/${listing.id}/access`)
  }

  return (
    <form>
      <Wrapper>
        <Helmet title="Listing Intro - Spacenow - Steps - Pricing" />
        <Box display="grid" gridGap="30px">
          <Box>
            <Title
              type="h3"
              title="Let your guests book right away"
              subtitle="Allow your guests to book instantly or ask them to send a request first."
              subTitleMargin={10}
            />
          </Box>
          <Box display="grid" gridGap="30px">
            <Box>
              <Box borderBottom="1px solid #CBCBCB">
                <Icon name="category-venue" width="44px" />
                <Text verticalAlign="bottom">Event space</Text>
              </Box>
            </Box>
            <Box display="grid" gridTemplateColumns={{ _: '1fr', medium: 'auto auto auto auto' }} gridGap="30px">
              <Input
                placeholder="$"
                label="Hourly rate"
                type="number"
                name="listingData.basePrice"
                value={values.listingData.basePrice}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Select
                label="Minimum hours"
                name="listingData.minTerm"
                value={values.listingData.minTerm}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value={1}>1 hour</option>
                <option value={2}>2 hours</option>
                <option value={3}>3 hours</option>
                <option value={4}>4 hours</option>
              </Select>
              <Input
                placeholder="$"
                label="Full day rate"
                type="number"
                name="listingData.maxPrice"
                value={values.listingData.maxPrice}
                onChange={handleChange}
                onBlur={handleBlur}
              />
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
        </Box>
      </Wrapper>
    </form>
  )
}

const formik = {
  displayName: 'SetupProcess_PricingForm',
  mapPropsToValues: ({ listing }) => {
    return {
      ...listing,
      listingData: {
        ...listing.listingData,
        minTerm: listing.listingData.minTerm || 1,
        basePrice: listing.listingData.basePrice || 0,
        maxPrice: listing.listingData.maxPrice || 0,
      }
    }
  },
  enableReinitialize: true,
  isInitialValid: true
}

PricingPage.propTypes = {
  ...withFormik.propTypes
}

export default withFormik(formik)(PricingPage)
