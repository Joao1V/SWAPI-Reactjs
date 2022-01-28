import {useState, useEffect, useRef} from "react";
import axios from "axios";
import LoadingSpinner from "../components/Loading";

const SWPeoples = () => {

    const [peoples, setPeoples] = useState([])
    const [pages, setPages] = useState([])

    const [currentPage, setCurrentPage] = useState(1)
    const [total, setTotal] =useState(0)
    const [limit, setLimit] = useState(10)
    const [linkNextPage, setLinkNextPage] = useState()
    const [linkPreviousPage, setLinkPreviousPage] = useState()

    const [searchPeople, setSearchPeople] = useState("")

    const [loading, setLoading] = useState(true)

    const getPeople = () => {
        axios.get(`https://swapi.dev/api/people/?page=${currentPage}`, {})
            .then ( (res) => {
                setPeoples(res.data.results)
                setLinkNextPage(res.data.next)

                numberPageCurrent(res.data.count)
                setLoading(false)

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
    const search = () => {
        axios.get(`https://swapi.dev/api/people/?search=${searchPeople.searchPeople}`, {})
            .then ( (res) => {
                console.log(res)
                setPeoples(res.data.results)
                setLinkNextPage(res.data.next)
                numberPageCurrent(res.data.count)
                console.log(searchPeople)
            })
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
        <div className="container mt-3">
            <div style={{marginBottom:4}} className="input-group">
                <input style={{outline:"none",
                    border:"1px solid #969CB2",
                    width:"33.43%",
                    borderTopLeftRadius:"0.275rem"}}
                       type="text"
                       placeholder="Busque seu personagem"
                       onChange={(e) => {setSearchPeople({searchPeople: e.target.value})}}

                />
                <button className="btn btn-secondary"
                        type="button"
                        onClick={search}>Procurar</button>
            </div>
            {loading ? <LoadingSpinner loading={loading}/> :
                <div>
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
                </div>
            }

            <nav className="d-flex justify-content-center align-items-center my-4">
                <div className="pagination ">
                    <div className="page-item">
                        <div className="page-link " style={{cursor:"pointer"}} onClick={previousPage}>Anterior</div>
                    </div>
                    <div className="page-item">
                        {pages.map((page) => (
                            <div className="page-link d-inline-block " style={{cursor:"pointer"}} onClick={() => setCurrentPage(page)}>{page}</div>
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
export default SWPeoples