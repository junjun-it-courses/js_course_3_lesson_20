const setEvent = (eventType, element, eventHandler) => {
    element.addEventListener(
        eventType,
        event => {
            event.preventDefault();
            event.stopPropagation();

            eventHandler.call(this, event);
        },
        {passive: false}
    );
};
