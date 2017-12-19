class PixelArtEditor {
    constructor(container){
        this.container = container;

        this.container.find('.resize-button').on('click', $.proxy(this.resizeGrid, this));
        this.container.find('.undo').on('click', $.proxy(this.undoHistory, this));
        this.container.find('.redo').on('click', $.proxy(this.redoHistory, this));
        this.container.on('click', '.grid table td', $.proxy(this.cellClickHandler, this));

        this.history = {
            'pos': 0,
            'steps': []
        };
        this.resizeGrid();
    }

    getColor() {
        return this.container.find('.color-control').val();
    }

    getSize() {
        let width = parseInt(this.container.find('.width-control').val(), 10);
        let height = parseInt(this.container.find('.height-control').val(), 10);
        return [height, width];
    }

    resizeGrid() {
        this.draw(this.getSize());
    }

    draw(size) {
        let table = $('<table/>');
        for (let row_num=0; row_num<size[0]; row_num++) {
            let row = $('<tr/>');
            for (let col_num=0; col_num<size[1]; col_num++) {
                row.append($('<td/>'));
            }
            table.append(row);
        }
        this.container.find('.grid').html(table);
    }

    addToHistory(cell, oldColor, newColor) {
        // We are using splice to remove the extra elements (e.g. if we have hit undo) and then made a change
        // otherwise we can get into an inconsistent state where we have a mix a new and old steps
        this.history.steps.splice(this.history.pos);
        this.history.steps.push({
            'cell': cell,
            'oldColor': oldColor,
            'newColor': newColor
        });
        this.history.pos++;

    }

    undoHistory() {
        if (this.history.pos > 0) {
            let step = this.history.steps[this.history.pos - 1];
            this.history.pos--;
            this.paintCell(step.cell, step.oldColor);
        }
    }

    redoHistory() {
        let step = this.history.steps[this.history.pos];
        if (step !== undefined) {
            this.history.pos++;
            this.paintCell(step.cell, step.newColor);
        }
    }

    paintCell(cell, color) {
        $(cell).css('background', color);
    }

    cellClickHandler(e) {
        let color = this.getColor();
        this.addToHistory(e.target, $(e.target).css('background'), color);
        this.paintCell(e.target, color)
    }
}
