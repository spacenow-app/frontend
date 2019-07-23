import { gql } from 'apollo-boost'

import { getClientWithAuth } from 'graphql/apolloClient'
import errToMsg from 'utils/errToMsg'

// Actions
export const Types = {
  CREATE_LISTING_START: 'CREATE_LISTING_START',
  CREATE_LISTING_SUCCESS: 'CREATE_LISTING_SUCCESS',
  CREATE_LISTING_ERROR: 'CREATE_LISTING_ERROR'
}

// Initial State
const initialState = {
  isLoading: false,
  error: {
    message: null
  },
  get: {
    listing: null
  }
}

// GraphQL
const mutationCreate = gql`
  mutation createOrUpdateListing(
    $locationId: Int!
    $listSettingsParentId: Int!
  )
  {
    createOrUpdateListing(
      locationId: $locationId
      listSettingsParentId: $listSettingsParentId
    ) {
      status
    }
  }
`

// const mutationUpdate = gql`
//   mutation createOrUpdateListing(
//     $userId: String!
//     $locationId: Int!
//     $listSettingsParentId: Int!
//     $listingId: Int!
//     $title: String
//     $accessType: String
//     $bookingNoticeTime: String
//     $minTerm: Float
//     $maxTerm: Float
//     $description: String
//     $basePrice: Float
//     $currency: String
//     $isAbsorvedFee: Boolean
//     $capacity: Int
//     $size: Int
//     $meetingRooms: Int
//     $isFurnished: Boolean
//     $carSpace: Int
//     $sizeOfVehicle: String
//     $maxEntranceHeight: String
//     $spaceType: String
//     $bookingType: String
//     $listingAmenities: [Int]
//     $listingAccessDays: ListingAccessDaysInput
//     $listingExceptionDates: [String]
//     $listingRules: [Int]
//   ) {
//     createOrUpdateListing(
//       userId: $userId
//       locationId: $locationId
//       listSettingsParentId: $listSettingsParentId
//       listingId: $listingId
//       title: $title
//       accessType: $accessType
//       bookingNoticeTime: $bookingNoticeTime
//       minTerm: $minTerm
//       maxTerm: $maxTerm
//       description: $description
//       basePrice: $basePrice
//       currency: $currency
//       isAbsorvedFee: $isAbsorvedFee
//       capacity: $capacity
//       size: $size
//       meetingRooms: $meetingRooms
//       isFurnished: $isFurnished
//       carSpace: $carSpace
//       sizeOfVehicle: $sizeOfVehicle
//       maxEntranceHeight: $maxEntranceHeight
//       spaceType: $spaceType
//       bookingType: $bookingType
//       listingAmenities: $listingAmenities
//       listingAccessDays: $listingAccessDays
//       listingExceptionDates: $listingExceptionDates
//       listingRules: $listingRules
//     ) {
//       status
//     }
//   }
// `

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.CREATE_LISTING_START: {
      return {
        ...state,
        isLoading: true
      }
    }
    case Types.CREATE_LISTING_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        get: {
          listing: action.payload
        }
      }
    }
    case Types.CREATE_LISTING_ERROR: {
      return {
        ...state,
        isLoading: false,
        get: {
          listing: null
        },
        error: {
          message: action.payload
        }
      }
    }
    default:
      return state
  }
}

// Action Creators
const createOrUpdateStart = () => ({ type: Types.CREATE_LISTING_START })

const createOrUpdateSuccess = listing => ({ type: Types.CREATE_LISTING_SUCCESS, payload: listing })

const createOrUpdateFailed = error => ({ type: Types.CREATE_LISTING_ERROR, payload: error })

// Side Effects
export const onCreate = (locationId, listSettingsParentId) => async dispatch => {
  dispatch(createOrUpdateStart())
  try {
    const { data } = await getClientWithAuth().mutate({
      mutation: mutationCreate,
      variables: {
        locationId,
        listSettingsParentId
      }
    })
    dispatch(createOrUpdateSuccess(data))
  } catch (err) {
    dispatch(createOrUpdateFailed(errToMsg(err)))
  }
}
