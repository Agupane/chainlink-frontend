import React from 'react'
import styled from 'styled-components'
const MainWrapperStyled = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
    line-height: 25%;
`
export const MainWrapper = (props: any) => {
    const { children, ...restProps } = props

    return <MainWrapperStyled {...restProps}>{children}</MainWrapperStyled>
}
