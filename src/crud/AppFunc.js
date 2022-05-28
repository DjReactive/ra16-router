import { useEffect } from 'react'

export function useFetch(url, options, callback, deps) {
  useEffect(() => {
    fetch(`http://localhost:7777${url}`, options)
      .then(response => response.json())
      .then(json => {
        callback(json);
      })
  }, deps)
}

export function changeInput(evt, setForm, loading = false) {
    if (loading) return
    setForm(prev => ({...prev, [evt.target.id]: evt.target.value}));
  }

export function getFormatedDate(date) {
  const nDate = new Date(date);
  return `${formatDateNumber(nDate.getDate())}`
  + `.${formatDateNumber(nDate.getMonth() + 1)}`
  + `.${formatDateNumber(nDate.getFullYear())}`
  + ` ${formatDateNumber(nDate.getHours())}`
  + `:${formatDateNumber(nDate.getMinutes())}`;
}

function formatDateNumber(number) {
  return String(number).padStart(2, '0');
}
