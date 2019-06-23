class AbstractWidget {
    insertAfter($el) {
        $el.after(this.$el);
    }
    appendTo($el) {
        $el.append(this.$el);
    }
}

export { AbstractWidget }