import React from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { ROUTES } from "../../routes";
import { CSSMediaSize } from "../../const";
import { Link } from "react-router-dom";

const Header = () => {
  const [ currentRoute, setCurrentRoute ] = React.useState("");

  React.useEffect(() => {
    if(window?.location?.pathname) {
      setCurrentRoute(window.location.pathname);
    }
  }, [window?.location?.pathname]);

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
          <span className='icon-menu' />
        </div>
      </div>
    </div>
    <div className='container container-right'>
      <div className='container-parts'>
        <Link to={ROUTES.home}><button className={currentRoute === ROUTES.home ? "active" : ""}>Home</button></Link>
        <Link to={ROUTES.about}><button className={currentRoute === ROUTES.about ? "active" : ""}>About</button></Link>
        <Link to={ROUTES.contact}><button className={currentRoute === ROUTES.contact ? "active" : ""}>Contact</button></Link>
        <Link to={ROUTES.donate}><button className={currentRoute === ROUTES.donate ? "active" : ""}>Donate</button></Link>
      </div>
    </div>
  </HeaderStyle>;
};

export { Header };

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

	button {
		padding: 20px 40px;
		background-color: transparent;
		border-bottom: 3px solid var(--c-p7);
		:hover {
			border-color: var(--c-pink1) !important;
		}
		&.active {
			border-color: var(--c-pink3);
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
					> span {
						font-size: 24px;
						transition: color .1s;
						:active {
							color: var(--c-pink1) !important;
						}
						:hover {
							color: var(--c-pink3);
						}
					}
				}
			}
		}
		.container-right {
			display: none;
		}
	}
`;