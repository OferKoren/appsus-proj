const { useState, useRef } = React
export function NoteVideo({ isEdit, handleChange, note, formRef, setNote }) {
    const [videoUrl, setVideoUrl] = useState(note.info.videoUrl)
    const videoUrlInputRef = useRef(null)
    const embeddedURL = `https://www.youtube.com/embed/`
    const videoHeight = formRef.current ? (formRef.current.offsetWidth * 9) / 16 : null

    function onAddVideo() {
        const videoId = extractVideoID(videoUrlInputRef.current.value)
        console.log(videoId)
        if (videoId) {
            const url = embeddedURL + videoId
            setVideoUrl(url)
            const { info } = note
            const newInfo = { ...info, videoUrl: url }
            console.log(newInfo)
            setNote((prevNote) => ({ ...prevNote, info: newInfo }))
        }
    }
    function extractVideoID(url) {
        const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
        const match = url.match(regex)
        return match ? match[1] : null
    }

    return (
        <React.Fragment>
            {isEdit && <input autoComplete="off" type="text" className="title" name="title" id="title" placeholder="title" onChange={handleChange} />}
            <div className="flex">
                <input
                    ref={videoUrlInputRef}
                    type="text"
                    onChange={handleChange}
                    value={note.info.videoUrl}
                    autoComplete="off"
                    name="videoUrl"
                    id="videoUrl"
                    placeholder="Enter url here..."
                />
                <button className="add-video-btn" type="button" onClick={(ev) => onAddVideo()}>
                    add video
                </button>
            </div>

            {videoUrl && <iframe src={videoUrl} height={videoHeight && videoHeight} frameBorder="0"></iframe>}
        </React.Fragment>
    )
}
