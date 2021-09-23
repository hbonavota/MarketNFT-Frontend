import React, { useState, useEffect } from 'react'
import './NavBar.css'
import { useDispatch, useSelector } from 'react-redux'
import { getNFTs } from "../../actions/getNFTs.js";
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import logout from '../../actions/logout'
import AppBar from '@material-ui/core/AppBar'
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
import { SwipeableDrawer } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { List, ListItem, ListItemText } from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'
import CategoryIcon from '@material-ui/icons/Category'
import ContactMailIcon from '@material-ui/icons/ContactMail'
import InfoIcon from '@material-ui/icons/Info'
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount'
import CreateIcon from '@material-ui/icons/Create'
import LockOpenIcon from '@material-ui/icons/LockOpen'
import Collapse from '@material-ui/core/Collapse'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import alert from '../../actions/alert'
import blueligth from "../images/blueligth.jpg"
import Search from "../Search/Search.jsx"

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
  drawerIconContainer: {
    marginLeft: 'auto',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  drawerIcon: {
    height: '40px',
    width: '40px',
    color: 'white',
  },
  drawer: {
    backgroundColor: theme.palette.secondary.main,
  },
  drawerText: {
    ...theme.typography.tab,
    color: 'white',
    opacity: 0.7,
  },
  drawerTextSelected: {
    '& .MuiListItemText-root': {
      opacity: 1,
    },
  },
  loginbutton: {
    backgroundColor: theme.palette.primary.main,
  },
}))

export default function NavBar() {
  const dispatch = useDispatch()
  const history = useHistory()
  const userLogged = useSelector((state) => state.userLogged)
  const categories = useSelector((state) => state.categories)
  const number = useSelector((state) => state.shoppingTrolley)
  const numberOfItems = number?.length
  const classes = useStyles()
  const theme = useTheme()
  const iOS =
    typeof navigator !== 'undefined' &&
    /iPad|iPhone|iPod/.test(navigator.userAgent)

  const [openDrawer, setopenDrawer] = useState(false)
  const matches = useMediaQuery(theme.breakpoints.down('sm'))
  const [value, setValue] = useState(0)
  const [anchorEl, setanchorEl] = useState(null)
  const [anchorElProfile, setanchorElProfile] = useState(null)
  const [open, setopen] = useState(false)
  const [openProfile, setopenProfile] = useState(false)
  const role = useSelector((state) => state.role)

  const handleChange = (e, newValue) => {
    setValue(newValue)
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
    dispatch(getNFTs())
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
    dispatch(alert(true))
    history.push('/')
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
    } else if (window.location.pathname === '/admin' && value !== 4) {
      setValue(4)
    } else if (window.location.pathname === '/create' && value !== 5) {
      setValue(5)
    } else if (window.location.pathname === '/login' && value !== 6) {
      setValue(6)
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
        {role === 'admin' && (
          <Tab
            className={classes.tab}
            component={Link}
            to='/admin'
            label='Admin'
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

  const drawer = (
    <React.Fragment>
      <IconButton component={Link} to='/shoppingcart'>
        <Badge badgeContent={numberOfItems} color='error'>
          <ShoppingCartIcon className={classes.shoppingcart} />
        </Badge>
      </IconButton>
      <SwipeableDrawer anchor="right" disableBackdropTransition={!iOS} disableDiscovery={iOS} open={openDrawer} 
      onClose={()=> setopenDrawer(false)} onOpen={()=> setopenDrawer(true)}
      classes={{paper: classes.drawer}}>

        <List disablePadding>
          <ListItem
            onClick={() => {
              setopenDrawer(false)
              setValue(0)
            }}
            selected={value === 0}
            classes={{ selected: classes.drawerTextSelected }}
            divider
            button
            component={Link}
            to='/'
          >
            {' '}
            <HomeIcon color='primary' />
            <ListItemText
              className={classes.drawerText}
              divider
              button
              disableTypography
            >
              Home
            </ListItemText>
          </ListItem>
          <ListItem
            onClick={() => {
              setopen(!open)
              setValue(1)
            }}
            selected={value === 1}
            classes={{ selected: classes.drawerTextSelected }}
            divider
            button
          >
            {' '}
            <CategoryIcon color='primary' />
            <ListItemText className={classes.drawerText} disableTypography>
              Categories{' '}
            </ListItemText>
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <List component='div' disablePadding>
              <ListItem
                onClick={() => {
                  setopenDrawer(false)
                  setValue(1)
                }}
                selected={value === 1}
                divider
                button
                component={Link}
                to='/categories/all'
              >
                <ListItemText className={classes.drawerText} disableTypography>
                  All NFTs
                </ListItemText>
              </ListItem>
              {categories.length > 0 && (
                <ListItem
                  onClick={() => {
                    handleClose()
                    setopenDrawer(false)
                  }}
                  selected={value === 1}
                  divider
                  button
                  component={Link}
                  to={`/categories/${categories[0]._id}`}
                >
                  <ListItemText
                    className={classes.drawerText}
                    disableTypography
                  >
                    {categories[0].name}
                  </ListItemText>
                </ListItem>
              )}
              {categories.length > 1 && (
                <ListItem
                  onClick={() => {
                    handleClose()
                    setopenDrawer(false)
                  }}
                  selected={value === 1}
                  divider
                  button
                  component={Link}
                  to={`/categories/${categories[1]._id}`}
                >
                  <ListItemText
                    className={classes.drawerText}
                    disableTypography
                  >
                    {categories[1].name}
                  </ListItemText>
                </ListItem>
              )}
              {categories.length > 2 && (
                <ListItem
                  onClick={() => {
                    handleClose()
                    setopenDrawer(false)
                  }}
                  selected={value === 1}
                  divider
                  button
                  component={Link}
                  to={`/categories/${categories[2]._id}`}
                >
                  <ListItemText
                    className={classes.drawerText}
                    disableTypography
                  >
                    {categories[2].name}
                  </ListItemText>
                </ListItem>
              )}
              {categories.length > 3 && (
                <ListItem
                  onClick={() => {
                    handleClose()
                    setopenDrawer(false)
                  }}
                  selected={value === 1}
                  divider
                  button
                  component={Link}
                  to={`/categories/${categories[3]._id}`}
                >
                  <ListItemText
                    className={classes.drawerText}
                    disableTypography
                  >
                    {categories[3].name}
                  </ListItemText>
                </ListItem>
              )}
              {categories.length > 4 && (
                <ListItem
                  onClick={() => {
                    handleClose()
                    setopenDrawer(false)
                  }}
                  selected={value === 1}
                  divider
                  button
                  component={Link}
                  to={`/categories/${categories[4]._id}`}
                >
                  <ListItemText
                    className={classes.drawerText}
                    disableTypography
                  >
                    {categories[4].name}
                  </ListItemText>
                </ListItem>
              )}
              {categories.length > 0 && (
                <ListItem
                  onClick={() => {
                    handleClose()
                    setopenDrawer(false)
                  }}
                  selected={value === 1}
                  divider
                  button
                  component={Link}
                  to='/categories'
                >
                  <ListItemText
                    className={classes.drawerText}
                    disableTypography
                  >
                    Show more...
                  </ListItemText>
                </ListItem>
              )}
            </List>
          </Collapse>
          <ListItem
            onClick={() => {
              setopenDrawer(false)
              setValue(2)
            }}
            selected={value === 2}
            classes={{ selected: classes.drawerTextSelected }}
            divider
            button
            component={Link}
            to='/contact'
          >
            <ContactMailIcon color='primary' />
            <ListItemText className={classes.drawerText} disableTypography>
              Contact
            </ListItemText>
          </ListItem>
          <ListItem
            onClick={() => {
              setopenDrawer(false)
              setValue(3)
            }}
            selected={value === 3}
            classes={{ selected: classes.drawerTextSelected }}
            divider
            button
            component={Link}
            to='/about'
          >
            {' '}
            <InfoIcon color='primary' />
            <ListItemText className={classes.drawerText} disableTypography>
              About us
            </ListItemText>
          </ListItem>
          {role === 'admin' && (
            <ListItem
              onClick={() => {
                setopenDrawer(false)
                setValue(4)
              }}
              selected={value === 4}
              classes={{ selected: classes.drawerTextSelected }}
              divider
              button
              component={Link}
              to='/admin'
            >
              {' '}
              <SupervisorAccountIcon color='primary' />
              <ListItemText className={classes.drawerText} disableTypography>
                Admin
              </ListItemText>
            </ListItem>
          )}
          {userLogged && (
            <ListItem
              onClick={() => {
                setopenDrawer(false)
                setValue(5)
              }}
              selected={value === 5}
              classes={{ selected: classes.drawerTextSelected }}
              divider
              button
              component={Link}
              to='/create'
            >
              {' '}
              <CreateIcon color='primary' />
              <ListItemText className={classes.drawerText} disableTypography>
                Create
              </ListItemText>
            </ListItem>
          )}
          {userLogged && (
            <ListItem
              onClick={() => {
                setopenDrawer(false)
                setValue(6)
              }}
              selected={value === 6}
              classes={{ selected: classes.drawerTextSelected }}
              divider
              button
              component={Link}
              to='/profile'
            >
              {' '}
              <AccountCircleOutlinedIcon color='primary' />
              <ListItemText className={classes.drawerText} disableTypography>
                My Profile
              </ListItemText>
            </ListItem>
          )}
          {userLogged ? (
            <ListItem
              className={classes.loginbutton}
              classes={{ selected: classes.drawerTextSelected }}
              onClick={() => {
                setopenDrawer(false)
                setValue(0)
                handleLogout()
              }}
              divider
              button
              component={Link}
              to='/'
            >
              <ExitToAppIcon color='error' />
              <ListItemText className={classes.drawerText} disableTypography>
                Logout
              </ListItemText>
            </ListItem>
          ) : (
            <ListItem
              className={classes.loginbutton}
              selected={value === 6}
              classes={{ selected: classes.drawerTextSelected }}
              onClick={() => {
                setopenDrawer(false)
                setValue(6)
              }}
              divider
              button
              component={Link}
              to='/login'
            >
              <LockOpenIcon color='error' />
              <ListItemText className={classes.drawerText} disableTypography>
                Login
              </ListItemText>
            </ListItem>
          )}
        </List>
      </SwipeableDrawer>
      <IconButton
        className={classes.drawerIconContainer}
        onClick={() => setopenDrawer(!openDrawer)}
        disableRipple
      >
        <MenuIcon className={classes.drawerIcon} />
      </IconButton>
    </React.Fragment>
  )

  return (
    <React.Fragment>
      <ElevationScroll>
        <AppBar position='fixed' onClick={handleCloseProfile}>
            <div className="navbar">
            
              <div width="200px" height="4.5rem" className="imagecontainer" component={Link} to="/">
                <Link to={`/`} style={{ textDecoration: "none" }}>
              <img className="image" width="200px" height="75px" src={blueligth} alt="" />
            <Typography className="title" color='white' variant='h5'>
              NFT MARKET
            </Typography></Link>
              </div>
           
            <div className="toolbar">
            {matches ? drawer : tabs}
          </div>
          </div>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </React.Fragment>
  )
}
