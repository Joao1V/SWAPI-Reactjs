import {useState, useEffect} from "react";
import axios from "axios"
import {Button, Modal} from "react-bootstrap";
import LoadingSpinner from "../components/Loading";
import planets from "./Planets";

const Species = () => {

    const [species, setSpecies] = useState([])
    const [characters, setCharacters] = useState([])
    const [films, setFilms] = useState([])

    const [loading, setLoading] = useState(true)
    const [showChar, setShowChar] = useState(false)
    const [showFilms, setShowFilms] = useState(false)

    const handleShowChar = () => setShowChar(true)
    const handleCloseChar = () => setShowChar (false)

    const handleShowFilms = () => setShowFilms(true)
    const handleCloseFilms = () =>setShowFilms(false)

    const getSpecies = () => {
        axios.get(`https://swapi.dev/api/species`, {})
            .then((res) => {
                setSpecies(res.data.results)
                setLoading(false)
            })
    }

    const getCharacter = (listChar) => {

        let auxChar = []
        for (let i = 0 ; i < listChar.length ; i++ ) {
            axios.get(`${listChar[i]}`, {})
                .then ((res) =>{
                    let aux = res.data.name
                    auxChar.push(aux)
                })

                .catch((e) => {
                    console.log(e)
                })
        }
        setCharacters(auxChar)
        console.log(auxChar)
    }

    const getFilms = (listFilms) => {
        let auxFilms = []
        for (let i = 0 ; i < listFilms.length ; i++) {
            axios.get(`${listFilms[i]}`, {})
                .then ((res) => {
                    let auxF= res.data.title
                    auxFilms.push(auxF)
                })
        }
        setFilms(auxFilms)
        console.log(listFilms)
    }

    useEffect(() => {
        getSpecies()
    }, [characters, films])
    return (
        <div className="container mt-3">
            <h1 style={{fontFamily:"Roboto", fontWeight:500}}>Species</h1>
            {loading ? <LoadingSpinner loading={loading}/> :
                <div>
                    {species.map((specie, i) => {
                        return (
                            <span className="card-body card my-1 col-12 col-sm-6 col-md-6 col-lg-4  d-inline-block ">
                                <div style={{fontFamily:"Roboto", fontWeight:300}} key={i}>
                                    <h1 style={{fontFamily:"Roboto", fontWeight:400}} className="fs-3">{specie.name}</h1>
                                    <p  className="card-text">Language: {specie.language}</p>
                                    <p className="card-text">Classification: {specie.classification}</p>
                                    <p className="card-text">Designation: {specie.designation}</p>
                                    <p className="card-text">Average Height: {specie.average_height}</p>
                                    <p className="card-text">Average Lifespan: {specie.average_lifespan}</p>
                                    <p className="card-text">Hair Color: {specie.hair_colors}</p>
                                    <p className="card-text">Eye Colors: {specie.eye_colors}</p>
                                    <p className="card-text">Skin Colors: {specie.skin_colors}</p>
                                </div>
                                <div className="d-flex justify-content-between mt-4">
                                    <Button onClick={ () => {
                                        getCharacter(specie.people)
                                        handleShowChar()
                                    }} variant="secondary" size="sm">Characters</Button>
                                    <Button onClick={() => {
                                        getFilms(specie.films)
                                        handleShowFilms()
                                    }} variant="secondary " size="sm">Movies</Button>
                                </div>
                        </span>
                        )
                    })}
                </div>
            }
            <Modal show={showChar} onHide={handleCloseChar} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Characters</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        {characters.map((character) => <p>{character}</p>)}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleCloseChar}>Fechar</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showFilms} onHide={handleCloseFilms} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Characters Movies</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        {films.map((film) => <p>{film}</p>)}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleCloseFilms}>Fechar</Button>
                </Modal.Footer>
            </Modal>

        </div>
    )
}

export default Species