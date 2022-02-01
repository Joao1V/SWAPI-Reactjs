import {useEffect, UseEffect, useState, UseState} from "react"
import axios from "axios"
import SpinnerSaber from "../components/Loading/SpinnerSaber.jsx";
import SpinnerCircle from "../components/Loading/SpinnerCircle";

const Starships = () => {

    const [starShips, setStarShips] = useState([])
    const [pages, setPages] = useState([])
    const [loading, setLoading] = useState(true)
    const [loadingCircle, setLoadingCircle] = useState(false)

    const [limit, setLimit] = useState(10)
    const [linkNextPage, setLinkNextPage] = useState()
    const [linkPreviousPage, setLinkPreviousPage] = useState()
    const [currentPage, setCurrentPage] = useState(1)

    const getStarShips = () => {
      axios.get (`https://swapi.dev/api/starships/?page=${currentPage}`, {})
          .then((res) => {
              setStarShips(res.data.results)
              setLinkNextPage(res.data.next)
              setLinkPreviousPage(res.data.previous)
              numberPageCurrent(res.data.count)
              setLoadingCircle(false)
              timer()
          })
    }
    const timer = setTimeout(() => {
        setLoading(false)
    }, 3000)

    const nextPage = () => {
        setLoadingCircle(true)
        axios.get(`${linkNextPage}`, {})
            .then ((res) => {
                setStarShips(res.data.results)
                setLinkNextPage(res.data.next)
                let count = currentPage + 1
                setCurrentPage(count)
                setLinkPreviousPage(res.data.previous)
                setLoadingCircle(false)
            })
    }

    const pageLoading = () => {
        setLoadingCircle(true)
        currentPage()
        setLoadingCircle(false)
    }

    const previousPage = () => {
        setLoadingCircle(true)
        axios.get(`${linkPreviousPage}`, {})
            .then ((res) => {
                setStarShips(res.data.results)
                setLinkNextPage(res.data.next)
                let count = currentPage - 1
                setCurrentPage(count)
                setLinkPreviousPage(res.data.previous)
                setLoadingCircle(false)
            })
    }

    const numberPageCurrent = (total) => {
        const totalPages = Math.ceil(total/limit)
        let arrayShips = []
        for (let i = 1 ; i <= totalPages ; i++) {
            arrayShips.push(i)
        }
        setPages(arrayShips)
    }

    useEffect(() =>{
        getStarShips()
    }, [currentPage])
    console.log(currentPage)
    return (
        <div className="container mt-3">
            <h1 style={{fontFamily:"Roboto", fontWeight:500}}>Naves Espaciais</h1>
            {loadingCircle ? <SpinnerCircle/> :
                <div>
                    {loading ? <SpinnerSaber loading = {loading}/> :
                        <div>
                            {starShips.map((ships) => {
                                return (
                                    <div style={{fontFamily:"Roboto", fontWeight:300}} className="card-body card my-1 col-12 col-lg-6  d-inline-block ">
                                        <h2 style={{fontFamily:"Roboto", fontWeight:400}}>{ships.name}</h2>
                                        <p>Modelo: {ships.model}</p>
                                        <p>Fabricante: {ships.manufacturer}</p>
                                        <p>Passageiros: {ships.passengers}</p>
                                        <p>Consumíveis: {ships.consumables}</p>
                                        <p>Velocidade Máxima: {ships.max_atmosphering_speed}</p>
                                    </div>
                                )
                            })}
                        </div>
                    }
                </div>
            }
            <nav className="d-flex justify-content-center align-items-center my-4">
                <ul className="pagination ">
                    <li className="page-item">
                        <a className={linkPreviousPage === null  ? "page-link d-none" : "page-link"} style={{cursor:"pointer"}} onClick={previousPage}>Anterior</a>
                    </li>
                    <div style={{display:"inline-flex"}}>
                        {pages.map((page) => (
                            <li className={page === currentPage ? "page-item active" : "page item"}>
                                <a className='page-link d-inline-block'  style={{cursor:"pointer"}} onClick={() => {
                                    setCurrentPage(page)
                                    pageLoading()
                                }}>{page}</a>
                            </li>
                        ))}
                    </div>
                    <li className="page-item">
                        <a className={linkNextPage == null ? "page-link d-none" : "page-link"} style={{cursor:"pointer"}} onClick={nextPage}>Próximo</a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Starships