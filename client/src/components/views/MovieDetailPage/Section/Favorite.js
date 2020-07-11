import React, { useEffect, useState } from 'react';
import axios from "axios";

function Favorite(props) {

    const [FavoriteNumber, setFavoriteNumber] = useState(0);
    const [Favorited, setFavorited] = useState(false);
    
    const variable = {
            userFrom: props.userFrom,
            movieId: props.movieId,
            movieTitle: props.movieInfo.original_title,
            movieImage: props.movieInfo.backdrop_path,
            movieRunTime: props.movieInfo.runtime,
        };

    useEffect(() => {

        axios.post('/api/favorite/favoriteNumber', variable)
            .then(response => {
                if(response.data.success) {
                    setFavoriteNumber(response.data.FavoriteNumber);
                } else {
                    console.log("Failed to get favoriteNumber");
                }
            });

        axios.post('/api/favorite/favorited', variable)
            .then(response => {
                if(response.data.success) {
                    setFavorited(response.data.favorited)
                } else {
                    console.log("Failed to get Favorited Info");
                }
            })
    }, []);

    const onClickFavorite = () => {
        if (Favorited) {
            // When already added
            axios.post('/api/favorite/removeFromFavorite', variable)
                .then(response => {
                    if(response.data.success) {
                        setFavoriteNumber(FavoriteNumber-1);
                        setFavorited(!Favorited);
                    } else {
                        console.log("Failed to remove from Favorites")
                    }
                })

        } else {
            // When not added yet
            axios.post('/api/favorite/addToFavorite', variable)
                .then(response => {
                    if(response.data.success) {
                        setFavoriteNumber(FavoriteNumber+1);
                        setFavorited(!Favorited);
                    } else {
                        console.log("Failed to add to Favorites")
                    }
                })

        }
    }

    return (
        <div>
            <button onClick={onClickFavorite}>{Favorited ? " Remove from Favorite" : "Add to Favorite"} {FavoriteNumber >= 0 ? FavoriteNumber : ""}</button>
        </div>
    );
}

export default Favorite;