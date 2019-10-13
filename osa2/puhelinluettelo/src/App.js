import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const Person = ({ person, onDelete }) => {
  return (
    <div>
      {person.name} {person.number}
      <button onClick={onDelete}>delete</button>
    </div>
  )
}

const Persons = ({ persons, onDelete }) => {
  const rows = () => persons.map(person =>
    <Person
      key={person.id}
      person={person}
      onDelete={() => onDelete(person.id)}
    />
  )
  return (
    <div>
      {rows()}
    </div>
  )
}

const Filter = ({ filter, onChange }) => {
  return (
    <div>
      filter: <input value={filter} onChange={onChange}/>
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <div>
        name: <input value={props.newName} onChange={props.onNameChange}/>
      </div>
      <div>
        number: <input value={props.newNumber} onChange={props.onNumberChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter] = useState('')

  const hook = () => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }

  useEffect(hook, [])

  const personsToShow = filter
    ? persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))
    : persons

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (!persons.find(p => p.name === personObject.name)) {
      personService
        .create(personObject).then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    } else {
      alert(`${personObject.name} is already added to the phonebook`)
    }
  }

  const deletePerson = id => {
    const person = persons.find(p => p.id === id)
    if (!window.confirm(`Delete ${person.name}?`)) return

    personService.destroy(id).then(() => {
      setPersons(persons.filter(p => p.id !== id))
    })
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter value={filter} onChange={handleFilterChange}/>

      <PersonForm
        onSubmit={addPerson}
        newName={newName}
        onNameChange={handleNameChange}
        newNumber={newNumber}
        onNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>

      <Persons
        persons={personsToShow}
        onDelete={deletePerson}
      />
    </div>
  )

}

export default App
