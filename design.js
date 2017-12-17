let grid = {
    draw: function(height, width) {
        let table = $('<table/>');
        for (let row_num=0; row_num<height; row_num++) {
            let row = $('<tr/>');
            for (col_num=0; col_num<width; col_num++) {
                row.append($('<td/>'));
            }
            table.append(row);
        }
        $('#grid').html(table);
    },
    paintCell: function(e) {
        $(e.target).css('background', $('#color').val());
    }
};

let makeGrid = function(){
    let width = parseInt($('#width').val(), 10);
    let height = parseInt($('#height').val(), 10);
    $('button[name="grid_button"]').on('click', makeGrid);
    $('#grid').on('click', 'td', grid.paintCell)
    grid.draw(height, width);
}


$(function(){
    // Initializing the grid
    makeGrid();
})
