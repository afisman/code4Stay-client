import { Form, Button, Row, Col } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import projectsService from './../../Services/project.services'
import uploadService from './../../Services/upload.services'
import { useParams } from 'react-router-dom'
import MealsCheckbox from './MealsCheckbox'
import './EditProjectForm.css'


const EditProjectForm = ({ fireFinalActions }) => {

    const { project_id } = useParams()

    const [projectData, setProjectData] = useState({
        site: '',
        projectType: '',
        city: '',
        country: '',
        continent: '',
        location: { coordinates: [] },
        description: '',
        hoursPerWeek: '',
        minWeeks: '',
        shelterType: '',
        mealsIncluded: [],
        gallery: [],
        languagesSpoken: '',
        testimonials: []

    })
    const [mealsChecked, setMealsChecked] = useState([])

    const loadProject = () => {

        projectsService
            .getOneProject(project_id)
            .then(({ data }) => {
                setMealsChecked(data.mealsIncluded)
                setProjectData(data)
            })
            .catch(err => console.log(err))
    }

    const receiveMeals = data => {
        setMealsChecked(data)
    }

    const handleChange = e => {

        const { value, name, type, checked } = e.target
        const inputValue = type === 'checkbox' ? checked : value
        const currentMeals = [...mealsChecked]

        const mealIndex = currentMeals.indexOf(name)

        if (type === 'checkbox' && checked && !mealsChecked.includes(name)) {
            currentMeals.push(name)

        } else if (mealsChecked.includes(name) && !checked) {

            mealIndex > -1 && currentMeals.splice(mealIndex, 1)

        }
        setProjectData({
            ...projectData, mealsIncluded: currentMeals,
            location: { coordinates: [latitude, longitude] }, [name]: inputValue
        })
    }

    const handleSubmit = e => {
        e.preventDefault()

        projectsService
            .editProject(project_id, projectData)
            .then(() => {
                fireFinalActions()
            })
            .catch(ERR => console.error(ERR))
    }

    const handleMultipleFilesInput = e => {
        const formData = new FormData()

        for (let i = 0; i < e.target.files.length; i++) {
            formData.append('multipleImagesData', e.target.files[i])
        }

        uploadService
            .uploadMultipleImages(formData)
            .then(({ data }) => {
                setProjectData({ ...projectData, gallery: data.cloudinary_urls })
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {

        loadProject()
    }, [])

    useEffect(() => {
        setProjectData({ ...projectData, mealsIncluded: mealsChecked })
    }, [mealsChecked])

    const { city, country, continent, latitude, longitude, projectName, projectType,
        hoursPerWeek, description, minWeeks,
        shelterType, languagesSpoken } = projectData

    return (
        <Form onSubmit={handleSubmit}>
            <h1>Edit Project</h1>
            <Form.Group className='mb-3' controlId='projectName'>
                <Form.Label>Project name</Form.Label>
                <Form.Control className='form-input' type='text' value={projectName}
                    onChange={handleChange} name='projectName' />
            </Form.Group>

            <Row>
                <Col>

                    <Form.Group className='mb-3' controlId='continent'>
                        <Form.Label>Continent</Form.Label>
                        <Form.Select className='form-input' aria-label="Default select example"
                            value={continent} name='continent' onChange={handleChange}>
                            <option value={'Africa'}>Africa</option>
                            <option value={'Americas'}>Americas</option>
                            <option value={'Asia'}>Asia</option>
                            <option value={'Europe'}>Europe</option>
                            <option value={'Oceania'}>Oceania</option>
                        </Form.Select>
                    </Form.Group>

                </Col>

                <Col>

                    <Form.Group className='mb-3' controlId='city'>
                        <Form.Label>City</Form.Label>
                        <Form.Control className='form-input' type='text' value={city}
                            onChange={handleChange} name='city' />
                    </Form.Group>

                </Col>

                <Col>

                    <Form.Group className='mb-3' controlId='country'>
                        <Form.Label>Country</Form.Label>
                        <Form.Control className='form-input' type='text' value={country}
                            onChange={handleChange} name='country' />
                    </Form.Group>
                </Col>

            </Row>

            <Row>

                <Col>

                    <Form.Group className='mb-3' controlId='latitude'>
                        <Form.Label>Latitude</Form.Label>
                        <Form.Control className='form-input' type='text' value={latitude}
                            onChange={handleChange} name='latitude' />
                    </Form.Group>

                </Col>

                <Col>

                    <Form.Group className='mb-3' controlId='longitude'>
                        <Form.Label>Longitude</Form.Label>
                        <Form.Control className='form-input' type='text' value={longitude}
                            onChange={handleChange} name='longitude' />
                    </Form.Group>
                </Col>

            </Row>

            <Form.Group className='mb-3' controlId='description'>
                <Form.Label>Description</Form.Label>
                <Form.Control className='form-input' type='text' value={description}
                    onChange={handleChange} name='description' />
            </Form.Group>

            <Row>

                <Col>

                    <Form.Group className='mb-3' controlId='projectType'>
                        <Form.Label>Project type</Form.Label>
                        <Form.Select className='form-input' aria-label="Default select example" name='projectType'
                            value={projectType} onChange={handleChange}>
                            <option value={'Farm'}>Farm</option>
                            <option value={'NGO'}>NGO</option>
                            <option value={'School'}>School</option>
                            <option value={'Hostel'}>Hostel</option>
                            <option value={'Camping'}>Camping</option>
                            <option value={'Other'}>Other</option>
                        </Form.Select>
                    </Form.Group>

                </Col>

                <Col>

                    <Form>
                        <MealsCheckbox receiveMeals={receiveMeals} mealsChecked={mealsChecked} />
                    </Form>

                </Col>

                <Col>
                    <Form.Group className='mb-3' controlId='hoursPerWeek'>
                        <Form.Label>Hours per week</Form.Label>
                        <Form.Control className='form-input' type='number' value={hoursPerWeek} onChange={handleChange} name='hoursPerWeek' />
                    </Form.Group>
                </Col>

                <Col>
                    <Form.Group className='mb-3' controlId='minWeeks'>
                        <Form.Label>Minimum weeks</Form.Label>
                        <Form.Control className='form-input' type='number' value={minWeeks} onChange={handleChange} name='minWeeks' />
                    </Form.Group>
                </Col>

            </Row>

            <Form.Group className='mb-3' controlId='shelterType'>
                <Form.Label>Shelter type</Form.Label>
                <Form.Control className='form-input' type='text' value={shelterType} onChange={handleChange} name='shelterType' />
            </Form.Group>

            <Form.Group className='mb-3' controlId='gallery'>
                <Form.Label>Photos (Files)</Form.Label>
                <Form.Control className='form-input' type='file' onChange={handleMultipleFilesInput} name='gallery' multiple />
            </Form.Group>

            <Form.Group className='mb-3' controlId='languagesSpoken'>
                <Form.Label>Languages spoken</Form.Label>
                <Form.Control className='form-input' type='text' value={languagesSpoken} onChange={handleChange} name='languagesSpoken' />
            </Form.Group>

            <div className='d-grid form-button'>
                <Button id='edit-button' variant='dark' type='submit'>Edit project</Button>
            </div>

        </Form>
    )
}

export default EditProjectForm