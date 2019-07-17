
function afterDOMInsert(el, callback) {
    let observer = new MutationObserver((mutations) => {
        outerloop:
            for (let mutation of mutations) {
                for (let node of mutation.addedNodes) {
                    if (node === el || node.contains(el)) {
                        setTimeout(callback, 0);
                        observer.disconnect();
                        break outerloop;
                    }
                }
            }
    });

    observer.observe(document, {
        attributes: true,
        childList: true,
        subtree: true
    });
}


class AbstractWidget {

    insertBefore(el) {
        this._beforeInsert();
        $(el).before(this.$el);
        return this;
    }

    insertAfter(el) {
        this._beforeInsert();
        $(el).after(this.$el);
        return this;
    }

    appendTo(el) {
        this._beforeInsert();
        $(el).append(this.$el);
        return this;
    }

    _beforeInsert() {
        if (typeof this.afterInsert !== 'function') {
            return;
        }
        let el = this.$el[0];
        afterDOMInsert(el, () => this.afterInsert());
    }

}

export { AbstractWidget }