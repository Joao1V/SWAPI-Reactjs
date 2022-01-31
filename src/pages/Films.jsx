import {useEffect, UseEffect, useState} from "react";
import axios from "axios"
import LoadingSpinner from "../components/Loading";


const Films = () => {

    const [films, setFilms] = useState([])

    const [loading, setLoading] = useState(true)

    const getFilms = () => {
        axios.get(`https://swapi.dev/api/films`, {})
            .then ((res) => {
                setFilms(res.data.results)
                setLoading(false)
            })
    }

    useEffect(() => {
       getFilms()
    }, [])
    return (
        <div className="container mt-3">
            <h1 style={{fontFamily:"Roboto", fontWeight:500}}>Films</h1>
            {loading ? <LoadingSpinner loading={loading}/> :
                <div>
                    {films.map((film) => {
                        return (
                            <div style={{fontFamily:"Roboto", fontWeight:300}} className="card-body card my-1 col-12 col-sm-6 col-md-6 col-lg-6 d-inline-block ">
                                <h1 style={{fontFamily:"Roboto", fontWeight:400}} className="card-text">{film.title}</h1>
                                <p className="card-text">Director: {film.director}</p>
                                <p className="card-text">Episode: {film.episode_id}</p>
                                <p className="card-text">Opening Crawl: {film.opening_crawl}</p>
                            </div>
                        )

                    })}
                </div>
            }
        </div>
    )
}

export default Films