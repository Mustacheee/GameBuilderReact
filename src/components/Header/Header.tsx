import React, { FunctionComponent, SyntheticEvent, useState } from 'react';
import styles from './Header.module.scss';
import { AppBar, Menu, MenuItem, Toolbar, Typography } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import { Link, useNavigate } from 'react-router-dom';
import { GAME_CREATE } from '../../utils/routes';

type CategoryProps = {
  title: string;
  menuItems: Element | null;
};

const Header: FunctionComponent<CategoryProps> = ({ title, menuItems }) => {
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const navigate = useNavigate();

  const handleClick = (event: SyntheticEvent) => {
    setAnchorEl(event.target as HTMLElement);
  };

  const handleClose = () => setAnchorEl(null);

  return (
    <div className={styles.container}>
      <AppBar position="sticky">
        <Toolbar>
          <KeyboardArrowLeftIcon onClick={() => navigate(-1)} />

          <Typography variant="h6" className={styles.title}>
            {title}
          </Typography>

          <MenuIcon
            aria-controls="menu"
            aria-haspopup="true"
            aria-label="menu"
            onClick={handleClick}
          />

          <Menu
            id="menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem>Profile</MenuItem>
            {/* {menuItems ? (
              menuItems
            ) : (
              <Link to={GAME_CREATE} className={styles.link}>
                Create Game
              </Link>
            )} */}
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
