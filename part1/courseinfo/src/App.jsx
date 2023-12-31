const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      { name: 'Fundamentals of React', exercises: 10 },
      { name: 'Using props to pass data', exercises: 7 },
      { name: 'State of a component', exercises: 14 }
    ]
  }

  const Header = (props) => {
    return <h1>{props.course.name}</h1>
  }

  const Part = (props) => {
    const part = props.part
    return (
      <p>
        {part.name} {part.exercises}
      </p>
    )
  }

  const Content = (props) => {
    const parts = props.course.parts
    console.log(parts)



    return (
      <div>
        <Part part={parts[0]} />
        <Part part={parts[1]} />
        <Part part={parts[2]} />
      </div>
    )
  }

  const Total = (props) => {
    const parts = props.course.parts
    return (
      <div>
        <p>Number of exercises {parts[0].exercises + parts[1].exercises + parts[2].exercises}</p>
      </div>
    )
  }

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

export default App