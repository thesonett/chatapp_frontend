import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import './App.css';
import Chat from "./components/Chat";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Chat/>}></Route>
      </Routes>
      <Toaster/>
    </BrowserRouter>
  )
}

export default App
