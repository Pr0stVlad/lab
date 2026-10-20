import { useEffect, useState } from 'react';
import { Link, useNavigate, useOutletContext, useParams } from 'react-router-dom';

export function Home() {
  return (
    <div>
      <h2>Головна</h2>
      <p>Тут можна переглянути групи студентів і додати нову групу.</p>
      <Link to="/items" className="btn">Переглянути групи</Link>
    </div>
  );
}

// props: group приходить від батька
function GroupCard({ group }) {
  return (
    <div className="card">
      <h3>{group.code}</h3>
      <p>Факультет: {group.faculty}</p>
      <p>Курс: {group.course}</p>
      <p>Студентів: {group.students.length}</p>
      <Link to={'/items/' + group.id} className="btn">Детальніше</Link>
    </div>
  );
}

export function List() {
  const { groups } = useOutletContext();
  return (
    <div>
      <h2>Список груп</h2>
      <div className="cards">
        {groups.map((g) => <GroupCard key={g.id} group={g} />)}
      </div>
    </div>
  );
}

export function Details() {
  const { id } = useParams(); // id з адреси
  const { groups } = useOutletContext();
  const group = groups.find((g) => g.id === Number(id));

  useEffect(() => {
    if (group) document.title = group.code;
    return () => { document.title = 'Групи студентів'; };
  }, [group]);

  if (!group) return <p>Групу не знайдено</p>;

  return (
    <div>
      <h2>Група {group.code}</h2>
      <p>Факультет: {group.faculty}</p>
      <p>Курс: {group.course}</p>
      <h3>Студенти:</h3>
      <ol>
        {group.students.map((name) => <li key={name}>{name}</li>)}
      </ol>
      <Link to="/items" className="btn">Назад</Link>
    </div>
  );
}

// onAdd — функція від батька, через неї передаємо дані вгору
function GroupForm({ onAdd }) {
  const [faculty, setFaculty] = useState('');
  const [course, setCourse] = useState(1);
  const [code, setCode] = useState('');
  const [students, setStudents] = useState('');

  function submit(e) {
    e.preventDefault();
    const list = students.split('\n').map((s) => s.trim()).filter((s) => s);
    if (!faculty || !code || list.length === 0) {
      alert('Заповніть усі поля!');
      return;
    }
    onAdd({ faculty, course: Number(course), code, students: list });
  }

  return (
    <form onSubmit={submit}>
      <label>Факультет</label>
      <input value={faculty} onChange={(e) => setFaculty(e.target.value)} />
      <label>Курс</label>
      <select value={course} onChange={(e) => setCourse(e.target.value)}>
        {[1, 2, 3, 4, 5, 6].map((n) => <option key={n}>{n}</option>)}
      </select>
      <label>Шифр групи</label>
      <input value={code} onChange={(e) => setCode(e.target.value)} />
      <label>Студенти (кожен з нового рядка)</label>
      <textarea rows="6" value={students} onChange={(e) => setStudents(e.target.value)} />
      <button className="btn">Додати</button>
    </form>
  );
}

export function Add() {
  const { addGroup } = useOutletContext();
  const navigate = useNavigate();

  function onAdd(group) {
    addGroup(group);
    navigate('/items');
  }

  return (
    <div>
      <h2>Додати групу</h2>
      <GroupForm onAdd={onAdd} />
    </div>
  );
}

export function About() {
  return (
    <div>
      <h2>Про додаток</h2>
      <p>Навчальний додаток: React Router і робота зі списками.</p>
    </div>
  );
}

export function NotFound() {
  return (
    <div>
      <h2>Сторінку не знайдено</h2>
      <Link to="/" className="btn">На головну</Link>
    </div>
  );
}
