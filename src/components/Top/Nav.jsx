import {
   BrowserRouter as Router,
   Routes,
   Route,
   Link
 } from "react-router-dom";
 import About from '../about/about'


 export default function Nav() {
   return (
     <>
     <Router>
         <Routes>
             <Route path="/about" element={<About />} />
         </Routes>
       
           <nav className='nav'>
             <h1><Link to="/about">About</Link> </h1>
           </nav>
   </Router>  
      
     </>
      
       
   );
 }
 
 