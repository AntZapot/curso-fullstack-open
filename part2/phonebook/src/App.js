import React, { useEffect, useState } from 'react';
import Filter from './components/Filter';
import Notification from './components/Notification';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personsServices from './services/personsServices'

const App = () => {
  const [ persons, setPersons ] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [message, setMessage] = useState(null)
  const [classes, setClasses] = useState("success")

  useEffect(() => {
      personsServices
        .getAll()
        .then(res => {
          setPersons(res)
        })
  }, [])

  const handleDelete = (name, id) => {
    const result = window.confirm(`Delete ${name}`)
    result && 
    personsServices
        .deletePerson(id)
        setPersons(persons.filter(person => person.id !== id))
}

  const handleSubmit = (e) => {
    e.preventDefault();
    const nameObj = {
      name: newName,
      number: newNumber
    }

    const result = persons.some(person => person.name.toLowerCase() === newName.toLowerCase());

    if(result) {
      const obj = persons.filter(person => person.name.toLowerCase() === newName.toLowerCase())
      const replace = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`);
      replace 
        && personsServices
          .update(nameObj, obj[0].id)
          .then(res => {
            setPersons(persons.map(person => person.id !== obj[0].id ? person : res.data))
            setNewName('')
            setNewNumber('')
            setClasses("success")
            setMessage(`Changes Saved`);
            setTimeout(() => {
              setMessage(null)
            }, 3000)
          })
          .catch((err) => {
            setClasses("error")
            setMessage(`Information of ${newName} has already been removed from server`);
            setTimeout(() => {
              setMessage(null)
            }, 3000)
          })
    }else {
      personsServices
        .create(nameObj)
        .then(res => {
          setPersons(persons.concat(res.data))
          setNewName('')
          setNewNumber('')
          setClasses("success")
          setMessage(`Added ${newName}`)
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        })
      
    }
  }
  const handleInputChangeName = (e) => {
    setNewName(e.target.value);
  }

  const handleInputChangeNumber = (e) => {
    setNewNumber(e.target.value);
  }

  const handleFilter = (e) => {
    setFilter((e.target.value));
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={filter} handleFilter={handleFilter}/>

      <Notification classes={classes} message={message}/>

      <h2>Add a new</h2>
      <PersonForm
        fnName={handleInputChangeName}
        fnNumber={handleInputChangeNumber}
        fnSubmit={handleSubmit}
        newName={newName}
        newNumber={newNumber}
      />
      
      <h2>Numbers</h2>
      <Persons filter={filter} handleDelete={handleDelete} persons={persons}/>
      
    </div>
  )
}

export default App
