<template>
    <div class="container">
        <div class="title-container">
            <small>{{ getDate }}</small>
            <h4>{{ today }}</h4>
        </div>
        
        <div class="add-list">
            <form @submit.prevent>
            <input type="text" v-model="memo" class="todo-text">
            <button type="submit" @click="addTodo(memo)">추가</button>
            </form>
        </div>
        <div v-if="hasTodos">
            <p class="status-title">진행중: {{ countOfPending }}건 </p>
            <ul class="todo-list">
                <li
                    v-for="(todo, index) in pending" 
                    :key="index"
                    class=""
                >
                    <input type="checkbox"
                        :id="'todo_' + todo.id"
                        class="todo-checkbox"
                        :checked="todo.done"
                        @change.prevent="updateState(todo.id, todo.done, $event)"
                    >
                    <label :for="'todo_' + todo.id"></label>    
                    <p>{{ todo.memo }}</p>                
                    <button type="button" @click="deleteList(todo.id)" class="btn-delete">삭제</button>
                </li>
            </ul>
        </div>
        <div v-if="hasCompleted">
            <p class="status-title">완료: {{ stateOfCompleted }}%</p>
            <ul class="todo-list completed">
                <li
                    v-for="(todo, index) in completed" 
                    :key="index"
                    class=""
                >
                    <input type="checkbox"
                        :id="'todo_' + todo.id"
                        class="todo-checkbox"
                        :checked="todo.done"
                        @change.prevent="updateState(todo.id, todo.done, $event)"
                        
                    >
                    <label :for="'todo_' + todo.id"></label>
                    <p>{{ todo.memo }}</p>                
                    <button type="button" @click="deleteList(todo.id)" class="btn-delete">삭제</button>
                </li>
            </ul>
        </div>
        <a 
            href="" 
            role="button" 
            v-if="hasList"
            @click="clearList()" 
            class="btn-clear"
        >모두 완료</a>
    </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
    data() {
        return {
            memo: null,
            date: new Date()
        }
    },
    beforeCreate() {
        this.$store.commit('initialList');
    },
    computed: {
        ...mapGetters(['pending', 'completed']),
        hasList() {
            return this.$store.state.todos.length > 0;
        },
        hasTodos() {
            return this.pending.length > 0;
        },
        hasCompleted() {
            return this.completed.length > 0;
        },
        today() {
            const weekDay = [ '일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일' ];
            let day = this.date.getDay();

            return weekDay[ day ];
        },
        getDate() {
            return `${this.date.getFullYear()}-${this.date.getMonth() + 1}-${this.date.getDate()}`
        },
        countOfPending() {
            return this.pending.length || 0;
        },
        stateOfCompleted() {
            return Math.round( this.completed.length / this.$store.state.todos.length * 100 );
        }
    },
    methods: {
        ...mapActions(['addList', 'updateList']),
        ...mapMutations(['deleteList', 'clearList']),

        addTodo(memo) {
            let todo = {
                memo: memo,
                done: false
            }
            this.addList(todo);
            this.memo = null;
        },
        updateState(id, state, $event) {
            let updatedState = !state; 
            this.updateList({id, updatedState});
            
            $event.target.checked = state;
        }
    }
}
</script>
<style lang="scss" scoped>
@import "../styles/components/todos";
</style>