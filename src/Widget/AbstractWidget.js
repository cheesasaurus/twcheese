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
            this.afterInsert();
        }
    }

}

export { AbstractWidget }