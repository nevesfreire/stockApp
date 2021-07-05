import React from 'react';
import { useSelector } from 'react-redux';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

export default function StockMarket() {
    const previous = useSelector(state => state.data).map(
        (item, index) => ({ stock: item, time: index }))

    return (
        <div >
            <LineChart width={1000} height={500} data={previous}>
                <Line type="monotone" dataKey="stock" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
            </LineChart>
        </div>
    )

}