class PixelArtEditor {
    constructor(container){
        this.container = container;
        this.container.find('.resize-button').on('click', $.proxy(this.resizeGrid, this));
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

        table.on('click', 'td', $.proxy(this.paintCell, this));
    }

    paintCell(e) {
        $(e.target).css('background', this.getColor());
    }
};
