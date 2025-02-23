import React, { useState } from "react";
import { FaGithub, FaTwitter, FaLinkedin, FaDiscord } from "react-icons/fa";
import BasicLayout from "../components/BasicLayout";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";

const Basic = () => {
  const [isRegister, setIsRegister] = useState(false);
  
  // useEffect(() => {
  //   axios.get("http://localhost:5000/me", { withCredentials: true })
  //     .then(res => setUser(res.data.user))
  //     .catch(() => setUser(null));
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegister) {
        await axios.post("http://localhost:5000/register", { name, email, password }, { withCredentials: true });
      }
      const { data } = await axios.post("http://localhost:5000/login", { email, password }, { withCredentials: true });
      setUser(data.user);
    } catch (error) {
      alert(error.response?.data?.message || "An error occurred");
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  const handleLogout = async () => {
    await axios.get("http://localhost:5000/logout", { withCredentials: true });
    setUser(null);
  };
  return (
    <BasicLayout>
    <div style={{ display: "flex", height: "100vh", width: "100%" }}>
      <style>
        {`
          .left-section {
            display: none;
          }
          @media (min-width: 768px) {
            .left-section {
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              background-color: #2563eb;
              color: white;
              width: 50%;
              padding: 2.5rem;
              position: relative;
            }
          }
          .form-container {
            width: 100%;
            max-width: 24rem;
            background-color: white;
            padding: 1.5rem;
            border-radius: 0.5rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
        `}
      </style>
      {/* Left Section */}
      <div className="left-section">
        <div style={{ position: "absolute", top: "2.5rem", left: "2.5rem" }}>
          <img src="/logo.png" alt="Logo" style={{ width: "4rem", height: "4rem" }} />
        </div>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "1.875rem",
            fontWeight: "bold",
          }}
        >
          BASE
        </div>
        <div style={{ position: "absolute", bottom: "2.5rem", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "1rem" }}>
          <FaGithub style={{ fontSize: "1.25rem" }} />
          <FaTwitter style={{ fontSize: "1.25rem" }} />
          <FaLinkedin style={{ fontSize: "1.25rem" }} />
          <FaDiscord style={{ fontSize: "1.25rem" }} />
        </div>
      </div>
      
      {/* Right Section */}
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "100%", padding: "2rem" }}>
        {isRegister ? (
          <>
            <h2 style={{ fontSize: "1.875rem", fontWeight: "600", marginBottom: "1rem" }}>Create Account</h2>
            <p style={{ color: "#6b7280", marginBottom: "1.5rem" }}>Sign up for a new account</p>
          </>
        ) : (
          <>
            <h2 style={{ fontSize: "1.875rem", fontWeight: "600", marginBottom: "1rem" }}>Sign In</h2>
            <p style={{ color: "#6b7280", marginBottom: "1.5rem" }}>Sign in to your account</p>
          </>
        )}

        {/* OAuth Buttons */}
        <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem" }}>
       
          <button style={{ border: "1px solid #d1d5db", padding: "0.5rem", borderRadius: "0.375rem", display: "flex", alignItems: "center", gap: "0.5rem" }} onClick={handleGoogleLogin}>
            {/* <img src="/google-icon.svg" alt="Google" style={{ width: "1.25rem", height: "1.25rem" }} /> */}
            <FcGoogle />
            {isRegister ? "Sign up with Google" : "Sign in with Google"}
          </button>
          <button style={{ border: "1px solid #d1d5db", padding: "0.5rem", borderRadius: "0.375rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            {/* <img src="/apple-icon.svg" alt="Apple" style={{ width: "1.25rem", height: "1.25rem" }} /> */}
            <FaApple />
            {isRegister ? "Sign up with Apple" : "Sign in with Apple"}
          </button>
        </div>

        {/* Form */}
        <form className="form-container"  onSubmit={handleSubmit}>
          {isRegister && (
            <>
              <label style={{ display: "block", fontSize: "0.875rem", fontWeight: "500" }}>Full Name</label>
              <input type="text" style={{ width: "100%", padding: "0.5rem", border: "1px solid #d1d5db", borderRadius: "0.375rem", marginBottom: "1rem" }} placeholder="John Doe" />
            </>
          )}
          <label style={{ display: "block", fontSize: "0.875rem", fontWeight: "500" }}>Email address</label>
          <input type="email" style={{ width: "100%", padding: "0.5rem", border: "1px solid #d1d5db", borderRadius: "0.375rem", marginBottom: "1rem" }} placeholder="johndoe@gmail.com" />
          
          <label style={{ display: "block", fontSize: "0.875rem", fontWeight: "500" }}>Password</label>
          <input type="password" style={{ width: "100%", padding: "0.5rem", border: "1px solid #d1d5db", borderRadius: "0.375rem", marginBottom: "1rem" }} placeholder="••••••••" />
          
          {!isRegister && (
            <a href="#" style={{ color: "#2563eb", fontSize: "0.875rem", marginBottom: "1rem", display: "inline-block" }}>Forgot password?</a>
          )}
          
          <button style={{ width: "100%", backgroundColor: "#2563eb", color: "white", padding: "0.5rem", borderRadius: "0.375rem" }}>
            {isRegister ? "Sign Up" : "Sign In"}
          </button>
        </form>
        
        <p style={{ fontSize: "0.875rem", marginTop: "1rem" }}>
          {isRegister ? (
            <>Already have an account? <button style={{ color: "#2563eb" }} onClick={() => setIsRegister(false)}>Sign in</button></>
          ) : (
            <>Don't have an account? <button style={{ color: "#2563eb" }} onClick={() => setIsRegister(true)}>Register here</button></>
          )}
        </p>
      </div>
    </div>
    </BasicLayout>
  );
};

export default Basic;

// import React, { useState, useEffect } from "react";
// import { FaGithub, FaTwitter, FaLinkedin, FaDiscord } from "react-icons/fa";
// import { FcGoogle } from "react-icons/fc";
// import { FaApple } from "react-icons/fa";
// import axios from "axios";
// import BasicLayout from "../components/BasicLayout";

// const Basic = () => {
//   const [isRegister, setIsRegister] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     axios.get("http://localhost:5000/me", { withCredentials: true })
//       .then(res => setUser(res.data.user))
//       .catch(() => setUser(null));
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (isRegister) {
//         await axios.post("http://localhost:5000/register", { name, email, password }, { withCredentials: true });
//       }
//       const { data } = await axios.post("http://localhost:5000/login", { email, password }, { withCredentials: true });
//       setUser(data.user);
//     } catch (error) {
//       alert(error.response?.data?.message || "An error occurred");
//     }
//   };

//   const handleGoogleLogin = () => {
//     window.location.href = "http://localhost:5000/auth/google";
//   };

//   const handleLogout = async () => {
//     await axios.get("http://localhost:5000/logout", { withCredentials: true });
//     setUser(null);
//   };

//   return (
//     <BasicLayout>
//       <div style={{ display: "flex", height: "100vh", width: "100%" }}>
//       <style>
//         {`
//           .left-section {
//             display: none;
//           }
//           @media (min-width: 768px) {
//             .left-section {
//               display: flex;
//               flex-direction: column;
//               justify-content: space-between;
//               background-color: #2563eb;
//               color: white;
//               width: 50%;
//               padding: 2.5rem;
//               position: relative;
//             }
//           }
//           .form-container {
//             width: 100%;
//             max-width: 24rem;
//             background-color: white;
//             padding: 1.5rem;
//             border-radius: 0.5rem;
//             box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//           }
//         `}
//       </style>
//         {/* Left Section */}
//         <div className="left-section">
//           <div style={{ position: "absolute", top: "2.5rem", left: "2.5rem" }}>
//             <img src="/logo.png" alt="Logo" style={{ width: "4rem", height: "4rem" }} />
//           </div>
//           <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", fontSize: "1.875rem", fontWeight: "bold" }}>
//             BASE
//           </div>
//         </div>
        
//         {/* Right Section */}
//         <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "100%", padding: "2rem" }}>
//           {user ? (
//             <>
//               <p>Welcome, {user.name}</p>
//               <button onClick={handleLogout} style={{ backgroundColor: "red", color: "white", padding: "10px", borderRadius: "5px" }}>Logout</button>
//             </>
//           ) : (
//             <>
//               <h2>{isRegister ? "Create Account" : "Sign In"}</h2>
//               <form onSubmit={handleSubmit} className="form-container">
//                 {isRegister && (
//                   <>
//                     <label>Full Name</label>
//                     <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="John Doe" />
//                   </>
//                 )}
//                 <label>Email</label>
//                 <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="johndoe@gmail.com" />
                
//                 <label>Password</label>
//                 <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" />
                
//                 <button type="submit" style={{ backgroundColor: "#2563eb", color: "white" }}>
//                   {isRegister ? "Sign Up" : "Sign In"}
//                 </button>
//               </form>
              
//               <button onClick={handleGoogleLogin} style={{ display: "flex", alignItems: "center", gap: "5px", padding: "10px", border: "1px solid gray", borderRadius: "5px" }}>
//                 <FcGoogle /> {isRegister ? "Sign up with Google" : "Sign in with Google"}
//               </button>
              
//               <p>
//                 {isRegister ? (
//                   <>Already have an account? <button onClick={() => setIsRegister(false)}>Sign in</button></>
//                 ) : (
//                   <>Don't have an account? <button onClick={() => setIsRegister(true)}>Register here</button></>
//                 )}
//               </p>
//             </>
//           )}
//         </div>
//       </div>
//     </BasicLayout>
//   );
// };

// export default Basic;
