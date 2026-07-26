import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollManager from './components/ScrollManager';
import Home from './pages/Home';
import Sok from './pages/Sok';
import VerksamhetProfil from './pages/VerksamhetProfil';
import Sparade from './pages/Sparade';
import Jamfor from './pages/Jamfor';

export default function App() {
  return (
    <>
      <ScrollManager />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sok" element={<Sok />} />
        <Route path="/verksamhet/:slug" element={<VerksamhetProfil />} />
        <Route path="/sparade" element={<Sparade />} />
        <Route path="/jamfor" element={<Jamfor />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </>
  );
}
