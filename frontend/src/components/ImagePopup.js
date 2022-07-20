import React from 'react';

function ImagePopup(props) {

  React.useEffect(() => {
    if (!props.card) return;

    function handleEsc(e) {
      if (e.key === "Escape") {
        props.onClose()
      }
    }

    document.addEventListener("keydown", handleEsc);    
    return () => {document.removeEventListener("keydown", handleEsc)
    }
  }, [props.card]);

  React.useEffect(() => {
    if (!props.card) return;

    function handleClickClose(e) {
      if (e.target.className.includes("popup_opened")) {
        props.onClose()
      }
    }

    document.addEventListener("mousedown", handleClickClose);    
    return () => {document.removeEventListener("mousedown", handleClickClose)
    }
  }, [props.card]);

  return(
    <div className={`popup popup_type_image ${props.card && !props.isConfirmationPopupOpen ? 'popup_opened' : ''}`}>
        <div className="popup__window popup__window_type_image-opened">
          <button
            onClick={props.onClose}
            className="popup__close-button popup__close-button_type_image" 
            type="button" aria-label="Закрыть">
          </button>
          <figure className="popup__content">
            {props.card && (<img className="popup__content popup__content_type_image" src={props.card.link} alt={props.card.name}/>)}
            {props.card && (<figcaption className="popup__content popup__content_type_name">{props.card.name}</figcaption>)}
          </figure>
        </div>
      </div>
  )
}

export default ImagePopup;