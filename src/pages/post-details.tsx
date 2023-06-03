import { useParams } from "react-router-dom";
import Skeleton from "../components/skeleton";
import { useFetchPostCommentsQuery, useFetchPostQuery } from "../store";
import { PostCard } from "../components/post-card";
import { CommentCard } from "../components/comment-card";

export default function PostDetails() {
  const { postId } = useParams<{ postId: string }>();
  console.log(postId);
  const {
    data: post,
    error: postError,
    isFetching: isFetchingPost,
  } = useFetchPostQuery(+postId);
  const {
    data: commentsData,
    error: commentsError,
    isFetching: isFetchingComments,
  } = useFetchPostCommentsQuery(+postId);

  let postContent: JSX.Element | null = null;
  if (isFetchingPost) {
    postContent = <Skeleton className="h-8 w-8" times={4} />;
  } else if (postError) {
    postContent = <div>Error fetching photos...</div>;
  } else if (post) {
    postContent = <PostCard key={post.id} post={post} />;
  }

  let commentsContent: JSX.Element | JSX.Element[] | null = null;
  if (isFetchingComments) {
    commentsContent = <Skeleton className="h-8 w-8" times={4} />;
  } else if (commentsError) {
    commentsContent = <div>Error fetching photos...</div>;
  } else if (commentsData) {
    commentsContent = commentsData.map((comment) => (
      <CommentCard key={comment.id} comment={comment} />
    ));
  }

  return (
    <div>
      {postContent}
      {commentsContent}
    </div>
  );
}
