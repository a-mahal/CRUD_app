import { useState } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import TableList from './components/Tablelist'
import ModalForm from './components/Modalform'
import axios from 'axios'
import { use } from 'react'

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  {/*This next contant is for the search bar function and to be passed to... */}
  const [searchTerm, setSearchTerm] = useState('')
  {/* This is for creating a client */}
  const [clientData, setClientData] = useState(null)

  {/* To control the modal open/close */}
  const handleOpen = (mode) => {
    setIsOpen(true)
    setModalMode(mode)
  }

  const handleSubmit = async (newClientData) => {
    if (modalMode === 'add') {
      try {
        const response = await axios.post('http://localhost:3000/api/clients', newClientData);
        console.log('Client added:', response.data); 
        setTableData((prevData) => [...prevData, response.data]); 
      } catch {
        console.error('Error adding client:', error);
      }
    } else {
      console.log('modal mode Edit')
    }
  }


  return (
    <>
      <NavBar onOpen={() => handleOpen('add')} onSearch={setSearchTerm}/>
      <TableList  handleOpen={handleOpen} searchTerm={searchTerm}/>
      <ModalForm isOpen={isOpen} OnSubmit={handleSubmit} onClose={() => setIsOpen(false)} mode={modalMode} clientData={clientData}/>
    </>
  )
}

export default App
