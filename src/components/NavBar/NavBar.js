import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import logout from '../../actions/logout'
import AppBar from '@material-ui/core/AppBar'
import ToolBar from '@material-ui/core/ToolBar'
/* import { ToolBar } from '@material-ui/core'; */
/* import ToolBar from '@mui/material/ToolBar'; */
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import Tabs from '@material-ui/core/Tabs' 
import Tab from '@material-ui/core/Tab'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import Badge from '@material-ui/core/Badge'
import IconButton from '@material-ui/core/IconButton'
import { getCategories } from '../../actions/getCategories'
import { userSession } from '../../actions/userSession'
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
// import { createChainedFunction } from '@material-ui/core'

function ElevationScroll(props) {
  const { children } = props
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  })

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  })
}

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
  },
  tabContainer: {
    marginLeft: 'auto',
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: '25px',
    opacity: 0.7,
    '&:hover': {
      opacity: 1,
    },
  },
  button: {
    borderRadius: '50px',
    marginLeft: '25px',
    marginRight: '20px',
    fontFamily: 'Raleway',
    fontSize: '1rem',
    textTransform: 'none',
    height: '35px',
    color: 'white',
  },
  menu: {
    backgroundColor: theme.palette.common.green,
    color: 'white',
  },
  menuItem: {
    ...theme.typography.tab,
    opacity: 0.7,
    '&:hover': {
      opacity: 1,
    },
  },
  shoppingcart: {
    color: 'white',
  },
  profileMenu: {
    marginTop: '2.6rem',
  },
}))

export default function NavBar() {
  const dispatch = useDispatch()
  const userLogged = useSelector((state) => state.userLogged)
  const categories = useSelector((state) => state.categories)
  const number = useSelector((state) => state.shoppingTrolley)
  const numberOfItems = number.length
  const classes = useStyles()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('sm'))
  const [value, setValue] = useState(0)
  const [anchorEl, setanchorEl] = useState(null)
  const [anchorElProfile, setanchorElProfile] = useState(null)
  const [open, setopen] = useState(false)
  const [openProfile, setopenProfile] = useState(false)
  const role=useSelector((state) => state.role)

  const handleChange = (e, value) => {
    setValue(value)
  }

  const handleclick = (e) => {
    setanchorEl(e.currentTarget)
    setopen(true)
  }
  const handleclickprofile = (e) => {
    setanchorElProfile(e.currentTarget)
    setopenProfile(true)
  }

  const handleClose = (e) => {
    setanchorEl(null)
    setopen(false)
    setValue(1)
  }
  const handleCloseProfile = (e) => {
    setanchorElProfile(null)
    setopenProfile(false)
    setValue(6)
  }

  const handleLogout = () => {
    dispatch(logout(userLogged))
    setValue(0)
  }

  useEffect(() => {
    dispatch(getCategories())
    if (window.location.pathname === '/' && value !== 0) {
      setValue(0)
    } else if (
      window.location.pathname.includes('/categories') &&
      value !== 1
    ) {
      setValue(1)
    } else if (window.location.pathname === '/contact' && value !== 2) {
      setValue(2)
    } else if (window.location.pathname === '/about' && value !== 3) {
      setValue(3)
    } else if (window.location.pathname === '/create' && value !== 4) {
      setValue(4)
    } else if (window.location.pathname === '/profile' && value !== 5) {
      setValue(5)
    }

    dispatch(userSession())
  }, [value])

  const tabs = (
    <React.Fragment>
      <Tabs
        value={value}
        className={classes.tabContainer}
        onChange={handleChange}
        indicatorColor='secondary'
      >
        <Tab className={classes.tab} component={Link} to='/' label='Home' />
        <Tab
          aria-owns={anchorEl ? 'categoriesMenu' : undefined}
          aria-haspopup={anchorEl ? true : undefined}
          className={classes.tab}
          onMouseOver={(e) => handleclick(e)}
          component={Link}
          to='/categories'
          label='Categories'
        />

        <Tab
          className={classes.tab}
          component={Link}
          to='/contact'
          label='Contact'
        />
        <Tab
          className={classes.tab}
          component={Link}
          to='/about'
          label='About Us'
        />
        {role ==="admin" && (
        <Tab
        className={classes.tab}
        component={Link}
        to='/admin'
        label='Admin'
        />
      )}
        {/* ADD */}
        {userLogged && (
          <Tab
            className={classes.tab}
            component={Link}
            to='/create'
            label='Create'
          />
        )}
      </Tabs>
      {
        <Menu
          id='categoriesMenu'
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{ onMouseLeave: handleClose }}
          classes={{ paper: classes.menu }}
          elevation={3}
        >
          <MenuItem
            onClick={handleClose}
            component={Link}
            to='/categories'
            classes={{ root: classes.menuItem }}
          >
            Categories
          </MenuItem>
          <MenuItem
            onClick={handleClose}
            component={Link}
            to='/categories/all'
            classes={{ root: classes.menuItem }}
          >
            All NFTS
          </MenuItem>
          {categories.length > 0 && (
            <MenuItem
              onClick={handleClose}
              component={Link}
              to={`/categories/${categories[0]._id}`}
              classes={{ root: classes.menuItem }}
            >
              {categories[0].name}
            </MenuItem>
          )}
          {categories.length > 1 && (
            <MenuItem
              onClick={handleClose}
              component={Link}
              to={`/categories/${categories[1]._id}`}
              classes={{ root: classes.menuItem }}
            >
              {categories[1].name}
            </MenuItem>
          )}
          {categories.length > 2 && (
            <MenuItem
              onClick={handleClose}
              component={Link}
              to={`/categories/${categories[2]._id}`}
              classes={{ root: classes.menuItem }}
            >
              {categories[2].name}
            </MenuItem>
          )}
          {categories.length > 3 && (
            <MenuItem
              onClick={handleClose}
              component={Link}
              to={`/categories/${categories[3]._id}`}
              classes={{ root: classes.menuItem }}
            >
              {categories[3].name}
            </MenuItem>
          )}
          {categories.length > 4 && (
            <MenuItem
              onClick={handleClose}
              component={Link}
              to={`/categories/${categories[4]._id}`}
              classes={{ root: classes.menuItem }}
            >
              {categories[4].name}
            </MenuItem>
          )}
          {categories.length > 5 && (
            <MenuItem
              onClick={handleClose}
              component={Link}
              to={`/categories/${categories[5]._id}`}
              classes={{ root: classes.menuItem }}
            >
              {categories[5].name}
            </MenuItem>
          )}
          {categories.length > 0 && (
            <MenuItem
              onClick={handleClose}
              component={Link}
              to='/categories'
              classes={{ root: classes.menuItem }}
            >
              Show More...
            </MenuItem>
          )}
        </Menu>
      }

      <Menu
        className={classes.profileMenu}
        anchorEl={anchorElProfile}
        open={openProfile}
        onClose={handleClose}
        MenuListProps={{ onMouseLeave: handleCloseProfile }}
        classes={{ paper: classes.menu }}
        elevation={3}
      >
        <MenuItem
          onClick={handleCloseProfile}
          component={Link}
          to='/profile'
          classes={{ root: classes.menuItem }}
        >
          My Profile
        </MenuItem>
        <MenuItem
          onClick={handleCloseProfile}
          component={Link}
          to='/favorites'
          classes={{ root: classes.menuItem }}
        >
          Favorites
        </MenuItem>
        <MenuItem
          onClick={handleCloseProfile}
          onClick={handleLogout}
          classes={{ root: classes.menuItem }}
        >
          Logout <ExitToAppIcon />
        </MenuItem>
      </Menu>

      <IconButton component={Link} to='/shoppingcart'>
        <Badge badgeContent={numberOfItems} color='error'>
          <ShoppingCartIcon className={classes.shoppingcart} />
        </Badge>
      </IconButton>

      {userLogged ? (
        <IconButton
          component={Link}
          to='/'
          aria-owns={anchorEl ? 'profileMenu' : undefined}
          aria-haspopup={anchorEl ? true : undefined}
          onMouseOver={(e) => handleclickprofile(e)}
        >
          <AccountCircleOutlinedIcon
            fontSize='large'
            className={classes.shoppingcart}
          />
        </IconButton>
      ) : (
        <Button
          component={Link}
          to='/login'
          variant='contained'
          color='secondary'
          className={classes.button}
        >
          Login
        </Button>
      )}
    </React.Fragment>
  )

  return (
    <React.Fragment>
      <ElevationScroll>
        <AppBar position='fixed'>
          <ToolBar>
            <Typography color='white' variant='h5'>
              NFT MARKET
            </Typography>
            {matches ? null : tabs}
          </ToolBar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </React.Fragment>
  )
}
