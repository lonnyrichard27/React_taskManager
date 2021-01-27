import { useState } from "react";

const Addtask = ({ onAdd }) => {
    const [text, setText] = useState('')
    const [day, setDay] = useState('')
    const [reminder, setReminder] = useState('')

    const onSubmit = (e) =>{
        e.preventDefault()

        // validations

        // if theres no text in the input field
        if (!text) {
            alert('Please add a task')
            //  return here stops the execution of a function
            return
        } 

        // if the above function passes run this below
        onAdd({ text, day, reminder})

        // clear the form field
        setText('')
        setDay('')
        setReminder(false)
    }

    return (
        <form className=" add-form" onSubmit={onSubmit}>
            <div className="form-control">
                <label>Task</label>
                <input type="text" placeholder="Add Task" 
                value={text} onChange={(e) => setText(e.target.value) }/>
            </div>
            <div className="form-control">
                <label>Day and Time</label>
                <input type="text" placeholder="Add Day and Time" 
                value={day} onChange={(e) => setDay(e.target.value) }/>
            </div>
            <div className="form-control form-control-check">
                <label>Set Reminder</label>
                <input type="checkbox"
                checked={reminder}
                value={reminder} onChange={(e) => setReminder(e.currentTarget.checked) } />
            </div>

            <input type="submit" className=" btn btn-block" value="Save Task" />
        </form>
    )
}

export default Addtask
