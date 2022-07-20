import React from 'react';
import ok_pic from '../images/OK_pic.svg';
import err_pic from '../images/ERR_pic.svg';
import { useEscClose, useClickClose} from '../utils/useClose';

function InfoTooltip(props) {

  useEscClose(props.isOpen, props.onClose);

  useClickClose(props.isOpen, props.onClose, "popup_opened");

  React.useEffect(() => {
    if (!props.isOpen) return;

    function handleClickClose(e) {
      if (e.target.className.includes("popup_opened")) {
        props.onClose()
      }
    }

    document.addEventListener("mousedown", handleClickClose);    
    return () => {document.removeEventListener("mousedown", handleClickClose)
    }
  }, [props.isOpen]);

  return(
    <div className={`popup popup_type_tooltip ${props.isOpen ? 'popup_opened' : ''}`}>
        <div className="popup__window">
          <button 
            className="popup__close-button" 
            type="button" 
            aria-label="Закрыть"
            onClick={props.onClose}>
          </button>
          <div className="popup__content">
            <img className="popup__image" src={props.onRegistered ? ok_pic : err_pic} alt="Изображение"  />
            <h2 className="popup__text">{props.onRegistered ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</h2>
          </div>
        </div>
      </div>
  )
}

export default InfoTooltip;