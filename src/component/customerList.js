import React, { useContext } from 'react';
import { CustomerContexto } from '../Customer';
import { Table, Button } from 'react-bootstrap';
import { FiEdit3, FiTrash } from 'react-icons/fi'
import { cpfMask, newDate } from './util';

const CustomerList = () => {
    const {customers} = useContext(CustomerContexto);
    const {deletaCustomer} = useContext(CustomerContexto);
    const {editCustomer} = useContext(CustomerContexto);
    const {showToast} = useContext(CustomerContexto);
    
    const edit = (customer) => {
        editCustomer(customer)
    }
    
    return(
        <Table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nome</th>
                    <th>CPF</th>
                    <th>Data de Nascimento</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {
                    customers.length > 0 ? 
                        Object.keys(customers).map(key => (
                        <tr key={key}>
                            <td>{customers[key].id}</td>
                            <td>{customers[key].name}</td>
                            <td>{cpfMask(customers[key].cpf)}</td>
                            <td>{newDate(customers[key].birthdate)}</td>
                            <td>
                                <Button variant="outline-primary" size="sm" onClick={() => edit(customers[key])}>
                                    <FiEdit3 />
                                </Button>
                                <Button variant="outline-danger" size="sm" className="ml-1" onClick={() => deletaCustomer(customers[key].id, showToast)}>
                                    <FiTrash />
                                </Button>
                            </td>
                        </tr>
                    )) : 
                        <tr>
                            <td className="text-center" colSpan={5}>Não há registro.</td>
                        </tr>
                }
            </tbody>
        </Table>
    );
}

export default CustomerList;