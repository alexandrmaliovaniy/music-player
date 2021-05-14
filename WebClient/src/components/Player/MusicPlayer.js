import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListUl, faPlay, faRandom, faStepBackward, faStepForward, faSyncAlt, faVolumeDown } from "@fortawesome/free-solid-svg-icons";
import './MusicPlayer.css';

const MusicPlayer = () => {
    return (
        <div className="MusicPlayer">
            <div className="audioInfo">
                <img className="audioImage" width="56" height="56"  />
                <div className="audioData">
                    <a href="/" className="audioName" >Song name</a>
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
                    <div className="play">
                        <FontAwesomeIcon icon={faPlay} />
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
                        0:00
                    </div>
                    <div className="timelineContainer">
                        <div className="timeProgression">
                            <div className="progressLine">

                            </div>
                        </div>
                    </div>
                    <div className="audioLength">
                        5:00
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