import React, { useState } from 'react'
import Palette from '../Palette'
import styles from './board.module.css'
import SaveMenu from '../SaveMenu'

type settingsType = {
    boardSize: string,
    paletteSize: string,
    savedBoard: string[],
    savedPalette: string[],
    setSavedPalette: React.Dispatch<React.SetStateAction<string[]>>,
    setSavedBoard: React.Dispatch<React.SetStateAction<string[]>>,
    newLoad: boolean,
    setNewLoad: React.Dispatch<React.SetStateAction<boolean>>,
}

const Board: React.FC<settingsType> = ({boardSize, paletteSize, savedBoard, savedPalette, setSavedBoard, setSavedPalette, newLoad, setNewLoad}) => {

  // const defaultSavedBoard = Array.from({length: (parseInt(boardSize) ** 2)}, (item) => item = 'white');
  // const defaultSavedPalette = Array.from({length: (parseInt(paletteSize))}, (item) => item = 'none');

  const [selectedColor, setSelectedColor] = useState('black');
  // const [savedBoard, setSavedBoard] = useState(defaultSavedBoard);
  // const [savedPalette, setSavedPalette] = useState(defaultSavedPalette);

  return (
    <div className='flex-col'>
        {`Board + ${boardSize}`}
        <section>
          <SaveMenu savedBoard={savedBoard} savedPalette={savedPalette} boardSize={boardSize} paletteSize={paletteSize} />
        </section>
        <section>
          <Palette paletteSize={paletteSize} selectedColor={selectedColor} setSelectedColor={setSelectedColor} setSavedPalette={setSavedPalette} newLoad={newLoad} setNewLoad={setNewLoad} savedPalette={savedPalette} />
        </section>
        <section className={styles.pixelBoard}>
            {Array.from({length: (parseInt(boardSize) ** 2)}, (_, index) => (
                <div 
                  key={`pixel ${index}`}
                  className={styles.pixel}
                  style={{backgroundColor: savedBoard[index]}}
                  onClick={(event) => {
                    const target = event.target as HTMLDivElement;
                    target.style.backgroundColor = selectedColor;
                    setSavedBoard((prevBoard) => {
                      const newBoard = [...prevBoard];
                      newBoard[index] = target.style.backgroundColor;
                      return newBoard;
                    });
                  }}
                />
            ))}
        </section>
    </div>
  )
}

export default Board