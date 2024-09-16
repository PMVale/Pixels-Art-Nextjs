'use client'
import React, { useEffect, useState } from 'react'
import OptionsMenu from '../OptionsMenu'
import Board from '../Board'
import LoadMenu from '../LoadMenu'

const Body = () => {
  const defaultSettings = {
    boardSize: '5',
    paletteSize: '4'
  };
  const defaultSavedBoard = Array.from({length: (parseInt(defaultSettings.boardSize) ** 2)}, (item) => item = 'white');
  const defaultSavedPalette = Array.from({length: (parseInt(defaultSettings.paletteSize))}, (item) => item = 'none');
  
  const [menuActive, setMenuActive] = useState(true);
  const [settings, setSettings] = useState(defaultSettings);
  const [loadActive, setLoadActive] = useState(false);
  const [savedBoard, setSavedBoard] = useState(defaultSavedBoard);
  const [savedPalette, setSavedPalette] = useState(defaultSavedPalette);
  const [newLoad, setNewLoad] = useState(false);
  const defaultPalette = Array.from({length: (parseInt(settings.paletteSize))}, (item) => item = 'rgb(0, 0, 0)')
  const [paletteColors, setPaletteColors] = useState<string[]>(defaultPalette);
  const [undoActive, setUndoActive] = useState(false);

  const handleLoadBtn = () => {
    setLoadActive(true);
    setMenuActive(false);
  }

  const handleSettingsBtn = () => {
    setMenuActive(!menuActive);
    setLoadActive(false);
  }

  useEffect(() => {
    const dataCheck = JSON.parse(localStorage.getItem('saveData') as string);
    if (!dataCheck) {
      localStorage.setItem('saveData', JSON.stringify([]));
    }
  }, [])

  return (
    <main>
        {!menuActive && <button onClick={handleSettingsBtn}>Settings</button>}
        <button onClick={handleLoadBtn}>Load</button>
        {menuActive && 
          <OptionsMenu 
            setSettings={setSettings} 
            setMenuActive={setMenuActive} 
            setLoadActive={setLoadActive} 
            setSavedBoard={setSavedBoard} 
            setSavedPalette={setSavedPalette} 
            setNewLoad={setNewLoad}
            setPaletteColors={setPaletteColors}
            setUndoActive={setUndoActive} 
          />}
        {!menuActive && !loadActive && 
          <Board 
            {...settings} 
            savedBoard={savedBoard} 
            savedPalette={savedPalette} 
            setSavedBoard={setSavedBoard} 
            setSavedPalette={setSavedPalette} 
            newLoad={newLoad} 
            setNewLoad={setNewLoad}
            paletteColors={paletteColors}
            setPaletteColors={setPaletteColors}
            undoActive={undoActive}
            setUndoActive={setUndoActive}
          />}
        {loadActive && 
          <LoadMenu 
            setSettings={setSettings} 
            setSavedBoard={setSavedBoard} 
            setSavedPalette={setSavedPalette} 
            setLoadActive={setLoadActive} 
            setNewLoad={setNewLoad}
            setPaletteColors={setPaletteColors}
          />}
    </main>
  )
}

export default Body