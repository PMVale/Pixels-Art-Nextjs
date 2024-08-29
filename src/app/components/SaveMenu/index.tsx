import React, { useState } from 'react'

type saveProps = {
  savedBoard: string[],
  savedPalette: string[],
  boardSize: string,
  paletteSize: string
};

type savedType = {
  saveName: string,
  boardSize: string,
  board: string[],
  paletteSize: string,
  palette: string[]
};

const SaveMenu: React.FC<saveProps> = ({savedBoard, savedPalette, boardSize, paletteSize}) => {

  const [saveActive, setSaveActive] = useState(false);
  const [saveName, setSaveName] = useState('');

  const handleSaveBtn = () => {
    const saveData: savedType = {
      saveName: saveName,
      boardSize: boardSize,
      board: savedBoard,
      paletteSize: paletteSize,
      palette: savedPalette
    };

    const storage = JSON.parse(localStorage.getItem('saveData') as string);

    localStorage.setItem('saveData', JSON.stringify([...storage, saveData]));
    setSaveActive(false);
    setSaveName('');
  };

  return (
    <div>
      <button onClick={() => setSaveActive(!saveActive)}>{!saveActive ? 'Save' : 'Close'}</button>
      {saveActive && 
        <section>
          <label htmlFor="saveName">
            Savefile Name:
            <input type="text" name="saveName" id="saveName" value={saveName} onChange={({target}) => setSaveName(target.value)}/>  
          </label>
          <button onClick={handleSaveBtn}>Finish Save</button>
        </section>}
    </div>
  )
}

export default SaveMenu