import logo from '../logo.svg';
import './App.css';
import { useMatch, useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom';
import { links } from './defines'
import HomePage from './HomePage';
import DriftPage from './DriftPage';
import TimeAttackPage from './TimeAttack';
import ForzaPage from './ForzaPage';

function Menu({active, setActive}) {
  const handleClick = url => {
    console.log(url)
    setActive(url);
  }
  return (
    <nav className="menu">
      {
        Object.entries(links).map(([id, obj]) => {
          return (
            <Link to={obj.url}
              onClick={() => handleClick(obj.url)}
              className={"menu__item" + (active === obj.url ? " menu__item-active" : "")}
              key={obj.url}>
                {obj.name}
            </Link>
          );
        })
      }
    </nav>
  );
}

export default function App() {
  const [active, setActive] = useState('')
  return (
    <div>
      <Menu active={active} setActive={setActive} />
      <div className="page">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/drift" element={<DriftPage />} />
          <Route path="/timeattack" element={<TimeAttackPage />} />
          <Route path="/forza" element={<ForzaPage />} />
        </Routes>
      </div>
    </div>
  );
}
