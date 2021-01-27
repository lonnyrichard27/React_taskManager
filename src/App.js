import Header from "./components/Header"
import Footer from "./components/Footer"
import { useState, useEffect } from "react";
import Tasks from "./components/Tasks";
import Addtask from "./components/Addtask";
import { BrowserRouter as Router, Route } from "react-router-dom";
import About from './components/About'

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])

  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:3000/tasks')
    const data = await res.json()

    return data
  }

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:3000/tasks/${id}`)
    const data = await res.json()

    return data
  }

  // Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    const res = await fetch(`http://localhost:3000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updTask),
    })

    const data = await res.json()

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    )
  }

  // add task
  const addTask = async (task) => {

    const res = await fetch('http://localhost:3000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task)
    })

    const data = await res.json()

    setTasks([...tasks, data])
    // since we're not fetching ids from the backend this is an algo for creating ids

    // const id = Math.floor(Math.random() * 10000) + 1
    // const newTask = { id, ...task}

    // the algo below adds a new task into the ahrdcoded task array in the state far above ( meanwhile the ... is the spread operato and just represents the object of array)
    // setTasks([...tasks, newTask])
  }

  // delete task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:3000/tasks/${id}`, {
      method: 'DELETE'
    })

    setTasks(tasks.filter((task) => 
      task.id !== id
    ))
  }
  return (
    <Router>

    <div className="container">
      {/* the code sethowAddTask(!) is setting the original value of the function to the ooposite of showAddTask*/}
      <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
      {/* if show add task is true render the component the (&&) is another shorthand for saying if it is true instead of using the ternary operator */}
    
       <Route 
        path="/" 
        exact 
        render={(props) => (
        <>
          { showAddTask && <Addtask onAdd={addTask} />}

          {/* the code below states that if tasks is 0 show the message in the string but if there are tasks render the component */}

          {tasks.length > 0 ? 
          <Tasks 
            tasks={tasks} 
            onDelete={deleteTask} 
            onToggle={toggleReminder} 
          />
            : ('No tasks to display')}
         </>
        )} />
       <Route path='/about' component={About} />
       <Footer />
    </div>
    </Router>
  );
}

export default App;
