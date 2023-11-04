import { useState } from "react";

export default function Player({ initialName, symbol, isActive, onChangeName }) {
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

/**
 * Toggles the editing state of the player.
 */
function handleEditClick() {
    setIsEditing((wasEditing) => !wasEditing);
    if (isEditing) onChangeName(symbol, playerName);
}
/**
 * Updates the player name state based on the input value.
 * @param {object} event - The input change event.
 */
function handlePlayerNameChange(event) {
    setPlayerName(event.target.value);
}

  let editablePlayerName = <span className="player-name">{playerName}</span>;
  if (isEditing) {
    editablePlayerName = (
      <input
        type="text"
        value={playerName}
        required
        onChange={handlePlayerNameChange}
      />
    );
  }
  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
