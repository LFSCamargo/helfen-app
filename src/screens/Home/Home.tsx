import * as React from 'react'
import { SafeAreaView, TouchableOpacity, Dimensions, Alert, ActivityIndicator } from 'react-native'
import { NavigationInjectedProps } from 'react-navigation'
import ImagePicker from 'react-native-image-picker'
import { connect } from 'react-redux'
import styled from 'styled-components/native'
import { ReduxState } from 'src/redux/reduxDefinitions'
import Header from '../Components/Header'
import Button from '../Components/Button'
import { User } from 'src/sagas/user/get'
import { imageToBase64, imageToTheApi, updateUserImage } from '../../actions/user/imageUpload'

const { width, height } = Dimensions.get('window')

const ScrollView = styled.ScrollView.attrs({
  contentContainerStyle: {
    alignItems: 'center',
  },
})`
  height: ${height - 100};
  width: ${width};
`

const Wrapper = styled(SafeAreaView)`
  flex: 1;
  background-color: white;
`

const DrawerIcon = styled.Image.attrs({
  source: require('../../images/drawer.png'),
})`
  width: 20;
  height: 20;
  transform: rotate(180deg);
`

const EditIcon = styled.Image.attrs({
  source: require('../../images/edit.png'),
})`
  width: 20;
  height: 28;
`

const CallIcon = styled.Image.attrs({
  source: require('../../images/call.png'),
})`
  width: 30;
  height: 30;
  margin-top: 10;
  margin-right: 20;
`

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 20px;
`

const Avatar = styled.View`
  width: 180px;
  height: 180px;
  border-radius: 90px;
  margin: 30px;
  background-color: ${({ theme }) => theme.primary};
  align-items: center;
  justify-content: center;
`

const AvatarInitials = styled.Text`
  color: white;
  font-family: ${({ theme }) => theme.font};
  font-size: 40px;
`

const ProfileImage = styled.Image`
  width: 180px;
  height: 180px;
  border-radius: 90px;
  margin: 30px;
`

const Username = styled.Text`
  font-family: ${({ theme }) => theme.font};
  font-size: 20px;
  margin-top: 10;
  color: black;
  letter-spacing: 3;
`

const CellPhone = styled.Text`
  font-family: ${({ theme }) => theme.font};
  font-size: 22px;
  margin-top: 10;
  color: black;
  letter-spacing: 3;
`

interface Props extends NavigationInjectedProps {
  user: User
  isLoading: boolean
  updateUserPhoto: (image: string, user: User) => void
}

interface State {
  avatarSource: string
  imageChanged: boolean
  imageProcessed: boolean
}

class Home extends React.Component<Props, State> {
  state = {
    avatarSource: '',
    imageChanged: false,
    imageProcessed: false,
  }
  getInitials = (name: string) => {
    return name
      ? name
          .split(' ')
          .slice(0, 2)
          .map((namePart: string) => namePart.charAt(0).toUpperCase())
          .join('')
      : ''
  }

  pickImage = async () => {
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
        avatarSource: data.image,
        imageChanged: true,
      })

      const res = await imageToTheApi(data.image)

      if (res.error) {
        this.setState({
          avatarSource: '',
          imageChanged: false,
          imageProcessed: false,
        })
        return Alert.alert('Erro', res.message)
      }

      this.setState({
        imageProcessed: true,
      })

      this.props.updateUserPhoto(data.image, this.props.user)
    })
  }

  renderLoading = () => {
    const { user } = this.props
    const { imageChanged, imageProcessed } = this.state

    const isLoading = imageChanged && !imageProcessed

    if (isLoading) {
      return <ActivityIndicator color="white" animating={true} />
    }

    return <AvatarInitials>{this.getInitials(user.name)}</AvatarInitials>
  }

  render() {
    const { user } = this.props
    const { avatarSource, imageChanged, imageProcessed } = this.state

    const image = imageChanged && imageProcessed ? avatarSource : user.photo

    const name = user.name.split(' ')[0]
    return (
      <Wrapper>
        <Header
          renderRight={() => (
            <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
              <DrawerIcon />
            </TouchableOpacity>
          )}
          renderLeft={() => (
            <TouchableOpacity>
              <EditIcon />
            </TouchableOpacity>
          )}
          title={`OLA, ${name.toUpperCase()}`}
        />
        <ScrollView>
          <TouchableOpacity onPress={this.pickImage}>
            {!image ? (
              <Avatar>{this.renderLoading()}</Avatar>
            ) : (
              <ProfileImage source={{ uri: image }} />
            )}
          </TouchableOpacity>
          <Username>{user.name.toUpperCase()}</Username>
          <Row>
            <CallIcon />
            <CellPhone>{user.cell}</CellPhone>
          </Row>
          <Button title="Meus Pets" />
          <Button title="Perdi um Pet" />
        </ScrollView>
      </Wrapper>
    )
  }
}

const mapStateToProps = (state: ReduxState) => ({
  user: state.user.user,
  isLoading: state.user.isLoading,
})

const mapDispatchToProps = (dispatch: (fn: any) => void) => ({
  updateUserPhoto: (image: string, user: User) => dispatch(updateUserImage(image, user)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home)
