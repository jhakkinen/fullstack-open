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

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="notification">
      {message}
    </div>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter] = useState('')
  const [notificationMsg, setNotificationMsg] = useState(null)

  const hook = () => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }

  useEffect(hook, [])

  const notify = message => {
    setNotificationMsg(message)
    setTimeout(() => {
      setNotificationMsg(null)
    }, 5000)
  }

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

  const savePerson = event => {
    event.preventDefault()
    const existingPerson = persons.find(p => p.name === newName)
    if (!existingPerson) {
      addPerson()
    } else {
      updatePerson(existingPerson)
    }
    setNewName('')
    setNewNumber('')
  }

  const updatePerson = person => {
    const id = person.id
    if (window.confirm(`${person.name} is already added to the phonebook, replace the old number with the new one?`)) {
      const changedPerson = { ...person, number: newNumber }

      personService
        .update(id, changedPerson).then(returnedPerson => {
          setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
          notify(`Updated ${returnedPerson.name}`)
        })
        .catch(error => {
          alert(
            `${person.name} was already deleted from server`
          )
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  const addPerson = () => {
    const person = {
      name: newName,
      number: newNumber
    }
    personService
      .create(person).then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        notify(`Added ${returnedPerson.name}`)
      })
  }

  const deletePerson = id => {
    const person = persons.find(p => p.id === id)
    if (!window.confirm(`Delete ${person.name}?`)) return

    personService.destroy(id).then(() => {
      setPersons(persons.filter(p => p.id !== id))
      notify(`Deleted ${person.name}`)
    })
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={notificationMsg} />

      <Filter value={filter} onChange={handleFilterChange}/>

      <PersonForm
        onSubmit={savePerson}
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
