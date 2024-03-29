import { useState, useEffect, useContext } from "react"
import { Modal, Container, Button } from 'react-bootstrap'
import projectsService from "../../Services/project.services"
import { MessageContext } from "./../../Context/userMessage.context"
import { AuthContext } from "./../../Context/auth.context"
import CreateProjectForm from "../../Components/CreateProjectForm/CreateProjectForm"
import MapGoogle from '../../Components/MapGoogle/MapGoogle'
import ProjectsList from "../../Components/ProjectsList/ProjectList"
import { ModalContext } from "../../Context/modal.context"
import './ProjectsPage.css'


const ProjectPage = () => {
    const [projects, setProjects] = useState([])
    const { openModal, closeModal, showModal } = useContext(ModalContext)
    const { setShowMessage } = useContext(MessageContext)
    const { user } = useContext(AuthContext)

    useEffect(() => {
        loadProjects()
    }, [])


    const loadProjects = () => {
        projectsService
            .getProjects()
            .then(({ data }) => {
                setProjects(data)
            })
            .catch(err => console.log(err))
    }


    const fireFinalActions = () => {
        closeModal()
        loadProjects()
        setShowMessage({ show: true, title: 'Completed', text: 'Project created' })
    }

    return (
        <Container>
            <div className="d-none d-md-block">
                <MapGoogle projects={projects} />
            </div>

            <h1>Browse through our opportunities </h1>
            <div>
                {user &&
                    <Button className='create-button' onClick={openModal} href="#">Create project</Button>
                }
            </div>
            <br />

            <ProjectsList projects={projects} />

            <Modal className='modal-form' show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>New project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CreateProjectForm fireFinalActions={fireFinalActions} />
                </Modal.Body>
            </Modal>

        </Container>
    )
}

export default ProjectPage