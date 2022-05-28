import { useState } from 'react'
import { changeInput } from '../AppFunc'
import { Link, Routes, useNavigate } from 'react-router-dom';
const postAuthor = {
    id: 0,
    author: 'Иван Петрович',
    category: 'Administrators',
    content: '',
}

export default function AddPost({setUpdate}) {
  const [form, setForm] = useState(postAuthor)
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = evt => {
    evt.preventDefault();
    if (form.content.length < 3) return alert('Message is very short');
    if (loading) return

    setLoading(true);
    (async () => {
      await fetch('http://localhost:7777/posts', {
        method: 'POST',
        body: JSON.stringify(form),
      })
      setUpdate(Date.now());
      setLoading(false);
      setForm(postAuthor);
      navigate('/');
    })();
  }
  return (
    <form onSubmit={handleSubmit} className="post__add">
      <div className="post__add_top">
        <span> Добавление нового поста:</span>
        <Link to="/" className="post__add_close">X</Link>
      </div>
      <span> Автор:</span>
      <input type="text" id="author" defaultValue={form.author} pattern="(.){3,32}" />
      <span> Сообщение:</span>
      <textarea
        id="content"
        onChange={evt => changeInput(evt, setForm, loading)}
        value={form.content}
        disabled={loading}>
      </textarea>
      <button className="post__button_add" disabled={loading}>
        {loading ? 'Отправляем...' : 'Опубликовать'}
      </button>
    </form>
  )
}
