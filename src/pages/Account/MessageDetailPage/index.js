import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { Title, Grid, Cell, Loader, MessageDetailCard, TextArea, Button, Box, Avatar } from 'components'

import { onGetMessage, onCreateMessageItem, onReadMessage, onGetMessageItems } from 'redux/ducks/message'

const CellStyled = styled(Cell)`
  display: grid;
`

const TopStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  column-gap: 15px;
  align-items: center;
`

const TextName = styled.span`
  font-family: Montserrat-Bold;
  font-size: 18px;
  line-height: 28px;
`

const UserContainer = styled.div`
  line-height: 30px;
  text-align: right;
`

const MessageDetailPage = ({ match, location, history, ...props }) => {
  const dispatch = useDispatch()

  const { user } = useSelector(state => state.account.get)
  const { object: message, isLoading: isMessageLoading } = useSelector(state => state.message.get)
  const { object: messageItems, isLoading: isItemsLoading } = useSelector(state => state.message.getItems)
  const [content, setContent] = useState('')
  const [pageIndex, setPageIndex] = useState(0)
  const [scroller, setScroller] = useState(null)

  const pageSize = 5

  useEffect(() => {
    match && match.params && user && dispatch(onReadMessage(match.params.id, user.id))
    match && match.params && dispatch(onGetMessage(match.params.id))
    match && match.params && dispatch(onGetMessageItems({ id: match.params.id, pageIndex: 0, pageSize }))
  }, [dispatch, match, user])

  const _onSubmit = () => {
    const values = {
      content,
      sentBy: user.id,
      messageId: message.id,
      isRead: 1
    }
    match && match.params && dispatch(onCreateMessageItem(values))
    setContent('')
  }

  const _onchange = e => {
    setContent(e.target.value)
  }

  const _handleKeyDown = e => {
    if (e.key === 'Enter' && content !== '') {
      _onSubmit()
    }
  }

  const _handleScroll = () => {
    if (
      scroller &&
      scroller.scrollTop >= scroller.scrollHeight - 500 &&
      messageItems.rows.length < messageItems.count
    ) {
      dispatch(onGetMessageItems({ id: message.id, pageIndex: pageIndex + 1, pageSize }))
      setPageIndex(pageIndex + 1)
    }
  }

  return (
    <>
      <Grid column={12}>
        <Cell width={6}>
          <Title type="h3" title="Conversation" />
        </Cell>
        <CellStyled width={6}>
          {!isMessageLoading && (
            <>
              <TopStyled>
                <UserContainer>
                  <TextName>
                    {user.id === message.guest.id
                      ? message.host.profile.displayName
                      : message.guest.profile.displayName}
                  </TextName>
                </UserContainer>
                <Avatar
                  small
                  image={user.id === message.guest.id ? message.host.profile.picture : message.guest.profile.picture}
                />
              </TopStyled>
            </>
          )}
        </CellStyled>
      </Grid>

      <Grid column={12}>
        <CellStyled width={1}>
          <Avatar small image={user.profile.picture} />
        </CellStyled>
        <Cell width={11}>
          <TextArea onChange={_onchange} value={content} name="content" onKeyDown={_handleKeyDown} height="100px" />
        </Cell>
      </Grid>
      <Box display="flex" justifyContent="flex-end">
        <Button my="20px" size="sm" onClick={() => _onSubmit()} disabled={!content}>
          Send message
        </Button>
      </Box>

      {isItemsLoading ? (
        <Loader />
      ) : (
        <Box
          overflow="auto"
          gridColumn={3}
          gridRow={2}
          height="500px"
          onScroll={_handleScroll}
          ref={e => setScroller(e)}
        >
          {messageItems && messageItems.rows.map(item => <MessageDetailCard item={item} key={item.id} user={user} />)}
        </Box>
      )}
    </>
  )
}

MessageDetailPage.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
  location: PropTypes.instanceOf(Object).isRequired,
  match: PropTypes.instanceOf(Object).isRequired
}

export default MessageDetailPage
