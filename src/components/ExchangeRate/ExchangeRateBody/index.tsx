import React, { useContext } from 'react'
import { ExchangeContext } from '../../../context/exchange'

export const ExchangeRateBody = () => {
    const exchangeContext = useContext(ExchangeContext)
    const { lastTimeUpdateEvent } = exchangeContext
    const { price, timestamp } = lastTimeUpdateEvent
    const updateExchangeHandler = () => {
        console.log('Updating value')
        exchangeContext.updateExchangeState()
    }
    return (
        <>
            <h1>Exchange rate</h1>
            <h2>USD {'<>'} RUB</h2>
            <h3>{price}</h3>
            <p>{timestamp.toDateString()}</p>
            <button onClick={updateExchangeHandler}>Update</button>
        </>
    )
}
