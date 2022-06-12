'use strict';


function view() {
    const generateTodoTemplate = (data) => {
        const wrapper = document.createElement('div');
        wrapper.classList.add('col-4');
        wrapper.setAttribute('data-todo-id', data.id);

        wrapper.innerHTML = `<div class="taskWrapper">
           <div class="taskHeading">${data.title}</div>
           <div class="taskDescription">${data.description}</div>
         </div>`;

        return wrapper;
    }


    return {
        form: null,
        todoContainer: null,

        clearForm() {
            this.form.reset();
        },

        addTodo(data) {
            const todoItemTemplate = generateTodoTemplate(data);
            this.todoContainer.append(todoItemTemplate);
        },

        addTodos(data) {
            data.forEach(item => this.addTodo(item))
        },


        init(form, todoContainer) {
            // @todo validate args
            this.form = form;
            this.todoContainer = todoContainer;
        }
    }
}