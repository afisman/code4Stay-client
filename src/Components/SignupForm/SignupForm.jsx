import { useContext, useState } from "react"
import { Form, Button } from "react-bootstrap"
import { useNavigate } from 'react-router-dom'
import { MessageContext } from "../../Context/userMessage.context"
import authService from "./../../Services/auth.services"
import './SignupForm.css'

const SignupForm = () => {
    const [signupData, setSignupData] = useState({
        username: '',
        email: '',
        password: ''

    })

    const { setShowMessage } = useContext(MessageContext)

    const navigate = useNavigate()

    const handleInputChange = e => {
        const { value, name } = e.target
        setSignupData({ ...signupData, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault()

        authService
            .signup(signupData)
            .then(({ data }) => {
                setShowMessage({ show: true, title: `Welcome ${data.user.username}`, text: 'You have registered correctly' })
                navigate('/')
            })
            .catch(err => console.log(err))
    }

    const { username, password, email } = signupData

    return (
        <Form onSubmit={handleSubmit}>

            <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control className='form-input' type="text" value={username} onChange={handleInputChange} name="username" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control className='form-input' type="password" value={password} onChange={handleInputChange} name="password" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control className='form-input' type="email" value={email} onChange={handleInputChange} name="email" />
            </Form.Group>

            <div className="d-grid">
                <Button id='signup-button' variant="dark" type="submit">Register</Button>
            </div>

        </Form>
    )
}

export default SignupForm