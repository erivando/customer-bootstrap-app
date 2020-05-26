import React, { useContext } from 'react';
import { CustomerContexto } from '../Customer';
import { Toast } from 'react-bootstrap';

const CustomerMessage = () => {
    const {showMessage} = useContext(CustomerContexto);
    const {closeMessage} = useContext(CustomerContexto);
    const {contextMessage} = useContext(CustomerContexto);
    
    return(
        <Toast style={{ position: 'absolute', top: 0, right: 10, minWidth: '350px' }} show={showMessage} onClose={closeMessage} delay={3000} autohide>
            <Toast.Header>
                {contextMessage.img}
                <strong className={"mr-auto " + contextMessage.class}>{contextMessage.title}</strong>
            </Toast.Header>
            <Toast.Body>{contextMessage.text}</Toast.Body>
        </Toast>
    );
}

export default CustomerMessage;