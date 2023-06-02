const Persons = ({personsToShow, handleDeletePerson})=> (
    <>
    {
        personsToShow.map((person) => {
            return (
                <div key={person.id}>
                    <p>{person.name} {person.number} <button onClick={() => handleDeletePerson(person.id)}>Delete</button></p>
                </div>
            )
        })
    }
    </>
)

export default Persons