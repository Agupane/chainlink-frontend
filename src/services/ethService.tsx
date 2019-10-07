import Web3 from 'web3'
import { Account } from 'web3/eth/accounts'
import ChainlinkContract from '../utils/abis/ChainlinkConsumer.json'
import ERC20Contract from '../utils/abis/ERC20.json'
import { CLIENT_PK, ORACLE_ADDRESS, RPC_URL } from '../utils/constants'
import { tokenAmountInUnits } from '../utils/tokens'
import { EventLog } from 'web3/types'
import { PriceUpdatedEventType } from '../utils/types'

export class EthService {
    private web3: Web3
    private oracleContract: any
    private erc20Contract: any
    private account: Account
    constructor() {
        this.web3 = new Web3(new Web3.providers.HttpProvider(RPC_URL))
        this.oracleContract = new this.web3.eth.Contract(ChainlinkContract, ORACLE_ADDRESS)
        this.account = this.web3.eth.accounts.wallet.add(CLIENT_PK)
    }

    getCurrentBalance = async (): Promise<string> => {
        let balance = await this.web3.eth.getBalance(this.account.address)
        balance = this.web3.utils.fromWei(balance)
        return balance
    }

    getUserAddress = (): string => {
        return this.account.address
    }

    getLinkTokenAddress = async (): Promise<any> => {
        return await this.oracleContract.methods.getChainlinkToken().call()
    }

    getCurrentExchangePrice = async (): Promise<number> => {
        const exchangePrice = await this.oracleContract.methods.currentPrice().call()
        return tokenAmountInUnits(exchangePrice, 2)
    }

    generateErc20Contract = async () => {
        const erc20Add = await this.getLinkTokenAddress()
        this.erc20Contract = new this.web3.eth.Contract(ERC20Contract, erc20Add)
    }

    getOracleTokens = async (): Promise<any> => {
        if (!this.erc20Contract) {
            await this.generateErc20Contract()
        }
        const balance = await this.erc20Contract.methods.balanceOf(ORACLE_ADDRESS).call()
        return tokenAmountInUnits(balance, 18)
    }

    updateOraclePrice = async (): Promise<any> => {
        const { address } = this.account
        const gasLimit = await this.oracleContract.methods.requestPrice().estimateGas({
            from: address,
        })
        return this.oracleContract.methods.requestPrice().send({
            from: address,
            gas: gasLimit,
        })
    }

    getLastTimePriceUpdated = async (startBlock: number = 0): Promise<PriceUpdatedEventType | null> => {
        const currentLastBlock = await this.web3.eth.getBlockNumber()
        console.log(`Getting last time price update events from: ${startBlock} to ${currentLastBlock}`)
        const lastPriceUpdatedEvents: EventLog[] = await this.oracleContract.getPastEvents('PriceUpdated', {
            fromBlock: startBlock,
            toBlock: currentLastBlock,
        })
        const lastEvent = lastPriceUpdatedEvents.slice(-1)[0]
        if (lastEvent) {
            const price = tokenAmountInUnits(lastEvent.returnValues.price, 2)
            return {
                lastEventBlock: currentLastBlock,
                price,
                timestamp: new Date(lastEvent.returnValues.timestamp * 1000),
            }
        }
        return null
    }
}

let ethServiceInstance: EthService
export const getEthService = (): EthService => {
    if (!ethServiceInstance) {
        ethServiceInstance = new EthService()
    }

    return ethServiceInstance
}
