'use client'
import React, { useState } from 'react'
import OptionsMenu from '../OptionsMenu'
import Board from '../Board'
import LoadMenu from '../LoadMenu'

const Body = () => {
  const defaultSettings = {
    boardSize: '5',
    paletteSize: '4'
  };
  const [menuActive, setMenuActive] = useState(true);
  const [settings, setSettings] = useState(defaultSettings);
  const [loadActive, setLoadActive] = useState(false);

  const handleLoadBtn = () => {
    setLoadActive(true);
    setMenuActive(false);
  }

  const handleSettingsBtn = () => {
    setMenuActive(!menuActive);
    setLoadActive(false);
  }

  return (
    <main>
        {!menuActive && <button onClick={handleSettingsBtn}>Settings</button>}
        <button onClick={handleLoadBtn}>Load</button>
        {menuActive && <OptionsMenu setSettings={setSettings} setMenuActive={setMenuActive} setLoadActive={setLoadActive} />}
        {!menuActive && !loadActive && <Board {...settings} />}
        {loadActive && <LoadMenu setSettings={setSettings} />}
    </main>
  )
}

export default Body