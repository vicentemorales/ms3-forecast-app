import './home.css'
import { Link } from 'react-router-dom';



function Home(){
    return(
        <div className='home'>
        <Link to="/weeks">Production - <br></br>Processing Weekly Forecasts</Link>
        <hr />
        <Link to="/" style={{background: '#ccc'}}> Copacking - <br></br>Production Weekly Forecast</Link>
        <hr />
        <Link to="/">Inventory - <br></br>Inventory for Produced Items</Link>
        <hr />
        <Link to="/" style={{background: '#ccc'}}>Shipping and Receiving - <br></br>Visual Schedule App</Link>
        <hr />
        <Link to="/">QA Documention - <br></br>QA Form Record Keeping</Link>
        </div>
    )
}

export default Home