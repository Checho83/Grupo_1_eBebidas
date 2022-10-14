import React, { useState, useEffect, useRef } from 'react';
import SideBar from './SideBar';
import ContentWrapper from './ContentWrapper';
function App() {
  const [showSideBar, setShowSidebar] = useState(true);

  const sideBar = useRef();

  // useEffect(() => {
  //   if (showSideBar) {
  //     sideBar.current.style.display = 'block';
  //     console.log("Se montó el componente");
  //   } else {
  //     sideBar.current.style.display = 'none';
  //     console.log("Se desmontó el componente");
  //   }
  // }, [showSideBar]);

  // Desmontar
  // useEffect(() => {
  //   return console.log("Se desmontó el componente");
  // }, []);

  // Desmontar
  // useEffect(()=>{ return ()=>{}},[]);

  return (
    <React.Fragment>
      	<div id="wrapper">
          <SideBar ref={sideBar} />
        </div>
    </React.Fragment>
  );
}

export default App;
