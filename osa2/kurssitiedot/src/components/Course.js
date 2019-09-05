import React from 'react'

const Header = ({ course }) => (
  <h2>{course}</h2>
)

const Part = ({ part }) => {
  return <p>{part.name} {part.exercises}</p>
}

const Content = ({ parts }) => {
  const rows = () => parts.map(part =>
    <Part
      key={part.id}
      part={part}
    />
  )
  return (
    <>
      {rows()}
    </>
  )
}

const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0)
  return (
    <p>
      <strong>total of {total} exercises</strong>
    </p>
  )
}

const Course = ({ course }) => {
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}

export default Course
