import storage from "./until/storage.js";

const init = {
  todos: storage.get(),
  filter: "all",
  filters: {
    all: () => true,
    active: (todo) => !todo.complete,
    complete: (todo) => todo.complete,
  },
  editIndex: null,
};

const actions = {
  add({ todos }, title) {
    if (title) {
      todos.push({ title, complete: false });
      storage.set(todos);
    }
  },
  toggle({ todos }, index) {
    const todo = todos[index];
    todo.complete = !todo.complete;
    storage.set(todos);
  },
  toggleAll({ todos }, complete) {
    todos.forEach((todo) => (todo.complete = complete));
    storage.set(todos);
  },
  destroy({ todos }, index) {
    todos.splice(index, 1);
    storage.set(todos);
  },
  switchFilter(state, type) {
    state.filter = type;
  },
  clearComplete(state) {
    state.todos = state.todos.filter(state.filters.active);
    storage.set(state.todos);
  },
  startEdit(state, index) {
    state.editIndex = index;
  },
  endEdit(state, title) {
    if (state.editIndex !== null) {
      if (title) {
        state.todos[state.editIndex].title = title;
        storage.set(state.todos);
      } else {
        this.destroy(state, state.editIndex);
      }
      state.editIndex = null;
    }
  },
  cancelEdit(state) {
    state.editIndex = null;
  },
};

export default function reducer(state = init, action, args) {
  actions[action] && actions[action](state, ...args);
  return state;
}
