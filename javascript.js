var image_original = null;
var image_grayscale = null;
var image_red = null;
var image_blackwindow = null;
var image_rainbow = null;
var image_custom_color = null;
var image_blur = null;

var fgImage = null;
var bgImage = null;

function upload() {
    var fileinput = document.getElementById("finput");
    image_original = new SimpleImage(fileinput);
    image_grayscale = new SimpleImage(fileinput);
    image_red = new SimpleImage(fileinput);
    image_blackwindow = new SimpleImage(fileinput);
    image_rainbow = new SimpleImage(fileinput);
    image_custom_color = new SimpleImage(fileinput);
    image_blur = new SimpleImage(fileinput);

    var imgcanvas = document.getElementById("canvas_left");
    image_original.drawTo(imgcanvas);
}

function imageIsLoaded(image_name) {
    if (image_name == null || ! image_name.complete()) {
        alert("image not loaded");
        return false;
    }
    else {
        return true;
    }
}

function filterGray() {
    for (var pixel of image_grayscale.values()) {
        var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
        pixel.setRed(avg);
        pixel.setGreen(avg);
        pixel.setBlue(avg);
    }
}

function makeGray() {
    if ( imageIsLoaded(image_grayscale) ) {  // check if image is loaded
        filterGray();	                     // function performs the grayscale work

        var canvas = document.getElementById("canvas_right");
        image_grayscale.drawTo(canvas);	     // display image
    }
}

function filterRed() {
    for (var pixel of image_red.values()) {
        var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
        if (avg < 128) {
            pixel.setRed(avg * 2);
            pixel.setGreen(0);
            pixel.setBlue(0);
        }
        else {
            pixel.setRed(255);
            pixel.setGreen((avg * 2) - 255);
            pixel.setBlue((avg * 2) - 255);
        }
    }
}

function makeRed() {
        if ( imageIsLoaded(image_red) ) {  // check if image is loaded
        filterRed();	                   // function performs the grayscale work

        var canvas = document.getElementById("canvas_right");
        image_red.drawTo(canvas);	       // display image
    }
}

function make_pixel_black(pixel) {
    pixel.setRed(0);
    pixel.setGreen(0);
    pixel.setBlue(0);
}

function filterBlackWindow() {
    var width  = image_blackwindow.getWidth();
    var height = image_blackwindow.getHeight();

    var border_threshold = 30;

    for (var pixel of image_blackwindow.values()) {
        // left & right borders
        if ( pixel.getX() <=  border_threshold ||  width - pixel.getX() <= border_threshold ) {
            make_pixel_black(pixel);
        }
        // top & bottom borders
        if ( pixel.getY() <=  border_threshold ||  height - pixel.getY() <= border_threshold ) {
            make_pixel_black(pixel);
        }
        // vertical middle line |
        if ( pixel.getX() > (width / 2) - (border_threshold / 2) && pixel.getX() <= width / 2 ) {
            make_pixel_black(pixel);
        }
        if ( pixel.getX() >= (width / 2) && pixel.getX() <= (width / 2) + border_threshold ) {
            make_pixel_black(pixel);
        }
        // horizontal middle line --
        if ( pixel.getY() > (height / 2) - (border_threshold / 2) && pixel.getY() <= height / 2 ) {
            make_pixel_black(pixel);
        }
        if ( pixel.getY() >= (height / 2) && pixel.getY() <= (height / 2) + border_threshold ) {
            make_pixel_black(pixel);
        }
    }
}

function makeBlackWindow() {
    if ( imageIsLoaded(image_blackwindow) ) {  // check if image is loaded
        filterBlackWindow();	               // function performs the grayscale work

        var canvas = document.getElementById("canvas_right");
        image_blackwindow.drawTo(canvas);	   // display image
    }
}

function pixelRedForRainbow(pixel) {
    var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
    if (avg < 128) {
        pixel.setRed(2*avg);
        pixel.setGreen(0);
        pixel.setBlue(0);
    }
    else {
        pixel.setRed(255);
        pixel.setGreen((2*avg) - 255);
        pixel.setBlue((2*avg) - 255);
    }
}

function pixelOrangeForRainbow(pixel) {
    var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
    if (avg < 128) {
        pixel.setRed(2*avg);
        pixel.setGreen(0.8*avg);
        pixel.setBlue(0);
    }
    else {
        pixel.setRed(255);
        pixel.setGreen((1.2*avg) - 51);
        pixel.setBlue((2*avg) - 255);
    }
}

function pixelYellowForRainbow(pixel) {
    var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
    if (avg < 128) {
        pixel.setRed(2*avg);
        pixel.setGreen(2*avg);
        pixel.setBlue(0);
    }
    else {
        pixel.setRed(255);
        pixel.setGreen(255);
        pixel.setBlue((2*avg) - 255);
    }
}

function pixelGreenForRainbow(pixel) {
    var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
    if (avg < 128) {
        pixel.setRed(0);
        pixel.setGreen(2*avg);
        pixel.setBlue(0);
    }
    else {
        pixel.setRed((2*avg) - 255);
        pixel.setGreen(255);
        pixel.setBlue((2*avg) - 255);
    }
}

function pixelBlueForRainbow(pixel) {
    var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
    if (avg < 128) {
        pixel.setRed(0);
        pixel.setGreen(0);
        pixel.setBlue(2*avg);
    }
    else {
        pixel.setRed((2*avg) - 255);
        pixel.setGreen((2*avg) - 255);
        pixel.setBlue(255);
    }
}

function pixelIndigoForRainbow(pixel) {
    var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
    if (avg < 128) {
        pixel.setRed(0.8*avg);
        pixel.setGreen(0);
        pixel.setBlue(2*avg);
    }
    else {
        pixel.setRed((1.2*avg) - 51);
        pixel.setGreen((2*avg) - 255);
        pixel.setBlue(255);
    }
}

function pixelVioletForRainbow(pixel) {
    var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
    if (avg < 128) {
        pixel.setRed(1.6*avg);
        pixel.setGreen(0);
        pixel.setBlue(1.6*avg);
    }
    else {
        pixel.setRed((0.4*avg) + 153);
        pixel.setGreen((2*avg) - 255);
        pixel.setBlue((0.4*avg) + 153);
    }
}

function filterRainbow() {
    var height = image_rainbow.getHeight();

    for (var pixel of image_rainbow.values()) {
        // filter red
        if ( pixel.getY() <= height / 7 ) {
            pixelRedForRainbow(pixel);
        }
        // filter orange
        else if ( pixel.getY() < (height / 7) * 2) {
            pixelOrangeForRainbow(pixel);
        }
        // filter yellow
        else if ( pixel.getY() < (height / 7) * 3) {
            pixelYellowForRainbow(pixel);
        }
        // filter green
        else if ( pixel.getY() < (height / 7) * 4) {
            pixelGreenForRainbow(pixel);
        }
        // filter blue
        else if ( pixel.getY() < (height / 7) * 5) {
            pixelBlueForRainbow(pixel);
        }
        // filter indigo
        else if ( pixel.getY() < (height / 7) * 6) {
            pixelIndigoForRainbow(pixel);
        }
        // filter violet
        else {
            pixelVioletForRainbow(pixel);
        }
    }
}

function makeRainbow() {
    if ( imageIsLoaded(image_rainbow) ) {  // check if image is loaded
        filterRainbow();	               // function performs the grayscale work

        var canvas = document.getElementById("canvas_right");
        image_rainbow.drawTo(canvas);	   // display image
    }
}

function makeColor(color) {
    if ( imageIsLoaded(image_custom_color) ) {  // check if image is loaded
        // convert hex string to rgb ints
        // Example:
        //     #0a0a0a to red = 10, green = 10, blue = 10
        var red   = parseInt(color[1] + color[2], 16);
        var green = parseInt(color[3] + color[4], 16);
        var blue  = parseInt(color[5] + color[6], 16);
  
        for (var pixel of image_custom_color.values()) {
            var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;

            if (avg < 128) {
                pixel.setRed(red/(127.5*avg));
                pixel.setGreen(green/(127.5*avg));
                pixel.setBlue(blue/(127.5*avg));
            }
            else {
                pixel.setRed((2 - red/127.5)*avg + 2*red - 255);
                pixel.setGreen((2 - green/127.5)*avg + 2*green - 255);
                pixel.setBlue((2 - blue/127.5)*avg + 2*blue - 255);
            }
        }
        var canvas = document.getElementById("canvas_right");
        image_custom_color.drawTo(canvas);	   // display image

        image_custom_color = new SimpleImage(image_original);  
    }
}

function makeBlur() {
    var pixels_away = 10;
    var img_width = image_original.getWidth();
    var img_height = image_original.getHeight();

    for (var pixel of image_original.values()) {
        var x = pixel.getX();
        var y = pixel.getY();

        // get random pixel x, y coordinates
        do {
            var random_x = Math.floor(Math.random() * pixels_away) + 1;
            random_x *= Math.random() < 0.5 ? -1 : 1;  // To get a positive or negative number
            var new_x = x + random_x;

            var random_y = Math.floor(Math.random() * pixels_away) + 1;
            random_y *= Math.random() < 0.5 ? -1 : 1;  // To get a positive or negative number
            var new_y = y + random_y;
 
        } while (new_x < 0 || new_y < 0 || new_x > img_width - 1 || new_y > img_height - 1); // while not out of boundary

        var new_pixel = image_original.getPixel(new_x, new_y);
        image_blur.setPixel(pixel.getX(), pixel.getY(), new_pixel);
    }

    var canvas = document.getElementById("canvas_right");
    image_blur.drawTo(canvas);	   // display image
}

// 2nd part

function loadForegroundImage() {
    var fileinput = document.getElementById("loadForegroundImageButton");
    fgImage = new SimpleImage(fileinput);

    var imgcanvas = document.getElementById("canvas_left");
    fgImage.drawTo(imgcanvas);
}

function loadBackgroundImage() {
    var fileinput = document.getElementById("loadBackgroundImageButton");
    bgImage = new SimpleImage(fileinput);

    var imgcanvas = document.getElementById("canvas_right");
    bgImage.drawTo(imgcanvas);
}

function doGreenScreen() {
    if (fgImage == null || ! fgImage.complete()) {
        alert("foreground not loaded");
        return;
    }
    if (bgImage == null || ! bgImage.complete()) {
        alert("background not loaded");
    }

    var output = new SimpleImage(fgImage.getWidth(), fgImage.getHeight());

    var greenThreshold = 240;
    for (var pixel of fgImage.values()) {
        var x = pixel.getX();
        var y = pixel.getY();
        if (pixel.getGreen() > greenThreshold) {
            var bgPixel = bgImage.getPixel(x, y);
            output.setPixel(x, y, bgPixel);
        }
        else {
            output.setPixel(x, y, pixel);
        }
    }

    // clear both canvas
    clearCanvas();

    // printing to left canvas
    var cavas_left = document.getElementById("canvas_left");
    output.drawTo(cavas_left);
}

function clearCanvas() {
    // Reset Global variables
    image_original = null;
    image_grayscale = null;
    image_red = null;
    image_blackwindow = null;
    image_rainbow = null;
    image_custom_color = null;
    image_blur = null;

    fgImage = null;
    bgImage = null;

    // Reset "Choose Files" buttons to "No file chosen"
    document.getElementById('finput').value= null;

    document.getElementById('loadForegroundImageButton').value= null;
    document.getElementById('loadBackgroundImageButton').value= null;

    // Reset Canvas content
    var canvas_left = document.getElementById("canvas_left");
    var context_left = canvas_left.getContext("2d");
    context_left.clearRect(0, 0, canvas_left.width, canvas_left.height);

    var canvas_right = document.getElementById("canvas_right");
    var context_right = canvas_right.getContext("2d");
    context_right.clearRect(0, 0, canvas_right.width, canvas_right.height);
}