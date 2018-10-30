import * as React from 'react'
import idx from 'idx'
import { connect } from 'react-redux'
import { NavigationInjectedProps, StackActions, NavigationActions } from 'react-navigation'
import { Animated, AsyncStorage } from 'react-native'
import styled from 'styled-components/native'

import { ROUTE_NAMES } from '../../config/Router'
import { ReduxState } from 'src/redux/reduxDefinitions'
import getUser from '../../actions/user/get'
import { User } from '../../sagas/user/get'

const Wrapper = styled.View`
  flex: 1;
  background-color: white;
  align-items: center;
  justify-content: center;
`

const ImageContainer = styled.View`
  background-color: ${({ theme }) => theme.primary};
  width: 150px;
  height: 150px;
  border-radius: 75px;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`

const AnimationContainer = styled(Animated.View)`
  background-color: ${({ theme }) => theme.animation};
  width: 300px;
  height: 300px;
  border-radius: 150px;
  align-items: center;
  justify-content: center;
  margin-top: -230;
`

const Ripple = styled(Animated.View)`
  background-color: ${({ theme }) => theme.primary};
  width: 220px;
  height: 220px;
  border-radius: 110px;
  align-items: center;
  justify-content: center;
  margin-top: 5;
`

const HouseDog = styled.Image.attrs({
  source: require('../../images/house.png'),
})`
  width: 100px;
  height: 60px;
  tint-color: white;
`

interface State {
  animated: Animated.Value
  opacity: Animated.Value
  animated2: Animated.Value
  opacity2: Animated.Value
}

interface Props extends NavigationInjectedProps {
  getUser: () => void
  user: User
  isLoading: boolean
}

class Splash extends React.Component<Props, State> {
  state = {
    animated: new Animated.Value(0),
    opacity: new Animated.Value(1),
    animated2: new Animated.Value(0),
    opacity2: new Animated.Value(1),
  }
  async componentDidMount() {
    const { animated, opacity, animated2, opacity2 } = this.state
    AsyncStorage.clear()
    Animated.stagger(1000, [
      Animated.loop(
        Animated.parallel([
          Animated.timing(animated, {
            toValue: 1,
            duration: 1000,
          }),
          Animated.timing(opacity, {
            toValue: 0,
            duration: 1000,
          }),
        ]),
      ),
      Animated.loop(
        Animated.parallel([
          Animated.timing(animated2, {
            toValue: 1,
            duration: 1000,
          }),
          Animated.timing(opacity2, {
            toValue: 0,
            duration: 1000,
          }),
        ]),
      ),
    ]).start()

    this.props.getUser()
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.isLoading === false) {
      const hasUser = idx(nextProps, _ => _.user._id)
      if (hasUser) {
        return this.props.navigation.dispatch(
          StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: ROUTE_NAMES.HOME })],
          }),
        )
      }
      return this.props.navigation.dispatch(
        StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: ROUTE_NAMES.LOGIN })],
        }),
      )
    }
  }
  render() {
    const { animated, opacity } = this.state

    return (
      <Wrapper>
        <ImageContainer>
          <HouseDog />
        </ImageContainer>
        <AnimationContainer
          style={{
            opacity,
            transform: [
              {
                scale: animated,
              },
            ],
          }}
        >
          <Ripple />
        </AnimationContainer>
      </Wrapper>
    )
  }
}

const mapStateToProps = (state: ReduxState) => ({
  user: state.user.user,
  isLoading: state.user.isLoading,
})

const mapDispatchToProps = (dispatch: (fn: Function) => void) => ({
  getUser: () => dispatch(getUser()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Splash)
