export interface ExchangeContextType {
    userAddress: string
    userBalance: string
    oracleContractAddress: string
    oracleContractBalance: string
    lastTimeUpdateEvent: PriceUpdatedEventType
}

export interface PriceUpdatedEventType {
    timestamp: Date
    price: number
    lastEventBlock: number
}
