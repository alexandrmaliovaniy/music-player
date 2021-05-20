import { createContext } from 'react';

export const PlayerContext = createContext({
    isPlaying: false,
    setPlaying: () => {},
    currentSong: null,
    setCurrentSont: () => {},
    queue: [],
    setQueue: () => {},
    TogglePlayer: ()=> {},
    Play: () => {},
    Stop: () => {},
    LoadSong: () => {},
})