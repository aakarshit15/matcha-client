import './App.css'
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import { ThemeProvider } from './components/theme-provider';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import Postings from './pages/Postings';
import Apply from './pages/Apply';
import CreatePostingPage from './pages/CreatePostingPage';
import Applications from './pages/Applications';
import { UserContext } from './contexts/userAndToken';
import { useState } from 'react';

function App() {

  
  const [client, setClient] = useState();

  return (
    <>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <UserContext.Provider value={[client, setClient]}>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/postings" element={<Postings />} />
            <Route path="/posting/apply/:id" element={<Apply />} />
            <Route path="/create-posting" element={<CreatePostingPage />} />
            <Route path="/applications" element={<Applications />} />
          </Route>
        </Routes>
      </UserContext.Provider>
    </ThemeProvider>
    </>
  )
}

export default App
