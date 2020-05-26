import React, { useContext } from 'react';
import { Button, Navbar, Container } from 'react-bootstrap';
import { FiPlus } from 'react-icons/fi'
import { CustomerContexto } from '../Customer';

const NavBar = () => {
    const {showModal} = useContext(CustomerContexto);

    return(
        <Navbar bg="light" expand="lg">
            <Container>

                <Navbar.Brand>Customer</Navbar.Brand>
                <Button variant="outline-success" size="sm" onClick={showModal}>
                    <FiPlus />
                </Button>
            </Container>
        </Navbar>
    );
}


export default NavBar;