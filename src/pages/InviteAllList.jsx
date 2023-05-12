import React from 'react';
import InviteProvider from '../Context/InviteProvider';
import InviteListPage from '../components/Invite/InviteListPage';

const InviteAllList = () => {
  return (
    <InviteProvider>
        <InviteListPage/>
    </InviteProvider>
  )
}

export default InviteAllList