import { useState } from 'react'

const StatisticLine = (props) => {
  if (props.text == "Positive") {
    return <tr>
      <td>{props.text}</td><td>{props.value} %</td>
    </tr>
  }

  return (<tr>
    <td>{props.text}</td><td>{props.value}</td>
  </tr>)
}


const Statistics = (props) => {
  let total = props.good + props.neutral + props.bad
  let average = (props.good - props.bad) / total
  let positive = props.good / total * 100

  if (total == 0) {
    return <div>
      <h2>
        Give feedback
      </h2>
      No feedback given
    </div>
  }
  return <div>
    <h2>Statistics</h2>
    <table>
      <tbody>
        <StatisticLine text="Good" value={props.good} />
        <StatisticLine text="Neutral" value={props.neutral} />
        <StatisticLine text="Bad" value={props.bad} />
        <StatisticLine text="All" value={total} />
        <StatisticLine text="Average" value={average} />
        <StatisticLine text="Positive" value={positive} />
      </tbody>
    </table>

  </div>
}

const Button = (props) => {
  return <button onClick={props.val}>{props.name}</button>
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)



  return (
    <div>
      <h1>
        Give feedback
      </h1>
      <p></p>
      <Button val={() => setGood(good + 1)} name="Good" />
      <Button val={() => setNeutral(neutral + 1)} name="Neutral" />
      <Button val={() => setBad(bad + 1)} name="Bad" />
      <p></p>

      <Statistics good={good} neutral={neutral} bad={bad} />

      <p>

      </p>
    </div>
  )
}

export default App