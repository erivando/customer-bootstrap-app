import React, { useContext } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { CustomerContexto } from '../Customer'

const CustomerForm = () => {
    const {show} = useContext(CustomerContexto);
    const {handleClose} = useContext(CustomerContexto);
    const {addCustomer} = useContext(CustomerContexto);
    const {handleEnviar} = useContext(CustomerContexto);
    const {validated} = useContext(CustomerContexto);
    const {customerSelected} = useContext(CustomerContexto);
    const {updateCustomer} = useContext(CustomerContexto);
    const {values} = useContext(CustomerContexto);
    const {id, name, cpf, birthdate} = customerSelected;
 
   const edit = (e) =>{
    e.preventDefault();
    updateCustomer(id)
   }
   
    return(
        <>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{id ? 'Editar' : 'Adicionar'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate validated={validated} onSubmit={id ? edit : addCustomer}>
                    <Form.Group>
                        <Form.Label>Nome:</Form.Label>
                        {id ?
                            (
                                <Form.Control type="text" placeholder="Digite seu nome" name="name"
                                    value={values.name || name} 
                                    onChange={handleEnviar} required
                                />
                            ) :
                            (

                                <Form.Control type="text" placeholder="Digite seu nome" name="name"
                                    onChange={handleEnviar} required
                                />
                            )
                        }
                        <Form.Control.Feedback type="invalid">Preencha este campo!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>CPF:</Form.Label>
                        {id ?
                            (

                                <Form.Control type="text" placeholder="Digite seu cpf" name="cpf"
                                    value={values.cpf || cpf}
                                    onChange={handleEnviar} required
                                />
                            ) :
                            (
                                <Form.Control type="text" placeholder="Digite seu cpf sem ponto" name="cpf"
                                    onChange={handleEnviar} required
                                />

                            )
                        }
                        <Form.Control.Feedback type="invalid">Preencha este campo!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Data de Nascimento:</Form.Label>
                        {id ?
                            (
                                <Form.Control type="text" placeholder="Digite seu nome" name="birthdate"
                                    value={values.birthdate || birthdate}
                                    onChange={handleEnviar} required
                                />
                            ) :
                            (
                                <Form.Control type="text" placeholder="Digite o Ano-Mês-Dia" name="birthdate"
                                    onChange={handleEnviar} required
                                />
                            )
                        }
                        <Form.Control.Feedback type="invalid">Preencha este campo!</Form.Control.Feedback>
                    </Form.Group>
                    <Button type="submit">Enviar</Button>
                </Form>
            </Modal.Body>
        </Modal>
        </>
    )
}

export default CustomerForm;