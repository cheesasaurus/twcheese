class AbstractWidget {
    insertAfter($el) {
        $el.after(this.$el);
    }
}

export { AbstractWidget }