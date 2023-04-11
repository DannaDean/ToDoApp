<template>
    <div class="container w-full">
        <div class="relative flex text-2xl h-48 mt-7">
            <div>
                <img src="https://images.unsplash.com/photo-1522199670076-2852f80289c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80" alt="" class="absolute w-full h-full rounded-lg object-cover filter brightness-50"
                >
                <h1 class="absolute top-20 left-4 text-4xl text-todo-main sm:text-4xl">What's new today?</h1>
                <div class="flex justify-end px-3 absolute right-0"><i class="fa-solid fa-circle-info text-2xl text-todo-second text-right hover:text-todo-main cursor-pointer duration-150 " @click="showPopup()"></i></div>

                <Transition name="modal-outer">
                    <div 
                        v-if="showInfo"
                        class="absolute bg-todo-main shadow-[0_0_35px_rgb(72,67,67,0.5)] rounded-lg p-4 flex flex-col items-start text-left top-minus-32 text-text-color z-30">
                        <h1 class="text-xl mb-1">About:</h1>
                        <p class="mb-4 text-lg">
                            This ToDo App allows you to to write down all the things you need to complete, it helps you to be organized.
                        </p>
                        <h2 class="text-xl">How it works:</h2>
                        <ol class="list-decimal list-inside mb-4 text-lg" >
                            <li>
                                Click the  " + "  button to create a task.
                            </li>
                            <li>
                                Write your title name in the imput "What do you want to do?", then choose a due date.
                            </li>
                            <li>
                                Click "Add Task" button to add it in your task list.
                            </li>
                        </ol>
                        <h2 class="text-xl">Other features:</h2>
                        <ul class="mb-4 text-lg">
                            <li>
                                <i class="fa-solid fa-pen-to-square text-xl"></i> Click this button if you want to edit your task name.
                            </li>
                            <li>
                                <i class="fa-solid fa-trash text-xl"></i>
                                Click this button if you want to delete your task. A Popup confirmation will appear. Click "Yes" if you want to delete it, and "No" if you don't.
                            </li>
                            <li>
                                <i class="fa-solid fa-copy text-xl"></i>
                                Click this button if you want to dublicate your task
                            </li>
                        </ul>
                        <div class="w-full text-center">
                            <button @click="hidePop()" class="text-todo-second py-1 px-5 border-solid text-xl border-todo-second border-2 cursor-pointer hover:bg-todo-second hover:text-todo-main duration-700 rounded-lg">Close</button>
                        </div>
                    </div>
                </Transition>
            </div>
        </div>
        
        <div class="flex justify-center p-3 w-full gap-3 ">
            <button 
                class="text-todo-second p-3 border-solid border-todo-second border-b-2 cursor-pointer w-full hover:bg-todo-second hover:text-todo-main duration-700 hover:rounded-lg"
                @click="showAll">All</button>
            <button 
                class="text-todo-second p-3 border-solid border-todo-second border-b-2 cursor-pointer w-full hover:bg-todo-second hover:text-todo-main duration-700 hover:rounded-lg"
                @click="inProgress">Ongoing</button>
            <button
            class="text-todo-second pl-2 border-solid border-todo-second border-b-2 cursor-pointer w-full hover:bg-todo-second hover:text-todo-main duration-700 hover:rounded-lg"
            @click="showCompleated">Completed</button>
        
        </div>
        <h3 class="text-text-color p-4 text-left">My tasks</h3>
        <div 
            v-for="todo in filteredTodos" 
            :key="todo.id"
            class="px-4 pb-7 w-full h-auto">
            <TodoItem :todo="todo" ></TodoItem>
        </div>
        <div 
            v-if="todos =='' "
            class="p-5">
               <p> My ToDo List is empty</p>
        </div>
    </div>
</template>

<script >
    import { mapGetters } from 'vuex';
    import TodoItem from './TodoItem.vue';

    export default {

        data() {
            return {
                showInfo: false
            }
        },
        components: { 
            TodoItem 
        },
        computed: {
            ...mapGetters(["allTodos"]),
            todos() {
                return this.$store.state.todos;
            },
            filterStatus() {
                return this.$store.state.filterStatus;
            },
            filteredTodos() {
            if (this.filterStatus === "all") {
                return this.todos
            }else if(this.filterStatus === 'completed') {
                return this.todos.filter(todo => todo.isComplete)
            }else if (this.filterStatus === 'progress') {
                return this.todos.filter(todo => !todo.isComplete )
            } else {
                return this.todos;
            }
        }
        },
        methods: {
            showAll() {
                this.$store.commit('show_all');
            },
            inProgress() {
                this.$store.commit('show_inProgress')
            },
            showCompleated() {
                this.$store.commit('show_completed')
            },
            showPopup() {
                this.showInfo = true;
            },
            hidePop() {
                this.showInfo = false
            }
        }
}
</script>

<style>
.modal-outer-enter-active,
    .modal-outer-leave-active {
        transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
    }

    .modal-outer-enter-from,
    .modal-outer-leave-to {
        opacity: 0;
    }

    .modal-outer-enter-active {
        transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
    }

    .modal-outer-leave-active {
        transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
    }

    .modal-outer-enter-from {
        opacity: 0;
        transform: scale(0.8);
    }

    .modal-outer-leave-to {
        transform: scale(0.8);
    }
    </style>