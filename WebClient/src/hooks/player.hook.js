import { useState, useCallback } from 'react';
import { useHttp } from './http.hook';

export const usePlayer = () => {
    const { request } = useHttp();
    const [isPlaying, setPlaying] = useState(false);
    const [currentSong, setCurrentSong] = useState(null);
    const [queue, setQueue] = useState([]);

    const TogglePlayer = useCallback(() => {
        if (!currentSong) return setPlaying(false);
        setPlaying(!isPlaying);
        if (isPlaying) {
            Stop();
        } else {
            Play();
        }
    });
    const Play = useCallback(() => {
        currentSong.play();
    });
    const Stop = useCallback(() => {
        currentSong.pause();
    });
    const LoadSong = useCallback(async(id) => {
        try {
            const song = request(`/api/song/${id}`, "GET", null);
            console.log(song);
        } catch (e) {
            console.log(e);
        }
    });
    return {
        isPlaying, setPlaying, currentSong, setCurrentSong, queue, setQueue,
        TogglePlayer, Play, Stop, LoadSong
    }
}