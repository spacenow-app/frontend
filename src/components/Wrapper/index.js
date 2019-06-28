import React from 'react'
import { Container } from 'react-bootstrap'
import styled from 'styled-components'

const ContainerStyled = styled(Container)`
  &&& {
    padding-right: 50px;
  }
`

const Wrapper = ({ children }) => {
  return <ContainerStyled>{children}</ContainerStyled>
}

export default Wrapper
