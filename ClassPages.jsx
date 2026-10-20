import { Component } from 'react';
import { Link, useOutletContext, useParams } from 'react-router-dom';

class ListClass extends Component {
  render() {
    return (
      <div>
        <h2>Список груп (класові компоненти)</h2>
        <div className="cards">
          {this.props.groups.map((g) => (
            <div className="card" key={g.id}>
              <h3>{g.code}</h3>
              <p>Факультет: {g.faculty}</p>
              <p>Курс: {g.course}</p>
              <p>Студентів: {g.students.length}</p>
              <Link to={'/class/items/' + g.id} className="btn">Детальніше</Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

// Хуки працюють лише у функціях, тому дані беремо тут і передаємо класу через props
export function ClassList() {
  const { groups } = useOutletContext();
  return <ListClass groups={groups} />;
}

class DetailsClass extends Component {
  componentDidMount() {
    document.title = 'Деталі групи';
  }

  componentWillUnmount() {
    document.title = 'Групи студентів';
  }

  render() {
    const g = this.props.group;
    if (!g) return <p>Групу не знайдено</p>;

    return (
      <div>
        <h2>Група {g.code}</h2>
        <p>Факультет: {g.faculty}</p>
        <p>Курс: {g.course}</p>
        <h3>Студенти:</h3>
        <ol>
          {g.students.map((name) => <li key={name}>{name}</li>)}
        </ol>
        <Link to="/class/items" className="btn">Назад</Link>
      </div>
    );
  }
}

export function ClassDetails() {
  const { id } = useParams();
  const { groups } = useOutletContext();
  return <DetailsClass group={groups.find((g) => g.id === Number(id))} />;
}
