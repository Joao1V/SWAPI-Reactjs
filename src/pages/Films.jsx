import {useEffect, useState} from "react";
import axios from "axios"
import SpinnerSaber from "../components/Loading/SpinnerSaber.jsx";


const Films = () => {

    const [films, setFilms] = useState([])

    const [loading, setLoading] = useState(true)

    const getFilms = () => {
        axios.get(`https://swapi.dev/api/films`, {})
            .then ((res) => {
                setFilms(res.data.results)
                timer()
            })
    }

   const timer = setTimeout(() => {
        setLoading(false)
    },3000)

    useEffect(() => {
       getFilms()
    }, [])
    return (
        <div className="container mt-3">
            <h1 style={{fontFamily:"Roboto", fontWeight:500}}>Filmes</h1>
            {loading ? <SpinnerSaber loading={loading}/> :
                <div>
                    {films.map((film) => {
                        return (
                            <div style={{fontFamily:"Roboto", fontWeight:300}} className="card-body card my-1 col-12 col-lg-6 d-inline-block ">
                                <h1 style={{fontFamily:"Roboto", fontWeight:400}} className="card-text">{film.title}</h1>
                                <p className="card-text">Diretor: {film.director}</p>
                                <p className="card-text">Episódio: {film.episode_id}</p>
                                <p className="card-text">Texto de Abertura: {film.opening_crawl}</p>
                            </div>
                        )
                    })}
                </div>
            }
        </div>
    )
}

export default Films