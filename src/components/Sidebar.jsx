

import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'; // Import useNavigate
import { UilSignOutAlt, UilDashboard, UilUsersAlt, UilChart } from '@iconscout/react-unicons';
import './Sidebar.css';
import Logo from '../imgs/logo.png';
import { useDispatch } from 'react-redux';
import { logOut } from '../Reducers/UserReducer';

const Sidebar = () => {
  const [selected, setSelected] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleLogout = () => {
    // Dispatch the logOut action to update Redux state
    dispatch(logOut());
    // Redirect user to login page after logout
    navigate('/Login');
  };

  // Sidebar links data
  const sidebarLinks = [
    { route: '/', icon: UilDashboard, heading: 'Dashboard' },
    { route: '/Orders', icon: UilUsersAlt, heading: 'Orders' },
    { route: '/Customers', icon: UilChart, heading: 'Customers' },
    { route: '/Products', icon: UilChart, heading: 'Products' },
    // { route: '/Login', icon: UilChart, heading: 'Login' },
    // { route: '/rents', icon: UilChart, heading: 'Products For Rent' },
  ];

  return (
    <div className="Sidebar">
      {/* Logo Section */}
      <div className="logo">
        <img src={Logo} alt="logo" />
        <span>
          Sh<span>o</span>ps
        </span>
      </div>

      {/* Menu Section */}
      <div className="menu">
        {sidebarLinks.map((item, index) => (
          <NavLink
            to={item.route}
            className={({ isActive }) =>
              isActive ? 'menuItem active' : 'menuItem'
            }
            key={index}
            onClick={() => setSelected(index)}
          >
            <item.icon />
            <span>{item.heading}</span>
          </NavLink>
        ))}
        {/* Logout Section */}
        <div className="menuItem">
          <UilSignOutAlt />
          <span onClick={handleLogout}>Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;








// import React, { useState } from 'react';
// import { NavLink } from 'react-router-dom'; // Import NavLink for routing
// import { SidebarData } from '../Data/Data';
// import { UilSignOutAlt } from '@iconscout/react-unicons';
// import './Sidebar.css';
// import Logo from '../imgs/logo.png';

// const Sidebar = () => {
//   const [selected, setSelected] = useState(0);

//   return (
//     <div className="Sidebar">
//       <div className="logo">
//         <img src={Logo} alt="logo" />
//         <span>
//           Sh<span>o</span>ps
//         </span>
//       </div>
//       {/* Menu */}
//       <div className="menu">
//         {SidebarData.map((item, index) => (
//           <NavLink
//             to={item.route} 
//             className={({ isActive }) =>
//               isActive ? 'menuItem active' : 'menuItem'
//             } 
//             key={index}
//             onClick={() => setSelected(index)}
//           >
//             <item.icon />
//             <span>{item.heading}</span>
//           </NavLink>
//         ))}
//         <div className="menuItem">
//           <UilSignOutAlt />
//           <span>Logout</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;
