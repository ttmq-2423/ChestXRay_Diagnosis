import React, { useContext } from 'react';
import './nav.css';
import iconPhone from '../../assets/images/phone-call.png';
import iconGmail from '../../assets/images/email.png';
import { UserContext } from '../../context/UserContext';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { useHistory } from 'react-router-dom'; // Import useHistory hook để thực hiện chuyển hướng

const Nav = () => {
  const { user } = useContext(UserContext);
  const history = useHistory(); // Sử dụng hook useHistory để thực hiện chuyển hướng

  const handleProfileClick = () => {
    history.push('/profile'); // Chuyển hướng đến trang profile khi click vào Profile
  };

  const handleHistoryClick = () => {
    history.push('/history'); // Chuyển hướng đến trang history khi click vào History
  };
  const handleLogoutClick = () => {
    history.push('/login'); // Chuyển hướng đến trang history khi click vào History
  };
  

  return (
    <div className="topnav">
      <div className="upper-section">
        <div className="left-section">
        
          <img src={iconPhone} alt="phone icon" />
          <a >0338486003</a>
          <img src={iconGmail} alt="gmail icon" className="ml-4" />
          <a>mqht@gmail.com</a>
        </div>
        <div className="right-section">
          {user && (
            <>
              <img src={user.avatar} alt="user avatar" />
              <DropdownButton
                id="dropdown-basic-button"
                title={<span className="custom-dropdown-title">({user.firstName})</span>}
              >
                <Dropdown.Item onClick={handleProfileClick}>Profile</Dropdown.Item>
                <Dropdown.Item onClick={handleHistoryClick}>History</Dropdown.Item>
                <Dropdown.Item onClick={handleLogoutClick}>Log out</Dropdown.Item>

              </DropdownButton>
            </>
          )}
        </div>
      </div>
      <div className="lower-section">
        <a  href="/home"><i className="fas fa-home"></i> Home</a>
        <a  href="/contact"><i className="fas fa-address-book"></i> Contact</a>
        <a href="/about"><i className="fas fa-info-circle"></i> About</a>
      </div>
    </div>
  );
};

export default Nav;
