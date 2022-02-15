import React, {useEffect, useState} from 'react';
import api from "../utils/galleryApi";
import {Card, Col, Modal, Row} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import InsideAlbum from "./insideAlbum";

export default function Albums(props) {

    const [cards, setCards] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [albumIdForModal, setAlbumIdForModal] = useState('')

    async function getAlbums() {
        const response = await api.get('/albums')
        setCards(response.data);
    }

    useEffect(() => {
            getAlbums().catch(console.error)
        },
        [])


    return <Row className='mt-5 ms-5'>
        <header className='h1 mb-5'> Gallery</header>
        {
            cards.map((card) => {
                return (
                    <Col key={card.id} className="mb-5">
                        <Card className='bg-info' style={{width: '20rem', height: '10rem'}}
                              onClick={() => {
                                  setShowModal(true);
                                  setAlbumIdForModal(card.id)
                              }}>
                            <Card.Body>
                                <Card.Title>Album {card.id}</Card.Title>
                                <Card.Text className='pt-4'>{card.title}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                )
            })
        }
        <Modal show={showModal} size="xl"
               onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Photos</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <InsideAlbum albumid={albumIdForModal}/>
            </Modal.Body>
        </Modal>
    </Row>;
}
