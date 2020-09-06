

let assets_data_array = []

// load assets 
const assets_data = (assets) => {


    assets.forEach(asset => {
        assets_data_array.push(asset)
        console.log(asset);

        html = `<div class="dropdown_content_style">
        <a  class="dropdown-item" name = ${asset.name} href = "#" >${asset.name}</a>
        <img class = "bin_img" src="./assets/bin_red.svg" onclick="DELETE_asset(this)" id=${asset._id} name=${asset.name}> 
        </div> `
        $("#assets_dropdown_all").append(html)


        if (asset.author == sessionStorage.getItem('name')) {
            $('#assets_dropdown_user').append(html)
        }

    })
}

const DELETE_asset = (e) => {
    console.log(e.id);
    if (confirm(`Do you want to delete ${e.name}`)) {
        asset_DELETE(e.id)

    } else {
        null
    }




}



const canvas = new fabric.Canvas('rect')
let defalut_color = '#272838'
$('.dropdown-toggle').css("background-color", defalut_color);

// load file svg
var loadFile = function (event) {
    var files = event.target.files;
    if (files.length === 0) {
        console.log('No file is selected');
        return;
    }
    var reader = new FileReader();
    reader.onload = function (event) {
        // console.log('File content:', event.target.result);
        load_svg(event.target.result)

    };
    reader.readAsText(files[0]);
};


//#region add objects functions

const load_svg = (svg_code) => {
    let svg
    svg = new String(svg_code)
    fabric.loadSVGFromString(svg, function (objects, options) {
        var obj = fabric.util.groupSVGElements(objects, options);
        canvas.add(obj).centerObject(obj).renderAll();
        obj.setCoords();
    });

}

const add_Protractor = () => {
    fabric.loadSVGFromURL('assets/Protractor.svg', function (objects, options) {
        var svg = fabric.util.groupSVGElements(objects, options);
        svg.left = 0;
        svg.top = 0;
        svg.scaleToWidth(200);
        svg.scaleToHeight(200);
        canvas.add(svg);

    });
}
const add_ruler = () => {
    fabric.loadSVGFromURL('assets/ruler.svg', function (objects, options) {
        var svg = fabric.util.groupSVGElements(objects, options);
        svg.left = 50;
        svg.top = 250;
        svg.scaleX = 450 / svg.width;
        svg.scaleY = 60 / svg.height
        canvas.add(svg);

    });

}


const addTriangle = () => {
    var triangle = new fabric.Triangle({
        width: 70, height: 80,
        left: 200,
        top: 200,
        fill: '',
        stroke: defalut_color,
        strokeWidth: 3,
        strokeUniform: true
    });
    canvas.add(triangle)
}
const addCircle = () => {
    var circle = new fabric.Circle({
        radius: 100,
        fill: '',
        originX: 'center',
        originY: 'center',
        left: 250,
        top: 250,
        strokeWidth: 3,
        stroke: 'black',
        strokeUniform: true
    });

    canvas.add(circle)

}
const addRectangle = () => {
    var rect = new fabric.Rect({
        left: 100,
        top: 100,
        width: 100,
        height: 200,
        fill: '',
        angle: 0,
        padding: 10,
        strokeWidth: 3,
        transparentCorners: true,
        stroke: defalut_color,
        strokeUniform: true
    });
    canvas.add(rect);
}

const addText = (text) => {
    canvas.add(new fabric.Text(text, {
        fontFamily: 'test',
        left: 100,
        top: 100,
        fill: defalut_color,
    }));

}
const addLine = () => {
    canvas.add(new fabric.Line([100, 350, 250, 200], {
        strokeWidth: 3,
        stroke: defalut_color,
        strokeUniform: true

    }));

}
const addPoint = (params) => {
    var point = new fabric.Circle({
        left: 100,
        top: 350,
        radius: 8,
        fill: 'green',
        originX: 'center',
        originY: 'center',
        hasControls: false,

    });
    canvas.add(point)

}

let grid_lines = []
const addGrid = () => {

    if (grid_lines.length == 0) {
        for (i = 50; i < 500; i += 50) {
            var hor_line = new fabric.Line([i, 0 + 17, i, 500], {
                strokeWidth: 1,
                stroke: " #0E2F5B",
                "selectable": false,
                "evented": false,
                "hasControl": false

            });
            var grid_text_hor = new fabric.Text(`${i}`, {
                fontFamily: 'Delicious_500',
                left: i - 10,
                top: 2,
                fontSize: 16,
                fill: defalut_color,
            });
            canvas.add(hor_line)
            grid_lines.push(hor_line)

            canvas.add(grid_text_hor)
            grid_lines.push(grid_text_hor)

        }
        for (i = 50; i < 500; i += 50) {
            var ver_line = new fabric.Line([0 + 25, i, 500, i], {
                strokeWidth: 1,
                stroke: " #0E2F5B",
                "selectable": false,
                "evented": false,
                "hasControl": false


            });
            var grid_text_ver = new fabric.Text(`${i}`, {
                fontFamily: 'Delicious_500',
                left: 0,
                top: i - 10,
                fontSize: 16,
                fill: defalut_color,
            });
            canvas.add(ver_line)
            grid_lines.push(ver_line)
            canvas.add(grid_text_ver)
            grid_lines.push(grid_text_ver)

        }
    }
    else {

        grid_lines.forEach(line => {
            canvas.remove(line)
        })
        grid_lines = []
    }
}
const addImage = (image) => {
    fabric.Image.fromURL(image, function (myImg) {
        canvas.add(myImg);
    });
}
const addPolygon = () => {
    var polygon = new fabric.Polygon([
        { x: 200, y: 10 },
        { x: 250, y: 50 },
        { x: 250, y: 100 },
        { x: 150, y: 100 },
        { x: 150, y: 50 }], {
        fill: '',
        strokeWidth: 3,
        stroke: defalut_color
    });
    canvas.add(polygon);

}


let triangle = ''
let angle_of_triangle = ' '
const addPolyline_triangle = (degrees) => {
    const calculate_x = (degrees) => {
        let act_degrees = 180 - (90 + degrees)
        tan_degree = Math.tan(act_degrees * Math.PI / 180);
        return Math.round((250 * tan_degree) + 100)
    }
    // canvas.clear();
    if (triangle != ' ') {
        canvas.remove(triangle);
        canvas.remove(angle_of_triangle);
    }

    console.log(degrees);

    let angle = calculate_x(degrees)

    var triangle_with_angle = new fabric.Polyline([

        {
            x: 400,
            y: 350
        },
        {
            x: 100,
            y: 350
        },
        {
            x: angle,
            y: 100
        },
        {
            x: 400,
            y: 350
        },
    ], {
        fill: '',
        stroke: 'green',
        "selectable": true,
        "evented": false,
        strokeWidth: 2,


    });
    canvas.add(triangle_with_angle);

    var angle_text = new fabric.Text(`${degrees}`, {
        fontFamily: 'Delicious_500',
        left: 120,
        top: 330,
        fill: defalut_color,
        fontSize: 14
    });
    canvas.add(angle_text);
    triangle = triangle_with_angle
    angle_of_triangle = angle_text
}

const add_iso_triangle = (degrees) => {
    const calculate_y = (degrees) => {
        tan_degree = Math.tan(degrees * Math.PI / 180);
        return Math.round((150 * tan_degree))
    }
    let angle = calculate_y(degrees)
    var triangle_with_angle = new fabric.Polyline([


        {
            x: 250,
            y: 350
        },
        {
            x: 100,
            y: 350
        },
        {
            x: 250,
            y: 350 - angle
        },
        {
            x: 400,
            y: 350
        },
        {
            x: 250,
            y: 350
        },
    ], {
        fill: '',
        stroke: 'green',
        "selectable": true,

        strokeWidth: 2,
        strokeUniform: true
    });
    canvas.add(triangle_with_angle);
    var angle_text_left = new fabric.Text(`${degrees}`, {
        fontFamily: 'Delicious_500',
        left: 135,
        top: 350 - 10,
        originX: 'center',
        originY: 'center',
        fill: defalut_color,
        fontSize: 16
    });
    var angle_text_right = new fabric.Text(`${degrees}`, {
        fontFamily: 'Delicious_500',
        left: 400 - 35,
        top: 350 - 10,
        originX: 'center',
        originY: 'center',
        fill: defalut_color,
        fontSize: 16
    });
    canvas.add(angle_text_left)
    canvas.add(angle_text_right)
}
// add_iso_triangle(55)
const semiCircle = () => {
    let elements = []
    var circle = new fabric.Circle({
        radius: 100,
        originX: 'center',
        originY: 'center',
        left: 250,
        top: 250,
        angle: 180,
        startAngle: 0,
        endAngle: Math.PI,
        stroke: '#000',
        strokeWidth: 3,
        fill: '',


    });
    var hor_line = new fabric.Line([149, 250, 351, 250], {
        strokeWidth: 3,
        stroke: " #000",

    });
    elements.push(hor_line)
    elements.push(circle)
    var alltogetherObj = new fabric.Group(elements, {
        top: 250, left: 250,
        originX: 'center',
        originY: 'center',
        lockMovementY: true,
        lockMovementX: true,
    });
    canvas.add(alltogetherObj)
    canvas.renderAll();
}
//#endregion


//#region  add objects
// add objects 
$('.add-triangle').on('click', () => {
    addTriangle()
})
$('.add-circle').on('click', () => {
    addCircle()
})
$('.add-semicircle').on('click', () => {
    semiCircle()
})
$('.add-rectangle').on('click', () => {
    addRectangle()
})
$('.add-line').on('click', () => {
    addLine()
})
$('.addtext-form').on('submit', (e) => {
    e.preventDefault()
    addText(e.target.addtext.value)
})
$('.add-polygon').on('click', () => {
    addPolygon()
})
$('.add-grid').on('click', () => {
    addGrid()
})
$('.addpoint').on('click', () => {
    addPoint()
})

$('.draw_triangle_with_degrees').on('submit', e => {
    e.preventDefault()
    let angle = parseInt($('#angle').val())
    console.log(angle);
    if (angle) {
        addPolyline_triangle(parseInt(angle))
    } else {
        addPolyline_triangle(60)
    }
})
$('.draw_isosceles_triangle').on('submit', e => {
    e.preventDefault()
    let angle = parseInt($('#iso-angle').val())
    console.log(typeof (angle));
    if (angle) {
        add_iso_triangle(parseInt(angle))
    } else {
        add_iso_triangle(60)
    }
})



//#endregion



//#region  delete one or multiple objects
$('.delete').on('click', () => {
    var selection = canvas.getActiveObject()
    if (!selection._objects) {
        canvas.remove(selection);
    } else {
        selection._objects.forEach(item => {
            canvas.remove(selection);
            canvas.remove(item);
        })
    }
})
// clear
$('.clear').on('click', () => {
    canvas.clear()
})
//#endregion


//#region  color spectrum
$("#flat").spectrum({
    flat: true,
    showInput: true
});
$("#flatClearable").spectrum({
    flat: true,
    showInput: true,
    allowEmpty: true
});
$("#custom").spectrum({
    color: defalut_color,
    change: (e) => {
        console.log(e.toHexString());
        defalut_color = e.toHexString()
    }
});
//#endregion 


//#region   edit functions for created objects
$(".move_object").on('click', () => {
    var selection = canvas.getActiveObject()
    console.log(selection);
    selection.set({
        hasControls: true,
        evented: true
    });
    canvas.renderAll();
})
$(".fill-color").on('click', () => {
    var selection = canvas.getActiveObject()
    console.log(selection);
    selection.set({
        fill: defalut_color
    });
    canvas.renderAll();
})
$(".remove-border").on('click', () => {
    var selection = canvas.getActiveObject()
    console.log(selection);
    selection.set({
        stroke: ''
    });
    canvas.renderAll();
})
$(".group").on('click', () => {
    var selection = canvas.getActiveObject()
    canvas.getActiveObject().toGroup();
    canvas.requestRenderAll();
})

$(".un-group").on('click', () => {
    var selection = canvas.getActiveObject()
    canvas.getActiveObject().toActiveSelection();
    canvas.requestRenderAll();
})
//#endregion


//#region  download  format and save svg locally

// download as svg

$('.svg').on('click', () => {
    const file_name = ($('#filename').val());

    $('.svg').attr('download', `${file_name}.svg`)
    console.log($('.svg').attr('download', `${file_name}.svg`));

    canvas.discardActiveObject();
    var sel = new fabric.ActiveSelection(canvas.getObjects(), {
        canvas: canvas,
    });
    console.log(sel.aCoords);

    console.log(sel.aCoords.bl.x);

    let x_axis, y_axis, width, height

    x_axis = Math.floor(sel.aCoords.tl.x)
    y_axis = Math.floor(sel.aCoords.tl.y)
    width = Math.floor(sel.aCoords.tr.x - sel.aCoords.tl.x)
    height = Math.floor(sel.aCoords.bl.y - sel.aCoords.tr.y)
    console.log(x_axis, y_axis, width, height);

    canvas.setActiveObject(sel);
    canvas.requestRenderAll();

    fabric.log('Normal SVG output: ', canvas.toSVG());
    var text = canvas.toSVG({
        width: width,
        height: height,
        viewBox: {
            x: x_axis,
            y: y_axis,
            width: width,
            height: height
        }
    });
    console.log(text);

    var data = new Blob([text], { type: 'text/plain' });
    var url = window.URL.createObjectURL(data);
    document.getElementById('download_svg').href = url;

})
// download as json
$('.json').on('click', () => {
    const file_name = ($('#filename').val());

    $('.json').attr('download', `${file_name}.json`)
    var json = JSON.stringify(canvas);
    var data = new Blob([json], { type: 'text/plain' });
    var url = window.URL.createObjectURL(data);
    document.getElementById('download_json').href = url;
})



let objects = []
$('.save').on('click', () => {

    const file_name = $('#local-filename').val()
    console.log(file_name);
    let object = {
        [file_name]: JSON.stringify(canvas)
    }
    objects.push(object)
    console.log(object);
    let html = `<a class="dropdown-item" href="#">${file_name}</a>`
    $('.dropdown-menu').append(html)

})
$('.load').on('click', () => {
    canvas.clear()
    const file_name = $('#local-filename').val()
    console.log(file_name);
    canvas.loadFromJSON(objects[0].sa, function () {
        canvas.renderAll();
        console.log(canvas.item(0).name);
    });

})




$('.download-section .dropdown').on('click', (e) => {
    // console.log(e.target.textContent.trim());
    canvas.clear()
    let filename = e.target.textContent.trim()
    if (filename != "select objects") {
        objects.forEach(object => {
            if (Object.keys(object) == filename) {
                console.log(filename);
                canvas.loadFromJSON(object[filename], function () {


                    canvas.add();
                    console.log(canvas.item(0).name);
                });
            }
        })
    }


})
//#endregion



//#region  grid image svg

const add_grid_lines = () => {
    var rect = new fabric.Rect({
        left: 100,
        top: 200,
        width: 300,
        height: 100,
        fill: '',
        angle: 0,
        padding: 10,
        strokeWidth: 3,
        stroke: defalut_color,
    });
    canvas.add(rect);
    for (i = 150; i < 400; i += 50) {
        var ver_line = new fabric.Line([i, 200, i, 300], {
            strokeWidth: 1,
            stroke: " #0E2F5B",
            "selectable": true,
            "evented": false,
        });
        canvas.add(ver_line)

    }
    var hor_line = new fabric.Line([100, 250, 400, 250], {
        strokeWidth: 1,
        stroke: " #0E2F5B",
        "selectable": true,
        "evented": false,
    });
    canvas.add(hor_line)

}
function drawBoard(image_src, top, bottom) {
    add_grid_lines()
    if (top <= 6 && bottom <= 6) {
        for (let i = 100; i < 100 + (top * 50); i += 50) {
            fabric.loadSVGFromURL(image_src, function (objects, options) {
                var svg = fabric.util.groupSVGElements(objects, options);
                svg.left = i;
                svg.top = 200;
                svg.scaleToWidth(48);
                svg.scaleToHeight(48);
                canvas.add(svg);
            });
        }
        for (let i = 100; i < 100 + (bottom * 50); i += 50) {
            fabric.loadSVGFromURL(image_src, function (objects, options) {
                var svg = fabric.util.groupSVGElements(objects, options);
                svg.left = i;
                svg.top = 250;
                svg.scaleToWidth(50);
                svg.scaleToHeight(50);
                canvas.add(svg);

            });
        }
    }
}



const add_grid_img = (e) => {
    canvas.clear()
    let image = $(e).attr('src').trim()
    console.log(image);
    $('#hen_img').val()
    console.log();
    grid_groupe = []
    if (parseInt($('#top_row_count').val()) > -1 && parseInt($('#bottom_row_count').val()) > -1) {
        drawBoard(image, parseInt($('#top_row_count').val()), parseInt($('#bottom_row_count').val()))
    }
}

// custom  grid image svg

const grid_select = (y, x) => {

    var rect = new fabric.Rect({
        left: 50,
        top: 50,
        width: 50 * x,
        height: 50 * y,
        fill: '',
        angle: 0,
        padding: 10,
        strokeWidth: 3,
        stroke: defalut_color,
    });
    canvas.add(rect);
    let col = 50
    for (let i = 50; i < 50 + (50 * x); i += 50) {
        var ver_line = new fabric.Line([i, 50, i, 50 + (50 * y)], {
            strokeWidth: 1,
            stroke: " #0E2F5B",
            "selectable": true,
            "evented": false,
        });
        canvas.add(ver_line)

    }
    for (i = 50; i < 50 + (50 * y); i += 50) {
        var hor_line = new fabric.Line([50, i, 50 + (50 * x), i], {
            strokeWidth: 1,
            stroke: " #0E2F5B",
            "selectable": true,
            "evented": false,
        });
        canvas.add(hor_line)

    }



}


$('.custom_grid').on('submit', (e) => {
    e.preventDefault()
    const { rows, columns, array_images } = e.target
    // console.log(rows.value, columns.value, array_images.value);

    let row_count = parseInt(rows.value)
    let col_count = parseInt(columns.value)
    let array = array_images.value.split(',')
    array = array.map(Number)
    console.log(row_count, col_count, array);

    grid_select(row_count, col_count)
    array.forEach((num, index) => {

        for (let i = 1; i <= num; i++) {
            fabric.loadSVGFromURL('./assets/hen-svgrepo-com.svg', function (objects, options) {
                var svg = fabric.util.groupSVGElements(objects, options);
                svg.left = (50 * i) + 2;
                svg.top = (50 * (index + 1)) + 2
                svg.scaleToWidth(46);
                svg.scaleToHeight(46);
                canvas.add(svg);
            });
        }

    })

})





//#endregion



//#region  circle with sectors
const circle_with_sectors_options = (constant_angle, degrees, rotation, fill) => {
    X = Math.round(100 * Math.cos(degrees * Math.PI / 180));
    Y = Math.round(100 * Math.sin(degrees * Math.PI / 180));
    let sector_angle = Math.floor(Math.PI * degrees * 2)
    console.log(X, Y, sector_angle);

    var sector = new fabric.Polyline([

        {
            x: 250,
            y: 250
        },
        {
            x: 250 + X,
            y: 250 - Y
        },
    ], {
        fill: '',
        stroke: '#000',
        strokeWidth: 2,
        evented: false
    });

    console.log(degrees);
    var sector_background = arc(250, 250, 99, constant_angle, rotation);
    if (fill) {
        canvas.add(sector_background);
    }
    canvas.add(sector);
}
function arc(left, top, radius, angle, rotate) {
    var coeff = Math.PI / 180;
    var width = 2 * radius * Math.sin((angle / 2) * coeff);
    var height = radius * Math.cos((angle / 2) * coeff);


    var triangle = new fabric.Triangle({
        width: width,
        height: height,
        left: left,
        top: top + width / 2,
        fill: 'rgba(0,200,0,0.5)',
        angle: -90,
        evented: false

    });
    var circle = new fabric.Circle({
        radius: radius,
        fill: 'rgba(0,200,0,0.5)',
        left: left - radius,
        top: top - radius,
        startAngle: - angle * coeff / 2,
        endAngle: angle * coeff / 2,
        angle: 0,
        evented: false
    });
    var group = new fabric.Group([circle, triangle], {
        lockMovementY: true,
        lockMovementX: true,
        top: 250,
        left: 250,
        originX: "center",
        originY: "center",
        angle: rotate,
        evented: false
    });
    return group;
}

const circle_with_sectors = (angle, count, fill) => {
    var circle = new fabric.Circle({
        radius: 100,
        fill: '',
        originX: 'center',
        originY: 'center',
        left: 250,
        top: 250,
        strokeWidth: 3,
        stroke: 'black',
        strokeUniform: true,
        selectable: true,
        evented: false,
    });
    canvas.add(circle)
    stroke_fill_count = parseInt($('#sector_fill_count').val())
    console.log(stroke_fill_count);
    let background = -(angle / 2)
    if (angle <= 180) {
        if (count <= (360 / angle)) {
            for (let i = 1; i <= count; i++) {
                console.log(i * angle, background);
                if (i == stroke_fill_count + 1) {
                    fill = false
                }
                circle_with_sectors_options(angle, i * angle, background, fill)
                background -= angle
            }
        }
    }
}

// circle_with_sectors(30, 12, true)


$('#add_circle_with_sectors').on('click', () => {
    const angle = parseInt($('#sector_angle').val().trim())
    const count = parseInt($('#sector_count').val().trim())
    const fill = $('#circle_sector_fill:checked').length
    circle_with_sectors(angle, count, fill)
})

//#endregion


//#region  3d shapes and custom draw

const cuboid = (params) => {



    var front = new fabric.Polygon([
        { x: 100, y: 250 },
        { x: 300, y: 250 },
        { x: 300, y: 450 },
        { x: 100, y: 450 },
    ], {
        fill: '',
        strokeWidth: 3,
        stroke: defalut_color
    });
    var back = new fabric.Polygon([
        { x: 200, y: 150 },
        { x: 400, y: 150 },
        { x: 400, y: 350 },
        { x: 200, y: 350 },
    ], {
        fill: 'rgba(47, 128, 237, 0.6)',
        strokeWidth: 3,
        stroke: defalut_color
    });
    var left = new fabric.Polygon([
        { x: 200, y: 150 },
        { x: 200, y: 350 },
        { x: 100, y: 450 },
        { x: 100, y: 250 },
    ], {
        fill: '',
        strokeWidth: 3,
        stroke: defalut_color
    });
    var right = new fabric.Polygon([
        { x: 400, y: 150 },
        { x: 400, y: 350 },
        { x: 300, y: 450 },
        { x: 300, y: 250 },
    ], {
        fill: '',
        strokeWidth: 3,
        stroke: defalut_color
    });
    var top = new fabric.Polygon([
        { x: 200, y: 150 },
        { x: 400, y: 150 },
        { x: 300, y: 250 },
        { x: 100, y: 250 },
    ], {
        fill: '',
        strokeWidth: 3,
        stroke: defalut_color
    });
    var bottom = new fabric.Polygon([
        { x: 200, y: 350 },
        { x: 400, y: 350 },
        { x: 300, y: 450 },
        { x: 100, y: 450 },
    ], {
        fill: 'rgba(118, 103, 142, 0.6)',
        strokeWidth: 3,
        stroke: defalut_color
    });


    canvas.add(top);
    canvas.add(bottom);
    canvas.add(front);
    canvas.add(back);
    canvas.add(right);
    canvas.add(left);
}

const cylinder = (params) => {
    var ellipse1 = new fabric.Ellipse({
        top: 100,
        left: 150,
        rx: 100,
        ry: 50,
        fill: 'rgba(118, 103, 142, 1)',
        strokeWidth: 0,
        stroke: defalut_color
    });
    var height = new fabric.Polygon([
        { x: 150, y: 150 },
        { x: 350, y: 150 },
        { x: 350, y: 400 },
        { x: 150, y: 400 },
    ], {
        fill: 'rgba(47, 128, 237, 1)',
        strokeWidth: 0,
        stroke: defalut_color
    });
    var ellipse2 = new fabric.Ellipse({
        top: 350,
        left: 150,
        rx: 100,
        ry: 50,
        fill: 'rgba(118, 103, 142, 1)',
        strokeWidth: 0,
        stroke: defalut_color
    });
    canvas.add(height);

    canvas.add(ellipse1);
    canvas.add(ellipse2);
}


const cone = (params) => {
    var top = new fabric.Polygon([
        { x: 250, y: 150 },
        { x: 350, y: 400 },
        { x: 150, y: 400 },

    ], {
        fill: 'rgba(47, 128, 237, 0.6)',
        strokeWidth: 0,
        stroke: defalut_color
    });



    var ellipse1 = new fabric.Ellipse({
        top: 350,
        left: 150,
        rx: 100,
        ry: 50,
        fill: "rgba(47, 128, 237, 1)",
        strokeWidth: 0,
        stroke: defalut_color
    });

    canvas.add(top);
    canvas.add(ellipse1);




}



const prism = (params) => {
    var front = new fabric.Polygon([
        { x: 150, y: 300 },
        { x: 200, y: 400 },
        { x: 100, y: 400 },

    ], {
        fill: 'rgba(118, 103, 142, 0.5)',
        strokeWidth: 3,
        stroke: defalut_color
    });
    var back = new fabric.Polygon([
        { x: 350, y: 200 },
        { x: 400, y: 300 },
        { x: 300, y: 300 },

    ], {
        fill: 'rgba(118, 103, 142, 0.5)',
        strokeWidth: 3,
        stroke: defalut_color
    });
    var left = new fabric.Polygon([
        { x: 350, y: 200 },
        { x: 300, y: 300 },
        { x: 100, y: 400 },
        { x: 150, y: 300 },

    ], {
        fill: 'rgba(47, 128, 237, 0.3)',
        strokeWidth: 3,
        stroke: defalut_color,
        strokeUniform: true

    });
    var right = new fabric.Polygon([
        { x: 350, y: 200 },
        { x: 400, y: 300 },
        { x: 200, y: 400 },
        { x: 150, y: 300 },

    ], {
        fill: 'rgba(47, 128, 237, 0.3)',
        strokeWidth: 2,
        stroke: defalut_color,
        strokeUniform: true

    });
    var base = new fabric.Polygon([
        { x: 300, y: 300 },
        { x: 400, y: 300 },
        { x: 200, y: 400 },
        { x: 100, y: 400 },

    ], {
        fill: 'rgba(47, 128, 237, 0.3)',
        strokeWidth: 3,
        stroke: defalut_color,
        strokeUniform: true
    });


    // canvas.add(back)
    // canvas.add(left)
    // canvas.add(right)
    // canvas.add(base)
    // canvas.add(front)
    let PRISM = new fabric.Group([back, left, right, base, front])
    canvas.add(PRISM)
}





const custom_boxes = (params) => {

    var poly = new fabric.Polygon([
        { x: 100, y: 100 },
        { x: 150, y: 100 },
        { x: 150, y: 150 },
        { x: 200, y: 150 },
        { x: 200, y: 200 },
        { x: 300, y: 200 },
        { x: 300, y: 250 },
        { x: 100, y: 250 },

    ], {
        fill: 'green',
        strokeWidth: 3,
        stroke: defalut_color
    });
    canvas.add(poly);

}


$('#custom_polygon').on("submit", (e) => {
    e.preventDefault()
    const { custom_polygon_input } = e.target
    console.log(custom_polygon_input.value);
    let points = []
    let values = custom_polygon_input.value.split(' ')
    for (let i = 0; i < values.length; i++) {
        let point = values[i].split(',')
        points.push({ x: parseInt(point[0]), y: parseInt(point[1]) })
    }
    console.log(points);
    var poly = new fabric.Polygon(points, {
        fill: 'green',
        strokeWidth: 3,
        stroke: defalut_color,
        strokeUniform: true
    });
    canvas.add(poly);
})

//#endregion


//#region  custom clock

const analog_clock = (clock_face, hr, minute, second) => {


    const hours = hr * 30
    const minutes = (minute / 5) * 30
    const seconds = (second / 5) * 30

    console.log(hours, minutes);

    var center_dot = new fabric.Circle({
        radius: 10,
        left: 250,
        top: 250,
        fill: defalut_color,
        originX: 'center',
        originY: 'center',
        strokeWidth: 3,
        strokeUniform: true,

    });
    var hours_hand = new fabric.Rect({
        left: 250,
        top: 250,
        width: 5,
        height: 65,
        fill: 'green',
        angle: hours,
        padding: 10,
        strokeWidth: 0,
        transparentCorners: true,
        stroke: defalut_color,
        strokeUniform: true,
        originX: 'center',
        originY: 'bottom',
        rx: 10,
        ry: 10
    });
    var minutes_hand = new fabric.Rect({
        left: 250,
        top: 250,
        width: 5,
        height: 55,
        fill: 'yellow',
        angle: minutes,
        padding: 10,
        strokeWidth: 0,
        transparentCorners: true,
        stroke: defalut_color,
        strokeUniform: true,
        originX: 'center',
        originY: 'bottom',
        rx: 10,
        ry: 10
    });
    var seconds_hand = new fabric.Rect({
        left: 250,
        top: 250,
        width: 4,
        height: 45,
        fill: 'red',
        angle: seconds,
        padding: 10,
        strokeWidth: 0,
        transparentCorners: true,
        stroke: defalut_color,
        strokeUniform: true,
        originX: 'center',
        originY: 'bottom',
        rx: 10,
        ry: 10

    });
    console.log(clock_face);
    fabric.loadSVGFromURL(`${clock_face}`, function (objects, options) {
        var svg = fabric.util.groupSVGElements(objects, options);
        svg.left = 250;
        svg.top = 250;
        svg.originX = 'center',
            svg.originY = 'center',
            svg.scaleToWidth(200);
        svg.scaleToHeight(200);
        var clock
        if ($('#clock_seconds_hand:checked').length) {
            clock = new fabric.Group([svg, hours_hand, minutes_hand, seconds_hand, center_dot])
            canvas.add(clock)


        } else {
            clock = new fabric.Group([svg, hours_hand, minutes_hand, center_dot])
            canvas.add(clock)

        }

    });



}

console.log($('#clock_seconds_hand:checked').length);


$('#custom_clock').on('submit', (e) => {
    e.preventDefault()
    let clock_face = $('input[type="radio"]:checked').val()
    const { custom_clock_input } = e.target
    const time = custom_clock_input.value.split(':')
    analog_clock(clock_face, parseInt(time[0]), parseInt(time[1]), parseInt(time[2]))
    console.log(clock_face);
})

$('#digital_time_btn').on('click', () => {

    const time = $('#digital_clock_time').val()

    var myfont = new FontFaceObserver('test')
    myfont.load().then(() => {

        let time_text = new fabric.Text(time, {

            left: 250,
            top: 250,
            fontSize: 70,
            fontFamily: 'test',
            charSpacing: 100,
            fill: 'red',
            originX: "center",
            originY: "center"
        })

        var rect = new fabric.Rect({
            left: 150,
            top: 200,
            width: 200,
            height: 100,
            fill: '#222',
            angle: 0,
            padding: 10,
            strokeWidth: 3,
            transparentCorners: true,
            stroke: defalut_color,
            strokeUniform: true,
            rx: 10,
            ry: 10
        });

        canvas.add(rect);
        canvas.add(time_text);
    })
})




//#endregion



const resize_SVG = () => {
    canvas.discardActiveObject();
    var sel = new fabric.ActiveSelection(canvas.getObjects(), {
        canvas: canvas,
    });
    let x_axis, y_axis, width, height
    x_axis = Math.floor(sel.aCoords.tl.x)
    y_axis = Math.floor(sel.aCoords.tl.y)
    width = Math.floor(sel.aCoords.tr.x - sel.aCoords.tl.x)
    height = Math.floor(sel.aCoords.bl.y - sel.aCoords.tr.y)
    canvas.setActiveObject(sel);
    canvas.requestRenderAll();
    svg_code = canvas.toSVG({
        width: width,
        height: height,
        viewBox: {
            x: x_axis,
            y: y_axis,
            width: width,
            height: height
        }
    });
    return (svg_code)
}

//#region  saving and retrieving data

$('.save_svg').on('submit', (e) => {
    e.preventDefault()
    let author = sessionStorage.getItem('name')
    let svg_code = resize_SVG()
    const { svg_name, category, tags } = e.target
    let tags_array = tags.value.split(' ')
    console.log(svg_name.value, category.value, tags_array);
    let Asset = {
        session: sessionStorage.getItem('session'),
        asset_data: `${svg_code}`,
        name: svg_name.value.trim(),
        category: category.value.trim(),
        author: author,
        tags: tags_array
    }
    asset_POST(Asset)
    console.log(Asset);
    // update()
})


$('.load_assets_dropDown ').on("click", (e) => {
    console.log(e.target.name);

    const asset = assets_data_array.find(asset => { return asset.name == e.target.name })
    console.log(asset);

    fabric.loadSVGFromString(asset.asset_data, function (objects, options) {
        var obj = fabric.util.groupSVGElements(objects, options);
        canvas.add(obj).centerObject(obj).renderAll();
        obj.setCoords();
    });

    let html = `
    
    <h2 class="p-2">Asset Details</h2>
 <p class="p-2">Author : ${asset.author}</p>
        <p class="p-2">Name : ${asset.name}</p>
        <p class="p-2">Category : ${asset.category}</p>
        <p class="p-2">Tags : ${asset.tags}</p>`

    $('.asset_information').html(html)
})

//#endregion



















