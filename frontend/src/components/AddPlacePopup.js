import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {

  const [cardName, setCardName] = React.useState('');
  const [cardLink, setCardLink] = React.useState('');

  const [isValidCardName, setValidityСardName] = React.useState(false);
  const [errorСardName, setErrorCardName] = React.useState('');

  const [isValidCardLink, setValidityCardLink] = React.useState(false);
  const [errorСardLink, setErrorCardLink] = React.useState('');

  const [isFormValid, setValidityForm] = React.useState(false)

  function handleChangeCardName(e) {
    setCardName(e.target.value);    
    if (!setValidityСardName(e.target.validity.valid)) {
      setErrorCardName(e.target.validationMessage);
    } else {
      setErrorCardName('');
    }
  }

  function handleChangeCardLink(e) {
    setCardLink(e.target.value);
    if (!setValidityCardLink(e.target.validity.valid)) {
      setErrorCardLink(e.target.validationMessage);
    } else {
      setErrorCardLink('');
    }
  }

  React.useEffect(() => {
    if ((isValidCardName && isValidCardLink)) {
      setValidityForm(true)
    } else {
      setValidityForm(false)
    }
  }, [isValidCardName, isValidCardLink]) 

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onAddPlace({ 
      name: cardName,
      link: cardLink });
  }

  React.useEffect(() => {
    setCardName('');
    setCardLink('');
    setErrorCardName('');
    setErrorCardLink('');
    setValidityForm(true);
    setValidityСardName(true);
    setValidityCardLink(true);
  },[props.isOpen])

  return(
    <PopupWithForm 
      name='add' 
      title='Новое место'
      buttonText={props.isConfirm ? 'Секундочку...' : 'Сохранить'} //не понятно, почему перед закрытием текст кнопки меняется на первоначальный
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isFormValid={isFormValid}>

      <label className="popup__input-form-label">
        <input
          value={cardName || ''}
          onChange={handleChangeCardName}
          type="text"
          name="name"
          id="element-name"
          className={`popup__input-text popup__input-text_type_name ${!isValidCardName ? 'popup__input-text_type_error' : ''}`}
          placeholder="Название"
          required
          minLength="3"
          maxLength="30"/>
        <span className={`popup__input-form-error ${!isValidCardName ? 'popup__input-form-error_active' : ''}`} id="element-name-error">{errorСardName}</span>
      </label>
      <label className="popup__input-form-label">
        <input
        value={cardLink ? cardLink : ''}
        onChange={handleChangeCardLink}
        type="url"
        name="link"
        id="element-photo"
        className={`popup__input-text popup__input-text_type_link ${!isValidCardLink ? 'popup__input-text_type_error' : ''}`}
        placeholder="Ссылка на картнку"
        required />
        <span className={`popup__input-form-error ${!isValidCardLink ? 'popup__input-form-error_active' : ''}`} id="element-photo-error">{errorСardLink}</span>
      </label>
      </PopupWithForm>
  )
}

export default AddPlacePopup;