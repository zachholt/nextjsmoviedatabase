import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function Movie({ params }: { params: { id: string} }) {

    const { data: movie, isLoading, error } = useQuery<any[]>({
        queryKey: ['movies'],
        queryFn: async () => {
          return (await axios.get(`http://localhost:8080/api/movies/${params.id}`)).data
        },
      })

    return (
        <div className="text-black">
            <h1>{movie.id}</h1>
            <h1>{movie.movieTitle}</h1>
        </div>
    );
}
