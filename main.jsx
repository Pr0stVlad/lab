import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, NavLink, Outlet } from 'react-router-dom';
import { startGroups } from './data.js';
import { Home, List, Details, Add, About, NotFound } from './Pages.jsx';
import { ClassList, ClassDetails } from './ClassPages.jsx';
import './style.css';

function Layout() {
  const [groups, setGroups] = useState(startGroups);

  function addGroup(group) {
    setGroups([...groups, { ...group, id: groups.length + 1 }]);
  }

  return (
    <div>
      <nav className="menu">
        <NavLink to="/" end>Головна</NavLink>
        <NavLink to="/items">Групи</NavLink>
        <NavLink to="/add">Додати групу</NavLink>
      </nav>
      <main className="page">
        <Outlet context={{ groups, addGroup }} />
      </main>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'items', element: <List /> },
      { path: 'items/:id', element: <Details /> },
      { path: 'add', element: <Add /> },
      { path: 'class/items', element: <ClassList /> },
      { path: 'class/items/:id', element: <ClassDetails /> },
      { path: 'about', element: <About /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

createRoot(document.getElementById('root')).render(<RouterProvider router={router} />);
