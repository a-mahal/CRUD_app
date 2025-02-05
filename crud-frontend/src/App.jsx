import { useState, useEffect } from 'react'
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
  const [tableData, setTableData] = useState([]);


  {/* This gets the data from our DB */}
  

  const fetchClients = async () => {
    try {
        const response = await axios.get('http://localhost:3000/api/clients')
        setTableData(response.data);
    } catch (err) {
        setError(err.message)
    }
  };


  useEffect(() => {
  
    fetchClients();
    
  }, []);
  

  {/* To control the modal open/close */}
  const handleOpen = (mode, client) => {
    setClientData(client)
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
      console.log('Updating client with ID:', clientData.id); // Log the ID being updated
            try {
                const response = await axios.put(`http://localhost:3000/api/clients/${clientData.id}`, newClientData);
                console.log('Client updated:', response.data);
                setTableData((prevData) =>
                  prevData.map((client) => (client.id === clientData.id ? response.data : client))
                );
                } catch (error) {
                console.error('Error updating client:', error); 
            }
    }
  }


  return (
    <>
      <NavBar onOpen={() => handleOpen('add')} onSearch={setSearchTerm}/>
      <TableList  handleOpen={handleOpen} tableData={tableData} searchTerm={searchTerm} setTableData={setTableData}/>
      <ModalForm isOpen={isOpen} OnSubmit={handleSubmit} onClose={() => setIsOpen(false)} mode={modalMode} clientData={clientData}/>
    </>
  )
}

export default App
