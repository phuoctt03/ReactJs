import React from 'react';
import { AdminViewsHeader } from '../components/header/adminViews';
import { Views } from '../components/content/views';

export function AdminViews() {
  return (
    <>
      <div className="users">
        <AdminViewsHeader />
        <main>      
          <Views />
        </main>
      </div>
    </>
  );
}

export default AdminViews;
