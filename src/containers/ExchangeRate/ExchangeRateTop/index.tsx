import React, { useContext } from 'react'
import { ExchangeContext } from '../../../context/exchange'
import styled from 'styled-components'
import { HexAddr } from '../../../components/Common/HexAddr'
import ReactTooltip from 'react-tooltip'
import { CopyText } from '../../../components/Common/CopyText'

const ExchangeRateTopWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    max-width: 300px;
`

const UserBalance = styled.span`
    color: grey;
`

const ContractAddress = styled.span`
    color: red;
    flex-grow: 1;
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
                <UserBalance>Balance (ETH):</UserBalance> {userBalance}
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
