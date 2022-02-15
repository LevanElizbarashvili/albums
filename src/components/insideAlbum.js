import React, {useEffect, useState} from "react";
import api from "../utils/galleryApi";
import {Col, Modal, Row} from "react-bootstrap";
import SinglePhoto from "./singlePhoto";

export default function InsideAlbum(props) {

    const [photos, setPhotos] = useState([]);
    const [photoModalShow, setPhotoModalShow] = useState(false);
    const [photoUrlForModal, setPhotoUrlForModal] = useState('');


    async function getPhotos() {
        const res = await api.get(`/photos?albumId=${props.albumid}`)
        setPhotos(res.data)
    }

    useEffect(() => {
        getPhotos().catch(console.error)
    }, [props.albumid])


    return <Row className='mt-3 ms-3 grid'>

        {
            photos.map((photo) => {
                return (
                    <Col key={photo.id} className="mb-5">
                        {
                            <div>
                                <img src={photo.url}
                                     alt="thumbnail" width="250" className="mt-1"
                                     onClick={() => {
                                         setPhotoModalShow(true);
                                         setPhotoUrlForModal(photo.url)
                                     }}/>
                                {photo.title}
                            </div>
                        }
                    </Col>
                )
            })
        }
        <Modal show={photoModalShow} size={"lg"}
               onHide={() => setPhotoModalShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Photo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <SinglePhoto photoUrl={photoUrlForModal}/>
            </Modal.Body>
        </Modal>
    </Row>;
}