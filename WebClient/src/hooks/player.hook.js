import { useState, useCallback, useEffect } from 'react';
import { useHttp } from './http.hook';

export const usePlayer = () => {
    const { request } = useHttp();
    const [isPlaying, setPlaying] = useState(false);
    const [currentSong, setCurrentSong] = useState(null);
    const [queue, setQueue] = useState([]);
    const [audio, setAudio] = useState(new Audio());

    useEffect(() => {
        if (!audio) return;
        audio.addEventListener("ended", LoadNextSong)
        return audio.removeEventListener("ended", LoadNextSong);
    }, audio);

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
        let song = await request(`/api/song/${playlist}/${order}`, "GET", null);
        audio.src = "data:audio/wav;base64," + song.data;
        setCurrentSong({playlist, order, song});
        setPlaying(true);
        audio.play();
    });
    return {
        isPlaying, setPlaying, currentSong, setCurrentSong, queue, setQueue,
        TogglePlayer, Play, Stop, PlaySong, audio
    }
}