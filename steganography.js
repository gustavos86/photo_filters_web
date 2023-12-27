//
// Run the code here
// https://www.dukelearntoprogram.com/course1/example/index.php
//

function crop(image, width, height) {
    var output = new SimpleImage(width, height);
    for (var pixel of image.values()) {
        var x = pixel.getX();
        var y = pixel.getY();
        if (x < width && y < height) {
            output.setPixel(x, y, pixel);
        }
    }
    
    return output;
}

function chop2hide(image) {
    for (var pixel of image.values()) {
        var red = pixel.getRed();
        var green = pixel.getGreen();
        var blue = pixel.getBlue();

        pixel.setRed(Math.floor(red/16)*16);
        pixel.setGreen(Math.floor(green/16)*16);
        pixel.setBlue(Math.floor(blue/16)*16);
    }
    
    return image;
}

function shift(image) {
    for (var pixel of image.values()) {
        var red = pixel.getRed();
        var green = pixel.getGreen();
        var blue = pixel.getBlue();

        pixel.setRed(red/16);
        pixel.setGreen(green/16);
        pixel.setBlue(blue/16);
    }
    
    return image;
}

function combine(start, hide) {
    var output = new SimpleImage(start.getWidth(), start.getHeight());
    
    for (var pixel of output.values()) {
        var x = pixel.getX();
        var y = pixel.getY();

        var s_pixel = start.getPixel(x, y);
        var h_pixel = hide.getPixel(x, y);
        
        pixel.setRed(s_pixel.getRed() + h_pixel.getRed());
        pixel.setGreen(s_pixel.getGreen() + h_pixel.getGreen());
        pixel.setBlue(s_pixel.getBlue() + h_pixel.getBlue());
    }
    
    return output;
}

function extract(stego) {
    var output = new SimpleImage(stego.getWidth(), stego.getHeight());
    
    for (var pixel of output.values()) {
        var x = pixel.getX();
        var y = pixel.getY();

        var s_pixel = stego.getPixel(x, y);

        pixel.setRed(Math.floor(s_pixel.getRed()%16)*16);
        pixel.setGreen(Math.floor(s_pixel.getGreen()%16)*16);
        pixel.setBlue(Math.floor(s_pixel.getBlue()%16)*16);
    }
    
    return output;
}

function newpv(p, q) {
    var answer = p + q;
    if (answer > 255) {
        print("error: value is too big!");
    }
    return answer;
}

var start = new SimpleImage("usain.jpg");
var hide = new SimpleImage("skyline.jpg");

start = chop2hide(start);
hide = shift(hide);

var stego = combine(start,hide);
print(stego);

var extracted = extract(stego);
print(extracted);