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
    const RemoveCurrentSong = useCallback(() => {
        if (!currentSong) return;

    });
    const PlaySong = useCallback(async(id) => {
        try {
            const song = await request(`/api/song/${id}`, "GET", null);
            console.log(song);
            const a = new Audio("data:audio/wav;base64," + song);
            a.play();
            console.log(a);
        } catch (e) {
            console.log(e);
        }
    });
    return {
        isPlaying, setPlaying, currentSong, setCurrentSong, queue, setQueue,
        TogglePlayer, Play, Stop, PlaySong
    }
}