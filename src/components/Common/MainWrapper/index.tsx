import React from 'react'
import styled from 'styled-components'

const MainWrapperStyled = styled.div`
    display: flex;
    flex-direction: row;
    height: 100%;
    width: 100%;
`

export const MainWrapper = (props: any) => {
    const { children, ...restProps } = props

    return <MainWrapperStyled {...restProps}>{children}</MainWrapperStyled>
}
