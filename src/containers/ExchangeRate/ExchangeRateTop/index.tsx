import React, { useContext } from 'react'
import { ExchangeContext } from '../../../context/exchange'
import styled from 'styled-components'
import { HexAddr } from '../../../components/Common/HexAddr'
import ReactTooltip from 'react-tooltip'
import { CopyText } from '../../../components/Common/CopyText'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: '10px',
    },
    table: {},
    column: {
        padding: '6px',
    },
}))

export const ExchangeRateTop = () => {
    const exchangeContext = useContext(ExchangeContext)
    const { userBalance, userAddress, oracleContractBalance, oracleContractAddress } = exchangeContext
    const classes = useStyles()
    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableBody>
                    <TableRow key={1}>
                        <TableCell component="th" scope="row" className={classes.column}>
                            <strong>User address:</strong>
                        </TableCell>
                        <TableCell className={classes.column} data-tip={userAddress}>
                            <HexAddr>{userAddress}</HexAddr>
                            <CopyText value={userAddress} canCopy={true} />
                        </TableCell>
                    </TableRow>
                    <TableRow key={2}>
                        <TableCell component="th" scope="row" className={classes.column}>
                            <strong>Balance (ETH):</strong>
                        </TableCell>
                        <TableCell className={classes.column}>{userBalance}</TableCell>
                    </TableRow>
                    <TableRow key={3}>
                        <TableCell component="th" scope="row" className={classes.column}>
                            <strong>Contract address:</strong>
                        </TableCell>
                        <TableCell className={classes.column} data-tip={oracleContractAddress}>
                            <HexAddr>{oracleContractAddress}</HexAddr>
                            <CopyText value={oracleContractAddress} canCopy={true} />
                        </TableCell>
                    </TableRow>
                    <TableRow key={4}>
                        <TableCell component="th" scope="row" className={classes.column}>
                            <strong>Link balance:</strong>
                        </TableCell>
                        <TableCell className={classes.column}>{oracleContractBalance}</TableCell>
                    </TableRow>
                    <TableRow key={5}>
                        <TableCell component="th" scope="row" className={classes.column}>
                            <strong>Network:</strong>
                        </TableCell>
                        <TableCell className={classes.column}>Kovan</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <ReactTooltip />
        </Paper>
    )
}
