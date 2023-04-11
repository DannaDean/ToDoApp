import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos : [
    ],
    filterStatus: 'all'
  },
  getters: {
    allTodos: (state) => state.todos,
  },
  actions: {
    addTodo({ commit }, todo) {
      commit("add_todo", todo);
    },
    deleteTodo({commit}, id) {
      commit("delete_todo", id)
    },
    updateTodo({commit}, todo) {
      commit("update_todo", todo)
    },
    dublicateTodo({commit}, id) {
      commit("duplicate_todo", id)
    },
    toggleTodo({commit}, id) {
      commit("toggle_todo", id)
    },
    showAll({commit}, todo) {
      commit('show_all', todo);
    },
    inProgress({commit}, todo) {
      commit('show_inProgress', todo)
    },
    showCompleted({commit}, todo) {
      commit('show_completed', todo)
    }
  },
  mutations: {
    add_todo(state, todo) {
      const d = new Date(todo.dueDate)
      const formatter = new Intl.DateTimeFormat('en-GB', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        timeZone: 'Europe/London',
      });
      state.todos = [{id: state.todos.length + 1, title: todo.title, isComplete: false, dueDate: formatter.format(d)}, ...state.todos];
    },
    delete_todo(state, id) {
      state.todos = state.todos.filter(todo => todo.id != id)
    },
    update_todo(state, todo) {
      state.todos.findIndex(t => t.id == todo.id)
    },
    toggle_todo(state, todo) {
      const index = state.todos.findIndex((item) => item.id === todo.id);
        state.todos[index].isComplete = !state.todos[index].isComplete;
      
    },
    duplicate_todo(state, id) {
      const todoDublicate = state.todos.find(t => t.id === id);
      const newTodo = {...todoDublicate, id: state.todos.length + 1};
      const originalTodoIndex = state.todos.findIndex(todo => todo.id === id)
      state.todos.splice(originalTodoIndex + 1, 0, newTodo)
    },
    show_all(state) {
      state.filterStatus= 'all';
    },
    show_inProgress(state) {
      state.filterStatus= 'progress'
    },
    show_completed(state) {
      state.filterStatus = 'completed'
    }

  },
  modules: {
  }
})
