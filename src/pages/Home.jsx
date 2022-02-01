import SpinnerSaber from "../components/Loading/SpinnerSaber";

const Home = () => {

    return (
        <div style={{height:"100vh"}} className="d-flex justify-content-center align-items-center fs-1">
            <SpinnerSaber/>
            Seja bem-vindo(a) a SWAPI! <span style={{fontSize:50}}>🚀🎉</span>

        </div>
    )
}

export default Home