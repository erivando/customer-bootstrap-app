import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { FiCheckCircle, FiXCircle } from 'react-icons/fi';

export const CustomerContexto = createContext();

const CustomerContextoProvider = (props) => {
    const [ customers, setCustomers ] = useState([]);
    const [ show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [ values, setValues ] = useState('');
    const [showMessage, setShowMessage ] = useState(false);
    const closeMessage = () => setShowMessage(false);
    const [ contextMessage, setContextMessage ] = useState('');
    const [ validated, setValidated ] = useState(false);
    const [ customerSelected, setCustomerSelected ] = useState('');

    useEffect (()=> {

        async function load(){

            await axios.get('http://54.147.244.100/api/customers').then(response => 
                setCustomers(response.data.data),
            )
        }

        load();
    }, []);


    const editCustomer = (customer) => {
        setShow(true)
        setCustomerSelected(customer)
    }

  
    const updateCustomer = async (id) => {
        setShow(false);
            axios.put(`http://54.147.244.100/api/customers/${id}`, values)
                .then((res) => {
                    setCustomers(customers.map(customer => (customer.id === id ? res.data : customer)))
                    setContextMessage({
                        title: 'Sucesso',
                        class: 'text-success',
                        text: 'Cadastro editado!',
                        img: <FiCheckCircle className="rounded mr-2" size={18} color="#28a745" />,
                    })
                })
                .catch((err) =>
                    setContextMessage({
                        title: 'Erro',
                        class: 'text-danger',
                        text: 'Não foi possível editar o cadastro!',
                        img: <FiXCircle className="rounded mr-2" size={18} color="#dc3545" />,
                    })
                )
                
        setShowMessage(true);
    }


    const showModal = () => {
        setShow(true);
        setCustomerSelected('');
    }

    const addCustomer = useCallback((e) => {
        const form = e.currentTarget;
        e.preventDefault();
        if(form.checkValidity() === false){
            e.stopPropagation();
            setValidated(true);
            return
        }
        setValidated(false);
        
        setShow(false);
        setContextMessage('');

        async function save(){
 
            await axios.post('http://54.147.244.100/api/customers', values)
            .then((res) => {
                setContextMessage({
                    title: 'Sucesso',
                    class: 'text-success',
                    text: 'Cadastro realizado!',
                    img: <FiCheckCircle className="rounded mr-2" size={18} color="#28a745" />,
                })

                setCustomers([...customers, res.data])
            }).catch(() =>
                setContextMessage({
                    title: 'Erro',
                    class: 'text-danger',
                    text: 'Não foi possível adicionar cadastro!',
                    img: <FiXCircle className="rounded mr-2" size={18} color="#dc3545" />,
                })
            )
            
        }
        save();
        setShowMessage(true);
    },[customers, values]);

    const handleEnviar = (e) => {
        setValues({...values, [e.target.name] : e.target.value})
    }

    const deletaCustomer = useCallback((id) => {
        axios.delete(`http://54.147.244.100/api/customers/${id}`)
        .then(() =>{
            setContextMessage({
                title: 'Sucesso',
                class: 'text-success',
                text: 'Cadastro removido!',
                img: <FiCheckCircle className="rounded mr-2" size={18} color="#28a745" />,
            })
            
            let filter = customers.filter(customer => customer.id !== id);
            setCustomers(filter)
        })
        .catch(() =>
            setContextMessage({
                title: 'Erro',
                class: 'text-danger',
                text: 'Não foi possível remover cadastro!',
                img: <FiXCircle className="rounded mr-2" size={18} color="#dc3545" />,
            })
        )
        setShowMessage(true);
    }, [customers]);

    return(
        <CustomerContexto.Provider value={{
            customers, deletaCustomer, editCustomer, show, showModal, handleClose, 
            addCustomer, handleEnviar, showMessage, closeMessage, contextMessage,
            validated, customerSelected, updateCustomer, values }}>
            {props.children}
        </CustomerContexto.Provider>
    );
}

export default CustomerContextoProvider;