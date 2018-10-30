import * as React from 'react'
import { View } from 'react-native'
import styled from 'styled-components/native'

const Title = styled.Text`
  font-family: ${({ theme }) => theme.font};
  font-size: 22;
  letter-spacing: 2;
  border-bottom-width: 1px;
  border-bottom-color: black;
`

const Row = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 50;
  padding: 10px 20px;
  margin-top: 10;
`

interface Props {
  renderRight?: () => React.ReactNode
  title: string
  renderLeft?: () => React.ReactNode
}

const Header = ({ title, renderRight, renderLeft }: Props) => (
  <Row>
    {renderRight ? renderRight() : <View />}
    <Title>{title}</Title>
    {renderLeft ? renderLeft() : <View />}
  </Row>
)

export default Header
