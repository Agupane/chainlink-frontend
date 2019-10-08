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
    isLoading: true,
    allEvents: [],
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
        oracleContractAddress: await ethService.getConsumerContractAddress(),
        oracleContractBalance: await ethService.getOracleTokens(),
        lastTimeUpdateEvent: lastTimeUpdateEvent ? lastTimeUpdateEvent : defaultValue.lastTimeUpdateEvent,
        isLoading: false,
        allEvents: await ethService.getHistoricPrices(),
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
            let showSpinnerLoading = exchangeState.isLoading
            if (exchangeRate && exchangeState.isLoading) {
                // If we got an update on the price and the spinner is loading, disables it
                showSpinnerLoading = false
            }
            const allEvents = exchangeState.allEvents
            if (exchangeRate) {
                allEvents.push(exchangeRate)
            }
            const newState = {
                ...exchangeState,
                userBalance: await ethService.getCurrentBalance(),
                oracleContractBalance: await ethService.getOracleTokens(),
                lastTimeUpdateEvent: exchangeRate ? exchangeRate : exchangeState.lastTimeUpdateEvent,
                isLoading: showSpinnerLoading,
                allEvents,
            }
            setExchangeState(newState)
        }, POLLING_UPDATE_TIME)

        return () => {
            clearTimeout(timeout)
        }
    }, [exchangeState])

    const updateExchangeStateHandler = async () => {
        console.log('Updating exchange state...')
        try {
            setLoadingState(true)
            const updateResult = await ethService.updateOraclePrice()
            console.log('Price updated successfully', updateResult)
        } catch (error) {
            console.error('Error updating price: ', error)
            setLoadingState(false)
        }
    }

    const setLoadingState = (loading: boolean) => {
        console.log('Updating loading state: ', loading)
        setExchangeState({
            ...exchangeState,
            isLoading: loading,
        })
    }

    return (
        <ExchangeContext.Provider value={{ ...exchangeState, updateExchangeState: updateExchangeStateHandler }}>
            {props.children}
        </ExchangeContext.Provider>
    )
}

export default ExchangeContextProvider
