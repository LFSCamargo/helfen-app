import * as React from 'react'
import { TouchableOpacity, SafeAreaView, Dimensions } from 'react-native'
import styled from 'styled-components/native'
import Header from '../Components/Header'
import { NavigationInjectedProps } from 'react-navigation'

const { width, height } = Dimensions.get('window')

const Wrapper = styled(SafeAreaView)`
  flex: 1;
  background-color: white;
`

const ScrollView = styled.ScrollView`
  height: ${height - 100};
  width: ${width};
`

const DrawerIcon = styled.Image.attrs({
  source: require('../../images/drawer.png'),
})`
  width: 20;
  height: 20;
  transform: rotate(180deg);
`

interface Props extends NavigationInjectedProps {}

class Map extends React.Component<Props> {
  render() {
    return (
      <Wrapper>
        <Header
          renderRight={() => (
            <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
              <DrawerIcon />
            </TouchableOpacity>
          )}
          title="MAP"
        />
        <ScrollView />
      </Wrapper>
    )
  }
}

export default Map
