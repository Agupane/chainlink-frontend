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
            //  categories: [0],
            min: 0,
            max: 10,
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
            data: ['0', '1'],
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
        const prices = allEvents.map(event => {
            return event.price
        })

        const seriesTime = allEvents.map((event, index) => {
            const dateMoment = moment(event.timestamp)
            //return dateMoment.format('MM/DD/YY')
            return index
        })

        // @ts-ignore
        setChartValues({
            options: {
                chart: chartValues.options.chart,
                xaxis: {
                    categories: seriesTime,
                    ...chartValues.options.xaxis,
                },
                yaxis: { ...chartValues.options.yaxis },
            },
            series: [
                {
                    name: 'USD<>RUB',
                    data: prices,
                },
            ],
            chart: {
                width: '100%',
                height: '100%',
            },
        })
    }, [allEvents])

    return allEvents && allEvents.length > 0 ? (
        <Wrapper>
            <Chart options={chartValues.options} series={chartValues.series} type={'line'} />
        </Wrapper>
    ) : null
}
