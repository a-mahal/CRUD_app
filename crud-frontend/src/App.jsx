import { useState } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import TableList from './components/Tablelist'
import ModalForm from './components/Modalform'

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');

  const handleOpen = (mode) => {
    setIsOpen(true)
  }
  const handleSubmit = () => {
    if (modalMode === 'add') {
      console.log('modal mode Add')
    } else {
      console.log('modal mode Edit')
    }
  }


  return (
    <>
      <NavBar onOpen={() => handleOpen('add')}/>
      <TableList />
      <ModalForm onOpen={isOpen} OnSubmit={handleSubmit}  onClose={() => setIsOpen(false)}/>
    </>
  )
}

export default App
