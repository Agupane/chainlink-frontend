export const tokenAmountInUnits = (amount: number, decimals: number = 18, toFixedDecimals = 2): number => {
    return amount / Math.pow(10, decimals)
}
