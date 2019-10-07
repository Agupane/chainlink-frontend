import React, { useContext } from 'react'
import LoadingOverlay from 'react-loading-overlay'
import { ExchangeContext } from '../../../context/exchange'

interface Props {
    children: React.ReactNode
}

export const Spinner = (props: Props) => {
    const exchangeContext = useContext(ExchangeContext)
    const { isLoading } = exchangeContext
    return (
        <LoadingOverlay active={isLoading} spinner text="Updating exchange rate..">
            {props.children}
        </LoadingOverlay>
    )
}
