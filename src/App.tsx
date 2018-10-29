import * as React from 'react'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { Router } from './config/Router'
import store from './config/Store'

const theme = {
  primary: 'rgb(255,63,63)',
  primaryLighter: 'rgb(237,88, 81)',
  secondary: '#FFFFFF',
  glow: 'rgba(255,63,63,0.5)',
  animation: 'rgba(255,63,63,0.3)',
  font: 'PingFang SC',
}

export default () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Router />
    </ThemeProvider>
  </Provider>
)
