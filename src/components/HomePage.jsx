import {useState, useEffect, useRef} from "react";
import axios from "axios";

const HomePage = () => {

  const [peoples, setPeoples] = useState([])
    const [linkNextPage, setLinkNextPage] = useState()
    const [linkPreviousPage, setLinkPreviousPage] = useState()
    const [total, setTotal] =useState(0)
    const [limit, setLimit] = useState(10)
    const [pages, setPages] = useState([])
    let [currentPage, setCurrentPage] = useState(1)

    const getPeople = () => {
        axios.get(`https://swapi.dev/api/people/?page=${currentPage}`, {})
            .then ( (res) => {
                setPeoples(res.data.results)
                setLinkNextPage(res.data.next)
                setTotal(res.data.count)
                numberPageCurrent(res.data.count)
                console.log(res)
            })

            .catch((error) => {
                console.log(error)
            })
    }

    const nextPage= () => {
        axios.get(`${linkNextPage}`, {})
            .then ((res) => {
                setPeoples(res.data.results)
                setLinkNextPage(res.data.next)
                setLinkPreviousPage(res.data.previous)
                console.log(res)
            })

            .catch((error) => {
                console.log(error)
            })
    }

    const previousPage = () => {
        axios.get(`${linkPreviousPage}`, {})
            .then ((res) => {
                setPeoples(res.data.results)
                setLinkPreviousPage(res.data.previous)

            })
    }
    const indexPaginate =() => {
        axios.get(`https://swapi.dev/api/people/?page=${currentPage}`)
    }

    const numberPageCurrent = (total) => {
        const totalPages = Math.ceil(total / limit)
        const arrayPages= [] ;
        for (let i = 1 ; i <= totalPages ; i++) {
            arrayPages.push(i)
        }
        setPages(arrayPages)

    }

    useEffect(() => {
        getPeople()

    },[currentPage])

    return (
        <div className="container">
            <h1 className="d-flex justify-content-center bg-black w-100 text" style={{color:"#f9e813"}}>Star Wars</h1>
                {peoples.map((people) => {
                    return (
                        <span className="card-body card my-1 col-12 col-md-6 col-lg-4 col-sm-6 d-inline-block justify-content-around" >
                            <h1 className="fs-3 ">{people.name}</h1>
                            <div className="card-text">Altura: {people.height}</div>
                            <div className="card-text">Peso: {people.mass}</div>
                            <div className="card-text">Cor dos olhos: {people.eye_color}</div>
                            <div className="card-text">Data de nascimento: {people.birth_year}</div>
                        </span>
                    )
                })}
            <nav className="d-flex justify-content-center align-items-center my-4">
                <div className="pagination ">
                    <div className="page-item">
                        <div className="page-link " style={{cursor:"pointer"}} onClick={previousPage}>Anterior</div>
                    </div>
                    <div className="page-item">
                        {pages.map((page) => (
                            <div className="page-link d-inline-block " style={{cursor:"pointer"}} key={page} onClick={() => setCurrentPage(page)}>{page}</div>
                        ))}
                    </div>
                    <div className="page-item">
                        <div className="page-link d-inline-block" style={{cursor:"pointer"}} onClick={nextPage}>Próximo</div>
                    </div>
                </div>
            </nav>
        </div>
    )
}
export default HomePage