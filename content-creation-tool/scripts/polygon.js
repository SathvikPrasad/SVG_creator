//#region  non_exp_polygons
let points = []

function makeCircle(left, top, line1, line2, line3, line4) {
    var c = new fabric.Circle({
        left: left,
        top: top,
        strokeWidth: 12,
        radius: 4,
        padding: 20,
        fill: '#45188E',
        stroke: 'rgba(118, 103, 142, 0.3)',
        originX: 'center',
        originY: 'center',

    });
    c.hasControls = c.hasBorders = false;

    c.line1 = line1;
    c.line2 = line2;
    c.line3 = line3;
    c.line4 = line4;

    points.push(c)
    return c;
}
function makeLine(coords) {
    return new fabric.Line(coords, {
        stroke: ' #76678E',
        strokeWidth: 3,
        lockMovementX: true,
        lockMovementY: true,
        selectable: true,
        evented: false,
    });
}

canvas.on('object:moved', (e) => {

    console.log(e.target.id);

    let guide_x = $('#guid_x:checked').length
    let guide_y = $('#guid_y:checked').length
    let left_offset = guide_x ? Math.round(e.target.left / 50) * 50 - Math.round(e.target.left) : 0
    let top_offset = guide_y ? Math.round(e.target.top / 50) * 50 - Math.round(e.target.top) : 0
    var p = e.target;
    p.line1 && p.line1.set({ 'x2': p.left + (left_offset), 'y2': p.top + (top_offset) });
    p.line2 && p.line2.set({ 'x1': p.left + (left_offset), 'y1': p.top + (top_offset) });
    p.line3 && p.line3.set({ 'x1': p.left + (left_offset), 'y1': p.top + (top_offset) });
    p.line4 && p.line4.set({ 'x1': p.left + (left_offset), 'y1': p.top + (top_offset) });
    console.log(e.target.set({ left: e.target.left + (left_offset), top: e.target.top + (top_offset) }));
    canvas.renderAll();

})



const pentagon = () => {

    var line = makeLine([250, 200, 350, 250]),
        line2 = makeLine([350, 250, 300, 400]),
        line3 = makeLine([300, 400, 200, 400]),
        line4 = makeLine([200, 400, 150, 250]),
        line5 = makeLine([150, 250, 250, 200])

    canvas.add(line, line2, line3, line4, line5);

    canvas.add(
        makeCircle(line.get('x2'), line.get('y2'), line, line2,),
        makeCircle(line2.get('x2'), line2.get('y2'), line2, line3),
        makeCircle(line3.get('x2'), line3.get('y2'), line3, line4),
        makeCircle(line4.get('x2'), line4.get('y2'), line4, line5),
        makeCircle(line5.get('x2'), line5.get('y2'), line5, line),
    );

    canvas.on('object:moving', function (e) {
        var p = e.target;
        p.line1 && p.line1.set({ 'x2': p.left, 'y2': p.top });
        p.line2 && p.line2.set({ 'x1': p.left, 'y1': p.top });
        p.line3 && p.line3.set({ 'x1': p.left, 'y1': p.top });
        p.line4 && p.line4.set({ 'x1': p.left, 'y1': p.top });
        canvas.renderAll();
    });


}


const hexagon = () => {

    var line = makeLine([150, 200, 300, 200]),
        line2 = makeLine([300, 200, 350, 250]),
        line3 = makeLine([350, 250, 300, 300]),
        line4 = makeLine([300, 300, 150, 300]),
        line5 = makeLine([150, 300, 100, 250]),
        line6 = makeLine([100, 250, 150, 200]);

    canvas.add(line, line2, line3, line4, line5, line6);

    canvas.add(
        makeCircle(line.get('x2'), line.get('y2'), line, line2,),
        makeCircle(line2.get('x2'), line2.get('y2'), line2, line3),
        makeCircle(line3.get('x2'), line3.get('y2'), line3, line4),
        makeCircle(line4.get('x2'), line4.get('y2'), line4, line5),
        makeCircle(line5.get('x2'), line5.get('y2'), line5, line6),
        makeCircle(line6.get('x2'), line6.get('y2'), line6, line)
    );

    canvas.on('object:moving', function (e) {
        var p = e.target;
        p.line1 && p.line1.set({ 'x2': p.left, 'y2': p.top });
        p.line2 && p.line2.set({ 'x1': p.left, 'y1': p.top });
        p.line3 && p.line3.set({ 'x1': p.left, 'y1': p.top });
        p.line4 && p.line4.set({ 'x1': p.left, 'y1': p.top });
        canvas.renderAll();
    });

}


const heptagon = () => {


    var line = makeLine([250, 200, 350, 250]),
        line2 = makeLine([350, 250, 350, 350]),
        line3 = makeLine([350, 350, 300, 400]),
        line4 = makeLine([300, 400, 200, 400]),
        line5 = makeLine([200, 400, 150, 350]),
        line6 = makeLine([150, 350, 150, 250]),
        line7 = makeLine([150, 250, 250, 200]);

    canvas.add(line, line2, line3, line4, line5, line6, line7);

    canvas.add(
        makeCircle(line.get('x2'), line.get('y2'), line, line2,),
        makeCircle(line2.get('x2'), line2.get('y2'), line2, line3),
        makeCircle(line3.get('x2'), line3.get('y2'), line3, line4),
        makeCircle(line4.get('x2'), line4.get('y2'), line4, line5),
        makeCircle(line5.get('x2'), line5.get('y2'), line5, line6),
        makeCircle(line6.get('x2'), line6.get('y2'), line6, line7),
        makeCircle(line7.get('x2'), line7.get('y2'), line7, line)
    );

    canvas.on('object:moving', function (e) {
        var p = e.target;
        p.line1 && p.line1.set({ 'x2': p.left, 'y2': p.top });
        p.line2 && p.line2.set({ 'x1': p.left, 'y1': p.top });
        p.line3 && p.line3.set({ 'x1': p.left, 'y1': p.top });
        p.line4 && p.line4.set({ 'x1': p.left, 'y1': p.top });
        canvas.renderAll();
    });
}


const octagon = () => {



    var line = makeLine([200, 200, 300, 200]),
        line2 = makeLine([300, 200, 350, 250]),
        line3 = makeLine([350, 250, 350, 350]),
        line4 = makeLine([350, 350, 300, 400]),
        line5 = makeLine([300, 400, 200, 400]),
        line6 = makeLine([200, 400, 150, 350]),
        line7 = makeLine([150, 350, 150, 250]),
        line8 = makeLine([150, 250, 200, 200]);

    canvas.add(line, line2, line3, line4, line5, line6, line7, line8);

    canvas.add(
        makeCircle(line.get('x2'), line.get('y2'), line, line2,),
        makeCircle(line2.get('x2'), line2.get('y2'), line2, line3),
        makeCircle(line3.get('x2'), line3.get('y2'), line3, line4),
        makeCircle(line4.get('x2'), line4.get('y2'), line4, line5),
        makeCircle(line5.get('x2'), line5.get('y2'), line5, line6),
        makeCircle(line6.get('x2'), line6.get('y2'), line6, line7),
        makeCircle(line7.get('x2'), line7.get('y2'), line7, line8),
        makeCircle(line8.get('x2'), line8.get('y2'), line8, line)
    );

    canvas.on('object:moving', function (e) {
        var p = e.target;
        p.line1 && p.line1.set({ 'x2': p.left, 'y2': p.top });
        p.line2 && p.line2.set({ 'x1': p.left, 'y1': p.top });
        p.line3 && p.line3.set({ 'x1': p.left, 'y1': p.top });
        p.line4 && p.line4.set({ 'x1': p.left, 'y1': p.top });
        canvas.renderAll();
    });


}



//#endregion





//#region  exp-pentagon
let exp_points = []

function exp_makeCircle(left, top, id, line1, line2, line3, line4) {
    var c = new fabric.Circle({
        left: left,
        top: top,
        strokeWidth: 12,
        radius: 4,
        padding: 20,
        fill: '#45188E',
        stroke: 'rgba(118, 103, 142, 0.3)',
        originX: 'center',
        originY: 'center',
        id: id

    });
    c.hasControls = c.hasBorders = false;

    c.line1 = line1;
    c.line2 = line2;
    c.line3 = line3;
    c.line4 = line4;

    exp_points.push(c)
    return c;
}
function exp_makeLine(coords) {
    return new fabric.Line(coords, {
        fill: ' #2F80ED',
        stroke: ' #76678E',
        strokeWidth: 3,
        lockMovementX: true,
        lockMovementY: true,
        evented: false,
    });
}




const exp_pentagon = () => {
    addGrid()
    $('#guid_x').attr('checked', 'checked')
    $('#guid_y').attr('checked', 'checked')


    var line = exp_makeLine([250, 200, 350, 250]),
        line2 = exp_makeLine([350, 250, 300, 400]),
        line3 = exp_makeLine([300, 400, 200, 400]),
        line4 = exp_makeLine([200, 400, 150, 250]),
        line5 = exp_makeLine([150, 250, 250, 200])


    canvas.add(line, line2, line3, line4, line5);

    canvas.add(
        exp_makeCircle(line.get('x2'), line.get('y2'), "c1", line, line2),
        exp_makeCircle(line2.get('x2'), line2.get('y2'), "c2", line2, line3),
        exp_makeCircle(line3.get('x2'), line3.get('y2'), "c3", line3, line4),
        exp_makeCircle(line4.get('x2'), line4.get('y2'), "c4", line4, line5),
        exp_makeCircle(line5.get('x2'), line5.get('y2'), "c5", line5, line),
    );

    canvas.on('object:moving', function (e) {
        var p = e.target;
        p.line1 && p.line1.set({ 'x2': p.left, 'y2': p.top });
        p.line2 && p.line2.set({ 'x1': p.left, 'y1': p.top });
        p.line3 && p.line3.set({ 'x1': p.left, 'y1': p.top });
        p.line4 && p.line4.set({ 'x1': p.left, 'y1': p.top });

        console.log(p);
        if (a_1)
            update_angles()
        canvas.renderAll();
    });


    const update_angles = () => {
        exp_points.forEach(e => {
            if (e.id == 'c1') {
                calc_angle_a1(Math.round(e.left), Math.round(e.top))
            }
            if (e.id == 'c2') {
                calc_angle_a2(Math.round(e.left), Math.round(e.top))
            }
            if (e.id == 'c3') {
                calc_angle_a3(Math.round(e.left), Math.round(e.top))
            }
            if (e.id == 'c4') {
                calc_angle_a4(Math.round(e.left), Math.round(e.top))
            }
            if (e.id == 'c5') {
                calc_angle_a5(Math.round(e.left), Math.round(e.top))
            }
        })
    }

    canvas.on('object:moved', (e) => {
        exp_points.forEach(point => {
            if (point.id == "c1") {
                a_1 = Math.round(point.left)
                b_1 = Math.round(point.top)
            }
            if (point.id == 'c2') {
                a_2 = Math.round(point.left)
                b_2 = Math.round(point.top)
            }
            if (point.id == "c3") {
                a_3 = Math.round(point.left)
                b_3 = Math.round(point.top)
            }
            if (point.id == "c4") {
                a_4 = Math.round(point.left)
                b_4 = Math.round(point.top)
            }
            if (point.id == "c5") {
                a_5 = Math.round(point.left)
                b_5 = Math.round(point.top)
            }
        })
        update_angles()
        canvas.renderAll();
    })
}
let a_1, b_1, a_2, b_2, a_3, b_3, a_4, b_4, a_5, b_5
let angle_text_a1
const calc_angle_a1 = (x, y) => {
    canvas.remove(angle_text_a1)
    angle_text_a1 = pentagon_calculate_angle(x, y, a_5, b_5, a_2, b_2, -30, 0, angle_text_a1)
}
let angle_text_a2
const calc_angle_a2 = (x, y) => {
    canvas.remove(angle_text_a2)
    angle_text_a2 = pentagon_calculate_angle(x, y, a_1, b_1, a_3, b_3, -30, -20, angle_text_a2)
}
let angle_text_a3
const calc_angle_a3 = (x, y) => {
    canvas.remove(angle_text_a3)
    angle_text_a3 = pentagon_calculate_angle(x, y, a_2, b_2, a_4, b_4, 10, -20, angle_text_a2)
}
let angle_text_a4
const calc_angle_a4 = (x, y) => {
    canvas.remove(angle_text_a4)
    angle_text_a4 = pentagon_calculate_angle(x, y, a_3, b_3, a_5, b_5, 20, -5, angle_text_a2)
}
let angle_text_a5
const calc_angle_a5 = (x, y) => {
    canvas.remove(angle_text_a5)
    angle_text_a5 = pentagon_calculate_angle(x, y, a_4, b_4, a_1, b_1, -5, 15, angle_text_a2)
}
const pentagon_calculate_angle = (x, y, x1, y1, x2, y2, x_offset, y_offset, angle_text) => {
    let a1, b1, a2, b2, a3, b3, aA
    a1 = x1
    b1 = y1
    a2 = x
    b2 = y
    a3 = x2
    b3 = y2
    let dA = Math.sqrt(((a3 - a2) * (a3 - a2) + (b3 - b2) * (b3 - b2)))
    let dB = Math.sqrt(((a3 - a1) * (a3 - a1) + (b3 - b1) * (b3 - b1)))
    let dC = Math.sqrt(((a2 - a1) * (a2 - a1) + (b2 - b1) * (b2 - b1)))
    aA = Math.round(Math.acos(((dB * dB) + (dC * dC) - (dA * dA)) / (2 * dB * dC)) * (180 / Math.PI))
    aB = Math.round(Math.acos(((dA * dA) + (dC * dC) - (dB * dB)) / (2 * dA * dC)) * (180 / Math.PI))
    aC = Math.round(Math.acos(((dA * dA) + (dB * dB) - (dC * dC)) / (2 * dB * dA)) * (180 / Math.PI))
    angle_text = new fabric.Text(`${aB}`, {
        fontFamily: 'Delicious_500',
        left: x + (x_offset),
        top: y + (y_offset),
        fill: defalut_color,
        fontSize: 18,
    });
    canvas.add(angle_text)
    return angle_text
}

//#endregion



// addGrid()

const pol_exp = () => {


    let num = 5
    for (let i = 0; i <= num; i++) {

        var line = makeLine([250, 200, 350, 250]);

        canvas.add(line)
    }
    // canvas.add(line, line2, line3, line4, line5);

    // canvas.add(
    //     makeCircle(line.get('x2'), line.get('y2'), line, line2,),
    //     makeCircle(line2.get('x2'), line2.get('y2'), line2, line3),
    //     makeCircle(line3.get('x2'), line3.get('y2'), line3, line4),
    //     makeCircle(line4.get('x2'), line4.get('y2'), line4, line5),
    //     makeCircle(line5.get('x2'), line5.get('y2'), line5, line),
    // );

    // canvas.on('object:moving', function (e) {
    //     var p = e.target;
    //     p.line1 && p.line1.set({ 'x2': p.left, 'y2': p.top });
    //     p.line2 && p.line2.set({ 'x1': p.left, 'y1': p.top });
    //     p.line3 && p.line3.set({ 'x1': p.left, 'y1': p.top });
    //     p.line4 && p.line4.set({ 'x1': p.left, 'y1': p.top });
    //     canvas.renderAll();
    // });



}
// pol_exp()


