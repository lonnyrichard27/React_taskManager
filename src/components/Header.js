import PropTypes from 'prop-types'
import Button from './Button'
import { useLocation } from "react-router-dom";

const Header = ({ title, onAdd, showAdd }) => {
    const location = useLocation()

    return (
        <header className="header">
            <h1>{title}</h1>
            {/* the location thingy is a conditional that if youre on the about page dont show this button else display the button */}

            { location.pathname === "/" && (
                <Button 
                    // if showadd is equal to open display color green but if its close display red 
                    color={showAdd ? 'red' : 'green'} 
                    // if showAdd function is called change the text of the button to open else display close
                    text={showAdd ? 'Close' : 'Add'} 
                    onClick={onAdd} 
                />  
            )}
        </header>
    )
}

Header.defaultProps = {
    title: 'Task Tracker'
}

Header.propTypes = {
    title: PropTypes.string.isRequired
}
export default Header
