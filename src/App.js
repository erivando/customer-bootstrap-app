import React from 'react';
import './App.css';
import { Container } from 'react-bootstrap';
import CustomerContextoProvider from './Customer';
import NavBar from './component/navBar';
import CustomerList from './component/customerList';
import CustomerForm from './component/customerForm';
import CustomerMessage from './component/customerMessage';

function App() {
  return (
    <>
    <Container>
      <CustomerContextoProvider>
        <CustomerMessage />
        <NavBar />
        <CustomerList />
        <CustomerForm />
      </CustomerContextoProvider>
    </Container>
    </>
  );
}

export default App;
