import React, { useEffect, useState } from 'react'
import { getEthService } from '../services/ethService'
import { ExchangeContextType } from '../utils/types'
import { POLLING_UPDATE_TIME } from '../utils/constants'

const defaultValue: ExchangeContextType = {
    userAddress: '',
    userBalance: '',
    oracleContractAddress: '',
    oracleContractBalance: '',
    lastTimeUpdateEvent: {
        timestamp: new Date(),
        price: 0,
        lastEventBlock: 0,
    },
}

export const ExchangeContext = React.createContext({
    ...defaultValue,
    updateExchangeState: () => {},
})

const getInitialState = async (): Promise<ExchangeContextType> => {
    const ethService = getEthService()
    const lastTimeUpdateEvent = await ethService.getLastTimePriceUpdated()
    return {
        userAddress: ethService.getUserAddress(),
        userBalance: await ethService.getCurrentBalance(),
        oracleContractAddress: await ethService.getLinkTokenAddress(),
        oracleContractBalance: await ethService.getOracleTokens(),
        lastTimeUpdateEvent: lastTimeUpdateEvent ? lastTimeUpdateEvent : defaultValue.lastTimeUpdateEvent,
    }
}

const ExchangeContextProvider = (props: any) => {
    const ethService = getEthService()
    const [exchangeState, setExchangeState] = useState(defaultValue)

    useEffect(() => {
        getInitialState().then(initialState => {
            setExchangeState(initialState)
        })
    }, [])

    useEffect(() => {
        const ethService = getEthService()
        const timeout = setTimeout(async () => {
            console.log('Updating exchange rate...')
            const { lastTimeUpdateEvent } = exchangeState
            const { lastEventBlock } = lastTimeUpdateEvent
            // The first time will be from block 0 to latest block, the second time from the last block I asked to the lastest block
            const exchangeRate = await ethService.getLastTimePriceUpdated(lastEventBlock)
            const newState = {
                ...exchangeState,
                lastTimeUpdateEvent: exchangeRate ? exchangeRate : exchangeState.lastTimeUpdateEvent,
            }
            setExchangeState(newState)
        }, POLLING_UPDATE_TIME)

        return () => {
            clearTimeout(timeout)
        }
    }, [exchangeState])

    const updateExchangeStateHandler = async () => {
        console.log('Updating state')
        try {
            const updateResult = await ethService.updateOraclePrice()
            console.log('Price updated successfully', updateResult)
        } catch (error) {
            console.error('Error updating price: ', error)
        }
    }

    return (
        <ExchangeContext.Provider value={{ ...exchangeState, updateExchangeState: updateExchangeStateHandler }}>
            {props.children}
        </ExchangeContext.Provider>
    )
}

export default ExchangeContextProvider
