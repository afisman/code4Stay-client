import { Carousel, Container } from 'react-bootstrap'
import './HomePage.css'

const HomePage = () => {
    return (
        <Container>
            <Carousel>
                <Carousel.Item>
                    <img
                        className="d-inline w-100 carousel-img"
                        src="https://images.unsplash.com/photo-1590856029620-9b5a4825d3be?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1473&q=80"
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h1 className='mb-5 carousel-text'>code4stay slide 1</h1>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-inline w-100 carousel-img"
                        src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                        alt="Second slide"
                    />

                    <Carousel.Caption>
                        <h1 className='mb-5 carousel-text'>code4stay slide 2</h1>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-inline w-100 carousel-img"
                        src="https://images.unsplash.com/photo-1539635278303-d4002c07eae3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                        alt="Third slide"
                    />

                    <Carousel.Caption>
                        <h1 className='mb-5 carousel-text'>code4stay slide 3</h1>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-inline w-100 carousel-img"
                        src="https://images.unsplash.com/photo-1503457574462-bd27054394c1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                        alt="Third slide"
                    />

                    <Carousel.Caption>
                        <h1 className='mb-5 carousel-text'>code4stay slide 4</h1>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </Container>
    )
}

export default HomePage