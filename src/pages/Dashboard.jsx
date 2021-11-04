import React, { useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Timeline from '../components/Timeline';

function Dashboard() {
  useEffect(() => {
    document.title = 'Pix n Gram';
  }, []);

  return (
    <div>
      <Header>
        <div className='grid'>
          <Timeline />
          <Sidebar />
        </div>
      </Header>
    </div>
  );
}

export default Dashboard;
