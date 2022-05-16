import React, { useState } from 'react';
import { factorial } from './Helpers';
import cl from './Calculator.module.scss';

const cells = [
    ['2nd', 'deg', 'sin', 'cos', 'tan'],
    ['**', 'lg', 'ln', '(', ')'],
    ['Vx', 'C', '<=', '%', '/'],
    ['X!', 7, 8, 9, '*'],
    ['1/x', 4, 5, 6, '-'],
    ['П', 1, 2, 3, '+'],
    ['e', '@', 0, '.', '=']
];
const helper = cells.filter((item, index) => (index !== 0) && (index !== 1))
    .map(item => item.filter((it, ind) => ind !== 0))

const Calculator = () => {
    const [but, setBut] = useState(helper)
    const [numbers, setNumbers] = useState('');

    // when we get value from buttons
    const addIntoInput = (it) => {
        setNumbers(prev => prev + it);

        if (it === '=') {
            setNumbers(eval(numbers));
        }
        if (it === '<=') {
            if (typeof (numbers) === 'string') {
                const res = numbers.substring(0, numbers.length - 1)
                setNumbers(res);
            } else if (typeof (numbers) === 'number') {
                setNumbers('');
            }
        }
        if (it === 'C') {
            setNumbers('');
        }
        if (it === '%') {
            setNumbers(numbers / 100);
        }
        if (it === '@') {
            setBut(cells);
            setNumbers('');
        }
        if ((it === '@') && (but.length === 7)) {
            setBut(helper);
            setNumbers('');
        }
        if ((it === 'П')) {
            setNumbers(Math.PI);
        }
        if (it === 'X!') {
            setNumbers(factorial(numbers));
        }
        if (it === 'Vx') {
            setNumbers(Math.sqrt(numbers));
        }
        if (it === 'e') {
            setNumbers(Math.E);
        }
        if ((it === '2nd') || (it === 'deg') || (it === 'sin') || (it === 'cos') || (it === 'tan') || 
        (it === 'lg') || (it === 'ln') || (it === '1/x')) {

            alert('эта кнопка еще не работает!');
            setNumbers('');
        }
    };
    // ----------------------------------------------------


    // when we get value from input--------------------------------------
    const morty = (e) => {
        setNumbers(e.target.value)
        console.log(e)
        if (e.nativeEvent.data === '=') {
            const res = eval(numbers)
            console.log(res)
            setNumbers(res)
        };
    }
    // ----------------------------------------------------------------------



    return (
        <div className={cl.calculator_page}>
            <h1>Сalculator</h1>
            <div className={cl.calculator}>
                <input type="text" value={numbers} onChange={(e) => morty(e)} />
                <div className={cl.buttons}>
                    {but.map((item, index) => (
                        <div className={cl.row} key={index}>
                            {item.map((it, ind) => (
                                <div
                                    className={typeof it === 'string' && it !== ',' && it !== '@' ? cl.func : cl.cell}
                                    key={ind}
                                    onClick={() => addIntoInput(it)}
                                >
                                    {it}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Calculator;