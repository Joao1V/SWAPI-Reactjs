import {Navbar, Nav, Container } from "react-bootstrap";
import Logo from "../images/icons8-stormtrooper.svg"
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
            <Navbar bg="dark" variant={"dark"} expand="lg">
                <Container style={{}}>
                        <Navbar.Brand style={{cursor:"context-menu", color:"#f9e813", display:"flex", alignItems:"center"}}>
                            <img style={{ width:75}} src={Logo}/>
                            <span>Star Wars</span>
                        </Navbar.Brand>
                    <Navbar.Toggle style={{ color:"#fff",}} bg="white" aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse  bg="white" id="basic-navbar-nav">

                            <Nav style={{display: "flex", justifyContent:"center", alignItems:"center"}} className="me-auto">
                                <Nav.Link as={Link} to="/" className="fs-5" style={{ color:"#fff"}}><AiOutlineHome className="me-1"/>Home</Nav.Link>
                                <Nav.Link as={Link} to="/people" className="fs-5" style={{ color:"#fff"}}><RiAliensLine className="me-1"/>Characters</Nav.Link>
                                <Nav.Link as={Link} to="/planets" className="fs-5" style={{ color:"#fff"}}><BiPlanet className="me-1"/>Planets</Nav.Link>
                                <Nav.Link as={Link} to="/species" className="fs-5" style={{ color:"#fff"}}><ImReddit className="me-1"/>Species</Nav.Link>
                                <Nav.Link as={Link} to="/films" className="fs-5" style={{ color:"#fff"}}><BiCameraMovie className="me-1"/>Films</Nav.Link>
                                <Nav.Link as={Link} to="/starships" className="fs-5" style={{ color:"#fff"}}><IoRocketOutline className="me-1"/>Starships</Nav.Link>

                            </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}
export default NavbarComp