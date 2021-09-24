import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistic = ({text, value}) => {
  return(
    <tr>
      <td>{text}:</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad, allClicks}) => {

  if(allClicks === 0) {
    return (
      <h2>
        No feedback given
      </h2>
    )
  }

  return (
    <div>
      <table>
        <tbody>
          <Statistic text="Good" value={good}/>
          <Statistic text="Neutral" value={neutral}/>
          <Statistic text="Bad" value={bad}/>
          <Statistic text="All" value={allClicks}/>
          <Statistic text="Average" value={(good-bad)/allClicks}/>
          <Statistic text="Positive" value={good/allClicks*100+'%'}/>
        </tbody>
      </table>
    </div>
  )
}

const Button = ({text, fn}) => {
  return (
    <button onClick={fn}>{text}</button>
  )
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [allClicks, setAllClicks] = useState(0);

  const handleClickGood = () => {
    setGood(good + 1);
    setAllClicks(allClicks + 1);
  }
  const handleClickNeutral = () => {
    setNeutral(neutral + 1);
    setAllClicks(allClicks + 1);
  }
  const handleClickBad = () => {
    setBad(bad + 1);
    setAllClicks(allClicks + 1);
  }

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button text="Good" fn={handleClickGood}/>
      <Button text="Neutral" fn={handleClickNeutral}/>
      <Button text="Bad" fn={handleClickBad}/>

      <h1>Statistics</h1>
      <Statistics
        good={good}
        neutral={neutral} 
        bad={bad} 
        allClicks={allClicks}
      />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)