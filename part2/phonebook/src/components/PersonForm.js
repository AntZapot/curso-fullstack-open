import React from 'react'

const PersonForm = (props) => {
    const {fnName, fnNumber, fnSubmit, newName, newNumber} = props;
    return (
        <form onSubmit={fnSubmit}>
        <div>
            name: <input value={newName} onChange={fnName}/>
            <br/>
            number: <input value={newNumber} onChange={fnNumber}/>
        </div>
        <div>
            <button type="submit">add</button>
        </div>
        </form>
    )
}

export default PersonForm
