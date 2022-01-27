import {useState, useEffect} from "react";
import axios from "axios";
import {Button, Modal} from "react-bootstrap";
import ModalResidentsPlanet from "../components/ModalResidentsPlanet";

const Planets = () => {

    const [planets, setPlanets] = useState([])
    const [show, setShow] = useState(false)
    const [resident, setResident] = useState([])
    const [residentFilter, setResidentFilter] = useState([])


    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)

    const getPlanets = () => {
        axios.get(`https://swapi.dev/api/planets`, {})
            .then((res) => {
                setPlanets(res.data.results)

            })
    }

    const getResidents = (listResidents) => {
        setResident(listResidents)

    }

    useEffect(() => {
        getPlanets()
    }, [])


    console.log(resident)

    return (
        <div className="container mt-3">
            {planets.map((planet, i) => {

                return (
                    <span
                        className="card-body card my-1 col-12 col-md-6 col-lg-4 col-sm-6 d-inline-block justify-content-around">
                        <div key={i}> #{i}
                            <h1 className="fs-3">{planet.name}</h1>
                            <p className="card-text">População: {planet.population}</p>
                            <p className="card-text">Clima: {planet.climate}</p>
                            <p className="card-text">Gravidade: {planet.gravity}</p>
                            <p className="card-text">Diâmetro: {planet.diameter}</p>
                            <p className="card-text">Período Orbital: {planet.orbital_period}</p>
                        </div>

                        <div className="d-flex justify-content-between">
                            <Button onClick={ () => {
                                getResidents(planet.residents)
                                handleShow()
                            }} variant="secondary " size="sm">Exibir Habitantes</Button>
                            <Button onClick={handleClose} variant="secondary " size="sm">Exibir Filmes</Button>
                        </div>
                    </span>

                )
            })}

                <Modal show={show} onHide={handleClose} centered aria-labelledby="contained-modal-title-vcenter" style={{boxSizing:"border-box"}}>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Habitantes
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>{resident}</p>
                        <p>{resident}</p>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={handleClose}>
                            Fechar
                        </Button>
                    </Modal.Footer>
                </Modal>

        </div>
    )
}

export default Planets