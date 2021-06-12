import { useState, useCallback, useEffect } from 'react';
import { useHttp } from './http.hook';

export const usePlayer = () => {
    const { request } = useHttp();
    const [isPlaying, setPlaying] = useState(false);
    const [currentSong, setCurrentSong] = useState(null);
    const [currentList, setCurrentList] = useState(null);
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
    useEffect(() => {
        if (!audio) return;
        audio.addEventListener("ended", LoadNextSong)
        return () => {
            audio.removeEventListener("ended", LoadNextSong);
        }
    }, [currentSong]);

    const TogglePlayer = () => {
        if (!audio) return;
        if (isPlaying) {
            Stop();
        } else {
            Play();
        }
    }
    const ToggleLoop = () => {
        setLoop(!loop);
        audio.loop = !loop;
    }
    const SetVolume = (val) => {
        setVolume(val);
        audio.volume = val / 100;
    }
    const ToggleVolume = () => {
        audio.volume = volumeEnable ? 0 : volume / 100;
        setVolumeEnable(!volumeEnable);
    }
    const Play = () => {
        setPlaying(true);
        audio.play();
    }
    const Stop = () => {
        setPlaying(false);
        audio.pause();
    }
    const LoadPrevSong = useCallback(async() => {
        Stop();
        // if (queue.length == 0)
        let newSongIndex = currentList.indexOf(currentSong.song._id) - 1;
        if (newSongIndex > currentList.length - 1 || newSongIndex < 0 ) newSongIndex = currentList.length - 1;
        PlaySong(currentList, currentSong.playlist, currentList[newSongIndex]);
    }, [currentSong]);
    const LoadNextSong = useCallback(async() => {
        Stop();
        let newSongIndex = currentList.indexOf(currentSong.song._id) + 1;
        if (newSongIndex > currentList.length - 1 || newSongIndex < 0 ) newSongIndex = 0;
        PlaySong(currentList, currentSong.playlist, currentList[newSongIndex]);
    }, [currentSong])
    const PlaySong = async(songList, playlist, songId) => {
        let song = await request(`/api/song/${songId}`, "GET", null);
        audio.src = song.data;
        setCurrentList(songList);
        setCurrentSong({playlist, song});
        Play();
    }
    const PlayPlaylist = async(playlistId) => {
        const playlist = await request(`/api/playlist/list/${playlistId}`, "GET", null);
        PlaySong(playlist, playlistId, playlist[0]);
    }
    return {
        isPlaying, setPlaying, currentSong, setCurrentSong, queue, setQueue, PlayPlaylist,
        TogglePlayer, ToggleVolume, SetVolume, volumeEnable, volume, Play, Stop, loop, PlaySong, audio, ToggleLoop, LoadPrevSong, LoadNextSong
    }
}