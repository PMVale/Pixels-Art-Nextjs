import React, { useEffect, useState } from 'react'
import styles from './palette.module.css'

type PaletteProps = {
    paletteSize: string,
    selectedColor: string,
    setSelectedColor: React.Dispatch<React.SetStateAction<string>>,
    newLoad: boolean,
    setSavedPalette: React.Dispatch<React.SetStateAction<string[]>>,
    setNewLoad: React.Dispatch<React.SetStateAction<boolean>>,
    savedPalette: string[],
    paletteColors: string[],
    setPaletteColors: React.Dispatch<React.SetStateAction<string[]>>
}

const Palette: React.FC<PaletteProps> = ({paletteSize, selectedColor, setSelectedColor, setSavedPalette, newLoad, setNewLoad, savedPalette, paletteColors, setPaletteColors}) => {
  
  // const [paletteColors, setPaletteColors] = useState<string[]>(['rgb(0, 0, 0)','rgb(0, 0, 0)','rgb(0, 0, 0)', 'rgb(0, 0, 0)']);
  
  useEffect(() => {
    if (!newLoad) {
      const defaultPalette: string[] = Array.from({length: (parseInt(paletteSize))});
      defaultPalette[0] = 'rgb(0, 0, 0)';
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
  };

  const hexToRgb = (hex: string) => {
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const handleColorInput = (color: string, index: number) => {
    const colors = [...paletteColors];
    const originalColor = colors[index];
    colors[index] = hexToRgb(color);
    setPaletteColors(colors);
    setSavedPalette(colors);
    if (originalColor === selectedColor) {
      setSelectedColor(colors[index]);
    }
  };

  const rgbToHex = (rgb: string): string => {
    const result = rgb.match(/\d+/g);
    if (!result) return '#000000';
    const r = parseInt(result[0]).toString(16).padStart(2, '0');
    const g = parseInt(result[1]).toString(16).padStart(2, '0');
    const b = parseInt(result[2]).toString(16).padStart(2, '0');
    return `#${r}${g}${b}`;
  };

  const randomizeColor = (index: number) => {
    const newColors = [...paletteColors];
    const prevColor = newColors[index];
    newColors[index] = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
    setPaletteColors(newColors);
    setSavedPalette(newColors);
    if (prevColor === selectedColor) {
      setSelectedColor(newColors[index]);
    };
  };


  return (
    <div className={styles.palette}>
        {`Palette: ${paletteSize}`}
        {Array.from({length: (parseInt(paletteSize))}, (_, index) => (
                <div key={`color ${index}`}>
                  <div
                    className={isSelectedColor(index)}
                    style={{backgroundColor: paletteColors[index]}}
                    onClick={(event) => {
                      const target = event.target as HTMLDivElement;
                      setSelectedColor(target.style.backgroundColor);
                    }}
                  />
                  <input type="color"
                    name="colorInput" 
                    id={`colorInput${index}`} 
                    value={rgbToHex(paletteColors[index])} 
                    onChange={({target})=> handleColorInput(target.value, index)} 
                  />
                  <button onClick={() => randomizeColor(index)}>Random</button>
                </div>
            ))}
    </div>
  )
}

export default Palette