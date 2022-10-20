import React from 'react';
import { ContentWrapper } from '../ContentWrapper';
import Dashboard from '../../pages/Dashboard';
import { SideBar } from '../SideBar';

function App() {

  return (
    <React.Fragment>
      <div id='wrapper'>
        <SideBar />
        <ContentWrapper>
          <Dashboard />
        </ContentWrapper>
      </div>
    </React.Fragment>
  );
}

export default App;
