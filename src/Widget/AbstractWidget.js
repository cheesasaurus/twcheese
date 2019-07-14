class AbstractWidget {

    insertBefore($el) {
        $el.before(this.$el);
        return this;
    }

    insertAfter($el) {
        $el.after(this.$el);
        return this;
    }

    appendTo($el) {
        $el.append(this.$el);
        return this;
    }

}

export { AbstractWidget }