<template>
    <div class="relative flex w-full justify-between items-center shadow-[0_0_10px_rgb(230,120,117,0.5)] cursor-pointer rounded-lg px-3">
        <div 
            class="text-text-color flex flex-col gap-3 items-start " >
            <div class="flex  p-1 bg-zinc-300 rounded-lg">
                <span v-if="todo.dueDate">{{ todo.dueDate }}</span>
            </div>
            <div class="flex items-start">
                <input 
                type="checkbox"  
                :checked="todo.isComplete"
                @change="toggleTodo(todo)"
                class="form-checkbox h-4 w-4 text-indigo-600 border-gray-300 rounded">
                
            <label  
                v-if="!editing" 
                class="mx-2 break-words "
                :class="{ 'completed': todo.isComplete, 'text-red-500': isPastDate}"> 
                {{todo.title}}
                
            </label> 
            <input 
                v-bind:value="todoText" 
                @change="todoTextChange" 
                v-else 
                type="text"
                class="text-text-color h-full w-full  mx-3  border-b-2 border-solid  border-todo-second bg-transparent">
            </div>
        </div>
        <div class="flex gap-5 text-text-color py-2">
            <div class="flex flex-col">
                <button 
                    @click="updateTodoI(todo)"
                    title="Edit">
                    <i class="fa-solid fa-pen-to-square text-xl" v-if="!isEdit"></i>
                    <i class="fa-solid fa-check text-xl" v-else></i>
                </button>
                <button 
                    @click="confirmDelete(todo)" 
                    title="Delete">
                    <i class="fa-solid fa-trash text-xl"></i>
                </button>
                <button
                    @click="dublicateTodo(todo.id)" 
                    title="Dublate">
                    <i class="fa-solid fa-copy text-xl"></i>
                </button>
            </div>
        </div>

        <div v-if="showConfirmation"
        class="container absolute text-indigo-100 top-0 left-minus-16 p-4 w-full h-full z-10 rounded-lg bg-todo-second flex flex-col items-center justify-center">
            <p>Are you sure you want to delete this task?</p>
            <div class="flex justify-center gap-3">
                <button @click="deleteTodo(todo.id)">Yes</button>
            <button @click="cancelDelete(todo.id)">No</button>
            </div>
        </div>
        
    </div>
</template>

<script >

import { mapActions } from 'vuex';

    export default {
        props: {
            todo: {},
        },
        computed: {
            todos() {
                return this.$store.state.todos
            },
            isPastDate() {
                if (this.todo.dueDate && new Date(this.todo.dueDate) < new Date()) {
                    return 'text-red-500';
                    
                } else {
                    return '';
                }
            }
        },
        data() {
            return {
            showConfirmation: false,
            todoToDelete: null,
            todoText: "",
            editing:false,
            isEdit: false,
            }
        },
        methods : {
            ...mapActions(['updateTodo']),
            
            confirmDelete(todo) {
                this.todoToDelete = todo;
                this.showConfirmation = true;
            },
            cancelDelete() {
                this.showConfirmation = false;
                this.todoToDelete = null;
            },
            deleteTodo() {
            if (this.todoToDelete) {
                this.$store.commit('delete_todo', this.todoToDelete.id);
            }
                this.showConfirmation = false;
                this.todoToDelete = null;
            },
            todoTextChange(e) {
                this.todoText = e.target.value
            },
            updateTodoI(todo) {
                this.editing = this.editing == true ? false: true;
                this.isEdit == false ? this.isEdit = true : this.isEdit = false;
                if(this.editing) {
                    this.todoText = todo.title;
                    this.updateTodo(todo);
                } else {
                    todo.title = this.todoText;
                }
            },
            toggleTodo(todo) {
                this.$store.commit("toggle_todo", todo)
            },
            dublicateTodo(id) {
                this.$store.commit('duplicate_todo', id)
            }
        }
    }
</script>

<style>
.completed {
    text-decoration: line-through;
    color: gray;
}

.text-red-500 {
  color: #EF4444;
}
</style>
