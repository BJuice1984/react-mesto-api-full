import React from "react";
import PopupWithForm from "./PopupWithForm";

function ConfirmationPopup(props) {

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    props.onConfirmDelete(props.card);
  }

  return(
    <PopupWithForm 
      name='delete'
      title='Вы уверены?'
      buttonText={props.isConfirm ? 'Удаление...' : 'Да'} //не понятно, почему перед закрытием текст кнопки меняется на первоначальный
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isFormValid={true}>

    </PopupWithForm>
  )
}

export default ConfirmationPopup;