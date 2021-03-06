import React, { useEffect, useCallback } from 'react'
import Helmet from 'react-helmet'
import { withFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'

import { Box, Wrapper, Title, StepButtons, Photo, Video, Loader } from 'components'

import { onPostMedia, onCleanMedia } from 'redux/ducks/listing-process'
import { cropPicture } from 'utils/images'

const ScenePage = ({ listing, values, setFieldValue, ...props }) => {
  const dispatch = useDispatch()

  const { object: media, isLoading: loadingMedia } = useSelector(state => state.listing_process.media)

  const _handleOnDropMediaPhoto = useCallback(acceptedFiles => {
    const reader = new FileReader()
    // eslint-disable-next-line array-callback-return
    acceptedFiles.map(file => {
      reader.readAsDataURL(file)
      reader.onload = async (event) => {
        dispatch(onPostMedia(listing.id, { file: event.target.result, category: 'photo' }))
      }
    })
  }, [dispatch, listing.id])

  const _handleOnDropMediaFloorplan = useCallback(acceptedFiles => {
    const reader = new FileReader()
    // eslint-disable-next-line array-callback-return
    acceptedFiles.map(file => {
      reader.readAsDataURL(file)
      reader.onload = async (event) => {
        dispatch(onPostMedia(listing.id, { file: event.target.result, category: 'floorplan' }))
      }
    })
  }, [dispatch, listing.id])

  const _handleOnDropMediaVideo = useCallback(acceptedFiles => {
    const reader = new FileReader()
    // eslint-disable-next-line array-callback-return
    acceptedFiles.map(file => {
      reader.readAsDataURL(file)
      reader.onload = async (event) => {
        dispatch(onPostMedia(listing.id, { file: event.target.result, category: 'video' }))
      }
    })
  }, [dispatch, listing.id])

  useEffect(() => {
    props.setFatherValues({ ...values })
  }, [props, values])

  const _handleNext = () => {
    props.setStepCompleted("step4")
    props.history.push(`/listing-process/setup-process/${listing.id}/pricing`)
  }

  useEffect(() => {
    media && setFieldValue('photos', [...values.photos, media])
    media && dispatch(onCleanMedia())
  }, [setFieldValue, media, values, dispatch])

  return (
    <form>
      <Wrapper>
        <Helmet title="Listing Intro - Spacenow - Steps - Scene" />
        {loadingMedia && <Loader text="Uploading Media File" />}
        {!loadingMedia && (
          <>
            <Box>
              <Title
                type="h3"
                title="Photos*"
                subtitle="Photos help guests imagine using your space. You can start with one and add more after you publish."
              />
              <Box display="grid" gridTemplateColumns={{ _: 'repeat(auto-fit, minmax(160px, 1fr))' }} gridGap="20px">
                {[
                  ...Array(6 - values.photos.filter(media => media.type !== 'video/mp4' && media.category === 'photo').length).concat(
                    values.photos.filter(media => media.type !== 'video/mp4' && media.category === 'photo')
                  )
                ]
                  .reverse()
                  .map((photo, index) => (
                    <Photo
                      key={`photo-${index}`}
                      onDrop={_handleOnDropMediaPhoto}
                      url={photo ? cropPicture(photo.name) : null}
                      isCover={photo ? photo.isCover : false}
                    // onCover={_handleSetCoverPhoto(photo ? photo.id : '')}
                    // onDelete={_handleDeletePhoto(photo ? photo.id : '')}
                    />
                  ))}
              </Box>
              <p>
                TIP: Take photos in landscape mode to capture as much of your space as possible. Shoot from corners to
                add perspective. Spaces look best in natural light. Include all areas your guest can access.
              </p>
            </Box>
            <Box>
              <Title
                type="h3"
                title="Floor plan*"
                subtitle="Floor plans help guest imagine the full size of your space."
              />
              <Box width={160}>
                {[
                  ...Array(1 - values.photos.filter(media => media.type !== 'video/mp4' && media.category === 'floorplan').length).concat(
                    values.photos.filter(media => media.type !== 'video/mp4' && media.category === 'floorplan')
                  )
                ].map((photo, index) => (
                  <Photo
                    key={`floorplan-${index}`}
                    onDrop={_handleOnDropMediaFloorplan}
                    url={photo ? cropPicture(photo.name) : null}
                  // onDelete={_handleDeleteVideo(listing.video ? listing.video.id : '')}
                  />
                ))}
              </Box>
            </Box>
            <Box>
              <Title
                type="h3"
                title="Video*"
                subtitle="Videos help guests see more of the space and make it easier for them to get a better understanding of it."
              />
              <Box width={160}>
                {[
                  ...Array(1 - values.photos.filter(media => media.type === 'video/mp4').length).concat(
                    values.photos.filter(media => media.type === 'video/mp4')
                  )
                ].map((video, index) => (
                  <Video
                    key={`video-${index}`}
                    onDrop={_handleOnDropMediaVideo}
                    url={video ? video.name : null}
                  // onDelete={_handleDeleteVideo(listing.video ? listing.video.id : '')}
                  />
                ))}
              </Box>
            </Box>
            <StepButtons
              prev={{
                disabled: false,
                onClick: () => props.history.push(`/listing-process/setup-process/${listing.id}/details`)
              }}
              next={{
                onClick: _handleNext
              }}
            />
          </>
        )}
      </Wrapper>
    </form>
  )
}

const formik = {
  displayName: 'SetupProcess_SceneForm',
  mapPropsToValues: ({ listing }) => {
    return {
      ...listing,
      photos: listing.photos || []
    }
  },
  enableReinitialize: true,
  isInitialValid: true
}

ScenePage.propTypes = {
  ...withFormik.propTypes
}

export default withFormik(formik)(ScenePage)
