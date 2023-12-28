import './App.style.scss';
import Table from 'components/Table';

export const App = () => {
  return (
    <div className="container">
      <header className="header">
        <button type="button" className="header__btn header__btn--menu"></button>
        <button type="button" className="header__btn header__btn--back"></button>
        <ul className="header__list">
          <li className="active">Просмотр</li>
          <li>Управление</li>
        </ul>
      </header>
      <div className="content">
        <div className="menu-header">
          <p className="menu-header__title">Название проекта <small>Аббревиатура</small></p>
          <button type="button" className="menu-header__btn"></button>
        </div>
        <div className="content-header">
          <p className="content-header__title">Строительно-монтажные работы</p>
        </div>
        <aside className="menu">
          <ul className="menu-list">
            <li>По проекту</li>
            <li>Объекты</li>
            <li>РД</li>
            <li>МТО</li>
            <li className="active">СМР</li>
            <li>График</li>
            <li>МиМ</li>
            <li>Рабочие</li>
            <li>Капвложения</li>
            <li>Бюджет</li>
            <li>Финансирование</li>
            <li>Панорамы</li>
            <li>Камеры</li>
            <li>Поручения</li>
            <li>Контрагенты</li>
          </ul>
        </aside>
        <Table />
      </div>
    </div>
  );
};
