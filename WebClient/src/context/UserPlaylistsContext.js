import {createContext} from 'react';

export const UserPlaylistsContext = createContext({
    userPlaylists: [],
    setUserPlaylists: function(){}
})