import * as React from 'react'
import { TextInputAndroidProps, TextInputIOSProps, TextInputProps } from 'react-native'
import styled from 'styled-components/native'

const Wrapper = styled.TextInput.attrs({
  placeholderTextColor: 'grey',
})`
  border: 1px #ddd;
  border-radius: 5;
  padding: 12px 15px;
  margin: 10px 20px;
  font-size: 18;
  font-family: ${({ theme }) => theme.font};
  width: 90%;
  ${({ multiline }) => (multiline ? 'height: 200px' : '')};
`

type InputProps = TextInputAndroidProps & TextInputIOSProps & TextInputProps

interface Props extends InputProps {
  placeholder: string
  value: string
}

class Input extends React.Component<Props> {
  render() {
    return (
      <Wrapper
        {...this.props}
        value={this.props.value}
        placeholder={this.props.placeholder}
        keyboardAppearance="dark"
        underlineColorAndroid="transparent"
      />
    )
  }
}

export default Input
