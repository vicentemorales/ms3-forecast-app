import './home.css'
import { Link } from 'react-router-dom';



function Home(){
    return(
        <div className='home'>
        <Link to="/weeks">Processing Weekly Forecasts</Link>
        <hr />
        <Link to="/" style={{background: '#ccc'}}>Production Weekly Forecast</Link>
        <hr />
        <Link to="/">Inventory</Link>
        <hr />
        <Link to="/" style={{background: '#ccc'}}>Shipping and Receiving</Link>
        <hr />
        <Link to="/">QA Documention</Link>
        </div>
    )
}

export default Home