import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import React, { useState, useEffect } from "react";
// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import ProfilesList from "examples/Lists/ProfilesList";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";

// Overview page components
import Header from "layouts/profile/components/Header";
import PlatformSettings from "layouts/profile/components/PlatformSettings";

// Data
import profilesListData from "layouts/profile/data/profilesListData";

// Images
import homeDecor1 from "assets/images/home-decor-1.jpg";
import homeDecor2 from "assets/images/home-decor-2.jpg";
import homeDecor3 from "assets/images/home-decor-3.jpg";
import homeDecor4 from "assets/images/home-decor-4.jpeg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

// function Overview() {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     axios.get("http://localhost:5000/me", { withCredentials: true })
//       .then(res => setUser(res.data.user))
//       .catch(() => setUser(null));
//   }, []);

//   return (
//     <DashboardLayout>
//       <DashboardNavbar />
//       <MDBox mb={2} />
//       {/* <Header> */}
//         <MDBox mt={5} mb={3}>
//           <Grid container spacing={1}>
           
//             <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
//               {/* <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} /> */}
//               <p>Welcome, {user.name}</p>
//               <p>Email: {user.email}</p>
//               <ProfileInfoCard
//                 title="profile information"
//                 description="Hi, I’m d, Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality)."
//                 info={{
//                   fullName: "${user.name}",
//                   mobile: "(44) 123 1234 123",
//                   email: "dummydata@mail.com",
//                   location: "india",
//                 }}
//                 social={[
//                   {
//                     link: "https://www.facebook.com/",
//                     icon: <FacebookIcon />,
//                     color: "facebook",
//                   },
//                   {
//                     link: "https://twitter.com/",
//                     icon: <TwitterIcon />,
//                     color: "twitter",
//                   },
//                   {
//                     link: "https://www.instagram.com/",
//                     icon: <InstagramIcon />,
//                     color: "instagram",
//                   },
//                 ]}
//                 action={{ route: "", tooltip: "Edit Profile" }}
//                 shadow={false}
//               />
//               <Divider orientation="vertical" sx={{ mx: 0 }} />
//             </Grid>
           
//           </Grid>
//         </MDBox>
       
//       {/* </Header> */}
      
//     </DashboardLayout>
//   );
// }

// export default Overview;




// import { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
// import DashboardLayout from "./DashboardLayout";
// import DashboardNavbar from "./DashboardNavbar";
// import MDBox from "./MDBox";
// import Grid from "@mui/material/Grid";
// import Divider from "@mui/material/Divider";
// import ProfileInfoCard from "./ProfileInfoCard";
// import FacebookIcon from "@mui/icons-material/Facebook";
// import TwitterIcon from "@mui/icons-material/Twitter";
// import InstagramIcon from "@mui/icons-material/Instagram";

function Overview() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get("http://localhost:5000/me",{ withCredentials: true })
      .then(res => setUser(res.data.user))
      .catch(() => setUser(null));
  }, []);
  const handleSignOut = () => {
    axios.get("http://localhost:5000/logout",  { withCredentials: true })
      .then(() => setUser(null))
      .catch(err => console.error("Sign out failed", err));
      navigate("/authentication/sign-in");
  };


  if (!user) return <p>Not Logged in</p>;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <MDBox mt={5} mb={3}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={6} xl={4} sx={{ display: "flex", flexDirection: "column" }}>
        
            <p>Welcome, {user.name}</p>
            <p>Email: {user.email}</p>
            <ProfileInfoCard
              title="Profile Information"
              description="Hi, I’m d, Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality)."
              info={{
                fullName: user.name,
                mobile: "(44) 123 1234 123",
                email: user.email,
                location: "India",
              }}
              social={[
                {
                  link: "https://www.facebook.com/",
                  icon: <FacebookIcon />,
                  color: "facebook",
                },
                {
                  link: "https://twitter.com/",
                  icon: <TwitterIcon />,
                  color: "twitter",
                },
                {
                  link: "https://www.instagram.com/",
                  icon: <InstagramIcon />,
                  color: "instagram",
                },
              ]}
              action={{ route: "", tooltip: "Edit Profile" }}
              shadow={false}
            />
                        <Button variant="contained" color="primary" onClick={handleSignOut} sx={{ mt: 2 }}>
              Sign Out
            </Button>
            <Divider orientation="vertical" sx={{ mx: 0 }} />
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Overview;
