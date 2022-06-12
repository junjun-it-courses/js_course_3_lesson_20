'use strict';

void function () {

    const config = {
        form: '#todoForm',
        todoContainer: '#todoItems',
    }


    const app = controller(
        view(),
        model(),
        config
    );


}()