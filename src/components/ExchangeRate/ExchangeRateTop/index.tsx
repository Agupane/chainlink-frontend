import React, { useContext } from 'react'
import { ExchangeContext } from '../../../context/exchange'
import styled from 'styled-components'
import { HexAddr } from '../../Common/HexAddr'
import ReactTooltip from 'react-tooltip'
import { CopyText } from '../../Common/CopyText'

const ExchangeRateTopWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 10px;
`

const UserBalance = styled.span`
    color: grey;
`

const ContractAddress = styled.span`
    color: red;
`

const LinkBalance = styled.span`
    color: red;
`

export const ExchangeRateTop = () => {
    const exchangeContext = useContext(ExchangeContext)
    const { userBalance, userAddress, oracleContractBalance, oracleContractAddress } = exchangeContext
    return (
        <ExchangeRateTopWrapper>
            <p data-tip={userAddress}>
                <strong>User address: </strong>
                <HexAddr>{userAddress}</HexAddr>
                <CopyText value={userAddress} canCopy={true} />
            </p>
            <p>
                <UserBalance>Balance:</UserBalance> {userBalance}
            </p>
            <p data-tip={oracleContractAddress}>
                <ContractAddress>Contract address: </ContractAddress>
                <HexAddr>{oracleContractAddress}</HexAddr>
                <CopyText value={oracleContractAddress} canCopy={true} />
            </p>
            <p>
                <LinkBalance>Link balance: </LinkBalance>
                {oracleContractBalance}
            </p>
            <p>
                <strong>Network:</strong> Kovan
            </p>
            <ReactTooltip />
        </ExchangeRateTopWrapper>
    )
}
