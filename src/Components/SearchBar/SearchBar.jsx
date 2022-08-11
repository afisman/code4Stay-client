import { Form } from "react-bootstrap"
import ContinentButton from "./ContinentButton"

const SearchBar = ({ receiveFilter }) => {

    const toggleFilter = e => {
        receiveFilter(e.target.value)
    }
    return (
        <>
            <Form.Control className='form-input' placeholder="Enter Search" onChange={toggleFilter}></Form.Control>

            <ContinentButton />
        </>
    )
}

export default SearchBar