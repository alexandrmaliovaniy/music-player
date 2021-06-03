import { useState, useCallback } from 'react';
import { useHttp } from './http.hook';

export const usePlayer = () => {
    const { request } = useHttp();
    const [isPlaying, setPlaying] = useState(false);
    const [currentSong, setCurrentSong] = useState(null);
    const [queue, setQueue] = useState([]);
    const [audio, setAudio] = useState(null);

    const TogglePlayer = useCallback(() => {
        if (!audio) return;
        if (isPlaying) {
            Stop();
        } else {
            Play();
        }
        setPlaying(!isPlaying);
    });
    const Play = useCallback(() => {
        audio.play();
    });
    const Stop = useCallback(() => {
        audio.pause();
    });
    const RemoveAudio = useCallback(() => {
        Stop();
        setAudio(null);
    })
    const LoadNextSong = useCallback(async() => {
        setPlaying(false);
        if (queue.length == 0);
        try {

            // await PlaySong(currentSong.playlist, currentSong.order + 1);

        } catch (e) {
            console.log(e)
        }
    })
    const PlaySong = useCallback(async(playlist, order) => {
        if (audio) RemoveAudio();
        let song = await request(`/api/song/${playlist}/${order}`, "GET", null);
        const a = new Audio("data:audio/wav;base64," + song.data);
        setCurrentSong({playlist, order, song});
        setAudio(a);
        setPlaying(true);
        a.play();
    });
    return {
        isPlaying, setPlaying, currentSong, setCurrentSong, queue, setQueue,
        TogglePlayer, Play, Stop, PlaySong, audio
    }
}