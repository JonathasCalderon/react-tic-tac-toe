import { useState } from "react"

export default function Player({initialPlayerName, symbol, isActive, onNameChange}) {
  const [ playerName, setPlayerName ] = useState(initialPlayerName);
  const [ isEditing, setIsEditing ] = useState(false);

  const handleEditButton = () => {
    setIsEditing(editing => !editing);
    
    if(isEditing) {
      onNameChange(symbol, playerName);
    }
  }

  const handlePlayerNameChange = (e) => {
    const { value } = e.target

    setPlayerName(value)
  }

  return (
    <li className={ isActive ? "active" : undefined}>
      <span className="player">
        {
          isEditing 
          ? 
            <input type="text" required value={ playerName } onChange={ handlePlayerNameChange }/>
          :
            <span className="player-name">{ playerName }</span>
        }
        <span className="player-symbol">{ symbol }</span>
      </span>
      <button onClick={ handleEditButton }>
        {isEditing ? "Save" : "Edit"}
      </button>
    </li>
  )
}