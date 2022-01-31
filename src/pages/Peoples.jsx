import {useState, useEffect} from "react";
import axios from "axios";
import SpinnerSaber from "../components/Loading/SpinnerSaber.jsx";
import SpinnerCircle from "../components/Loading/SpinnerCircle";

const SWPeoples = () => {

    const [peoples, setPeoples] = useState([])
    const [pages, setPages] = useState([])

    const [currentPage, setCurrentPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const [linkNextPage, setLinkNextPage] = useState()
    const [linkPreviousPage, setLinkPreviousPage] = useState()

    const [searchPeople, setSearchPeople] = useState("")

    const [loading, setLoading] = useState(true)
    const [loadingCircle, setLoadingCircle] = useState(false)

    const getPeople = () => {

        axios.get(`https://swapi.dev/api/people/?page=${currentPage}`, {})
            .then((res) => {
                setPeoples(res.data.results)
                setLinkNextPage(res.data.next)
                setLinkPreviousPage(res.data.previous)
                numberPageCurrent(res.data.count)
                setLoadingCircle(false)

                timer()
            })

            .catch((error) => {
                console.log(error)
            })
    }
    const timer = setTimeout(() => {
        setLoading(false)
    }, 3000)

    const nextPage = () => {
        setLoadingCircle(true)
        axios.get(`${linkNextPage}`, {})
            .then((res) => {

                setPeoples(res.data.results)
                setLinkNextPage(res.data.next)
                setLinkPreviousPage(res.data.previous)
                let count = currentPage + 1
                setCurrentPage(count)
                setLoadingCircle(false)
            })

            .catch((error) => {
                console.log(error)
            })
    }

    const pageLoading = () => {
        setLoadingCircle(true)
        currentPage()

    }

    const previousPage = () => {
        setLoadingCircle(true)
        axios.get(`${linkPreviousPage}`, {})
            .then((res) => {
                setPeoples(res.data.results)
                setLinkPreviousPage(res.data.previous)
                let count = currentPage - 1
                setCurrentPage(count)
                setLoadingCircle(false)
            })
    }
    const search = () => {
        axios.get(`https://swapi.dev/api/people/?search=${searchPeople.searchPeople}`, {})
            .then((res) => {
                console.log(res)
                setPeoples(res.data.results)
                setLinkNextPage(res.data.next)
                numberPageCurrent(res.data.count)
                console.log(searchPeople)
            })
    }

    const numberPageCurrent = (total) => {
        const totalPages = Math.ceil(total / limit)
        const arrayPages = [];
        for (let i = 1; i <= totalPages; i++) {
            arrayPages.push(i)
        }
        setPages(arrayPages)
    }

    useEffect(() => {
        getPeople()

    }, [currentPage])

    return (
        <div style={{height: "auto"}} className="container mt-3">
            <h1 style={{fontFamily: "Roboto", fontWeight: 500}}>Personagens</h1>
            <div style={{marginBottom: 4, fontFamily: "Roboto", fontWeight: 200}} className="input-group">
                <input style={{
                    outline: "none",
                    border: "1px solid #969CB2",
                    width: "33.43%",
                    borderTopLeftRadius: "0.275rem"
                }}
                       type="text"
                       placeholder="Buscar Personagem"
                       onChange={(e) => {
                           setSearchPeople({searchPeople: e.target.value})
                       }}

                />
                <button className="btn btn-secondary"
                        type="button"
                        onClick={search}>Buscar
                </button>
            </div>
            {loadingCircle ? <SpinnerCircle loading={loadingCircle}/>
                :
                <div>
                    {loading ? <SpinnerSaber loading={loading}/> :
                        <div>
                            {peoples.map((people) => {
                                return (
                                    <span style={{fontFamily: "Roboto", fontWeight: 300}} className="card-body card my-1 col-12 col-md-6 col-lg-4 col-sm-6 d-inline-flex justify-content-around">
                                        <h1 style={{fontFamily: "Roboto", fontWeight: 400}} className="fs-3 ">{people.name}</h1>
                                        <div className="card-text">Altura: {people.height}</div>
                                        <div className="card-text">Peso: {people.mass}</div>
                                        <div className="card-text">Cor dos olhos: {people.eye_color}</div>
                                        <div className="card-text">Nascimento: {people.birth_year}</div>
                                    </span>
                                )})}
                        </div>
                    }
                </div>
            }

            <nav className="d-flex justify-content-center align-items-center my-2">
                <ul className="pagination ">
                    <li className="page-item">
                        <a className={linkPreviousPage == null ? "page-link d-none" : "page-link"}
                           style={{cursor: "pointer"}} onClick={previousPage}>Anterior</a>
                    </li>

                    <div style={{display: "inline-flex"}}>
                        {pages.map((page) => (
                            <li className={page === currentPage ? "page-item active" : "page item"}>
                                <a className='page-link d-inline-block' style={{cursor: "pointer"}} onClick={() => {
                                    setCurrentPage(page)
                                    pageLoading()
                                }}>{page}</a>
                            </li>
                        ))}
                    </div>

                    <li className="page-item">
                        <a className={linkNextPage == null ? "page-link d-none" : "page-link"}
                           style={{cursor: "pointer"}} onClick={nextPage}>Próximo</a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
export default SWPeoples