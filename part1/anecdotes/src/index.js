import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(6).fill(0))
  
  const handleAnecdotes = () => {
    setSelected(Math.floor((Math.random() * (5 - 0 + 1)) + 0))
  }

  const handleVotes = () => {
    const copy = [...votes]
    copy[selected]++
    setVotes(copy);
  }

  const handleMostVotes = (values) => values.indexOf(Math.max.apply(null, values))

  return (
    <div>
      <h1>Anecdote of the day</h1>
        {props.anecdotes[selected]} <br/> has {votes[selected]} votes
      <br/>
      <button onClick={handleAnecdotes}>Next Anecdotes</button>
      <button onClick={handleVotes}>Vote anecdote</button>

      <h1>Anecdote with most votes</h1>
        {props.anecdotes[handleMostVotes(votes)]} <br/> has {votes[handleMostVotes(votes)]} votes
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)