import { Link, useNavigate } from 'react-router-dom';
import { getFormatedDate } from '../AppFunc'

export default function Posts({posts}) {
  return (
    <>
      <div className="posts__addpost">
        <Link className="posts_button_add" to="/posts/new">Добавить</Link>
      </div>
      <hr />
      <div className="posts__content">
        {
          posts.slice()
          .sort((a, b) => b.created - a.created)
          .map(o => <Post key={o.id} id={o.id} post={o} />)
        }
      </div>
    </>
  )
}

function Post({id, post}) {
  const navigate = useNavigate();
  const handleViewPost = id => navigate(`/posts/${id}`);
  return (
    <div className="post" id={id} onClick={() => handleViewPost(id)}>
      <div className="post__title">
        <div className="post__avatar">
          <div className="post__avatar_img"></div>
        </div>
        <div className="post__author">
          <span>{post.author}</span>
          <span>{getFormatedDate(post.created)}</span>
        </div>
      </div>
      <div className="post__message">
        {post.content}
      </div>
    </div>
  )
}
