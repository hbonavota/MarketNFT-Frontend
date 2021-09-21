import React from 'react';
import { useDispatch } from "react-redux";
import sortByAbc from "../../actions/sortByAbc";
import { sortByPrice } from "../../actions/sortByPrice";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';

const options = ['Alphabetical order: A-Z', 'Alphabetical order: Z-A', 'Price: Max to Min', 'Price: Min to Max'];

const useStyles = makeStyles((theme) => ({
  menulist: {
    zIndex: 999,
    position: 'absolute',
    right: "18rem",
    top: "5rem",
    maxWidth: "9.2rem",
    marginBottom: "15px",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.primary.main,
    [theme.breakpoints.down(600)]:
    {
      top: "8rem",
      right: "4rem",
      marginBottom: "25px"
    }
  },
  sortByButton: {
    minHeight: "38px",
    minWidth: "150px"
  }
}));

export default function SortBy() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleClick = () => {


    console.log(`You clicked ${options[selectedIndex]}`);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);

    console.log(event.target.innerText)
    setOpen(false);
    if (event.target.innerText === 'Alphabetical order: A-Z') {
      dispatch(sortByAbc("az"))
    } else if (event.target.innerText === 'Alphabetical order: Z-A') {
      dispatch(sortByAbc("za"))
    } else if (event.target.innerText === 'Price: Max to Min') {
      dispatch(sortByPrice("max"))
    } else if (event.target.innerText === 'Price: Min to Max') {
      dispatch(sortByPrice("min"))
    }
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  return (
    <Grid container direction="column" alignItems="center" className={classes.menulist}>
      <Grid item xs={12}>
        <ButtonGroup variant="contained" color="primary" ref={anchorRef} aria-label="split button">
          <Button className={classes.sortByButton} onClick={handleClick}>"Sort By"</Button>
          <Button
            color="primary"
            size="small"
            aria-controls={open ? 'split-button-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-label="select merge strategy"
            aria-haspopup="menu"
            onClick={handleToggle}
          >
            <ArrowDropDownIcon />
          </Button>
        </ButtonGroup>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList id="split-button-menu">
                    {options.map((option, index) => (
                      <MenuItem
                        key={option}
                        selected={index === selectedIndex}
                        onClick={(event) => handleMenuItemClick(event, index)}
                      >
                        {option}
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Grid>
    </Grid>
  );
}