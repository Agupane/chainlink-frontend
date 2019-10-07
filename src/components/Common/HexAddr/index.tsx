import React from 'react'

const shrinkString = (value: string, start: number, end: number) => {
    const matcher = new RegExp(`(?:(0?x?[a-f0-9]{${start}})).*([a-f0-9]{${end}})`, 'i')
    // @ts-ignore
    const [, ...matches] = value.match(matcher)
    return matches.join('...')
}

interface Props {
    start?: number
    end?: number
    children: React.ReactNode
}

export const HexAddr = (props: Props) => {
    const { children } = props
    let { start, end } = props
    start = start ? start : 5
    end = end ? end : 5
    return typeof children === 'string' && children.length > 0 ? (
        <>{shrinkString(children, start, end)}</>
    ) : (
        <>{children}</>
    )
}
