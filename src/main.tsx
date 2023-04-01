import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <Navbar />
    <App />
    <Footer />
  </BrowserRouter>,
)
