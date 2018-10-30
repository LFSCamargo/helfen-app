import * as React from 'react'
import { connect } from 'react-redux'
import { SafeAreaView, Platform, TouchableOpacity, Alert, AsyncStorage } from 'react-native'
import { NavigationInjectedProps, StackActions, NavigationActions } from 'react-navigation'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import styled from 'styled-components/native'
import idx from 'idx'

import signup from '../../actions/user/signup'
import Input from '../Components/Input'
import Button from '../Components/Button'
import { ROUTE_NAMES } from '../../config/Router'
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
  padding: 10px 20px;
`

const InputContainer = styled.View`
  margin-bottom: 30px;
  width: 100%;
`

const BackIcon = styled.Image.attrs({
  source: require('../../images/back.png'),
})`
  width: 20;
  height: 20;
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
  document: string
  cell: string
  name: string
  isLoading: boolean
  formCompleted: boolean
}

class Login extends React.Component<Props, State> {
  state = {
    name: '',
    password: '',
    email: '',
    cell: '',
    document: '',
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

  signup = async () => {
    const { name, password, email, cell, document } = this.state

    if (!name || !password || !email || !cell || !document) {
      return Alert.alert('Erro', 'Os campos são de preenchimento obrigatorio')
    }

    this.setState({
      isLoading: true,
    })

    const data = await signup({ name, password, email, cell, document })

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
    const { email, password, name, cell, document } = this.state
    return (
      <Wrapper>
        <ScrollView bounces={false}>
          <Row>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <BackIcon />
            </TouchableOpacity>
            <Title>CADASTRO</Title>
            <TouchableOpacity />
          </Row>
          <InputContainer>
            <Input
              value={name}
              onChangeText={name => this.setState({ name })}
              placeholder="Nome Completo"
              clearButtonMode="while-editing"
            />
            <Input
              value={password}
              onChangeText={password => this.setState({ password })}
              placeholder="Senha"
              secureTextEntry={true}
              clearButtonMode="while-editing"
            />
            <Input
              value={email}
              onChangeText={email => this.setState({ email })}
              placeholder="Email"
              clearButtonMode="while-editing"
              autoCapitalize="none"
            />
            <Input
              value={cell}
              onChangeText={cell => this.setState({ cell })}
              placeholder="Celular"
              clearButtonMode="while-editing"
            />
            <Input
              value={document}
              onChangeText={document => this.setState({ document })}
              placeholder="CPF ou Passaporte"
              clearButtonMode="while-editing"
            />
          </InputContainer>
          <Button title="Cadastrar" onPress={this.signup} />
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
