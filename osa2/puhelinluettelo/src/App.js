import React, { useState } from 'react'

const Person = ({ person }) => {
  return (
    <div>
      {person.name}
    </div>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [ newName, setNewName ] = useState('')

  const numbers = () => persons.map(person =>
    <Person
      key={person.name}
      person={person}
    />
  )

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName
    }
    if (!persons.find(p => p.name === personObject.name)) {
      setPersons(persons.concat(personObject))
      setNewName('')
    } else {
      alert(`${personObject.name} is already added to the phonebook`)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {numbers()}
      </div>
    </div>
  )

}

export default App
