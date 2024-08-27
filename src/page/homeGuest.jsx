import { Guest } from '../components/header/guest';
import { Sidebar } from '../components/sidebar/sidebar';

export const HomeGuest = () => {
  return (
    <>
      <Guest />
      <main>
        <Sidebar />
      </main>
    </>
  );
}

export default HomeGuest;
