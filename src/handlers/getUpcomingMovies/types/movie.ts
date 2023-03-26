/**
 * This is the shape of the Movie that comes in from TMDB API
 * {
      adult: false,
      backdrop_path: "/fh7aM10THQzivGU7kAkgKrgzot4.jpg",
      genre_ids: [28, 12, 14, 35],
      id: 493529,
      original_language: "en",
      original_title: "Dungeons & Dragons: Honor Among Thieves",
      overview:
        "A charming thief and a band of unlikely adventurers undertake an epic heist to retrieve a lost relic, but things go dangerously awry when they run afoul of the wrong people.",
      popularity: 204.549,
      poster_path: "/6LuXaihVIoJ5FeSiFb7CZMtU7du.jpg",
      release_date: "2023-03-29",
      title: "Dungeons & Dragons: Honor Among Thieves",
      video: false,
      vote_average: 0,
      vote_count: 0,
    },
 */
export interface Movie {
    adult: string;
    backdrop_path: string;
    genre_ids: Number[];
    id: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}
