import {useEffect, UseEffect, useState, UseState} from "react"
import axios from "axios"
import LoadingSpinner from "../components/Loading";

const Starships = () => {

    const [starShips, setStarShips] = useState([])
    const [pages, setPages] = useState([])
    const [loading, setLoading] = useState(true)

    const [limit, setLimit] = useState(10)
    const [linkNextPage, setLinkNextPage] = useState()
    const [linkPreviousPage, setLinkPreviousPage] = useState()
    const [currentPage, setCurrentPage] = useState(1)

    const getStarShips = () => {
      axios.get (`https://swapi.dev/api/starships/?page=${currentPage}`, {})
          .then((res) => {
              setStarShips(res.data.results)
              setLinkNextPage(res.data.next)
              numberPageCurrent(res.data.count)
              setLoading(false)
          })
    }

    const nextPage = () => {
        axios.get(`${linkNextPage}`, {})
            .then ((res) => {
                setStarShips(res.data.results)
                setLinkNextPage(res.data.next)
                setLinkPreviousPage(res.data.previous)
            })
    }

    const previousPage = () => {
        axios.get(`${linkPreviousPage}`, {})
            .then ((res) => {
                if (linkPreviousPage === null) {
                    setCurrentPage(3)
                } else {
                    setStarShips(res.data.results)
                    setLinkNextPage(res.data.next)
                    setLinkPreviousPage(res.data.previous)
                }
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
            <h1 style={{fontFamily:"Roboto", fontWeight:500}}>Starships</h1>
            {loading ? <LoadingSpinner loading = {loading}/> :
                <div>
                    {starShips.map((ships) => {
                        return (
                            <div style={{fontFamily:"Roboto", fontWeight:300}} className="card-body card my-1 col-12 col-sm-6 col-md-6 col-lg-6  d-inline-block ">
                                <h2 style={{fontFamily:"Roboto", fontWeight:400}}>{ships.name}</h2>
                                <p>{ships.model}</p>
                                <p>Manufacturer: {ships.manufacturer}</p>
                                <p>Passengers: {ships.passengers}</p>
                                <p>Consumables: {ships.consumables}</p>
                                <p>Max Speed: {ships.max_atmosphering_speed}</p>
                            </div>
                        )
                    })}
                </div>
            }
            <nav className="d-flex justify-content-center align-items-center my-4">
                <div className="pagination ">
                    <div className="page-item">
                        <div className="page-link " style={{cursor:"pointer"}} onClick={previousPage}>Previous</div>
                    </div>
                    <div className="page-item">
                        {pages.map((page) => (
                            <div className="page-link d-inline-block " style={{cursor:"pointer"}} onClick={() => setCurrentPage(page)}>{page}</div>
                        ))}
                    </div>
                    <div className="page-item">
                        <div className="page-link d-inline-block" style={{cursor:"pointer"}} onClick={nextPage}>Next</div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Starships