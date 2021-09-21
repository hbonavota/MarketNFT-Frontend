import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core'
import Box from '@material-ui/core/Box'


export default function HomeAdmin() {
    return (<div>
        <div>
            <Box mb='1rem'>
                <h3>Admin</h3>
                <Link to='admin/users'><Button variant='contained' size='large' >Users</Button></Link>
                <Link to='admin/nfts'> <Button variant='contained' size='large' >Nfts</Button></Link>
                <Link to='admin/categories'><Button variant='contained' size='large' >Categories</Button></Link>
            </Box>
        </div>
    </div>
    )
}
