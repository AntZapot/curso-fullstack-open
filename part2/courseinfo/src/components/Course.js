import React from 'react'

const Course = ({ course }) => {
return (
    <>
        <Header course={course}/>
        <Content course={course}/> 
        <Total parts={course.parts}/>
    </>
)
}

const Header = (props) => <h1>{props.course.name}</h1>;

const Content = ({course}) => (
<div>
    {course.parts.map(
    part => (
        <Part key={part.id} part={part}/>
    ))}
</div>
)

const Part = ({part}) => <p> {part.name} {part.exercises} </p>

const Total = ({parts}) => {
const total = parts.reduce((sum, p) => sum + p.exercises, 0)
return (
    <p>Total of {total} exercises</p> 
)
}

export default Course;
