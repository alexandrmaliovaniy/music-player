import { useState, useCallback, useEffect } from 'react';
import { useHttp } from './http.hook';

export const usePlayer = () => {
    const { request } = useHttp();
    const [isPlaying, setPlaying] = useState(false);
    const [currentSong, setCurrentSong] = useState(null);
    const [queue, setQueue] = useState([]);
    const [audio, setAudio] = useState(new Audio());
    const [loop, setLoop] = useState(false);
    const [volume, setVolume] = useState(100);
    const [volumeEnable, setVolumeEnable] = useState(true);

    useEffect(() => {
        if (!audio) return;
        audio.addEventListener("ended", LoadNextSong)
        audio.addEventListener("pause", Stop);
        audio.addEventListener("play", Play);
        return () => {
            audio.removeEventListener("ended", LoadNextSong);
            audio.removeEventListener("pause", Stop);
            audio.removeEventListener("play", Play);
        }
    }, [audio]);

    const TogglePlayer = useCallback(() => {
        if (!audio) return;
        if (isPlaying) {
            Stop();
        } else {
            Play();
        }
    });
    const ToggleLoop = useCallback(() => {
        setLoop(!loop);
        audio.loop = !loop;
    });
    const SetVolume = useCallback((val) => {
        setVolume(val);
        audio.volume = val / 100;
    });
    const ToggleVolume = useCallback(() => {
        audio.volume = volumeEnable ? 0 : volume / 100;
        setVolumeEnable(!volumeEnable);
    })
    const Play = useCallback(() => {
        setPlaying(true);
        audio.play();
    });
    const Stop = useCallback(() => {
        setPlaying(false);
        audio.pause();
    });
    const LoadPrevSong = useCallback(async() => {
        Stop();
        // if (queue.length == 0)
        try {
            await PlaySong(currentSong.playlist, currentSong.order - 1);
        } catch (e) {
            await PlaySong(currentSong.playlist, 0);
        }
    });
    const LoadNextSong = useCallback(async() => {
        Stop();
        try {
            await PlaySong(currentSong.playlist, currentSong.order + 1);
        } catch (e) {
            await PlaySong(currentSong.playlist, 0);
        }
    })
    const PlaySong = useCallback(async(playlist, order) => {
        let song = await request(`/api/song/${playlist}/${order}`, "GET", null);
        audio.src = song.data;
        setCurrentSong({playlist, order, song});
        Play();
    });
    return {
        isPlaying, setPlaying, currentSong, setCurrentSong, queue, setQueue,
        TogglePlayer, ToggleVolume, SetVolume, volumeEnable, volume, Play, Stop, loop, PlaySong, audio, ToggleLoop, LoadPrevSong, LoadNextSong
    }
}