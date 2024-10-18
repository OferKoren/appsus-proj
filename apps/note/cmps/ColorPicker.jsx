const { useState } = React
export function ColorPicker({ colorPicker, colorPickerRef }) {
    const colors = ['white', '#FAAFA8', '#F39F76', '#FFF8B8', '#E2F6D3', '#B4DDD3', '#D4E4ED', '#AECCDC', '#D3BFDB', '#F6E2DD', '#E9E3D4', '#EFEFF1']
    const setNote = colorPicker.setNote
    const note = colorPicker.note
    const ev = colorPicker.ev
    let chosenColor = colors.findIndex((color) => color === note.style.backgroundColor)
    chosenColor = chosenColor === -1 ? 0 : chosenColor
    const [pickedColor, setPickedColor] = useState(chosenColor)

    const buttonRect = ev.target.getBoundingClientRect()
    const top = buttonRect.bottom + window.scrollY
    const left = buttonRect.left + window.scrollX

    function onChangeColor(idx) {
        const color = colors[idx]
        const style = { ...note.style, backgroundColor: color }
        const newNote = { ...note, style }
        setNote(newNote)
        setPickedColor(idx)
    }

    function renderColors() {
        const colorArr = []
        const noColorIconSrc = '../../../assets/img/notes-icons/default-color-icon.svg'
        const selectedColorIconSrc = '../../../assets/img/notes-icons/selected-color-icon.svg'
        for (let i = 0; i < 12; i++) {
            const activeClass = i === pickedColor ? 'active' : ''
            const color = (
                <div key={colors[i]} className={`clr-btn ${activeClass}`} onClick={() => onChangeColor(i)} style={{ backgroundColor: colors[i] }}>
                    {i === 0 && <img src={noColorIconSrc} className="no-color-icon" />}
                    <div className="check">
                        <img src={selectedColorIconSrc} alt="" />
                    </div>
                </div>
            )
            colorArr.push(color)
        }
        return colorArr
    }
    return (
        <div ref={colorPickerRef} className="color-picker" style={{ top, left }}>
            {renderColors()}
        </div>
    )
}
