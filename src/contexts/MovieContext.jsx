import { createContext, useContext, useState, useEffect } from "react";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {

    const [favorite, setFavorite] = useState([]);
    useEffect(() => {
        const storedFavs = localStorage.getItem("favorites");
        if (storedFavs) {
            setFavorite(JSON.parse(storedFavs));
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("favorites",JSON.stringify(favorite))
    }, [favorite])
    
    const addFavorite = (movie) => {
        setFavorite(prev => [...prev, movie]);
    }

    const removeFromFavorite = (movieId) => {
        setFavorite(prev => prev.filter(movie => movie.id !== movieId));
    }

    const isFavorite = (movieId) => {
        return favorite.some(movie => movie.id === movieId)
    }

    const value = {
        favorite,
        addFavorite,
        removeFromFavorite,
        isFavorite
    }
    return <MovieContext.Provider value={value}>
        {children}
    </MovieContext.Provider>
    
}