import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import { api } from '../utils/Api';
import { CurrentUserContext } from '../context/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmationPopup from './ConfirmationPopup';
import { Switch, Route, useHistory, Redirect } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import * as Auth from '../utils/Auth';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isConfirmDeleteCard, setIsConfirmDeleteCard] = React.useState(false);
  const [isConfirmating, setIsConfirmating] = React.useState(false);
  const [cardToDeleted, setCardToDeleted] = React.useState(null);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isRegistered, setIsRegister] =React.useState(false);
  const [userData, setUserData] = React.useState(null);
  const history = useHistory();

  React.useEffect(() => {
    setIsLoading(true);
    Promise.all([api.getInitialUser(), api.getInitialCards()])
    .then(([userData, initialCards]) => {
      //установка данных пользователя
      setCurrentUser(userData);
      setCards(initialCards)
    })
    .catch(err => {
      console.log(err)
    })
    .finally(() => setIsLoading(false));
  }, []);

  function handleCardLike(card) {
                                    
    const isLiked = card.likes.some(i => i._id === currentUser._id); // Снова проверяем, есть ли уже лайк на этой карточке
                                    
    if (!isLiked) {
      api.getAddLike(card._id) // Отправляем запрос в API и получаем обновлённые данные карточки
      .then((newCard) => {
        setCards((prevCards) => {  //Обновляем стейт через колбек по предидущему значению стейта без замыкания
          return prevCards.map((c) => c._id === card._id ? newCard : c);
        })
      })
      .catch(err => {
        console.log(err)
      });
    } else {
      api.getRemoveLike(card._id)
      .then((newCard) => {     
        setCards((prevCards) => {  //Обновляем стейт через колбек по предидущему значению стейта без замыкания
          return prevCards.map((c) => c._id === card._id ? newCard : c);
        })                               
      })
      .catch(err => {
        console.log(err)
      });
    }
  }

  function handleCardDelete(card) {
    setIsConfirmating(true);
    api.getDeleteCard(card._id)
    .then(() => {
      setCards((prevCards) => {  //Обновляем стейт через колбек по предидущему значению стейта без замыкания
        return prevCards.filter(c => c._id !== card._id);
      })
      closeAllPopups();
    })
    .catch(err => {
      console.log(err)
    })
    .finally(() => setIsConfirmating(false));
  }

  function handleUpdateUser(data) {
    setIsConfirmating(true);
    api.getChangeUserInfo(data)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch(err => {
      console.log(err)
    })
    .finally(() => setIsConfirmating(false));
  }

  function handleUpdateAvatar(link) {
    setIsConfirmating(true);
    api.getChangeAvatar(link)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch(err => {
      console.log(err)
    })
    .finally(() => setIsConfirmating(false));
  }

  function handleAddPlaceSubmit(cardItem) {
    setIsConfirmating(true);
    api.getNewCard(cardItem)
    .then((newCardItem) => {
      setCards([newCardItem, ...cards]);
      closeAllPopups();
    })
    .catch(err => {
      console.log(err)
    })
    .finally(() => setIsConfirmating(false));
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardToDeleteClick(card) {
    setCardToDeleted(card);
  }

  function handleTrashClick() {
    setIsConfirmDeleteCard(true);
  }

  const handleRegister = ({ password, email }) => {
    return Auth.register(password, email)
    .then((res) => {
      if (res)  {
        setIsRegister(true)
      }
    })
    .then(() => {
      setInfoTooltipOpen(true);
        history.push("/sign-in")
    })
    .catch(() => {
      setInfoTooltipOpen(true);
      setIsRegister(false)
      history.push("/sign-up")
    })
  }

  const handleLogin = ({ password, email }) => {
    return Auth.authorize(password, email)
    .then((data) => {
      if (data.token) {
        localStorage.setItem('jwt', data.token);
            setUserData(email);
            setLoggedIn(true);
      }
    })
  }

  const tokenCheck = () => {
    if (localStorage.getItem('jwt')){
      const jwt = localStorage.getItem('jwt');
      Auth.getContent(jwt).then((res) => {
        if (res){
          setUserData(res.data.email);
          setLoggedIn(true);          
        }
      });
    }
  }

  const signOut = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    setUserData(null);
    history.push('/sign-in');
  }

  React.useEffect(() => {
    if (loggedIn) {
      history.push("/")
    }
  }, [loggedIn])

  React.useEffect(() => {
    tokenCheck();
  }, []);

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setIsConfirmDeleteCard(false);
    setInfoTooltipOpen(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Header 
              email={userData}
              handleSignOut={signOut} />
          <Switch>
            <Route path="/sign-up">
              <Register
                onRegClick={handleRegister} />
            </Route>
            <Route path="/sign-in">
              <Login
                onLoginClick={handleLogin} />
            </Route>
            <Route exact path="/">
            <ProtectedRoute
              component={Main}
              isLogged={loggedIn}
              onEditProfile={handleEditProfileClick}
              onEditAvatar={handleEditAvatarClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardClickLike={handleCardLike}
              onTrashClick={handleTrashClick}
              onCardClickToDelete={handleCardToDeleteClick}
              isLoading={isLoading} />
            <Footer />
            </Route>
            <Route path="*">
              <Redirect to={loggedIn ? "/" : "/sign-in"} />
            </Route>
          </Switch>
        </div>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isConfirm={isConfirmating}/>

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isConfirm={isConfirmating}/>

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isConfirm={isConfirmating}/>

        <ConfirmationPopup
          isOpen={isConfirmDeleteCard}
          onClose={closeAllPopups}
          onConfirmDelete={handleCardDelete}
          isConfirm={isConfirmating}
          card={cardToDeleted}/>

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}/>

        <InfoTooltip
          onRegistered={isRegistered}
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;



