import React, { useState } from 'react'

const Person = ({ person }) => {
  return (
    <div>
      {person.name} {person.number}
    </div>
  )
}

const Persons = ({ persons }) => {
  const rows = () => persons.map(person =>
    <Person
      key={person.name}
      person={person}
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
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter] = useState('')

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
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    } else {
      alert(`${personObject.name} is already added to the phonebook`)
    }
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

      <Persons persons={personsToShow}/>
    </div>
  )

}

export default App
