import './styles.css';
import {useState} from "react";

export function App() {
    return (
        <div className="two-factor-input">
            <TwoFactorInput />
        </div>
    );
}

const CODE = "1234";
const INPUT_CLEAR = {0: '', 1: '', 2: '', 3: ''};

function TwoFactorInput() {
    const [code, setCode] = useState(INPUT_CLEAR);

    const _handleInputChange = (e, index) => {
        const value = e.target.value;
        const isDigit = val => /^\d+$/.test(val);

        if (!isDigit(value) && value === "") {
            return;
        }

        setCode({...code, [index]: value});

        focusNext(index);
    }

    const _handlePaste = e => {
        e.preventDefault();

        const pastedCode = e.clipboardData.getData('text/plain');

        if (pastedCode.length !== 4) {
            return;
        }

        setCode({
            0: pastedCode[0],
            1: pastedCode[1],
            2: pastedCode[2],
            3: pastedCode[3]
        });
    }

    const _handleBackspace = (e, index) => {
        if (e.code === "Backspace") {
            setCode({...code, [index]: ""});
            focusPrevious(index);
        }
    }

    const focusNext = index => {

        if (index === 3) {
            return;
        }

        const inputs = document.querySelectorAll('.input-square');
        const nextInput = (index + 1) % 4;

        inputs[nextInput].focus();
    }

    const focusPrevious = index => {

        if (index === 0) {
            return;
        }

        const inputs = document.querySelectorAll('.input-square');
        const nextInput = (index - 1) % 4;

        inputs[nextInput].focus();
    }

    const _handleClick = e => {
        e.preventDefault();

        const currentCode = Object.values(code).reduce((acum, number) => {
            return acum + number;
        }, '');

        if (currentCode === CODE) {
            setCode(INPUT_CLEAR);
        }
    }


    return (
        <div className="container">
            <form>
                <div className="input-container">
                    {Array(Object.keys(code).length).fill(null).map((item, index) => {
                        return (
                            <input key={index}
                                className="input-square"
                                onChange={(e) => _handleInputChange(e, index)}
                                onKeyDown={(e) => _handleBackspace(e, index)}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                onPaste={_handlePaste}
                                value={code[index]}
                            />
                        )
                    })}
                </div>
                <button className="submit-button" type="submit" onClick={_handleClick}>Submit</button>
            </form>
        </div>
    )
}