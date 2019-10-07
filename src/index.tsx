import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import { MainWrapper } from './components/Common/MainWrapper'
import { theme } from './theme'
import { App } from './containers/App'
import ExchangeContextProvider from './context/exchange'
import './assets/styles/index.css'

const NoMatch = () => <div>404 - nothing here!</div>

const WrappedApp = (
    <BrowserRouter>
        <ThemeProvider theme={theme}>
            <ExchangeContextProvider>
                <MainWrapper>
                    <Switch>
                        <Route exact path="/" component={App} />
                        <Route component={NoMatch} />
                    </Switch>
                </MainWrapper>
            </ExchangeContextProvider>
        </ThemeProvider>
    </BrowserRouter>
)

ReactDOM.render(WrappedApp, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
