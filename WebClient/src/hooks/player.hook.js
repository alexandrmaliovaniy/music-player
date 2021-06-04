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
        audio.play();
    });
    const Stop = useCallback(() => {
        audio.pause();
    });
    const LoadPrevSong = useCallback(async() => {
        Stop();
        setPlaying(false);
        // if (queue.length == 0)
        try {
            await PlaySong(currentSong.playlist, currentSong.order - 1);
        } catch (e) {
            await PlaySong(currentSong.playlist, 0);
        }
    });
    const LoadNextSong = useCallback(async() => {
        console.log("next song");
        Stop();
        setPlaying(false);
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
        setPlaying(true);
        audio.play();
    });
    return {
        isPlaying, setPlaying, currentSong, setCurrentSong, queue, setQueue,
        TogglePlayer, ToggleVolume, SetVolume, volumeEnable, volume, Play, Stop, loop, PlaySong, audio, ToggleLoop, LoadPrevSong, LoadNextSong
    }
}