import React, { useEffect, useState } from 'react'
import styles from './load.module.css'

type settingsType = {
  boardSize: string,
  paletteSize: string
};

type loadProps = {
  setSettings: React.Dispatch<React.SetStateAction<settingsType>>,
  setSavedPalette: React.Dispatch<React.SetStateAction<string[]>>,
  setSavedBoard: React.Dispatch<React.SetStateAction<string[]>>,
  setLoadActive: React.Dispatch<React.SetStateAction<boolean>>,
  setNewLoad: React.Dispatch<React.SetStateAction<boolean>>
};

type savedType = {
  saveName: string,
  boardSize: string,
  board: string[],
  paletteSize: string,
  palette: string[]
};

const LoadMenu: React.FC<loadProps> = ({setSettings, setSavedBoard, setSavedPalette, setLoadActive, setNewLoad}) => {
  const [savedData, setSavedData] = useState<savedType[]>([]);

  useEffect(() => {
    const storageData: savedType[] | null = JSON.parse(localStorage.getItem('saveData') as string);
    if (storageData && storageData.length !== 0) {
      setSavedData(storageData);
    }
  }, []);

  const handleLoadBtn = (index: number) => {
    const dataToLoad = savedData[index];
    setSavedBoard(dataToLoad.board);
    setSavedPalette(dataToLoad.palette);
    setSettings({boardSize: dataToLoad.boardSize, paletteSize: dataToLoad.paletteSize});
    setLoadActive(false);
    setNewLoad(true);
  };

  return (
    <div>
      {savedData.length === 0 ? <h3>There is no saved boards.</h3> : savedData.map((item, index) => 
        <div key={`${item.saveName}`}>
          <span>{item.saveName}</span>
          <span>{item.boardSize}</span>
          <span>{item.paletteSize}</span>
          <div className='flex'>
            <p>Palette</p>
            {item.palette.map((color, index) => <div key={`color ${index}`} style={{backgroundColor: color}} className={styles.paletteColor}></div>)}
          </div>
          <p>Board Preview</p>
          <button onClick={() => handleLoadBtn(index)}>Load</button>
        </div>)}
    </div>
  )
}

export default LoadMenu