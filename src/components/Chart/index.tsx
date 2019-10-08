import React, { useContext, useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import { ExchangeContext } from '../../context/exchange'
import moment from 'moment'
import styled from 'styled-components'

const initialValues = {
    options: {
        chart: {
            id: 'priceChart',
            toolbar: {
                show: false,
            },
        },
        xaxis: {
            labels: {
                show: false,
            },
        },
        yaxis: {
            min: 30,
            max: 80,
        },
    },
    series: [
        {
            name: 'USD<>RUB',
        },
    ],
    chart: {
        width: '100%',
        height: '100%',
    },
}

const Wrapper = styled.div`
    margin-top: 30px;
`

export const PriceChart = () => {
    const [chartValues, setChartValues] = useState(initialValues)
    const exchangeContext = useContext(ExchangeContext)
    const { allEvents } = exchangeContext
    useEffect(() => {
        const seriesData = allEvents.map(event => {
            const dateMoment = moment(event.timestamp)
            const date = dateMoment.format('MM/DD/YY')
            return {
                x: date,
                y: event.price,
            }
        })

        setChartValues({
            options: {
                ...chartValues.options,
            },
            series: [
                {
                    name: 'USD<>RUB',
                    // @ts-ignore
                    data: seriesData,
                },
            ],
            chart: {
                ...chartValues.chart,
            },
        })
    }, [allEvents])

    return allEvents && allEvents.length > 0 ? (
        <Wrapper>
            <Chart options={chartValues.options} series={chartValues.series} type={'line'} />
        </Wrapper>
    ) : null
}
