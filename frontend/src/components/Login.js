import React from "react";

function Login(props) {

  const [formParams, setFormParams] = React.useState({
    email: '',
    password: '',
  });

  const [message, setMessage] = React.useState('');

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormParams((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formParams.email || !formParams.password){
      return;
    }
    props.onLoginClick({ email: formParams.email, password: formParams.password })
        .catch(err => {
          setMessage(err.message);
        });
  }

  return (
    <section className="login">
      <h2 className="login__title">Вход</h2>
      <form className="login__input-form" onSubmit={handleSubmit}>
        <label className="login__input-form-label">
          <input
          value={formParams.email}
          onChange={handleChange}
          className="login__input-text"
          type="text"
          name="email"
          id="email"
          placeholder="Email"
          required
          minLength="2"
          maxLength="20" />
        </label>
        <label className="login__input-form-label">
          <input
          value={formParams.password}
          onChange={handleChange}
          className="login__input-text" 
          type="password"
          name="password"
          id="password"
          placeholder="Пароль"
          required
          minLength="6"
          maxLength="20" />
        </label>
        <button className="login__button" type="submit">Войти</button>
      </form>
    </section>
  )
}

export default Login;

