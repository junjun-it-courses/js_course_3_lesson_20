'use strict';

void function () {


    const todoList = {
        selector: null,                         // string | null
        form: null,                             // HTMLFromElement | null
        todosContainerSelector: null,           // HTMLFromElement | null
        todosContainer: null,                   // HTMLFromElement | null

        loadHandler() {
            const todos = this.getTodos();
            if(!todos) return;

            todos.forEach(todoItem => this.renderTodoItem(todoItem))
        },

        formSubmitHandler() {
            const data = {};
            this.form
                .querySelectorAll('input, textarea')
                .forEach(input => data[input.name] = input.value);

            const savedData = this.saveTodo(data);
            this.renderTodoItem(savedData);

            this.form.reset();
        },


        renderTodoItem(dataToRender) {
            const todoHtml = this.createTodoItemTemplate(dataToRender.title, dataToRender.description, dataToRender.id);
            this.todosContainer.appendChild(todoHtml);
        },

        saveTodo(data) {
            let dataFromStore = localStorage.getItem(this.selector);

            // Deep clone of object
            const localData = structuredClone(data);

            if (!dataFromStore) {

                localData.id = 1;

                const todosArr = []
                todosArr.push(localData);
                localStorage.setItem(this.selector, JSON.stringify(todosArr));
            }


            if (dataFromStore) {
                dataFromStore = JSON.parse(dataFromStore);
                const lastTodoId = dataFromStore[dataFromStore.length - 1].id;

                localData.id = Number(lastTodoId) + 1;

                dataFromStore.push(localData);
                localStorage.setItem(this.selector, JSON.stringify(dataFromStore));
            }

            return localData;
        },

        getTodos() {
          return JSON.parse(localStorage.getItem(this.selector));
        },

        init(formSelector, todosContainerSelector) {
            if (!this.isRightElector(formSelector)) {
                console.warn('You should pass the formSelector');
                return null;
            }

            if (!this.isRightElector(todosContainerSelector)) {
                console.warn('You should pass the todosContainerSelector');
                return null;
            }

            this.selector = formSelector;
            this.todosContainerSelector = todosContainerSelector;

            this.handleForm();
            this.handleTodosContainer();
        },

        handleTodosContainer() {
            const todosContainer = document.querySelector(this.todosContainerSelector);
            if (!this.isHTMLElement(todosContainer)) throw new Error('todosContainer is not valid');

            this.todosContainer = todosContainer;
            this.setEvent('DOMContentLoaded', document, this.loadHandler)
        },

        handleForm() {
            const formElement = document.querySelector(this.selector);
            if (!this.isForm(formElement)) throw new Error('Form is not valid');

            this.form = formElement;

            this.setEvent('submit', this.form, this.formSubmitHandler);
        },

        //  @params
        //  eventType = string
        //  element = HTMLElement
        //  eventHandler = function
        setEvent(eventType, element, eventHandler) {
            element.addEventListener(
                eventType,
                event => {
                    event.preventDefault();
                    event.stopPropagation();

                    eventHandler.call(this, event);
                },
                {passive: false}
            );
        },


        isRightElector(selector) {
            if (typeof selector !== 'string') return false;
            if (selector.trim() === '') return false;

            return true;
        },
        isForm: el => el instanceof HTMLFormElement,
        isHTMLElement: el => el instanceof HTMLElement,

        createTodoItemTemplate(title, body, id) {
            const wrapper = document.createElement('div');
            wrapper.classList.add('col-4');
            wrapper.setAttribute('data-todo-id', id);

            const template = `<div class="taskWrapper">
                 <div class="taskHeading">${title}</div>
                 <div class="taskDescription">${body}</div>
             </div>`

            wrapper.innerHTML = template;

            return wrapper;
        }
    }


    let isHomePage = true;
    if (isHomePage) {
        todoList.init('#todoForm', '#todoItems');
    }


}()