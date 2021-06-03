import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListUl, faPause, faPlay, faRandom, faStepBackward, faStepForward, faSyncAlt, faVolumeDown } from "@fortawesome/free-solid-svg-icons";
import {PlayerContext} from '../../context/PlayerContext';
import {useContext, useEffect, useState, useCallback} from 'react';
import './MusicPlayer.css';

const MusicPlayer = () => {
    const {isPlaying, TogglePlayer, ToggleLoop, loop, currentSong, audio, LoadNextSong, LoadPrevSong} = useContext(PlayerContext);
    const [time, setTime] = useState(0);
    const [dragging, setDragging] = useState(false);
    const [volume, setVolume] = useState(50);

    const updateAudio = useCallback(() => {
        if (dragging) return;
        setTime(100 * audio?.currentTime / audio?.duration || 0);
    }, [audio,  dragging]);

    useEffect(() => {
        if (!audio) return;
        audio.addEventListener("timeupdate", updateAudio);
        return ()=> audio.removeEventListener("timeupdate", updateAudio);
    }, [audio, updateAudio])

    const ChangeTime = (e) => {
        setTime(e.target.value)
    }
    const EndDragging = () => {
        setDragging(false);
        audio.currentTime = audio.duration * time / 100;
    }
    const ChangeVolume = (e) => {
        audio.volume = e.target.value / 100;
        setVolume(e.target.value);
    }


    return (
        <div className="MusicPlayer">
            <div className="audioInfo">
                <img className="audioImage" width="56" height="56" src={currentSong?.song.originalPlaylist.image || ""}  alt=""  />
                <div className="audioData">
                    <a href="/" className="audioName" >{currentSong?.song?.name || "Song name"}</a>
                    <a href="/" className="audioAuthor">{currentSong?.song?.author?.name || "Author name"}</a>
                </div>
            </div>
            <div className="playerControl">
                <div className="controllButtons">
                    <div className="shuffleButton">
                        <FontAwesomeIcon icon={faRandom} />
                    </div>
                    <div className="backButton" onClick={LoadPrevSong}>
                        <FontAwesomeIcon icon={faStepBackward} />
                    </div>
                    <div className="play" onClick={TogglePlayer}>
                        <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
                    </div>
                    <div className="forwardButton" onClick={LoadNextSong}>
                        <FontAwesomeIcon icon={faStepForward} />
                    </div>
                    <div className={`repeatButton ${loop ? "loop" : ""}`} onClick={ToggleLoop}>
                        <FontAwesomeIcon icon={faSyncAlt} />
                    </div>
                </div>
                <div className="timeline">
                    <div className="currentTime">
                        {new Date(audio.duration * time * 10 || 0).toISOString().substr(14, 5)}
                    </div>
                    <input type="range" className="timelineContainer inputRange" min="0" max="100" value={time} onMouseDown={()=>setDragging(true)} onMouseUp={EndDragging}  onChange={ChangeTime}/>
                    {/* <div className="timelineContainer">
                        <div className="timeProgression">
                            <div className="progressLine" style={{width: `${(100 * time / audio?.duration) || 0}%`}}>

                            </div>
                        </div>
                    </div> */}
                    <div className="audioLength">
                        {currentSong?.song?.length || "0:00"}
                    </div>
                </div>
            </div>
            <div className="audioControl">
                <div className="controlIcons">
                <FontAwesomeIcon icon={faListUl} />
                </div>
                <div className="volumeControlContainer">
                    <FontAwesomeIcon icon={faVolumeDown} className="valumeIcon" />
                    <input type="range" className="valumeControl inputRange" min="0" max="100" value={volume} onChange={ChangeVolume}/>
                    {/* <div className="valumeControl">
                        <div className="valumeLevel">

                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    );
}
export default MusicPlayer;