import * as React from 'react'
import { connect } from 'react-redux'
import { SafeAreaView, Platform, Alert, AsyncStorage } from 'react-native'
import { NavigationInjectedProps, StackActions, NavigationActions } from 'react-navigation'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import styled from 'styled-components/native'
import idx from 'idx'

import Input from '../Components/Input'
import Button from '../Components/Button'
import { ROUTE_NAMES } from '../../config/Router'
import login from '../../actions/user/login'
import getUser from '../../actions/user/get'
import { ReduxState } from '../../redux/reduxDefinitions'
import { User } from '../../sagas/user/get'

const Wrapper = styled(SafeAreaView)`
  flex: 1;
  background-color: white;
`

const ScrollView = styled.ScrollView.attrs({
  contentContainerStyle: {
    alignItems: 'center',
  },
})``

const CompanyName = styled.Text`
  font-family: ${({ theme }) => theme.font};
  font-size: 22;
  letter-spacing: 2;
  border-bottom-width: 1px;
  border-bottom-color: black;
  margin-top: 50px;
`

const Underline = styled.View`
  width: 20px;
  height: 2px;
  background-color: grey;
  margin-bottom: 50px;
`

const InputContainer = styled.View`
  margin-bottom: 30px;
  width: 100%;
`

const CompanyLogo = styled.Image.attrs({
  source: require('../../images/house.png'),
})`
  width: 50;
  height: 30;
  margin: 40px 0px;
`

interface Props extends NavigationInjectedProps {
  user: User
  getUser: () => void
  isLoading: boolean
  error: string
}
interface State {
  email: string
  password: string
  isLoading: boolean
  formCompleted: boolean
}

class Login extends React.Component<Props, State> {
  state = {
    email: '',
    password: '',
    isLoading: false,
    formCompleted: false,
  }

  componentWillReceiveProps(nextProps: Props) {
    const { formCompleted } = this.state
    if (!nextProps.isLoading && formCompleted) {
      if (nextProps.error) {
        return Alert.alert('Error', nextProps.error)
      }
      return this.props.navigation.dispatch(
        StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: ROUTE_NAMES.HOME })],
        }),
      )
    }
  }

  login = async () => {
    const { email, password } = this.state

    if (!email || !password) {
      return Alert.alert('Erro', 'Preencha todos os campos')
    }

    this.setState({
      isLoading: true,
    })

    const data = await login({ email, password })

    if (data.error) {
      this.setState({
        isLoading: false,
      })
      return Alert.alert('Error', data.errorMessage)
    }

    const token = idx(data, _ => _.token) || ''

    console.log(token)

    AsyncStorage.setItem('token', token)

    this.props.getUser()

    this.setState({
      isLoading: false,
      formCompleted: true,
    })
  }

  render() {
    const { email, password } = this.state
    return (
      <Wrapper>
        <ScrollView bounces={false}>
          <CompanyName>HELFEN</CompanyName>
          <Underline />
          <InputContainer>
            <Input
              value={email}
              onChangeText={email => this.setState({ email })}
              placeholder="Email"
              clearButtonMode="while-editing"
              autoCapitalize="none"
            />
            <Input
              value={password}
              onChangeText={password => this.setState({ password })}
              placeholder="Senha"
              secureTextEntry={true}
              clearButtonMode="while-editing"
            />
          </InputContainer>
          <Button title="Login" onPress={this.login} />
          <Button
            title="Cadastro"
            onPress={() => this.props.navigation.navigate(ROUTE_NAMES.SIGNUP)}
          />
          <CompanyLogo />
        </ScrollView>
        {Platform.OS === 'ios' && <KeyboardSpacer />}
      </Wrapper>
    )
  }
}

const mapStateToProps = (state: ReduxState) => ({
  user: state.user.user,
  isLoading: state.user.isLoading,
  error: state.user.error,
})

const mapDispatchToProps = (dispatch: any) => ({
  getUser: () => dispatch(getUser()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login)
