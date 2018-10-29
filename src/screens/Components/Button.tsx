import * as React from 'react'
import { TouchableOpacityProps } from 'react-native'
import styled from 'styled-components/native'

const ButtonWrapper = styled.TouchableOpacity`
  padding: 18px 40px;
  align-items: center;
  justify-content: center;
  border-radius: 100px;
  margin: 10px;
  background-color: ${({ theme }) => theme.primary};
`

const ButtonText = styled.Text`
  color: white;
  font-family: ${({ theme }) => theme.font};
  font-size: 20px;
`

interface Props extends TouchableOpacityProps {
  title: string
}

export default class Button extends React.Component<Props> {
  render() {
    return (
      <ButtonWrapper
        {...this.props}
        style={{
          shadowOpacity: 0.9,
          shadowColor: 'rgb(255,63,63)',
          shadowOffset: { width: 1, height: 1 },
          shadowRadius: 5,
        }}
      >
        <ButtonText>{this.props.title}</ButtonText>
      </ButtonWrapper>
    )
  }
}
