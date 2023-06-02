import { useEffect, useState } from 'react'
import Filter from './componets/Filter'
import PersonForm from './componets/PersonForm'
import Persons from './componets/Persons'
import Notification from './componets/Notification'

import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('New name')
  const [newNumber, setNewNumber] = useState('New number')
  const [filterData, setFilterData] = useState('')
  const [personMessage, setPersonMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const personsToShow = filterData.length === 0 ? persons : persons.filter(person => person.name.toLocaleLowerCase().includes(filterData.toLocaleLowerCase()))

  // console.log(personsToShow + " " + filterData.length)

  useEffect(()=>{
    personService
      .getAll()
      .then(initialPersons =>{
        setPersons(initialPersons)
      })
  }, [])
 
  const handleNameChange = (e) =>{
    // console.log(e.target.value)
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) =>{
    // console.log(e.target.value)
    setNewNumber(e.target.value)
  }
  
  const handleFilterData = (e) =>{
    // console.log(e.target.value)
    setFilterData(e.target.value)
  }


  const addPerson = (e) =>{
    e.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    const samePerson =  persons.find(p=> p.name === newName)

    if(samePerson !== undefined){
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
          console.log(`replace number ${samePerson.id}`)

          personService
            .update(samePerson.id, personObject)
            .then(returnedPerson=>{
              const showPersons = persons.filter(person => person.id !== returnedPerson.id)
              setPersons(showPersons.concat(returnedPerson))
              setNewName('')
              setNewNumber('')
              setPersonMessage(
                `Updated ${returnedPerson.name} phonenumber`
              )
              setTimeout(() => {
                setPersonMessage(null)
              }, 5000)
            })
      }
    } else {
      personService
        .create(personObject)
        .then(returnedPerson =>{
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')

          setPersonMessage(
            `Added ${returnedPerson.name}`
          )
          setTimeout(() => {
            setPersonMessage(null)
          }, 5000)
        })
    }
  }

  const handleDeletePerson = (id) => {

    const deletePerson = persons.find(p=> p.id === id)

    console.log(deletePerson)

    if (window.confirm(`Delete ${deletePerson.name} ?`)) {
      // console.log(`delete ${id}`)

      personService
        .deletePerson(deletePerson.id)
        .then(response => {
          const showPersons = persons.filter(person => person.id !== deletePerson.id)
          setPersons(showPersons)

          setPersonMessage(
            `Deleted ${deletePerson.name}`
          )
          setTimeout(() => {
            setPersonMessage(null)
          }, 5000)
        })
        .catch(error => {
          setErrorMessage(
            `Information of '${deletePerson.name}' has already been removed from server`
          )
          const showPersons = persons.filter(person => person.id !== deletePerson.id)
          setPersons(showPersons)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }

  }
 
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={personMessage} errorMessage={errorMessage} />
      <Filter value={filterData} handleFilterData={handleFilterData}/>
      <h3>Add a new</h3>
      <PersonForm 
        addPerson={addPerson} 
        newName={newName} 
        handleNameChange={handleNameChange} 
        newNumber={newNumber} 
        handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} handleDeletePerson={handleDeletePerson}/>
    </div>
  )

}

export default App