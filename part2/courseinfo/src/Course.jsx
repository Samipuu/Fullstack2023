const Course = (props) => {
    const course = props.course

    const Header = (props) => {
        return <h1>{props.course.name}</h1>
    }

    const Content = (props) => {
        const parts = props.course.parts
        console.log(parts)

        const Part = (props) => {
            const part = props.part
            return (
                <li key={part.id}>
                    {part.name} {part.exercises}
                </li>
            )
        }

        return (
            <div>
                {parts.map(part => <Part part={part} />)}
            </div>
        )
    }

    const Total = (props) => {
        const parts = props.course.parts
        const total = parts.reduce((sum, a) => {
            return (sum + a.exercises)
        }, 0)


        return (
            <div>
                <p>Number of exercises {total}</p>
            </div>
        )
    }

    return <div>
        <Header course={course} />
        <Content course={course} />
        <Total course={course} />
    </div>
}


export default Course