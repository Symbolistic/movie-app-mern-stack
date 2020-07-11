import React, { useEffect, useState } from 'react';
import "./favorite.css";
import axios from "axios";
import { Popover } from "antd";
import { IMAGE_URL } from '../../Config';

const FavoritePage = () => {
    const [FavoriteMovies, setFavoriteMovies] = useState([]);

    const variables = { userFrom: localStorage.getItem("userId") }

    useEffect(() => {
        fetchFavoriteMovies();
    }, []);

    const fetchFavoriteMovies = () => {
        axios.post("/api/favorite/getFavoriteMovie", variables)
            .then(response => {
                if(response.data.success) {
                    setFavoriteMovies(response.data.favorites);
                } else {
                    console.log("Failed to get favorited movies");
                }
            })
    }

    const onClickRemove = (movieId) => {
        const variable = { 
            movieId: movieId,
            userFrom: localStorage.getItem('userId') 
        };

        axios.post('/api/favorite/removeFromFavorite', variable)
                .then(response => {
                    if(response.data.success) {
                        fetchFavoriteMovies();
                    } else {
                        console.log("Failed to remove from Favorites")
                    }
                })
    }

    const renderTableBody = FavoriteMovies.map((movie, index) => {

        const content = (
            <div>
                {movie.movieImage ?
                    <img src={`${IMAGE_URL}w500${movie.movieImage}`} alt="movieImage"/>
                    :
                    "No Image"
                }
            </div>
        )

        return <tr key={index}>
            <Popover content={content} title={`${movie.movieTitle}`}>
               <td>{movie.movieTitle}</td> 
            </Popover> 
            <td>{movie.movieRunTime}</td>
            <td><button onClick={() => onClickRemove(movie.movieId)}>Remove from Favorites</button></td>
        </tr>
    });

    return (
        <div style={{ width: "85%", margin: "3rem auto" }}>
            <h3>My Favorite Movies</h3>
            <hr/>
            
            <table>
                <thead>
                    <tr>
                        <th>Movie Title</th>
                        <th>Movie RunTime</th>
                        <th>Remove from Favorites</th>
                    </tr>
                </thead>

                <tbody>
                    {renderTableBody}
                </tbody>
            </table>
        </div>
    );
};

export default FavoritePage;