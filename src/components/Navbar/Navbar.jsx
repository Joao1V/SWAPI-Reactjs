import {Navbar, Nav, Container } from "react-bootstrap";
import Logo from "../../images/icons8-stormtrooper.svg"
import {Link} from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import {RiAliensLine} from "react-icons/ri";
import {BiPlanet} from "react-icons/bi";
import {BiCameraMovie} from "react-icons/bi";
import {ImReddit} from "react-icons/im";
import {IoRocketOutline} from "react-icons/io5";


const NavbarComp = () => {
    return(
        <div>
            <Navbar bg="dark" variant={"dark"} expand="lg" >
                <Container>
                        <Navbar.Brand style={{cursor:"context-menu", color:"#f9e813", display:"flex", alignItems:"center"}}>
                            <img style={{ width:75}} src={Logo}/>
                            <span>Star Wars</span>
                        </Navbar.Brand>
                    <Navbar.Toggle style={{ color:"#fff",}} bg="white" aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse  bg="white" id="basic-navbar-nav" >
                            <Nav style={{display: "flex", alignItems:"center"}} className="me-auto">
                                <Nav.Link as={Link} to="/" className="fs-5" id="navCustom"><AiOutlineHome className="me-1"/>Página Inicial</Nav.Link>
                                <Nav.Link as={Link} to="/people" className="fs-5" id="navCustom"><RiAliensLine className="me-1"/>Personagens</Nav.Link>
                                <Nav.Link as={Link} to="/planets" className="fs-5" id="navCustom"><BiPlanet className="me-1"/>Planetas</Nav.Link>
                                <Nav.Link as={Link} to="/species" className="fs-5" id="navCustom"><ImReddit className="me-1"/>Espécies</Nav.Link>
                                <Nav.Link as={Link} to="/films" className="fs-5" id="navCustom"><BiCameraMovie className="me-1"/>Filmes</Nav.Link>
                                <Nav.Link as={Link} to="/starships" className="fs-5" id="navCustom"><IoRocketOutline className="me-1"/>Naves Espaciais</Nav.Link>
                            </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}
export default NavbarComp