# Pixel Art Maker


In its [basic version](https://github.com/IlianIliev/pixel-art-maker/releases/tag/base-version)
the script was hard to reuse due to the use of fixed IDs. 

This is solved in the current one, and you can have multiple independent editors on the page at the same time. Also the code was refactored to use a class for creating the editor.
The tricky part here is passing the correct context of the event handlers, so it preserves access to the object and the respectful container. For this reason I am using the `jQuery.proxy` method to replace the handler context so this is the editor instance.

The HTML is easy customizable and the only requirement is that the editor container contains the following 5 elements with the set class names. Example usage:

    <div id="container-id">
        <input type="number" class="width-control" name="width" value="5">
        <input type="number" class="height-control" name="height" value="5">
        <input type="color" name="color" class="color-control" value="#000000">
        
        <button class="undo">Undo</button>
        <button class="redo">Redo</button>
        
        <button class="resize-button">Resize grid</button>
        <div class="grid">
            <!-- The grid will be drawn here -->
        </div>
    </div>
    
    
In addition you can add the optional Undo/Redo buttons in the container.
    
    <button class="undo">Undo</button>
    <button class="redo">Redo</button>  
