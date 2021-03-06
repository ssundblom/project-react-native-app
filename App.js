import React, { useState, useEffect } from 'react'
import { Animated, TouchableWithoutFeedback, Vibration } from 'react-native'
import styled from 'styled-components/native'

import { Quote } from './Quote'

const Main = styled.View`
  height: 100%;
  align-items: center;
  background-color: #C76F7D;
`

const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 25px;
`

const ButtonText = styled.Text`
  color: #F8CCC4;
  font-size: 30px;
  text-align: center;
`
const DateText = styled.Text`
  position: absolute;
  font-size: 40px;
  color: #ad5766;
  z-index: 1;
  margin-top: 10%;
`


const App = () => {
  const [mantraFade, setMantraFade] = useState(new Animated.Value(0))
  const [buttonFade, setButtonFade] = useState(new Animated.Value(1))
  const [quotes, setQuotes] = useState([])
  const [activeQuote, setActiveQuote] = useState()
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [buttonText, setButtonText] = useState("Take a Deep Breath Then Tap Here for Today's Mantra")

  const getRandomQuote = (array) => {
    return array[Math.floor(Math.random() * (array.length - 1))].text
  }

  const updateQuote = () => {
    if (buttonDisabled) {
      return
    }

    setButtonDisabled(true)
    Vibration.vibrate()

    Animated.timing(buttonFade, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true
    }).start(() => {

      setButtonText('')

      const randomQuote = getRandomQuote(quotes)
      setActiveQuote(randomQuote)

      Animated.timing(mantraFade, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true
      }).start(() => {
        setButtonDisabled(false) 
      })
    })
  }

  useEffect(() => {
    fetch("https://type.fit/api/quotes")
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        const filteredData = data.filter(quote => {
          return quote.author !== null && quote.author !== 'Donald Trump'
        })
        setQuotes(filteredData)
      })
  }, [])

  return (
    <Main>
      <DateText>{new Date().toLocaleDateString("en-US", { day: "numeric", month: "short", weekday: "long" })}</DateText>

      <Container>

        <Animated.View style={[{ opacity: mantraFade }]}>
            <Quote quote={activeQuote} updateQuote={updateQuote} />
        </Animated.View>

        <Animated.View style={[{ opacity: buttonFade }]}>

          <TouchableWithoutFeedback onPress={updateQuote}>
            <ButtonText>{buttonText}</ButtonText>
          </TouchableWithoutFeedback >

        </Animated.View>

      </Container>
    </Main>
  )
}

export default App
