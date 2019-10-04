import React, { useContext } from 'react'
import { ExchangeContext } from '../../../context/exchange'

export const ExchangeRateTop = () => {
    const exchangeContext = useContext(ExchangeContext)
    const { userBalance, userAddress, network, oracleContractBalance, oracleContractAddress } = exchangeContext
    return (
        <>
            <p>User address: {userAddress}</p>
            <p>Balance: {userBalance} ETH </p>
            <p>Contract address: {oracleContractAddress}</p>
            <p>Link balance: {oracleContractBalance}</p>
            <p>Network: {network}</p>
        </>
    )
}
