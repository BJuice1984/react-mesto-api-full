import React from 'react';
import { useEscClose, useClickClose} from '../utils/useClose';

function PopupWithForm(props) {

  useEscClose(props.isOpen, props.onClose);

  useClickClose(props.isOpen, props.onClose, "popup_opened");

  return(
    <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
        <div className="popup__window">
          <button 
            className="popup__close-button" 
            type="button" 
            aria-label="Закрыть"
            onClick={props.onClose}>
          </button>
          <div className="popup__content">
            <h2 className="popup__header">{props.title}</h2>
            <form onSubmit={props.onSubmit} name={props.name} className={`popup__input-form popup__input-form_type_${props.name}`} >
              {props.children}
              <button className={`popup__save-button ${(!props.isFormValid) ? 'popup__save-button_disabled' : ''}`} type="submit" aria-label="Сохранить">{props.buttonText}</button>
            </form>
          </div>
        </div>
      </div>
  )
}

export default PopupWithForm;