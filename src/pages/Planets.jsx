import {useState, useEffect} from "react";
import axios from "axios";
import {Button, Modal, Pagination} from "react-bootstrap";
import ModalResidentsPlanet from "../components/ModalResidentsPlanet";

const Planets = () => {

    const [planets, setPlanets] = useState([])
    const [show, setShow] = useState(false)
    const [resident, setResident] = useState([])

    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)

    const getPlanets = () => {
        axios.get(`https://swapi.dev/api/planets`, {})
            .then((res) => {
                setPlanets(res.data.results)

            })
    }

    const getResidents = (listResidents) => {
        let arr = []
        if (listResidents.length == 0) {
            arr = [<p style={{color:"red", margin:"auto"}}>Não existe habitantes nesse planeta</p>]
        } else if (listResidents.length >= 1) {
            for (let i = 0 ; i < listResidents.length ; i++) {

                axios.get(`${listResidents[i]}`, {})

                    .then((res) => {
                        let aux = res.data.name
                        arr.push(aux)
                    })

                    .catch((error)=> {
                        console.log(error)
                    })
            }
        }
        setResident(arr)
    }

    let active = 1;
    let items = [];
    for (let number = 1; number <= 5; number++) {
    items.push(
        <Pagination.Item key={number} active={number === active}>
        {number}
        </Pagination.Item>,
    );
}

    useEffect(() => {
        getPlanets()
    }, [resident])

    console.log(resident)

    return (
        <div className="container mt-3">
            {planets.map((planet, i) => {

                return (
                    <span
                        className="card-body card my-1 col-12 col-sm-6 col-md-6 col-lg-4  d-inline-block ">
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
                            Habitantes do Planeta
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            {resident.map((residents) => <p>{residents}</p>)}
                        </div>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={handleClose}>
                            Fechar
                        </Button>
                    </Modal.Footer>
                </Modal>
            <div>
                <div style={{display:"flex", justifyContent:"center", marginTop:"12px"}}>
                   
                    <Pagination>
                    <div className="page-link " style={{cursor:"pointer"}} >Anterior</div>
                    {items}
                    <div className="page-link " style={{cursor:"pointer"}} >Próximo</div>

                    </Pagination>
                </div>
                    
            </div>
        </div>
    )
}

export default Planets