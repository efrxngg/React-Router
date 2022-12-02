// import reactLogo from './assets/react.svg'
import { Route, Routes } from 'react-router-dom';
import './App.css'

// Diferencia entre un elemento y un componente
// Componente que renderiza algo y el elemento es lo que renderiza

function App() {
  // Componente -> Elemento
  const Home = () => <h1>Home</h1>
  const SearchPage = () => <h1>SearchPage</h1>

  return (
    <main className="App">
      <header>
        <h1>Empresa x</h1>
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/search-page">Search Page</a></li>
          </ul>
        </nav>
      </header>

      {/* Para indicar las Rutas que tiene nuestra aplicacion */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search-page" element={<SearchPage />} />
      </Routes>
    </main>
  )
}

export default App