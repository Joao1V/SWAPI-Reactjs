import {Navbar, Nav, Container } from "react-bootstrap";
import Logo from "../images/icons8-stormtrooper.svg"
import {Link} from "react-router-dom";


const NavbarComp = () => {
    return(
        <div>
            <Navbar bg="dark" variant={"dark"} expand="lg">
                <Container style={{}}>
                        <Navbar.Brand style={{cursor:"context-menu", color:"#f9e813", display:"flex", alignItems:"center"}}>
                            <img style={{ width:75}} src={Logo}/>
                            <span> Star Wars </span>
                        </Navbar.Brand>
                    <Navbar.Toggle style={{ color:"#fff",}} bg="white" aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse  bg="white" id="basic-navbar-nav">

                            <Nav className="me-auto">
                                <Nav.Link as={Link} to="/" className="fs-5" style={{ color:"#fff"}}>Home</Nav.Link>
                                <Nav.Link as={Link} to="/people" className="fs-5" style={{ color:"#fff"}}>Characters</Nav.Link>
                                <Nav.Link as={Link} to="/planets" className="fs-5" style={{ color:"#fff"}}>Planets</Nav.Link>
                                <Nav.Link as={Link} to="/species" className="fs-5" style={{ color:"#fff"}}>Species</Nav.Link>
                                <Nav.Link as={Link} to="/films" className="fs-5" style={{ color:"#fff"}}>Films</Nav.Link>
                                <Nav.Link as={Link} to="/starships" className="fs-5" style={{ color:"#fff"}}>Starships</Nav.Link>

                            </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}
export default NavbarComp