import * as React from 'react'
import { SafeAreaView, TouchableOpacity, Dimensions, Alert } from 'react-native'
import ImagePicker from 'react-native-image-picker'
import { connect } from 'react-redux'
import styled from 'styled-components/native'
import { ReduxState } from 'src/redux/reduxDefinitions'
import Header from '../Components/Header'
import Button from '../Components/Button'
import { User } from 'src/sagas/user/get'

const { width, height } = Dimensions.get('window')

const ScrollView = styled.ScrollView.attrs({
  contentContainerStyle: {
    alignItems: 'center',
  },
})`
  height: ${height - 120};
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

interface Props {
  user: User
  isLoading: boolean
}

interface State {
  avatarSource: string
}

class Home extends React.Component<Props, State> {
  state = {
    avatarSource: '',
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

  pickImage = () => {
    const options = {
      title: 'Select Avatar',
    }

    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        return null
      }
      if (response.error) {
        return Alert.alert('Error', response.error)
      }

      this.setState({ avatarSource: response.uri })
    })
  }

  render() {
    const { user } = this.props

    const name = user.name.split(' ')[0]
    return (
      <Wrapper>
        <Header
          renderRight={() => (
            <TouchableOpacity>
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
            <Avatar>
              <AvatarInitials>{this.getInitials(user.name)}</AvatarInitials>
            </Avatar>
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

export default connect(mapStateToProps)(Home)
