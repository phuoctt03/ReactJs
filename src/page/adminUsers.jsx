import React from 'react';
import { AdminUserHeader } from '../components/header/adminUser';
import { Users } from '../components/content/managerUser';

export function AdminUsers() {
  return (
    <>
      <div className="users">
        <AdminUserHeader />
        <main>      
          <Users />
        </main>
      </div>
    </>
  );
}

export default AdminUsers;
