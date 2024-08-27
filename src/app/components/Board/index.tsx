import React, { useState } from 'react'
import Palette from '../Palette'
import styles from './board.module.css'

type settingsType = {
    boardSize: string,
    paletteSize: string
}

const Board: React.FC<settingsType> = ({boardSize, paletteSize}) => {

  const [selectedColor, setSelectedColor] = useState('black');

  return (
    <div className='flex-col'>
        {`Board + ${boardSize}`}
        <section>
          <Palette paletteSize={paletteSize} selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
        </section>
        <section className={styles.pixelBoard}>
            {Array.from({length: (parseInt(boardSize) ** 2)}, (_, index) => (
                <div 
                  key={`pixel ${index}`} 
                  className={styles.pixel}
                  onClick={(event) => {
                    const target = event.target as HTMLDivElement
                    target.style.backgroundColor = selectedColor
                  }}
                />
            ))}
        </section>
    </div>
  )
}

export default Board