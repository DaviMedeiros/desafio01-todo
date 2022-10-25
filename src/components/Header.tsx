import './Header.css';

import toDoLogo from '../assets/logo.svg';

export function Header(){
  return(
    <header className="header">
      <img src={toDoLogo} alt="Logotipo do site com um foguete e escrito ToDo" />
    </header>
  )
}
