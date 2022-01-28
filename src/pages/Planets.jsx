import {useState, useEffect} from "react";
import axios from "axios";
import {Button, Modal, Pagination, Spinner} from "react-bootstrap";
import { css } from "@emotion/react";

import ModalResidentsPlanet from "../components/ModalResidentsPlanet";
import {ClipLoader} from "react-spinners";
import LoadingSpinner from "../components/Loading";

const Planets = () => {

    const [planets, setPlanets] = useState([])
    const [resident, setResident] = useState([])
    const [films, setFilms] = useState([])
    const [pages, setPages] = useState([])

    const [showRes, setShowRes] = useState(false)
    const [showFilms, setShowFilms] = useState(false)
    const [loading, setLoading] = useState(true)

    const [linkNextPage, setLinkNextPage] = useState()
    const [linkPreviousPage, setLinkPreviousPage] = useState()
    const [total, setTotal] = useState(0)
    const [limit, setLimit] = useState(10)
    const [currentPage, setCurrentPage] = useState(1)

    const handleShowRes = () => setShowRes(true)
    const handleCloseRes = () => setShowRes(false)

    const handleShowFilms = () => setShowFilms(true)
    const handleCloseFilms = () => setShowFilms(false)

    const getPlanets = () => {
        axios.get(`https://swapi.dev/api/planets/?page=${currentPage}`, {})
            .then((res) => {
                console.log(res.data)
                setTotal(res.data.count)
                setLinkNextPage(res.data.next)
                numberPageCurrent(res.data.count)
                setLinkPreviousPage(res.data.previous)
                setPlanets(res.data.results)
                setLoading(false)

            }).catch(function (error) {
            console.log(error);
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

    const getFilms = (listFilms) => {
        let arrFilms = [] ;
        if (listFilms.length == 0) {
            arrFilms = [<p>Esse planeta não tem filmes!</p>]
        } else if (listFilms.length >= 1) {
            for (let i = 0 ; i < listFilms.length ; i++)
                axios.get(`${listFilms[i]}`, {})

                    .then ((res) => {
                        let auxFilms = res.data.title
                        arrFilms.push(auxFilms)

                    })
        }
        setFilms(arrFilms)
    }
    const previousPage = () => {
        axios.get(`${linkPreviousPage}`, {})
            .then ((res) => {
                setPlanets(res.data.results)
                setLinkPreviousPage(res.data.previous)
            })
    }

    const numberPageCurrent = (total) => {
      const totalPages = Math.ceil (total / limit)
        let aux = []
        for (let i = 1 ; i <= totalPages ; i++ ) {
            aux.push(i)
        }
        setPages(aux)
        console.log("passou por aq")
    }


    const nextPage = () => {
        axios.get(`${linkNextPage}`, {})
            .then ((res) => {
                setPlanets(res.data.results)
                setLinkNextPage(res.data.next)
                setLinkPreviousPage(res.data.previous)
            })
    }

    useEffect(() => {
        getPlanets()
        numberPageCurrent()
    }, [resident, films, currentPage])

    console.log(pages)
    console.log(currentPage)

    return (
        <div className="container mt-3">
            {loading ? <LoadingSpinner loading={loading}/> :
                <div>
                    {planets.map((planet, i) => {
                        return (
                            <span className="card-body card my-1 col-12 col-sm-6 col-md-6 col-lg-4  d-inline-block ">

                        <div key={i}>
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
                                handleShowRes()
                            }} variant="secondary " size="sm">Exibir Habitantes</Button>
                            <Button onClick={() => {
                                getFilms(planet.films)
                                handleShowFilms()
                            }} variant="secondary " size="sm">Exibir Filmes</Button>
                        </div>
                    </span>

                        )
                    })}
                </div>
            }

                <Modal show={showRes} onHide={handleCloseRes} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Habitantes do Planeta
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            {resident.map((residents) => <p>{residents}</p>)}
                        </div>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={handleCloseRes}>
                            Fechar
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={showFilms} onHide={handleCloseFilms} centered >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Filmes do Planeta
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            {films.map((films) => <p>{films}</p>)}
                        </div>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={handleCloseFilms}>
                            Fechar
                        </Button>
                    </Modal.Footer>
                </Modal>
            <div>
                <div style={{display:"flex", justifyContent:"center", marginTop:"12px"}}>
                   
                    <Pagination>
                        <div className="page-link " style={{cursor:"pointer"}} onClick={previousPage} >
                            Anterior
                        </div>

                        <div className="d-inline-block">
                            {pages.map((page, i) => (
                                <div id={i} className="page-link d-inline-block " onClick={() => setCurrentPage(page)}>{page}</div>
                            ))}
                        </div>

                        <div className="page-link " style={{cursor:"pointer"}} onClick={nextPage} >
                            Próximo
                        </div>
                    </Pagination>
                </div>
                    
            </div>
        </div>
    )
}

export default Planets