// import reactLogo from './assets/react.svg'
import { Route, Routes, Link, useParams, Outlet, NavLink, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext'
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

const NavLinkPersonalizado = ({ to, children, ...props }) => {
  return (
    <NavLink
      {...props}
      className={({ isActive }) => { return isActive ? 'isActive' : undefined }}
      to={to}
    >
      {children}
    </NavLink>
  );
}

const NotFound = () => <h1>Not Found</h1>

const Login = () => {
  const { login } = useAuth()

  const navigate = useNavigate()

  // Aqui tenemos informacion de donde ha venido
  const location = useLocation()

  // Navegacion programatica
  const handleClick = () => {
    login()
    navigate(location.state?.location?.pathname ?? "/")
  }
  return (<button onClick={handleClick}>Login</button>)
}

// Tambien se puede envolver tantas rutas como quieras
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth()
  // Para saber la ruta actual
  const location = useLocation()
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ location }} />
  }
  return children
}

function App() {

  return (
    <main className="App">
      <header>
        <h1>Empresa x</h1>
        <nav>
          <ul>
            <li><NavLinkPersonalizado to="/">Home</NavLinkPersonalizado></li>
            <li><NavLinkPersonalizado to="/search-page">Search Page</NavLinkPersonalizado></li>
          </ul>
        </nav>
      </header>

      {/* Para indicar las Rutas que tiene nuestra aplicacion */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search-page" element={<ProtectedRoute><SearchPage /></ProtectedRoute>} />
        {/* Rutas anidada */}
        <Route path="/products/:product_name" element={<ProtectedRoute><Products /></ProtectedRoute>} >
          <Route path='details' element={<ProductDetails />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </main>
  )
}

export default App