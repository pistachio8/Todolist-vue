import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: []
  },
  getters: {
    pending: function(state) {
      if ( state.todos.length > 0 ) {
        return state.todos.filter(item => {
          return !item.done;
        })
      }
      return [];
    },
    completed: function(state) {
      if ( state.todos.length > 0 ) {
        return state.todos.filter(item => {
          return item.done;
        })
      }
      return [];
    }
  },
  mutations: {
    initialList(state) {
      if(localStorage.getItem('todo_list')) {        
        state.todos = JSON.parse(localStorage.getItem('todo_list'));
      }
    },
    addList(state, payload) {
      let todo = {
        id: state.todos.length,
        memo: payload.memo,
        done: false
      }
      state.todos.push(todo);
      this.commit('updateList');
      
    },
    updateList() {
      this.subscribe( (mutations, state) => {
        localStorage.setItem('todo_list', JSON.stringify(state.todos))
      });
    },
    deleteList(state, payload) {
      const index = state.todos.findIndex( todo => {
          return todo.id === payload
      })
      
      state.todos.splice(index, 1);
      this.commit('updateList');
    },
    clearList(state) {
      state.todos = [];
      this.commit('updateList');
    }
  },
  actions: {
    addList({commit}, payload) {
      
      if (payload.memo === null || payload.memo === "") {
        alert('할 일을 입력해주세요')
        return;
      } 
      commit('addList', payload);
    },
    updateList({state, commit}, payload) {
      const index = state.todos.findIndex( todo => {
        return todo.id === payload.id
      });
      state.todos[index].done = payload.updatedState
      commit('updateList');
    }
  }
})
