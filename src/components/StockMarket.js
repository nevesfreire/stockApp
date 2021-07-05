import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';

export default function StockMarket() {
    let previous = useSelector(state => state.data);
    const dispatch = useDispatch();

    const [symbol, setSymbol] = useState('');
    const [onOff, setOnOff] = useState(0);
    const [name, setName] = useState('');
    const [running, setRunning] = useState(0);
    const [clear, setClear] = useState();

    const token = 'pk_58dba9983c6b4f03b6d0ce8d6abc803e';

    const zerarCampo = () => { document.getElementById('symbol').value = ""; }

    const cycle = () => {
        if (running === 0) {
            setRunning(1);
            setClear(setInterval(() => {
                if (onOff === 1) {
                    newSearch()
                }
                else {
                    setRunning(0);
                };
            }, 1000))
        }
    }

    useEffect(() => {
        cycle();
    }, [onOff])

    const newSearch = async () => {
        const url = `https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=${token}`;
        // console.log(url);
        const exchangeRates = await fetch(url)
            .then((item) => item.json());
        const { latestPrice } = exchangeRates;
        if (exchangeRates) setName(exchangeRates.companyName);

        dispatch({ type: 'ADD_SEARCH', content: latestPrice });
    }

    return (
        <div >
            <h1 class="header">StockMarket</h1>
            <input
                minLength="1"
                class="input"
                type="text"
                name="symbol"
                id="symbol"
                placeholder="Qual a empresa desejada?"
                onChange={({ target }) => {
                    setSymbol(target.value)
                }}
            />
            <button
                type="button"
                class="buttons"
                id='on'
                onClick={() => { setOnOff(1); }}
            >ON</button>
            <button
                type="button"
                class="buttons"
                id='off'
                onClick={() => {
                    clearInterval(clear);
                    setOnOff(0);
                    zerarCampo();
                    setName('')
                    dispatch({ type: 'CLEAR', content: [] });
                }}

            >OFF</button>
            <h2 class="header" hidden={!name.length > 0}> {name}</h2>
            <h3 class="header" hidden={!name.length > 0} >{`Latest: $${previous[previous.length - 1] || 0}`}</h3>
        </div>
    )

}