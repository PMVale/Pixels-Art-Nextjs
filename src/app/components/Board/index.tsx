import React, { useState } from 'react'
import Palette from '../Palette'

type settingsType = {
    boardSize: string,
    paletteSize: string
}

const Board: React.FC<settingsType> = ({boardSize, paletteSize}) => {

  const [selectedColor, setSelectedColor] = useState('black');

  return (
    <div>
        {`Board + ${boardSize}`}
        <section>
          <Palette paletteSize={paletteSize} selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
        </section>
        <section>
            {Array.from({length: (parseInt(boardSize) ** 2)}, (_, index) => (
                <div key={`pixel ${index}`} className='pixel'></div>
            ))}
        </section>
    </div>
  )
}

export default Board