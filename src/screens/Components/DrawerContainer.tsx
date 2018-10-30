import * as React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components/native'
import { NavigationInjectedProps, NavigationActions } from 'react-navigation'
import { User } from 'src/sagas/user/get'
import { ROUTE_NAMES } from '../../config/Router'
import { ReduxState } from 'src/redux/reduxDefinitions'

const Wrapper = styled.View`
  flex: 1;
  background-color: white;
  padding-top: 15;
`

const Row = styled.TouchableOpacity`
  flex-direction: row;
  padding: 10px 15px;
  align-items: center;
`

const MapIcon = styled.Image`
  width: 20;
  height: 25;
`

const HeartIcon = styled.Image`
  width: 25;
  height: 22;
`

const ProfileIcon = styled.Image`
  width: 25;
  height: 25;
  border-radius: ${25 / 2};
`

const Icon = styled.Image.attrs({
  source: require('../../images/house.png'),
})`
  width: 70;
  height: 40;
`

const Bottom = styled.View`
  position: absolute;
  bottom: 10;
  left: 10;
  right: 10;
`

const Title = styled.Text`
  font-family: ${({ theme }) => theme.font};
  font-size: 22;
  letter-spacing: 2;
  border-bottom-width: 1px;
  border-bottom-color: black;
  margin-left: 10px;
`

const CompanyName = styled.Text`
  font-family: ${({ theme }) => theme.font};
  font-size: 18;
  letter-spacing: 2;
  border-bottom-width: 1px;
  border-bottom-color: black;
  margin-left: 15px;
`

interface Props extends NavigationInjectedProps {
  user: User
}

class DrawerContainer extends React.Component<Props> {
  navigateToScreen = (route: string) => {
    this.props.navigation.closeDrawer()
    const navigateAction = NavigationActions.navigate({
      routeName: route,
    })
    this.props.navigation.dispatch(navigateAction)
  }

  render() {
    const { user } = this.props
    return (
      <Wrapper>
        <Row onPress={() => this.navigateToScreen(ROUTE_NAMES.MAP)}>
          <MapIcon source={require('../../images/map.png')} />
          <Title>MAPA</Title>
        </Row>
        <Row onPress={() => this.navigateToScreen(ROUTE_NAMES.HAVE_YOU_SEEN)}>
          <HeartIcon source={require('../../images/heart.png')} />
          <Title>VOCÊ VIU</Title>
        </Row>
        <Row onPress={() => this.navigateToScreen(ROUTE_NAMES.PROFILE)}>
          {!user.photo && <ProfileIcon source={require('../../images/profile.png')} />}
          {user.photo && <ProfileIcon source={{ uri: user.photo }} />}
          <Title>PERFIL</Title>
        </Row>
        <Bottom>
          <Row>
            <Icon />
            <CompanyName>HELFEN PET</CompanyName>
          </Row>
        </Bottom>
      </Wrapper>
    )
  }
}

const mapStateToProps = (state: ReduxState) => ({
  user: state.user.user,
})

export default connect(mapStateToProps)(DrawerContainer)
