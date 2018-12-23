import * as React from 'react'
import { SafeAreaView, Platform, TouchableOpacity, Alert } from 'react-native'
import { NavigationInjectedProps } from 'react-navigation'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import ImagePicker from 'react-native-image-picker'
import styled from 'styled-components/native'
import Input from '../Components/Input'
import Button from '../Components/Button'
import { User } from '../../sagas/user/get'
import { imageToBase64 } from '../../actions/user/imageUpload'
import { addLostPet } from '../../actions/pet/addLostPet'

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
  height: 50;
  padding: 10px 20px;
  margin-top: 10;
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

const PhotoButton = styled.TouchableOpacity`
  width: 80;
  height: 80;
  border-radius: 40;
  margin-bottom: 20;
  background-color: ${({ theme }) => theme.primary};
  align-items: center;
  justify-content: center;
`

const SelectedPicture = styled.Image`
  width: 80;
  height: 80;
  border-radius: 40;
  margin-bottom: 20;
`

const PhotoIcon = styled.Image.attrs({
  source: require('../../images/galleryicon.png'),
})`
  width: 30;
  height: 30;
  tint-color: white;
`

interface Props extends NavigationInjectedProps {
  user: User
  getUser: () => void
  isLoading: boolean
  error: string
}
interface State {
  name: string
  address: string
  type: string
  obs: string
  photo: string
}

export default class AddPet extends React.Component<Props, State> {
  state = {
    name: '',
    address: '',
    type: '',
    obs: '',
    photo: '',
  }

  pickImage = () => {
    const options = {
      title: 'Select Avatar',
    }

    ImagePicker.showImagePicker(options, async response => {
      if (response.didCancel) {
        return null
      }

      if (response.error) {
        return Alert.alert('Error', response.error)
      }

      const data = await imageToBase64(response.uri)

      if (data.error) {
        return Alert.alert('Erro', 'Ocorreu um erro durante o processamento da imagem')
      }

      this.setState({
        photo: data.image,
      })
    })
  }

  addPet = async () => {
    const { name, address, type, obs, photo } = this.state

    if (!name || !address || !type || !obs) {
      return Alert.alert('Erro', 'Preencha todos os campos')
    }

    const data = await addLostPet({
      name,
      address,
      type,
      obs,
      photo,
    })

    if (data.error) {
      return Alert.alert('Erro', data.errorMessage)
    }

    this.props.navigation.goBack()
  }

  render() {
    const { name, address, type, obs, photo } = this.state
    return (
      <Wrapper>
        <ScrollView bounces={false}>
          <Row>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <BackIcon />
            </TouchableOpacity>
            <Title>ADICIONAR</Title>
            <TouchableOpacity />
          </Row>
          <InputContainer>
            <Input
              value={name}
              onChangeText={name => this.setState({ name })}
              placeholder="Nome"
              clearButtonMode="while-editing"
            />
            <Input
              value={address}
              onChangeText={address => this.setState({ address })}
              placeholder="Endereço"
              clearButtonMode="while-editing"
            />
            <Input
              value={type}
              onChangeText={type => this.setState({ type })}
              placeholder="Tipo de Animal"
              clearButtonMode="while-editing"
              autoCapitalize="none"
            />
            <Input
              multiline
              value={obs}
              onChangeText={obs => this.setState({ obs })}
              placeholder="Observação"
              clearButtonMode="while-editing"
            />
          </InputContainer>
          {photo ? (
            <TouchableOpacity
              style={{
                shadowOpacity: 0.9,
                shadowColor: 'grey',
                shadowOffset: { width: 1, height: 1 },
                shadowRadius: 5,
              }}
              onPress={this.pickImage}
            >
              <SelectedPicture source={{ uri: photo }} />
            </TouchableOpacity>
          ) : (
            <PhotoButton
              onPress={this.pickImage}
              style={{
                shadowOpacity: 0.9,
                shadowColor: 'rgb(255,63,63)',
                shadowOffset: { width: 1, height: 1 },
                shadowRadius: 5,
              }}
            >
              <PhotoIcon />
            </PhotoButton>
          )}
          <Button onPress={this.addPet} title="Adicionar" />
          <CompanyLogo />
        </ScrollView>
        {Platform.OS === 'ios' && <KeyboardSpacer />}
      </Wrapper>
    )
  }
}
