import React, { useContext } from 'react'
import { ExchangeContext } from '../../../context/exchange'
import styled from 'styled-components'
import { Button } from '../../Common/Button'

const ExchangeRateBodyWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Title = styled.h2``

const SubTitle = styled.h3``

const ExchangePrice = styled.h4``

const Date = styled.p``

export const ExchangeRateBody = () => {
    const exchangeContext = useContext(ExchangeContext)
    const { lastTimeUpdateEvent } = exchangeContext
    const { price, timestamp } = lastTimeUpdateEvent
    const updateExchangeHandler = () => {
        console.log('Updating value')
        exchangeContext.updateExchangeState()
    }
    return (
        <ExchangeRateBodyWrapper>
            <Title>Exchange rate</Title>
            <SubTitle>USD {'<>'} RUB</SubTitle>
            <ExchangePrice>{price}</ExchangePrice>
            <Date>{timestamp.toDateString()}</Date>
            <Button onClick={updateExchangeHandler} backgroundColor={'#1a73e8'} color={'#ffffff'}>
                Update
            </Button>
        </ExchangeRateBodyWrapper>
    )
}
