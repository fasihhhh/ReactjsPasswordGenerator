import React, { useState } from 'react'
import { useEffect } from 'react';

function PasswordBody02() {


    let [number,setNumber]  = useState();
    const [length,setLength]  = useState(8);
    let [numberInc,noNumber] = useState(false)
    const [isCopied, setIsCopied] = useState(false);
    const [charInc,setChar] = useState(false);


    function numberIncluded() {
  
        let newArr = number.replace('K','60')
                                .replace('s','35')
                                .replace('m','5')
                                .replace('O','93')
                                .replace('^','4')
                                .replace('F','1')
                                .replace('L','2')
                                .replace('n','8')
                                .replace('N','3')
                                .replace('i','5')
                                .replace('f','3')
                                .replace('A','09')
                                .replace('b','8')
                                .replace('R','8')
                                .replace('S','09')
                                .replace('T','92')
                                .replace('q','17')
                                .replace('Z','6')
                                .replace('~@','6')
                                .replace('&','6')
                                .replace('%','0')


        setNumber(newArr)        
        // console.log("or  "+number)
        // console.log("new "+newArr.length)
        console.log("numberIncluded Function")

    }

    function numberToggler() {
        noNumber(prev => !prev)
        // {numberInc ? passwordGeneratorLoop(length) : numberIncluded() }
    }


    function charIncluded() {
  
        let newArr = number.replace('K','%')
                                .replace('s','&')
                                .replace('m','@')
                                .replace('O','&')
                                .replace('j','$@')
                                // .replace('^','#')
                                .replace('F','&%')
                                .replace('L','$')
                                .replace('n','*')
                                .replace('N','?/')
                                .replace('i','^?')
                                .replace('f','~@')
                                .replace('A','#+')
                                .replace('b','%')
                                .replace('R','!')
                                .replace('S','%&')
                                .replace('T','{{')
                                .replace('q','$')
                                .replace('M','*')
                                .replace('C','&*')
                                .replace('92','{!')
                                .replace('17','&')

        setNumber(newArr)        
        // console.log("or  "+number)
        // console.log("new "+newArr.length)
        console.log("charIncluded Function")

    }

    function charToggler() {
        setChar(prev => !prev)
        // setChar(length)
        // {charInc ? passwordGeneratorLoop(length) : charIncluded()  }
    }

    function range(e) {
        // console.log(e.target.defaultValue)
        let loopLimit = e.target.value;
        setLength(loopLimit)
        passwordGeneratorLoop(loopLimit)
    }

    function passwordGeneratorLoop(loopLimit) {
        let passChar = ''
        let password = ''
        for (let i = 0; i < loopLimit  ; i++) {
            let pass = Math.floor((Math.random() * (122-65+1)+65))
            passChar = String.fromCharCode(pass);
            // if(passChar.includes('/^9[1-6]$/')) console.log("was herw") ;
            // console.log("pass: " +String.fromCharCode(pass))
            // if((password.toString()).includes('A')) return;
            password = password + passChar; 
        }
        setNumber(password)
    }

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
    }, [length,numberInc,charInc]);   

    return(
        <div className="bg-pink-900 w-[600px] p-6 rounded-lg mx-auto">
            <div className="top-layer flex justify-center">
                <div className="password bg-[#A98307] w-[80%] py-1 px-2">{ number }</div>
                <button onClick={handleCopy} className='bg-blue-500  w-[4.2rem] py-1  text-center cursor-pointer hover:bg-blue-700 text-white  ' >{isCopied ? 'Copied' : 'Copy'  }</button>
            </div>
            <div className="second-layer flex gap-2 justify-around mt-4">
                <div className="range bg-red-900 flex items-center gap-2">
                    <input onInput={range} className='bg-red-900' defaultValue={8} min='8' max='30' type="range" />
                    <span>length( {length} )</span>
                </div>
                <div className="numbers">
                    <input onClick={numberToggler} type="checkbox" className='cursor-pointer' name="" id="numbers" />
                    <label htmlFor="numbers" className='m-1 cursor-pointer'>Numbers</label>
                </div>
                <div className="character">
                    <input type="checkbox" onClick={charToggler} name="" id="character"  className='cursor-pointer'/>
                    <label htmlFor="character" className='m-1 cursor-pointer'>Character</label>
                </div>
            </div>
        </div>
    )
}

export default PasswordBody02