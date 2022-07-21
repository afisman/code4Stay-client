import { useContext, useState } from "react"
import { Form, Button, Container, Row, Col } from "react-bootstrap"
import { useNavigate, useParams } from 'react-router-dom'
import { MessageContext } from "../../Context/userMessage.context"
import userService from "./../../Services/user.services"
import uploadService from './../../Services/upload.services'
import { useEffect } from "react"



const UserEditForm = () => {

    const { user_id } = useParams()
    const [editData, setEditData] = useState({
        username: '',
        email: '',
        password: '',
        bio: '',
        role: '',
        projectTypeInterests: '',
        locationInterests: '',
        profilePicture: '',
    })

    const { setShowMessage } = useContext(MessageContext)

    const navigate = useNavigate()

    useEffect(() => {
        loadUser()
    }, [])

    const loadUser = () => {
        userService
            .getUser(user_id)
            .then(({ data }) => {
                setEditData(data)
            })
            .catch(err => console.log(err))
    }

    const handleInputChange = e => {
        const { value, name } = e.target
        setEditData({ ...editData, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault()
        userService
            .editUser(user_id, editData)
            .then(({ data }) => {
                console.log(data)
                navigate(`/users/profile/${user_id}`)
            })
            .catch(err => console.log(err))
    }

    const handleFileInput = e => {
        const formData = new FormData()
        formData.append('imageData', e.target.files[0])
        uploadService
            .uploadImage(formData)
            .then(({ data }) => {
                const fileToUpload = data.cloudinary_url
                setEditData({ ...editData, gallery: fileToUpload })
            })
            .catch(err => console.log(err))
    }
    console.log(editData)
    const { username, email, bio, role, projectTypeInterests, locationInterests } = editData
    return (

        <Container>
            <Form onSubmit={handleSubmit}>
                <h1>Edit profile</h1>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" value={username} onChange={handleInputChange} name="username" />
                        </Form.Group>
                    </Col>
                    {/* <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value={password} onChange={handleInputChange} name="password" />
                </Form.Group> */}
                    <Col>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" value={email} onChange={handleInputChange} name="email" />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className='mb-3' controlId='role'>
                            <Form.Label>Type of user</Form.Label>
                            <Form.Select aria-label="Default select example" name='role' onChange={handleInputChange}>
                                <option value={'VOLUNTEER'}>Volunteer</option>
                                <option value={'HOST'}>Host</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group className="mb-3" controlId="bio">
                    <Form.Label>Bio</Form.Label>
                    <Form.Control type="bio" value={bio} onChange={handleInputChange} name="bio" />
                </Form.Group>
                <Row>
                    <Col>
                        <Form>
                            <Form.Group className='mb-3' controlId='projectTypeInterests' name='projectTypeInterests' onChange={handleInputChange}>
                                <Form.Label>Project interests</Form.Label>
                                <div key={`inline-checkbox`} className="mb-3">
                                    <Form.Check
                                        inline
                                        label="Farm"
                                        name="Farm"
                                        type={`checkbox`}
                                        id={"Farm"}
                                    />
                                    <Form.Check
                                        inline
                                        label="NGO"
                                        name="NGO"
                                        type={`checkbox`}
                                        id={"NGO"}
                                    />
                                    <Form.Check
                                        inline
                                        label="School"
                                        name="School"
                                        type={`checkbox`}
                                        id={"School"}
                                    />
                                    <Form.Check
                                        inline
                                        label="Hostel"
                                        name="Hostel"
                                        type={`checkbox`}
                                        id={"Hostel"}
                                    />
                                    <Form.Check
                                        inline
                                        label="Camping"
                                        name="Camping"
                                        type={`checkbox`}
                                        id={"Camping"}
                                    />
                                    <Form.Check
                                        inline
                                        label="Other"
                                        name="Other"
                                        type={`checkbox`}
                                        id={"Other"}
                                    />
                                </div>
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col>
                        <Form>
                            <Form.Group className='mb-3' controlId='locationInterests' name='locationInterests' onChange={handleInputChange}>
                                <Form.Label>Region interests</Form.Label>
                                <div key={`inline-checkbox`} className="mb-3">
                                    <Form.Check
                                        inline
                                        label="Americas"
                                        name="Americas"
                                        type={`checkbox`}
                                        id={"Americas"}
                                    />
                                    <Form.Check
                                        inline
                                        label="Europe"
                                        name="Europe"
                                        type={`checkbox`}
                                        id={"Europe"}
                                    />
                                    <Form.Check
                                        inline
                                        label="Asia"
                                        name="Asia"
                                        type={`checkbox`}
                                        id={"Asia"}
                                    />
                                    <Form.Check
                                        inline
                                        label="Africa"
                                        name="Africa"
                                        type={`checkbox`}
                                        id={"Africa"}
                                    />
                                    <Form.Check
                                        inline
                                        label="Oceania"
                                        name="Oceania"
                                        type={`checkbox`}
                                        id={"Oceania"}
                                    />
                                </div>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
                <Form.Group className='mb-3' controlId='profilePicture'>
                    <Form.Label>Profile picture (File)</Form.Label>
                    <Form.Control type='file' onChange={handleFileInput} name='profilePicture' />
                </Form.Group>
                <div className="d-grid">
                    <Button variant="dark" type="submit">Update user information</Button>
                </div>
            </Form>
        </Container>
    )
}
export default UserEditForm