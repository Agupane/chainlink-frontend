import React, { useState } from 'react'
import { ExchangeContexType } from '../utils/types'
import { getEthService } from '../services/ethService'

const defaultValue: ExchangeContexType = {
    oracleContractAddress: '',
    oracleContractBalance: '',
    exchangeRate: 0,
    network: '',
    timestamp: new Date(),
    userAddress: '',
    userBalance: '',
}

export const ExchangeContext = React.createContext({
    ...defaultValue,
    updateExchangeState: () => {},
})

const ExchangeContextProvider = (props: any) => {
    const ethService = getEthService()

    const [exchangeState, setExchangeState] = useState(defaultValue)

    const updateExchangeStateHandler = async () => {
        console.log('Updating state')
        const newStateExchange = {
            ...exchangeState,
            userBalance: await ethService.getCurrentBalance(),
            userAddress: ethService.getUserAddress(),
            exchangeRate: await ethService.getCurrentExchangePrice(),
        }
        setExchangeState(newStateExchange)
    }

    return (
        <ExchangeContext.Provider value={{ ...exchangeState, updateExchangeState: updateExchangeStateHandler }}>
            {props.children}
        </ExchangeContext.Provider>
    )
}

export default ExchangeContextProvider
