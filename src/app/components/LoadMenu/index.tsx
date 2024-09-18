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
  setNewLoad: React.Dispatch<React.SetStateAction<boolean>>,
  setPaletteColors: React.Dispatch<React.SetStateAction<string[]>>
};

type savedType = {
  saveName: string,
  boardSize: string,
  board: string[],
  paletteSize: string,
  palette: string[]
};

const LoadMenu: React.FC<loadProps> = ({setSettings, setSavedBoard, setSavedPalette, setLoadActive, setNewLoad, setPaletteColors}) => {
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
    setPaletteColors(Array.from({length: (parseInt(dataToLoad.paletteSize))}, (item) => item = 'rgb(0, 0, 0)'))
  };

  const handleBoardClass = (boardSize: string):string => {
    let classSetting = '';
    switch (boardSize) {
      case '5':
        classSetting = `${styles.boardFive}`;
        break;
      case '10':
        classSetting = `${styles.boardTen}`;
        break;
      case '15':
        classSetting = `${styles.boardFifteen}`;
        break;
      default:
        classSetting = `${styles.boardCustom}`;
        break;
    }
    return classSetting;
  };

  const handlePixelClass = (boardSize: string):string => {
    let pixelSetting = '';
    switch (boardSize) {
      case '5':
        pixelSetting = `${styles.pixelFive}`;
        break;
      case '10':
        pixelSetting = `${styles.pixelTen}`;
        break;
      case '15':
        pixelSetting = `${styles.pixelFifteen}`;
        break;
      default:
        pixelSetting = `${styles.pixelCustom}`;
        break;
    };
    return pixelSetting;
  };

  return (
    <div className='flex-col'>
      {savedData.length === 0 ? <h3>There are no saved boards.</h3> : savedData.map((item, index) => 
        <div key={`${item.saveName}${index}`}>
          <p>{`Name: ${item.saveName}`}</p>
          <p>{`Size of board: ${item.boardSize}`}</p>
          <p>{`Size of palette: ${item.paletteSize}`}</p>
          <div className='flex'>
            <p>Palette</p>
            {item.palette.map((color, index) => <div key={`color ${index}`} style={{backgroundColor: color}} className={styles.paletteColor}></div>)}
          </div>
          {parseInt(item.boardSize) > 15 ? <p>Preview not available for custom board sizes</p> : (
            <div className={handleBoardClass(item.boardSize)}>
            {item.board.map((pixel, index) => <div key={`pixel${index}`} style={{backgroundColor: pixel}} className={handlePixelClass(item.boardSize)}></div>)}
            </div>
          )}
          <button onClick={() => handleLoadBtn(index)}>Load</button>
        </div>)}
    </div>
  )
}

export default LoadMenu