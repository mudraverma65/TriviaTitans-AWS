
import { Link, useLocation, useNavigate } from 'react-router-dom';

import '../App.css';
import React, { useState, useEffect } from 'react';
import Path from "../Constant/Path";
import '../Styles/Navbar.css';
import { FaBars, FaSearch } from 'react-icons/fa';
import { ImCross } from 'react-icons/im';
// import Profile from '../Pages/Profile.js';


function Header() {
    const location = useLocation();
	// const [open, setOpen] = React.useState(false);
	const [searchActive, setSearchActive] = React.useState(false);

	// const handleOpen = () => {
	// 	setOpen(!open);
	// };

	// let menuRef = useRef();

	useEffect(() => {
		if (localStorage.getItem('token')) {
            setIsLoggedIn(true);
        }
	}, []);

	const [Mobile, setMobile] = useState(false);

    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // useEffect(() => {
        
    // }, [])

    // return (
    //     <div className='header-bg'>
    //         <p className='header-logo' onClick={() => navigate('/home')}>TRIVIA TITANS</p>
    //         <div className='header-menu'>
                    // {
                    // isLoggedIn ?
                    //     <p className='header-menu-item'>GAMES</p>
                    //     :
                    //     null
                    // }
    //         </div>
    //         <div className="header-menu-right">
                // {
                //     isLoggedIn ?
                //         <>
                //             <UserOutlined className='header-menu-icon' onClick={() => navigate("/profile")} />
                //             <p className='header-menu-item' onClick={() => {
                //                 localStorage.clear();
                //                 setIsLoggedIn(false);
                //             }}>Logout</p>
                //         </>
                //         :
                //         // <a className='header-logo' href='https://triviatitans.auth.us-east-1.amazoncognito.com/login?response_type=code&client_id=6hn9vmanqlt905sa1n0skc8ql6&redirect_uri=http%3A%2F%2Flocalhost%3A3000' onClick={() => navigate('/logout')}>Login</a>
                //         <a className='header-logo' href='https://titans.auth.us-east-1.amazoncognito.com/login?response_type=token&client_id=5cm5p1n8m11vvclk312lifshs1&redirect_uri=http://localhost:3000' onClick={() => navigate('/logout')}>Login</a>
                // }
    //         </div>
    //     </div>
    // );


    return (
		<>
			<nav className="navbar">
				<div className="nav-container">
					<div className="start">
						<div className="logo">
							<button
								className="mobile-menu-icon nav-button"
								onClick={() => setMobile(!Mobile)}
							>
								{Mobile ? <ImCross /> : <FaBars />}
							</button>
							<Link to={Path.HOME}>
								<span className="first-half-logo">TRIVIA</span>
								<span className="second-half-logo">TITANS</span>
							</Link>
						</div>
                    {
                    isLoggedIn ?
                        <ul
							className={Mobile ? 'navlinks-mobile' : 'navlinks'}
							onClick={() => setMobile(false)}
						>
							
							<Link
								to={Path.TEAMS}
								className={`${
									location.pathname === Path.TEAMS
										? 'active-tab'
										: 'inActive-tab'
								}`}
							>
								Teams
							</Link>
							<Link
								to={Path.GAMES}
								className={`${
									location.pathname === Path.GAMES
										? 'active-tab'
										: 'inActive-tab'
								}`}
							>
								Games
							</Link>
							<Link
								to={Path.LEADERBOARD}
								className={`${
									location.pathname === Path.LEADERBOARD
										? 'active-tab'
										: 'inActive-tab'
								}`}
							>
								Leaderboard
							</Link>
						</ul>
                        :
                        null
                    }
						
					</div>

					<div className={`end ${searchActive ? 'search-active' : ''}`}>
						<div
							className="search"
							onClick={() => {
								setSearchActive(true);
							}}
						>
							<input
								type="text"
								placeholder="Search..."
							/>

							<FaSearch />
						</div>
						{searchActive ? (
							<div
								className="search-close"
								onClick={() => {
									setSearchActive(false);
								}}
							>
								<ImCross />
							</div>
						) : null}
						{
                    isLoggedIn ?
                        <>
                            <div className='header-menu-icon' onClick={() => navigate("/profile")} />
                            <p className='dropdown' onClick={() => {
                                localStorage.clear();
                                setIsLoggedIn(false);
								navigate('/home')
                            }}>Logout</p>
                        </>
                        :
                        // <a className='header-logo' href='https://triviatitans.auth.us-east-1.amazoncognito.com/login?response_type=code&client_id=6hn9vmanqlt905sa1n0skc8ql6&redirect_uri=http%3A%2F%2Flocalhost%3A3000' onClick={() => navigate('/logout')}>Login</a>
                        <a className='dropdown' href='https://titans.auth.us-east-1.amazoncognito.com/login?response_type=token&client_id=5cm5p1n8m11vvclk312lifshs1&redirect_uri=http://localhost:3000' onClick={() => navigate('/logout')}>Login</a>
                }

						<Link to={Path.PROFILE_PAGE}>
							<button className="profile-pic-navbar">
								<img
									src="https://pixabay.com/vectors/male-portrait-avatar-face-head-306408/"
									alt="Profile Pic"
								/>
							</button>
						</Link>
					</div>
				</div>
			</nav>
		</>
	);

}

export default Header;