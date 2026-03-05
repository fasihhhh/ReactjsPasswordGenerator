import React, { useRef, useState } from 'react'
import { useEffect } from 'react';
import { useCallback } from 'react';
import '../css/style.css'

function PasswordBody() {


    let [number,setPassword]  = useState('');
    const [length,setLength]  = useState(8);
    let [numberInc,setNumber] = useState(false)
    const [isCopied, setIsCopied] = useState(false);
    let [charInc,setChar] = useState(false);
    const passwordReff = useRef(null)


    function numberToggler() {
        setNumber(prev => !prev)
    }

    function charToggler() {
        setChar(prev => !prev)
    }

    function range(e) {
        let loopLimit = e.target.value;
        setLength(loopLimit)
    }


    const passwordGeneratorLoop = useCallback((loopLimit)=> {
        let password = ''
        let str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if(numberInc) str = `012abcdefg4hijklmnopqrstuvwx345679yzABCDEFGHIJKLM63NOPQRSTUVWXYZ4567`;
        if(charInc) str = '!@#$%^abcdefghijklmnopqrstuvw&*()?>yzABCDEFGHIJKLMNO%PQRSTUVWXYZ,/'
        for (let i = 0; i < loopLimit  ; i++) {
            let index = Math.floor(((Math.random() * (str.length)) + 1))
            password += str.charAt(index)
        }
        // console.log("str : " + str) 
        setPassword(password)
    }, [numberInc,charInc])

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(number);
            setIsCopied(true);
            console.log("copied")
            // Reset the "Copied!" state after 2 seconds
            setTimeout(() => setIsCopied(false), 2000);
            } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    useEffect(() => {
            passwordGeneratorLoop(length);
    }, [length, passwordGeneratorLoop]);

    return(
        <div className="custom-bg-1 w-[98%]  sm:max-w-[600px] py-10 px-3 sm:px-6 rounded-xl mx-auto my-6 flex justify-end  flex-col flex-wrap">
            <div className="top-layer flex flex-col sm:flex-row justify-center ">
                <div className="password bg-[#f2f2f2] overflow-auto min-w-[288px] sm:w-[80%] py-2 px-2" ref={passwordReff} >{ number }</div>
                <button onClick={handleCopy} className='bg-blue-800  sm:w-[20%rem] py-[0.4rem] px-3  text-center cursor-pointer hover:bg-blue-600 text-white  ' >{isCopied ? 'Copied' : 'Copy'  }</button>
            </div>
            <div className="second-layer flex gap-2 mt-4 text-white flex-col justify-center">
                <div className="range flex items-center mx-auto px-3 sm:px-5 max-w-[400px] py-3 sm:py-2 my-2 custom-bg-2 opacity-[0.9] rounded-lg justify-center gap-2">
                    <input onChange={range} className='' defaultValue={8} min='8' max='30' type="range" />
                    <span>length {length} </span>
                </div>
                <div className="flex py-2 mt-1 justify-around">
                    <div className="numbers ">
                        <input onChange={numberToggler}  type="checkbox" className='cursor-pointer' name="" id="numbers" />
                        <label htmlFor="numbers" className='m-1 cursor-pointer'>Numbers</label>
                    </div>
                    <div className="character ">
                        <input type="checkbox" onClick={charToggler}  name="" id="character"  className='cursor-pointer'/>
                        <label htmlFor="character" className='m-1 cursor-pointer'>Character</label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PasswordBody