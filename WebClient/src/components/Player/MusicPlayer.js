import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListUl, faPause, faPlay, faRandom, faStepBackward, faStepForward, faSyncAlt, faVolumeDown } from "@fortawesome/free-solid-svg-icons";
import {PlayerContext} from '../../context/PlayerContext';
import {useContext, useEffect, useState} from 'react';
import './MusicPlayer.css';

const MusicPlayer = () => {
    const {isPlaying, TogglePlayer, currentSong, audio} = useContext(PlayerContext);
    console.log(currentSong)
    const [time, setTime] = useState(0);
    useEffect(() => {
        if (audio) {
            audio.addEventListener("timeupdate", function() {
                setTime(audio.currentTime);
            })
        }
    }, [audio])

    return (
        <div className="MusicPlayer">
            <div className="audioInfo">
                <img className="audioImage" width="56" height="56" alt=""  />
                <div className="audioData">
                    <a href="/" className="audioName" >{currentSong?.song?.name || "Song name"}</a>
                    <a href="/" className="audioAuthor">Author name</a>
                </div>
            </div>
            <div className="playerControl">
                <div className="controllButtons">
                    <div className="shuffleButton">
                        <FontAwesomeIcon icon={faRandom} />
                    </div>
                    <div className="backButton">
                        <FontAwesomeIcon icon={faStepBackward} />
                    </div>
                    <div className="play" onClick={TogglePlayer}>
                        <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
                    </div>
                    <div className="forwardButton">
                        <FontAwesomeIcon icon={faStepForward} />
                    </div>
                    <div className="repeatButton">
                        <FontAwesomeIcon icon={faSyncAlt} />
                    </div>
                </div>
                <div className="timeline">
                    <div className="currentTime">
                        {new Date(time * 1000).toISOString().substr(14, 5)}
                    </div>
                    <div className="timelineContainer">
                        <div className="timeProgression">
                            <div className="progressLine" style={{width: `${(100 * time / audio?.duration) || 0}%`}}>

                            </div>
                        </div>
                    </div>
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
                    <div className="valumeControl">
                        <div className="valumeLevel">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default MusicPlayer;