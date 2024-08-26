'use client'
import React, { useState } from 'react'
import OptionsMenu from '../OptionsMenu'
import Board from '../Board'

const Body = () => {
  const defaultSettings = {
    boardSize: '5',
    paletteSize: '4'
  }
  const [menuActive, setMenuActive] = useState(true)
  const [settings, setSettings] = useState(defaultSettings)

  return (
    <main>
        {!menuActive && <button onClick={() => setMenuActive(!menuActive)}>Settings</button>}
        {menuActive && <OptionsMenu setSettings={setSettings} setMenuActive={setMenuActive} />}
        {!menuActive && <Board {...settings} />}
    </main>
  )
}

export default Body