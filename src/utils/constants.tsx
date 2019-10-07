export const CLIENT_PK: string = process.env.REACT_APP_CLIENT_PK || ''
export const ORACLE_ADDRESS: string = process.env.REACT_APP_CONTRACT_ADD || '0xAF4FAa122786312C249959b879D3247A0b28F0C0'
export const NETWORK_ID: string = process.env.REACT_APP_NETWORK_ID || '42'
export const RPC_URL: string =
    process.env.REACT_APP_RPC_URL || 'https://kovan.infura.io/v3/a0cd7db23c5944589e8577229f00e83a'
export const POLLING_UPDATE_TIME: number = process.env.POLLING_UPDATE_TIME
    ? parseInt(process.env.POLLING_UPDATE_TIME)
    : 1000 * 5 // 5 seconds
