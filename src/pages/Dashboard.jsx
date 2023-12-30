import React, { useState, useEffect } from 'react'
import { Bar, Line } from 'react-chartjs-2'
import { CategoryScale, LinearScale, BarElement, PointElement, LineElement, Chart as ChartJS } from 'chart.js'
import { utilService } from '../services/util.service'
import { showErrorMsgRedux, showSuccessMsgRedux } from '../store/actions/app.actions'

import { useSelector } from 'react-redux'
import { loadToys } from '../store/actions/toy.actions'

import { ToyFilter } from '../cmps/ToyFilter.jsx'


ChartJS.register(BarElement, CategoryScale, LinearScale, PointElement, LineElement)

export function Dashboard() {
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const [pricesChartData, setPricesChartData] = useState(null)
    const [inventoryChartData, setInventoryChartData] = useState(null)
    const [lineChartData, setLineChartData] = useState(null)

    useEffect(() => {
        loadData()
    }, [])

    useEffect(() => {
        generateChartsData(toys)
    }, [toys])

    async function loadData() {
        try {
            await loadToys()
            showSuccessMsgRedux('Toys loaded successfully')
        } catch (error) {
            console.error('Error loading toys:', error)
            showErrorMsgRedux('Cannot show toys')
        }
    }

    function generateChartsData(toysData) {
        if (!toysData || !toysData.length) {
            return
        }

        const labels = Array.from(new Set(toysData.flatMap((toy) => {
            return toy.labels.map(String)
        })))

        const pricesData = {
            labels,
            datasets: [
                {
                    label: 'Prices per Label',
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(75,192,192,0.6)',
                    hoverBorderColor: 'rgba(75,192,192,1)',
                    data: labels.map((label) => toysData
                        .filter((toy) => toy.labels.includes(label))
                        .reduce((sum, toy) => sum + toy.price, 0))
                },
            ],
        }

        // Inventory by label
        const inventoryData = {
            labels,
            datasets: [
                {
                    label: 'Inventory by Label',
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(75,192,192,0.6)',
                    hoverBorderColor: 'rgba(75,192,192,1)',
                    data: labels.map((label) => toysData
                        .filter((toy) => toy.labels.includes(label))
                        .filter((toy) => toy.inStock).length)
                },
            ],
        }

        const lineData = {
            labels: Array.from({ length: 10 }, (_, index) => String(index + 1)),
            datasets: [
                {
                    label: 'Random Data',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: Array.from({ length: 10 }, () => utilService.getRandomIntInclusive(0, 100)),
                },
            ],
        }

        setPricesChartData(pricesData)
        setInventoryChartData(inventoryData)
        setLineChartData(lineData)
    }

    if (!pricesChartData ||
        !inventoryChartData ||
        !lineChartData) return <div>Loading...</div>
    return (
        <div className="dashboard grid">
            <ToyFilter />
            <div className="charts">
                <div style={{ width: '50%' }}>
                    <Bar data={pricesChartData} />
                </div>
                <div style={{ width: '50%' }}>
                    <Bar data={inventoryChartData} />
                </div>
                <div style={{ width: '50%' }}>
                    <Line data={lineChartData} />
                </div>
            </div>
        </div>
    )
}

export default Dashboard
