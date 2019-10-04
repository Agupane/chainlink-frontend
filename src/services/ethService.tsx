import Web3 from 'web3'
import { Account } from 'web3/eth/accounts'
import ChainlinkContract from '../utils/abis/ChainlinkConsumer.json'
import ERC20Contract from '../utils/abis/ERC20.json'
import { CLIENT_PK, ORACLE_ADDRESS, RPC_URL } from '../utils/constants'

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
        return await this.web3.eth.getBalance('0x0dc0dfD22C6Beab74672EADE5F9Be5234AAa43cC')
    }

    getUserAddress = (): string => {
        return this.account.address
    }

    getLinkTokenAddress = async (): Promise<any> => {
        return await this.oracleContract.methods.getChainlinkToken().call()
    }

    getCurrentExchangePrice = async (): Promise<number> => {
        return await this.oracleContract.methods.currentPrice().call()
    }

    generateErc20Contract = async () => {
        const erc20Add = await this.getLinkTokenAddress()
        this.erc20Contract = new this.web3.eth.Contract(ERC20Contract, erc20Add)
    }

    getOracleTokens = async (): Promise<any> => {
        if (!this.erc20Contract) {
            await this.generateErc20Contract()
        }
        return this.erc20Contract.methods.balanceOf(ORACLE_ADDRESS).call()
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
}

let ethServiceInstance: EthService
export const getEthService = (): EthService => {
    if (!ethServiceInstance) {
        ethServiceInstance = new EthService()
    }

    return ethServiceInstance
}
