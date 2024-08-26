import React, { useState } from 'react'
import styles from './palette.module.css'

type PaletteProps = {
    paletteSize: string,
    selectedColor: string,
    setSelectedColor: React.Dispatch<React.SetStateAction<string>>
}

const Palette: React.FC<PaletteProps> = ({paletteSize, selectedColor, setSelectedColor}) => {
  
  const defaultPalette: string[] = Array.from({length: (parseInt(paletteSize))});
  defaultPalette[0] = 'black';
  defaultPalette.forEach((_, index) => {
    if (index != 0) {
      defaultPalette[index] = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
    }
  });

  const isSelectedColor = (index: number): string => {
    let colorStyle = styles.paletteColor;
    if (paletteColors[index] === selectedColor) {
      colorStyle = `${styles.paletteColor} ${styles.selected}`;
    }
    return colorStyle;
  }

  const [paletteColors, setPaletteColors] = useState<string[]>(defaultPalette);

  return (
    <div className={styles.palette}>
        {`Palette: ${paletteSize}`}
        {Array.from({length: (parseInt(paletteSize))}, (_, index) => (
                <div 
                  key={`color ${index}`} 
                  className={isSelectedColor(index)}
                  style={{backgroundColor: paletteColors[index]}}
                  onClick={(event) => {
                    const target = event.target as HTMLDivElement
                    setSelectedColor(target.style.backgroundColor)
                  }}
                />
            ))}
    </div>
  )
}

export default Palette