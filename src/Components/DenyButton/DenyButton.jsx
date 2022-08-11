import { Button } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import projectsService from '../../Services/project.services'
import './DenyButton.css'

const DenyButton = ({ user_id, owner_id }) => {

    const navigate = useNavigate()
    const handleClick = () => {
        projectsService
            .denyProject(user_id)
            .then(({ data }) => { navigate(`/users/profile/${owner_id}`) })
            .catch(err => console.log(err))
    }
    return (
        <Button id='deny-button' size="md" variant="danger" onClick={handleClick}>Deny</Button>
    )
}

export default DenyButton