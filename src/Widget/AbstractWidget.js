class AbstractWidget {

    insertBefore(el) {
        $(el).before(this.$el);
        this._afterInsert();
        return this;
    }

    insertAfter(el) {
        $(el).after(this.$el);
        this._afterInsert();
        return this;
    }

    appendTo(el) {
        $(el).append(this.$el);
        this._afterInsert();
        return this;
    }

    _afterInsert() {
        if (typeof this.afterInsert === 'function') {
            // setTimout, because the widget could be inserted into a parent widget, which didn't get inserted into the dom yet.
            // this isn't a proper solution, but it should work in most cases
            setTimeout(() => {
                this.afterInsert();
            }, 0);
        }
    }

}

export { AbstractWidget }