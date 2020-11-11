import React from 'react'
import { View, Text } from 'react-native'
import styled from 'styled-components/native'

import { Quote } from './Quote'
import { ButtonComp } from './ButtonComp'



const Container = styled.View`
  flex: 1;
  background-color: papayawhip;
  justify-content: center;
  align-items: center;
  padding: 25px;
`

const App = () => {
  return (
    <Container>
      <View>
        <Quote />
        <ButtonComp />
      </View>
    </Container>

  )
}

export default App
