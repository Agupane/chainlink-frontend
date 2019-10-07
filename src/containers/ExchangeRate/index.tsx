import React from 'react'
import { ExchangeRateTop } from './ExchangeRateTop'
import { ExchangeRateBody } from './ExchangeRateBody'
import styled from 'styled-components'

const ExchangeRateWrapper = styled.div`
    display: flex;
    flex-grow: 1;
    flex-flow: column;
`

export const ExchangeRate = () => (
    <ExchangeRateWrapper>
        <ExchangeRateTop />
        <ExchangeRateBody />
    </ExchangeRateWrapper>
)
