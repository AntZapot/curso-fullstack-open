import React from 'react'
import Name from './Name'

const Persons = ({filter, handleDelete, persons}) => {
    const namesFilter = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()) );
    return (
        <div>
            {namesFilter.map(
                person => (
                    <Name id={person.id} handleDelete={handleDelete} key={person.name} name={person.name} number={person.number}/>
                )
            )}
        </div>
    )
}

export default Persons
