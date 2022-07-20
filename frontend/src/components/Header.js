import logo from '../images/Logo.svg';
import { Link, Route, Switch } from 'react-router-dom';

function Header(props) {

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Картинка логотип проекта" />
      <div className="header__container">
        <Switch>
          <Route path="/sign-up">
            <Link to="/sign-in" 
              className="header__button" 
              type="button"
              aria-label="Войти">Войти</Link>
          </Route>
          <Route path="/sign-in">
            <Link to="/sign-up" 
                className="header__button" 
                type="button"
                aria-label="Регистрация">Регистрация</Link>
          </Route>
          <Route exact path="/">
            <p className="header__email">{props.email}</p>
            <Link to="/sign-in" 
              className={`header__button ${props.email ? 'header__button_grey' : ''}`} 
              type="button"
              onClick={props.handleSignOut}
              aria-label="Выйти">Выйти</Link>
          </Route>

        </Switch>
        
      </div>
    </header>
  );
}

export default Header;