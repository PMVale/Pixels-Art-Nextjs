import React, { useEffect, useState } from 'react'

type settingsType = {
  boardSize: string,
  paletteSize: string
}

type loadProps = {
  setSettings: React.Dispatch<React.SetStateAction<settingsType>>
}

type savedType = {
  saveName: string,
  boardSize: string,
  board: string[],
  paletteSize: string,
  palette: string[]
};

const LoadMenu: React.FC<loadProps> = ({setSettings}) => {
  const [savedData, setSavedData] = useState<savedType[]>([]);

  useEffect(() => {
    const storageData: savedType[] | null = JSON.parse(localStorage.getItem('data') as string);
    if (storageData) {
      setSavedData(storageData);
    }
  }, [])
  

  return (
    <div>
      {savedData.length === 0 ? <h3>There is no saved boards.</h3> : savedData.map((item) => <div key={`${item.saveName}`}>test</div>)}
    </div>
  )
}

export default LoadMenu