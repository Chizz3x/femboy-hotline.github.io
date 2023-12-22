import React from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { ROUTES } from "../../routes";
import { CSSMediaSize } from "../../const";
import { Link } from "react-router-dom";
import {
  IconButton, MenuItem, Menu, Button 
} from "@mui/material";
import {
  CardGiftcard as CardGiftcardIcon, Contacts as ContactsIcon, Home as HomeIcon, Info as InfoIcon, Menu as MenuIcon 
} from "@mui/icons-material";

const Header = () => {
  const [ currentRoute, setCurrentRoute ] = React.useState("");
  const [ mobileMenuAnchor, setMobileMenuAnchor ] = React.useState<null | HTMLElement>(null);

  React.useEffect(() => {
    if(window?.location?.pathname) {
      setCurrentRoute(window.location.pathname);
    }
  }, [window?.location?.pathname]);

  const toggleMobileMenu = (event?: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchor(state => state ? null : (event?.currentTarget || null));
  };

  return <HeaderStyle>
    <div className='container container-left'>
      <Link to={ROUTES.home}>
        <div className='container-parts'>
          <img className='icon' src="favicon.png"></img>
          <div className='tab tab-main'><i>Femboy Hotline</i></div>
        </div>
      </Link>
      <div className='container-parts menu-info'>
        <span className='call-text'>
          <span>Call us today!</span>
          <span className='fake-link' onClick={() => toast("It aint real...", { type: "info" })}>+48 123 123 69</span>
        </span>
        <div className='mobile-menu'>
          <IconButton id="mobile-menu" onClick={toggleMobileMenu}>
            <MenuIcon sx={{ fill: "#fff" }}></MenuIcon>
          </IconButton>
          <MobileMenuStyle
            disablePortal
            anchorOrigin={{
              horizontal: "right",
              vertical: "bottom", 
            }}
            transformOrigin={{
              horizontal: "right",
              vertical: "top" 
            }}
            MenuListProps={{ "aria-labelledby": "mobile-menu", }}
            anchorEl={mobileMenuAnchor}
            open={!!mobileMenuAnchor}
            onClose={() => toggleMobileMenu()}
            //PaperProps={{
            //  style: {
            //    maxHeight: ITEM_HEIGHT * 4.5,
            //    width: "20ch",
            //  },
            //}}
          >
            <MenuItem onClick={() => toggleMobileMenu()}>
              <Link to={ROUTES.home}><Button endIcon={<HomeIcon />} disableRipple className={[ currentRoute === ROUTES.home ? "active" : "", "header-mobile-btn" ].join(" ")}>Home</Button></Link>
            </MenuItem>
            <MenuItem onClick={() => toggleMobileMenu()}>
              <Link to={ROUTES.about}><Button endIcon={<InfoIcon />} disableRipple className={[ currentRoute === ROUTES.about ? "active" : "", "header-mobile-btn" ].join(" ")}>About</Button></Link>
            </MenuItem>
            <MenuItem onClick={() => toggleMobileMenu()}>
              <Link to={ROUTES.contact}><Button endIcon={<ContactsIcon />} disableRipple className={[ currentRoute === ROUTES.contact ? "active" : "", "header-mobile-btn" ].join(" ")}>Contact</Button></Link>
            </MenuItem>
            <MenuItem onClick={() => toggleMobileMenu()}>
              <Link to={ROUTES.donate}><Button endIcon={<CardGiftcardIcon />} disableRipple className={[ currentRoute === ROUTES.donate ? "active" : "", "header-mobile-btn" ].join(" ")}>Donate</Button></Link>
            </MenuItem>
          </MobileMenuStyle>
        </div>
      </div>
    </div>
    <div className='container container-right'>
      <div className='container-parts'>
        <Link to={ROUTES.home}><Button startIcon={<HomeIcon />} disableRipple className={[ currentRoute === ROUTES.home ? "active" : "", "header-btn" ].join(" ")}>Home</Button></Link>
        <Link to={ROUTES.about}><Button startIcon={<InfoIcon />} disableRipple className={[ currentRoute === ROUTES.about ? "active" : "", "header-btn" ].join(" ")}>About</Button></Link>
        <Link to={ROUTES.contact}><Button startIcon={<ContactsIcon />} disableRipple className={[ currentRoute === ROUTES.contact ? "active" : "", "header-btn" ].join(" ")}>Contact</Button></Link>
        <Link to={ROUTES.donate}><Button startIcon={<CardGiftcardIcon />} disableRipple className={[ currentRoute === ROUTES.donate ? "active" : "", "header-btn" ].join(" ")}>Donate</Button></Link>
      </div>
    </div>
  </HeaderStyle>;
};

export { Header };

const MobileMenuStyle = styled(Menu)`
	.MuiPaper-root {
		background-color: var(--c-p2);
		min-width: 100px;
		max-height: 300px;
		> ul {
			> li {
				justify-content: flex-end;
			}
		}
	}
`;

const HeaderStyle = styled.div`
	max-width: 100%;
	box-shadow: 0 0 5px var(--c-p);
	background-color: var(--c-p1);
	border-top: 4px solid var(--c-pink2);
	position: sticky;
	min-height: auto;
	top: 0;
	z-index: 999;
	display: flex;
	flex-direction: row;
	padding: 10px 20px;

	a {
		text-decoration: none;
	}

	.header-btn {
		padding: 15px 25px;
		background-color: transparent;
		border-bottom: 3px solid var(--c-p7);
		:hover {
			border-color: var(--c-pink1);
			color: var(--c-pink1);
		}
		&.active {
			border-color: var(--c-pink3);
		}
		border-radius: 0;
		color: #fff;
	}

	.header-mobile-btn {
		text-align: right;
		font-size: 14px;
		color: #fff;
		&.active {
			color: var(--c-pink1);
		}
	}
	
	.container {
		height: 100%;
		display: flex;
		align-items: center;
		flex-direction: row;
		position: relative;
		.icon {
			max-width: 100%;
			height: 45px;
			margin-right: 20px;
		}
		.tab-main {
			line-height: 60px;
			font-size: 30px;
		}
		.menu-info {
			font-size: 14px;
			margin-left: 30px;
			.call-text {
				> span {
					:not(:last-child) {
						margin-right: 10px;
					}
				}
			}
		}
		.container-parts {
			display: flex;
			align-items: center;
		}
	}

	.container-right {
		margin-left: auto;
		button:not(:last-child) {
			margin-right: 15px;
		}
	}

	.mobile-menu {
		display: none;
	}

	${CSSMediaSize.tablet} {
		flex-direction: column;
		.container {
			flex-direction: column;
			.container-parts {
				width: 100%;
				display: flex;
				flex-direction: column;
				align-items: center;
				text-align: center;
				.icon {
					margin: 0 !important;
				}
			}
			.menu-info {
				flex-direction: row;
				margin: 0 !important;
				.call-text {
					display: flex;
					flex-direction: column;
					> span {
						margin: 0 !important;
					}
				}
				.mobile-menu {
					display: block;
					margin-left: auto;
				}
			}
		}
		.container-right {
			display: none;
		}
	}

	${CSSMediaSize.pc_small} {
		.container.container-left {
			flex-direction: column;
			.menu-info {
				margin: 0;
				align-self: flex-start;
			}
		}
	}
`;