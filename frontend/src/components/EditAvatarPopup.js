import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) { 
  
  const avaRef = React.useRef();

  const [isValidAvaRef, setValidityAvaRef] = React.useState(true);
  const [errorAvaRef, setErrorAvaRef] = React.useState('');

  function handleChangeAvaLink(e) {
    if (!setValidityAvaRef(e.target.validity.valid)) {
      setErrorAvaRef(e.target.validationMessage);
    } else {
      setErrorAvaRef('');
    }
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateAvatar({ avatar: avaRef.current.value });
  }

  React.useEffect(() => {
    avaRef.current.value = '';
    setErrorAvaRef('');
    setValidityAvaRef(true);
  },[props.isOpen])
  
  return(
    <PopupWithForm 
      name='avatar' 
      title='Обновить аватар'
      buttonText={props.isConfirm ? 'Ава сохранись...' : 'Сохранить'} //не понятно, почему перед закрытием текст кнопки меняется на первоначальный
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isFormValid={isValidAvaRef}>

      <label className="popup__input-form-label">
        <input
        ref={avaRef}
        onChange={handleChangeAvaLink}
        type="url"
        name="avatar"
        id="element-avatar"
        className={`popup__input-text popup__input-text_type_link ${!isValidAvaRef ? 'popup__input-text_type_error' : ''}`}
        placeholder="Ссылка на новый аватар"
        defaultValue=""
        minLength="2"
        required />
        <span className={`popup__input-form-error ${!isValidAvaRef ? 'popup__input-form-error_active' : ''}`} id="element-avatar-error">{errorAvaRef}</span>
      </label>
      </PopupWithForm>
  )
}

export default EditAvatarPopup;