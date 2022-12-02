// import reactLogo from './assets/react.svg'
import { Route, Routes, Link, useParams, Outlet } from 'react-router-dom';
import { Product } from './domain/entities';
import './App.css'

// Diferencia entre un elemento y un componente
// Componente que renderiza algo y el elemento es lo que renderiza

// SPA
const Home = () => <h1>Home</h1>

// const findProducts = async () => {
//   let response = await fetch("http://127.0.0.1:8080/api/v1/products")
//   let data = await response.json()
//   console.log(data)
//   return data
// }
// var products = findProducts()

// Componente -> Elemento
const SearchPage = () => {

  let products = ["Jujutzy Kaisen", "Demon Slayer", "Attack On Titan", "Danmachi", "Owari no Serah"]
  return (
    <div>
      <h1>SearchPage</h1>
      <ul>
        {
          products.map(product => (
            <li key={product}><Link to={`/products/${product}`}>{product}</Link></li>
          ))
        }
      </ul>
    </div >
  )
}

// Para captura segmentos dinamicos y recuperarlos en un componente
const Products = () => {
  // Los segmentos dinamicos tienen que tener el mismo nombre
  const { product_name } = useParams()
  return (
    <div>
      <h1>{product_name}</h1>

      {/* Ruta Relativa :sirve para preservar la ruta actual*/}
      <Link to="details"> ir a los detalles</Link>
      {/* // Sirve para ponerle un hueco a la ruta anidada  para decirle donde se tiene que renderizar */}
      < Outlet />
    </div>
  )
}

const ProductDetails = () => {
  const { product_name } = useParams()
  return <h1>Product Detalle {product_name}</h1>
}

const NotFound = () => <h1>Not Found</h1>

function App() {

  return (
    <main className="App">
      <header>
        <h1>Empresa x</h1>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/search-page">Search Page</Link></li>
          </ul>
        </nav>
      </header>

      {/* Para indicar las Rutas que tiene nuestra aplicacion */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search-page" element={<SearchPage />} />
        {/* Rutas anidada */}
        <Route path="/products/:product_name" element={<Products />} >
          <Route path='details' element={<ProductDetails />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </main>
  )
}

export default App