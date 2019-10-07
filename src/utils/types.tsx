export interface ExchangeContextType {
    userAddress: string
    userBalance: string
    oracleContractAddress: string
    oracleContractBalance: string
    lastTimeUpdateEvent: PriceUpdatedEventType
    isLoading: boolean
    allEvents: PriceUpdatedEventType[]
}

export interface PriceUpdatedEventType {
    timestamp: Date
    price: number
    lastEventBlock: number
}
