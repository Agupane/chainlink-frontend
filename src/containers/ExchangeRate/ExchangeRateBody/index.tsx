import React, { useContext } from 'react'
import { ExchangeContext } from '../../../context/exchange'
import styled from 'styled-components'
import { Button } from '../../../components/Common/Button'
import moment from 'moment'
import { PriceChart } from '../../../components/Chart'

const ExchangeRateBodyWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 100%;
    flex-grow: 1;
    margin-top: 10px;
`

const Title = styled.h2``

const SubTitle = styled.h3``

const ExchangePrice = styled.h4``

const Date = styled.p``

const Chart = styled.div`
    width: 80%;
    margin-top: 15px;
`

export const ExchangeRateBody = () => {
    const exchangeContext = useContext(ExchangeContext)
    const { lastTimeUpdateEvent } = exchangeContext
    const { price, timestamp } = lastTimeUpdateEvent
    const updateExchangeHandler = () => {
        exchangeContext.updateExchangeState()
    }
    const dateMoment = moment(timestamp)

    return (
        <ExchangeRateBodyWrapper>
            <Title>Exchange rate</Title>
            <SubTitle>USD {'<>'} RUB</SubTitle>
            <ExchangePrice>{price}</ExchangePrice>
            <Date>{dateMoment.format('MM/DD/YYYY HH:mm A')}</Date>
            <Button onClick={updateExchangeHandler} backgroundColor={'#1a73e8'} color={'#ffffff'}>
                Update
            </Button>
            <Chart>
                <PriceChart />
            </Chart>
        </ExchangeRateBodyWrapper>
    )
}
