import {useState, useEffect} from "react";
import axios from "axios"
import {Button, Modal} from "react-bootstrap";
import SpinnerSaber from "../components/Loading/SpinnerSaber.jsx";
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
                timer()
            })
    }

    const timer = setTimeout(() => {
        setLoading(false)
    }, 3000)

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
            <h1 style={{fontFamily:"Roboto", fontWeight:500}}>Espécies</h1>
            {loading ? <SpinnerSaber loading={loading}/> :
                <div>
                    {species.map((specie, i) => {
                        return (
                            <div style={{boxSizing:"border-box"}} className="card-body card my-1 col-12 col-sm-6 col-md-6 col-xl-4 d-inline-block">
                                <div style={{fontFamily:"Roboto", fontWeight:300}} key={i}>
                                    <h1 style={{fontFamily:"Roboto", fontWeight:400}} className="fs-3">{specie.name}</h1>
                                    <p  className="card-text">Língua: {specie.language}</p>
                                    <p className="card-text">Classificação: {specie.classification}</p>
                                    <p className="card-text">Designação: {specie.designation}</p>
                                    <p className="card-text">Altura média: {specie.average_height}</p>
                                    <p className="card-text">Média de vida: {specie.average_lifespan}</p>
                                    <p className="card-text">Cor dos cabelos: {specie.hair_colors}</p>
                                    <p className="card-text">Cor dos olhos: {specie.eye_colors}</p>
                                    <p className="card-text">Cor da pele: {specie.skin_colors}</p>
                                </div>
                                <div className="d-flex justify-content-between mt-4">
                                    <Button onClick={ () => {
                                        getCharacter(specie.people)
                                        handleShowChar()
                                    }} variant="secondary" size="sm">Exibir Personagens</Button>
                                    <Button onClick={() => {
                                        getFilms(specie.films)
                                        handleShowFilms()
                                    }} variant="secondary " size="sm">Filmes</Button>
                                </div>
                        </div>
                        )
                    })}
                </div>
            }
            <Modal show={showChar} onHide={handleCloseChar} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Personagens</Modal.Title>
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
                    <Modal.Title>Personagens do Filme</Modal.Title>
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