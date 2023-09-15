import './home.css'
import { Link } from 'react-router-dom';



function Home(){
    return(
        <div className='home'>
        <Link to="/weeks">Go to Weekly Forecasts</Link>
        </div>
    )
}

export default Home