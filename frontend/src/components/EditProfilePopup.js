import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../context/CurrentUserContext';

function EditProfilePopup(props) {

  const userData = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setUserName(userData.name);
    setUserDescription(userData.about);
    setErrorUserName('');
    setErrorUserDescription('');
    setValidityForm(true);
    setValidityUserName(true);
    setValidityUserDescription(true);
  }, [userData, props.isOpen]) //props.isOpen здесь возвращает первоначальное состояние инпутов и нет необходимости очищать их после закрытия попапа

  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');

  const [isValidUserName, setValidityUserName] = React.useState(true);
  const [errorUserName, setErrorUserName] = React.useState('');

  const [isValidUserDescription, setValidityUserDescription] = React.useState(true);
  const [errorUserDescription, setErrorUserDescription] = React.useState('');

  const [isFormValid, setValidityForm] = React.useState(false)

  function handleChangeUserName(e) {
    setUserName(e.target.value);
    if (!setValidityUserName(e.target.validity.valid)) {
      setErrorUserName(e.target.validationMessage);
    } else {
      setErrorUserName('');
    }
  }

  function handleChangeUserDescription(e) {
    setUserDescription(e.target.value);
    if (!setValidityUserDescription(e.target.validity.valid)) {
      setErrorUserDescription(e.target.validationMessage);
    } else {
      setErrorUserDescription('');
    }
  }

  React.useEffect(() => {
    if ((isValidUserName && isValidUserDescription)) {
      setValidityForm(true)
    } else {
      setValidityForm(false)
    }
  }, [isValidUserName, isValidUserDescription])

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name: userName,
      about: userDescription });
  }

  return(
    <PopupWithForm 
      name='profile' 
      title='Редактировать профиль'
      buttonText={props.isConfirm ? 'Сохранение...' : 'Сохранить'} //не понятно, почему перед закрытием текст кнопки меняется на первоначальный
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isFormValid={isFormValid}>
      
      <label className="popup__input-form-label">
        <input
          value={userName || ''}
          onChange={handleChangeUserName}
          type="text"
          name="info"
          id="profile-info"
          className={`popup__input-text popup__input-text_type_name ${!isValidUserName ? 'popup__input-text_type_error' : ''}`}
          placeholder="Имя пользователя"
          required
          minLength="2"
          maxLength="40"/>
        <span className={`popup__input-form-error ${!isValidUserName ? 'popup__input-form-error_active' : ''}`} id="profile-info-error">{errorUserName}</span>
      </label>
      <label className="popup__input-form-label">
        <input
          value={userDescription || ''}
          onChange={handleChangeUserDescription}
          type="text"
          name="description"
          id="profile-description"
          className={`popup__input-text popup__input-text_type_description ${!isValidUserDescription ? 'popup__input-text_type_error' : ''}`}
          placeholder="Профессия"
          required
          minLength="2"
          maxLength="200"/>
        <span className={`popup__input-form-error ${!isValidUserDescription ? 'popup__input-form-error_active' : ''}`} id="profile-description-error">{errorUserDescription}</span>
      </label>
    </PopupWithForm>
  )
}

export default EditProfilePopup;