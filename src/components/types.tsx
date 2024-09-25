interface Director {
    id: number;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
  }
  
  interface Genre {
    id: number;
    genre: string;
  }
  
  interface Rating {
    id: number;
    rating: string;
    description: string;
  }
  
  interface Actor {
    id: number;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
  }
  
  interface Movie {
    id: number;
    movieTitle: string;
    movieLength: number;
    releaseDate: string;
    trailerUrl: string;
    director: Director;
    genre: Genre;
    rating: Rating;
    actors: Actor[];
    overview: string;
  }