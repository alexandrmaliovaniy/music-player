import { useState, useCallback, useEffect } from 'react';
import { useHttp } from './http.hook';

export const usePlayer = () => {
    const { request } = useHttp();
    const [isPlaying, setPlaying] = useState(false);
    const [currentSong, setCurrentSong] = useState(null);
    const [currentList, setCurrentList] = useState(null);
    const [queue, setQueue] = useState([]);
    const [audio, setAudio] = useState(new Audio());
    const [shuffle, setShuffle] = useState(false);
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
        audio.addEventListener("ended", MusicEnd)
        return () => {
            audio.removeEventListener("ended", MusicEnd);
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
    const ToggleShuffle = () => {
        setShuffle(!shuffle);
        if (!shuffle) setQueue([]);
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
    const Shuffle = (arr) => {
        var j, temp;
        for(var i = arr.length - 1; i > 0; i--){
            j = Math.floor(Math.random()*(i + 1));
            temp = arr[j];
            arr[j] = arr[i];
            arr[i] = temp;
        }
        return arr;
    }
    const Play = () => {
        setPlaying(true);
        audio.play();
    }
    const Stop = () => {
        setPlaying(false);
        audio.pause();
    }
    const MusicEnd = useCallback(async() => {
        await request('/api/song/listen', "POST", {_id: currentSong.song._id});
        LoadNextSong();
    }, [currentSong])
    const PlayQueue = useCallback(async() => {
        let q = queue;
        if (q.length == 0 && !shuffle) LoadNextSong();
        if (q.length == 0 && shuffle) q = Shuffle(currentList);
        const [song, ...rest] = q;
        setQueue(rest);
        PlaySong(currentList, currentSong.playlist, song);
    }, [queue, currentList, Shuffle]);
    const LoadPrevSong = useCallback(async() => {
        Stop();
        let newSongIndex = currentList.indexOf(currentSong.song._id) - 1;
        if (newSongIndex > currentList.length - 1 || newSongIndex < 0 ) newSongIndex = currentList.length - 1;
        PlaySong(currentList, currentSong.playlist, currentList[newSongIndex]);
    }, [currentSong]);
    const LoadNextSong = useCallback(async() => {
        if (!currentList) return;
        Stop();
        if (shuffle) return PlayQueue();
        let newSongIndex = currentList.indexOf(currentSong.song._id) + 1;
        if (newSongIndex > currentList.length - 1 || newSongIndex < 0 ) newSongIndex = 0;
        PlaySong(currentList, currentSong.playlist, currentList[newSongIndex]);
    }, [currentSong, currentList, shuffle])
    const PlaySong = async(songList, playlist, songId) => {
        let song = await request(`/api/song/${songId}`, "GET", null);
        console.log(song);
        audio.src = song.payload;
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
        TogglePlayer, ToggleVolume, SetVolume, volumeEnable, volume, Play, Stop, loop,
        PlaySong, audio, ToggleLoop, LoadPrevSong, LoadNextSong, ToggleShuffle, shuffle
    }
}