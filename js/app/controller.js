'use strict';

function controller(view, model, config) {
    const formSelector = config.form;
    const todoContainerSelector = config.todoContainer;

    // @todo add validation
    const form = document.querySelector(formSelector);
    const todoContainer = document.querySelector(todoContainerSelector);

    model.init(formSelector);
    view.init(form, todoContainer)

    const fetchInputsData = inputs => {
        if(!inputs) throw new Error('You should provide inputs');
        const data = inputs instanceof Array ? inputs : Array.from(inputs);

        return data.reduce((acc, input) => {
            acc[input.name] = input.value;
            return acc;
        }, {})
    }

    const submitHandler = event => {
        event.preventDefault();
        event.stopPropagation();

        const inputs = form.querySelectorAll('input, textarea');
        const data = fetchInputsData(inputs);

        const savedData = model.setData(data);
        if(!savedData.success) throw new Error('Cannot save data to db');


        view.addTodo(savedData.data);
        view.clearForm()
    }

    const loadedHandler = () => {
        const data = model.getData();
        if(!data || !data.length) return;

        view.addTodos(data);
    }

    form.addEventListener('submit', submitHandler);
    window.addEventListener('DOMContentLoaded', loadedHandler)
}