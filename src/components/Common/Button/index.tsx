import React, { HTMLAttributes } from 'react'
import styled from 'styled-components'

interface BtnProps {
    backgroundColor?: string
}

const StyledButton = styled.button<BtnProps>`
    align-items: center;
    border-radius: 4px;
    border: none;
    color: ${props => (props.color ? props.color : '')};
    background-color: ${props => (props.backgroundColor ? props.backgroundColor : '')};
    cursor: pointer;
    display: flex;
    font-size: 16px;
    font-weight: 600;
    justify-content: center;
    line-height: 1.2;
    padding: 15px;
    transition: background-color 0.25s ease-out;
    user-select: none;
    &:focus {
        outline: none;
    }
    &:disabled {
        cursor: default;
        opacity: 0.5;
    }
`

interface Props extends HTMLAttributes<HTMLButtonElement>, BtnProps {
    children: React.ReactNode
}

export const Button = (props: Props) => {
    const { children, ...restProps } = props

    return <StyledButton {...restProps}>{children}</StyledButton>
}
