import React from 'react';
// import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Login from './components/Login';
import Todos from './components/Todos';
import Categories from './components/Categories';
import Bootstrap from './components/Bootstrap';
import NotFound from './components/NotFound';
import AuthProvider from './contexts/AuthContext';
import Logout from './components/Logout';
import ProtectedRoute from './components/ProtectedRoute'


export default function App() {
  return (
    <div className='App'>
    {/* The below component is actually calling the BrowserRouter but we made an alias in the import. We surround the Navigation because 
    it has Link components called from react-router-dom package and rendered in that component. Per the docs on their site: 
    Link, Routes, and each Route need to be rendered inside the Router. */}  
    <AuthProvider>
    <BrowserRouter>
      <Navigation />
      {/* Routes is like a switch that defines each individual Route */}
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/todos' element={<Todos />} />
        <Route path='/categories' element={<Categories />} />
        <Route path='/bootstrap' element={<Bootstrap />} />
        <Route path='/logout' element={ <Logout /> } />
        <Route path='/routing' element={ <ProtectedRoute></ProtectedRoute> } />
        {/* The NotFound component will be an error handler (page showing a nice message) and will be tied to any other Route than what 
        is detailed above. All routes listed above this Route will have very specific paths that are listed for them. This Route will be 
        a catch all for the rest of what could be in the path */}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
    {/* Below is our footer component  */}
    {/* <Footer /> */}
    </div>

  )
}










// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
