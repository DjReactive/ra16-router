import { useParams, useNavigate, Link } from "react-router-dom";
import { useState } from 'react'
import { getFormatedDate, changeInput } from '../AppFunc'

export default function ViewPost({posts, setUpdate}) {
  const [edit, setEdit] = useState({ status: false, loading: false });
  const navigate = useNavigate();
  const params = useParams();
  const post = posts.find(o => o.id === Number(params.id));
  if (!post) {
    return (
      <>
        <span>Такой пост не найден</span>
        <br /><br />
        <Link to="/">Вернуться</Link>
      </>
    )
  }
  const handleRemove = id => {
    (async () => {
      await fetch(`http://localhost:7777/posts/${id}`, {
        method: 'DELETE',
      })
      setUpdate(Date.now());
      navigate('/');
    })();
  }
  const handleClose = id => {
    if (edit.loading) return;
    if (edit.status) {
      setEdit({ status: false, loading: false });
      return
    }
    navigate('/');
  }
  const handleEdit = id => setEdit(prev => ({ ...prev, status: true }));
  const handleSave = id => {
    if (edit.loading) return;
    setEdit({ loading: true });
    (async () => {
      await fetch('http://localhost:7777/posts', {
        method: 'POST',
        body: JSON.stringify({...edit, id: post.id}),
      })
      setEdit({ status: false, loading: false });
      setUpdate(Date.now());
    })();

  };
  return (
    <>
      <div className="post__add_top">
        <span> Пост #{post.id} { edit.status && '(Редактирование)'}</span>
        <button className="post__button_add" onClick={() => handleClose(post.id)}>X</button>
      </div>
      <div className="post__view" id={post.id}>
        { !edit.status &&
        <div className="post__title">
          <div className="post__avatar">
            <div className="post__avatar_img"></div>
          </div>
          <div className="post__author">
            <span>{post.author}</span>
            <span>{getFormatedDate(post.created)}</span>
          </div>
        </div>
        }
        <div className="post__message">
          { !edit.status ? post.content :
            <textarea
              id="content"
              onChange={evt => changeInput(evt, setEdit)}
              defaultValue={post.content}>
            </textarea>
          }
        </div>
      </div>
      {
        !edit.status ?
        <>
          <button className="post__button_add" onClick={() => handleEdit(post.id)}>Изменить</button>
          <button className="post__button_add remove" onClick={() => handleRemove(post.id)}>Удалить</button>
        </> : <button className="post__button_add" onClick={() => handleSave(post.id)}>Сохранить</button>
      }
    </>
  )
}
