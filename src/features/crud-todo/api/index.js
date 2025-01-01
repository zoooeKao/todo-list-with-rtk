// @ts-check

/** @returns {Promise<{isLoggedIn: boolean, data: string | null}>} */
export const fetchLogin = () => {
  return fetch('/api/auth/login?auth=0', {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify({username: 'emilys', password: 'emilyspass'}),
  })
    .then((response) => {
      return response.ok ? response.json() : Promise.reject(response);
    })
    .then((txt) => {
      return {isLoggedIn: true, data: txt};
    })
    .catch(() => {
      return {isLoggedIn: false, data: null};
    });
};

/** @typedef {import('../../../env').Todo} Todo */

/** @returns {Promise<{todos:Todo[];total:number}>} */
export const fetchTodoList = () => {
  return fetch('/api/todo?userId=1&limit=7&skip=0').then((res) => {
    return res.ok ? res.json() : Promise.reject('get todo fail');
  });
};

/** @param {Object} param0
 * @param {number} param0.id
 * @param {string} param0.todo
 * @param {boolean} param0.completed
 * @returns {Promise<Todo>}
 */
export function fetchUpdateTodo({id, todo, completed}) {
  return fetch(`/api/todo/${id}`, {
    method: 'PUT',
    body: JSON.stringify({id: id, todo: todo, completed: completed}),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Put id:${id} checked/todo API failed`);
  });
}
export function fetchAddTodo({todo, completed}) {
  return fetch('/api/todo', {
    method: 'POST',
    body: JSON.stringify({
      todo: todo,
      completed: completed,
      userId: 1,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject('post todo fail');
  });
}

export function fetchDeleteTodo(id) {
  return fetch(`/api/todo/${id}`, {
    method: 'DELETE',
  }).then((res) => {
    return res.ok ? id : Promise.reject('delete fail');
  });
}
