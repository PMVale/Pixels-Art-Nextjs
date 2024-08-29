import React, { useEffect, useState } from 'react'
import styles from './palette.module.css'

type PaletteProps = {
    paletteSize: string,
    selectedColor: string,
    setSelectedColor: React.Dispatch<React.SetStateAction<string>>,
    newLoad: boolean,
    setSavedPalette: React.Dispatch<React.SetStateAction<string[]>>,
    setNewLoad: React.Dispatch<React.SetStateAction<boolean>>,
    savedPalette: string[]
}

const Palette: React.FC<PaletteProps> = ({paletteSize, selectedColor, setSelectedColor, setSavedPalette, newLoad, setNewLoad, savedPalette}) => {
  
  const [paletteColors, setPaletteColors] = useState<string[]>([]);
  
  useEffect(() => {
    if (!newLoad) {
      const defaultPalette: string[] = Array.from({length: (parseInt(paletteSize))});
      defaultPalette[0] = 'black';
      defaultPalette.forEach((_, index) => {
        if (index != 0) {
          defaultPalette[index] = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
        }
      });
      setSavedPalette(defaultPalette);
      setPaletteColors(defaultPalette);
    } else {
      setPaletteColors(savedPalette);
      setNewLoad(false)
    }
  }, []);

  const isSelectedColor = (index: number): string => {
    let colorStyle = styles.paletteColor;
    if (paletteColors[index] === selectedColor) {
      colorStyle = `${styles.paletteColor} ${styles.selected}`;
    }
    return colorStyle;
  }


  return (
    <div className={styles.palette}>
        {`Palette: ${paletteSize}`}
        {Array.from({length: (parseInt(paletteSize))}, (_, index) => (
                <div 
                  key={`color ${index}`}
                  className={isSelectedColor(index)}
                  style={{backgroundColor: paletteColors[index]}}
                  onClick={(event) => {
                    const target = event.target as HTMLDivElement;
                    setSelectedColor(target.style.backgroundColor);
                  }}
                />
            ))}
    </div>
  )
}

export default Palette