<template>
    <div>
        <div class="" title="Add To Do">
            <button 
            @click="createTodo()"
            class="bg-todo-second w-10 h-10 m-4 rounded-full cursor-pointer text-2xl text-todo-main hover:shadow-[0_0_10px_rgb(230,120,117,0.5)]">+</button>
        </div>

        <Transition name="modal-outer">
            <div 
                v-if="showInput"
                class="absolute w-full h-full bg-todo-main left-0 top-0 flex flex-col gap-7 items-center justify-center z-10"
                >
                <div class="w-3/5 ">
                    <p v-if="errorMessage" class="text-red-500 pb-2 text-left">{{ errorMessage }}</p>
                    <input 
                        type="text"
                        @change="todoTextChange" 
                        v-model="todoText"
                        @keypress.enter="addTodo(todoText)"
                        placeholder="What do you want to do?" 
                        class=" border-2 p-3 rounded-lg border-solid  border-todo-second w-full bg-todo-main">
                </div>
                <div class="flex flex-col items-start gap-2 w-3/5">
                    <input 
                    type="date"
                    v-model="dueDate"
                    class="w-full bg-todo-main border-2 border-solid p-3 rounded-lg   border-todo-second">
                </div>
                <div class="flex w-3/5 gap-2">
                    <button 
                    @click="addTodo()"
                    class="text-todo-second p-3 border-solid border-todo-second border-2 cursor-pointer rounded w-3/5 hover:bg-todo-second hover:text-todo-main duration-700">
                    Add task
                </button>
                <button 
                    @click="addCancel()"
                    class="text-todo-second p-3 border-solid border-todo-second border-2 cursor-pointer rounded w-3/5 hover:bg-todo-second hover:text-todo-main duration-700">
                    Cancel
                </button>
                </div>
                    
            </div>
        </Transition>
    </div>
</template>

<script >
    import { mapActions } from "vuex";

    export default {
        data() {
            return {
                todoText: "",
                showInput: false,
                dueDate: "",
                errorMessage: ""
            }
        },
        methods: {
            ...mapActions( ['addTodo']),
            todoTextChange(e) {
                this.todoText = e.target.value;
            },
            addTodo() {
                if(this.isInvalidImput()) {
                    if(this.todoText) {
                    this.$store.commit('add_todo',{title: this.todoText, dueDate: this.dueDate})
                }
                this.todoText = "";
                this.showInput = false;
                this.dueDate = " ";
                this.errorMessage = '';
                } else {
                    return this.errorMessage = `Add a proper name`
                }
            },
            isInvalidImput() {
                return this.todoText.trim() !== ''
            },
            createTodo() {
                this.showInput = true;
            },
            addCancel() {
                this.showInput = false;
            }
        }
    }
</script>
 
<style scoped>
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

    
</style>