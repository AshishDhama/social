import { useParams } from "react-router-dom"
import Skeleton from "../../components/skeleton/skeleton";
import { useFetchPostQuery } from "../../store";

export default function PostDetails(){
    const {postId} = useParams<{postId: string}>()
    console.log(postId)
    const {data, error, isFetching} = useFetchPostQuery(+postId)

  let content: JSX.Element | null = null;
  if (isFetching) {
    content = <Skeleton className="h-8 w-8" times={4} />;
  } else if (error) {
    content = <div>Error fetching photos...</div>;
  } else if (data) {
    content = (
        <div className="flex flex-col items-center">
            <h3 className="text-2xl font-bold">{data.title}</h3>
            <p className="text-xl">{data.body}</p>
        </div>
    );
  }
    return <div>{content}</div>
}


