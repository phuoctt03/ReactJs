import { AdminVideoHeader } from '../components/header/adminVideo';
import { Sidebar } from '../components/sidebar/sidebar';

export function AdminVideo() {
  return (
    <>
      <AdminVideoHeader />
      <main>
        <Sidebar />
      </main>
    </>
  );
}

export default AdminVideo;
