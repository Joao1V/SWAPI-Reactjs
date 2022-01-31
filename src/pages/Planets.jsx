import {useState, useEffect} from "react";
import axios from "axios";
import {Button, Modal, Pagination} from "react-bootstrap";
import LoadingSpinner from "../components/Loading";
import {isDisabled} from "@testing-library/user-event/dist/utils";

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
    const [limit, setLimit] = useState(10)
    const [currentPage, setCurrentPage] = useState(1)

    const handleShowRes = () => setShowRes(true)
    const handleCloseRes = () => setShowRes(false)

    const handleShowFilms = () => setShowFilms(true)
    const handleCloseFilms = () => setShowFilms(false)

    const getPlanets = () => {
        axios.get(`https://swapi.dev/api/planets/?page=${currentPage}`, {})
            .then((res) => {
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
                let count = currentPage - 1
                setCurrentPage(count)

            })
    }

    const numberPageCurrent = (total) => {
      const totalPages = Math.ceil (total / limit)
        let aux = []
        for (let i = 1 ; i <= totalPages ; i++ ) {
            aux.push(i)
        }
        setPages(aux)
    }


    const nextPage = () => {
        axios.get(`${linkNextPage}`, {})
            .then ((res) => {
                setPlanets(res.data.results)
                setLinkNextPage(res.data.next)
                let count = currentPage + 1
                setCurrentPage(count)
                setLinkPreviousPage(res.data.previous)
            })
    }

    useEffect(() => {
        getPlanets()

    }, [resident, films, currentPage])


    return (
        <div className="container mt-3">
            <h1 style={{fontFamily:"Roboto", fontWeight:500}}>Planets</h1>
            {loading ? <LoadingSpinner loading={loading}/> :
                <div>
                    {planets.map((planet, i) => {
                        return (
                            <span className="card-body card my-1 col-12 col-sm-6 col-md-6 col-lg-4  d-inline-block ">

                                <div key={i} style={{fontFamily:"Roboto", fontWeight:300}}>
                                    <h1 style={{fontFamily:"Roboto", fontWeight:400}} className="fs-3">{planet.name}</h1>
                                    <p className="card-text">Population: {planet.population}</p>
                                    <p className="card-text">Climate: {planet.climate}</p>
                                    <p className="card-text">Gravity: {planet.gravity}</p>
                                    <p className="card-text">Diameter: {planet.diameter}</p>
                                    <p className="card-text">Orbital Period: {planet.orbital_period}</p>
                                </div>

                                <div className="d-flex justify-content-between mt-4">
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
                <nav className="d-flex justify-content-center align-items-center my-2">
                    <ul className="pagination">
                        <li className="page-item">
                            <a className={linkPreviousPage == null ? "page-link d-none" : "page-link"} style={{cursor:"pointer"}} onClick={previousPage}>Previous</a>
                        </li>

                        <div style={{display:"inline-flex"}}>
                            {pages.map((page) => (
                                <li className={page === currentPage ? "page-item active" : "page item"}>
                                    <a className='page-link d-inline-block'  style={{cursor:"pointer"}} onClick={() => setCurrentPage(page)}>{page}</a>
                                </li>
                            ))}
                        </div>
                            <li className="page-item">
                                <a className={linkNextPage == null ? "page-link d-none" : "page-link"} style={{cursor:"pointer"}} onClick={nextPage}>Next</a>
                            </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Planets