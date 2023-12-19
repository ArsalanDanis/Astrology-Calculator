"use client"

import './style.css'
import { useState } from 'react'
import { numberChart,destinyNumberDefinations,soulNumberDefinations,dreamNumberDefinatons } from './data';


const Home = () => {

  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleChange = (event) => {
    const inputValue = event.target.value;
    const isValid = /^[A-Za-z\s]+$/.test(inputValue);

    setName(inputValue);

    if (isValid) {
      setError('');
    } else {
      setError('Please enter a valid name (letters and spaces only).');
      setSubmitted(false)
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submitted Name:', name);
    setSubmitted(true);
  };

  const handleReset = () => {
    setName('');
    setSubmitted(false);

  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const containerStyle = {
    backgroundColor: darkMode ? '#222' : '#fff',
    color: darkMode ? '#fff' : '#000',
  };

  let nameStr = name.toString().toUpperCase();
  let str = "";

  for (let i = 0; i < nameStr.length; i++) {
    if (("A" <= nameStr[i]) && ("Z" >= nameStr[i])) {
      str += nameStr[i];
    }
  }

  let arr = [];
  let sum = 0;
  let numbers = [];
  let vowelsNum = [];
  let consonantNum = [];

  for (let i = 0; i < str.length; i++) {
    const char = str[i].toUpperCase();
    arr.push(char);
    if (numberChart[char]) {
      numbers.push(numberChart[char]);
      sum += numberChart[char]
    }
    if (["A", "E", "I", "O", "U"].includes(char)) {
      vowelsNum.push(numberChart[char]);
    }
    if (!["A", "E", "I", "O", "U"].includes(char)) {
      consonantNum.push(numberChart[char]);
    }
  }

  function calculateSingleDigitSum(array) {
    let totalSum = array.reduce((acc, num) => acc + num, 0);

    while (totalSum >= 10 && ![11, 22, 33].includes(totalSum)) {
      let digitSum = 0;

      while (totalSum > 0) {
        digitSum += totalSum % 10;
        totalSum = Math.floor(totalSum / 10);
      }

      totalSum = digitSum;
    }

    return totalSum;
  }

  const total = calculateSingleDigitSum(numbers);
  const totalVowel = calculateSingleDigitSum(vowelsNum);
  const totalConsont = calculateSingleDigitSum(consonantNum);

  const getdestinyNumberDefinitions = (number) => {
    return destinyNumberDefinations[number] || '';
  };
  const getsoulNumberDefinitions = (number) => {
    return soulNumberDefinations[number] || '';
  };
  const getdreamNumberDefinitions = (number) => {
    return dreamNumberDefinatons[number] || '';
  };



  return (
    <div className={`container ${darkMode ? 'dark' : 'light'}`} style={containerStyle}>
      <div className='mode' onClick={toggleDarkMode}>
        {darkMode ? (
          <div className='darkMode-images' role="img" aria-label="Sun">
            ☀️
          </div>
        ) : (
          <div className='darkMode-images' role="img" aria-label="Moon">
            🌙
          </div>
        )}
      </div>
      <div className="astrology_image">
        <img src="https://img0-placeit-net.s3-accelerate.amazonaws.com/uploads/stage/stage_image/48725/optimized_product_thumb_stage.jpg" alt="" />
      </div>
      <div className="main">
        <h2>Online Name Numerology Calculator</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Enter Your Name:
            <input type="text" value={name} onChange={handleChange} />
          </label>
          <p style={{ color: 'red' }}>{error}</p>
          <div className="buttons-block">
            <button type="submit" disabled={!name}>
              Calculate
            </button>
            <button type="reset" onClick={handleReset}>
              Reset
            </button>

          </div>

        </form>
      </div>

      <div>
        
        {submitted && (
          <>
            <div className="userDetails">
              <h1>Chaldean Name Numerology Reading of <span style={{ color: "gold" }}>{name} !</span></h1>
              <h3>Compound Name Number/Namank (Numerology Total of Your Name): <span className='totalSum'>{sum}</span></h3>
              <div className="userName">
                <h4>{str.toUpperCase()}</h4>
                <h5>{JSON.stringify(numbers)}</h5>
              </div>
              <div className="destiny">
                <p><b>Destiny Number :</b> The Expression number, which describes who you are, and what you are, or what you become.</p>
                <p> Name Destiny/Expression Number or Namanak :- <span className='resultSum'>{total}</span></p>
                <h4>{getdestinyNumberDefinitions(total)}</h4>
              </div>
              <div className="destiny">
                <p><b>Soul Urge Number :</b>The Heart Desire number, which describes your inner potentials and inner resources.</p>
                <p> Soul Urge/Heart Desire Number :- <span className='resultSum'>{totalVowel}</span></p>
                <h4>{getsoulNumberDefinitions(totalVowel)}</h4>
              </div>

              <div className="destiny">
                <p><b>Dream Number :</b>: The Personality number which describes outer personality, indeed your first impression on others.</p>
                <p> Name Dream/Personality Number :- <span className='resultSum'>{totalConsont}</span></p>
                <h4>{getdreamNumberDefinitions(totalConsont)}</h4>

              </div>


            </div>

          </>
        )}
      </div>
    </div>
  );
};

export default Home;