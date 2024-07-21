'use client'
import React, { useState } from 'react'
import OptionsMenu from './OptionsMenu'

const Body = () => {
  const defaultSettings = {
    boardSize: '5',
    paletteSize: '4'
  }
  const [menuActive, setMenuActive] = useState(true)
  const [settings, setSettings] = useState(defaultSettings)

  return (
    <main>
        {menuActive && <OptionsMenu setSettings={setSettings} setMenuActive={setMenuActive} />}
    </main>
  )
}

export default Body