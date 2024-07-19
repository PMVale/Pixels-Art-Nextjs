import React from 'react'

const OptionsMenu = () => {

    const [boardSize, setBoardSize] = React.useState('5');
    const [paletteSize, setPaletteSize] = React.useState('4');
    const [customBoardSize, setCustomBoardSize] = React.useState('5');
    const [customPalette, setCustomPalette] = React.useState('4');

  return (
    <section>
        <h2>Starting Options</h2>
        <div>
            <label htmlFor="boardSize">
                Board Size:
                <select 
                name="boardSize" 
                id="boardSize" 
                value={boardSize} 
                onChange={({target}) => setBoardSize(target.value)}>
                    <option value="5" selected>5x5</option>
                    <option value="10">10x10</option>
                    <option value="15">15x15</option>
                    <option value="custom">Custom</option>
                </select>
                {boardSize === 'custom' && <input type="number" min="5" max="50" value={customBoardSize} onChange={({target}) => setCustomBoardSize(target.value)}/>}
                {parseInt(customBoardSize) % 5 !== 0 && <span>Chosen number for board size must be divisible by 5</span>}
            </label>
            <label htmlFor="paletteSize">
                Palette Size:
                <select name="paletteSize" id="paletteSize" value={paletteSize} onChange={({target}) => setPaletteSize(target.value)}>
                    <option value="4" selected>4 Colors</option>
                    <option value="6">6 Colors</option>
                    <option value="8">8 Colors</option>
                    <option value="custom">Custom</option>
                </select>
                {paletteSize === 'custom' && <input type="number" min="4" max="16" value={customPalette} onChange={({target}) => setCustomPalette(target.value)}/>}
                {parseInt(customPalette) % 2 !== 0 && <span>Chosen number for palette must be divisible by 2</span>}
            </label>
        </div>
    </section>
  )
}

export default OptionsMenu