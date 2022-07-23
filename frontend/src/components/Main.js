import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../context/CurrentUserContext';
import Spinner from './Spinner';


function Main(props) {

  const userData = React.useContext(CurrentUserContext);

  return (
    
    props.isLoading ? <Spinner/> :

    <main className="content">
      <section className="profile">
        <div className="profile__container">
          {userData.avatar && (<img 
          onClick={props.onEditAvatar}
          className="profile__avatar" src={userData.avatar} alt="Фотография профиля" />)}
        </div>
        {userData.name && <h1 className="profile__info">{userData.name}</h1>}
        <button
        onClick={props.onEditProfile}
        className="button button_type_edit" type="button" aria-label="Редактировать">
        </button>
        {userData.about && <p className="profile__description">{userData.about}</p>}
        <button
        onClick={props.onAddPlace}
        className="button button_type_add" type="button" aria-label="Добавить"></button>
      </section>
      <section className="elements">
        {
        props.cards.map((card) => {
          return (
            <Card
              card={card}
              key={card._id}
              onCardClick={props.onCardClick}
              onCardClickLike={props.onCardClickLike}
              onCardClickToDelete={props.onCardClickToDelete}
              onTrashClick={props.onTrashClick}/>
          )})
        }        
      </section>
    </main>
  );
}

export default Main;