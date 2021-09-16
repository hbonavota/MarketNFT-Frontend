import { Link } from 'react-router-dom'


export default function HomeAdmin() {    
    return ( <div>  
             <h3>Admin</h3>               
            <Link to='admin/users'><button>Users</button></Link>
            <Link to='admin/nfts'> <button>Nfts</button></Link>
            <Link to='admin/categories'><button>Categories</button></Link>
            </div>
            )
        }