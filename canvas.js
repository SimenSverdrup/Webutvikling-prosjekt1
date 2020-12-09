let canvasRectangle = {
    topLeftCornerX: 0,
    topLeftCornerY: 0,
    height: 352,
    length: 402,
    draw: function () {
        ctx.fillStyle = "rgb(255, 255, 255)";
        ctx.fillRect(this.topLeftCornerX, this.topLeftCornerY, this.length, this.height);
    }
};

let rectangle = {
    topLeftCornerX: 1,
    topLeftCornerY: 1,
    height: 175,
    length: 200,
    draw: function () {
        let gradientRect = ctx.createLinearGradient(
            this.topLeftCornerX,
            this.topLeftCornerY,
            this.topLeftCornerX + this.length,
            this.topLeftCornerY + this.height);
        gradientRect.addColorStop(0, "rgb(255,255,0)");
        gradientRect.addColorStop(1, "rgb(255,0,0)");

        ctx.rect(this.topLeftCornerX, this.topLeftCornerY, this.length, this.height);
        ctx.fillStyle = gradientRect;
        ctx.fill();
    }
};

let roundedRectangleCheck = false;

let roundedRectangle = {
    topLeftCornerX: 1,
    topLeftCornerY: 1,
    height: 175,
    length: 200,
    cornerRadius: 50,
    draw: function () {
        let gradientRect = ctx.createLinearGradient(
            this.topLeftCornerX,
            this.topLeftCornerY,
            this.topLeftCornerX + this.length,
            this.topLeftCornerY + this.height);
        gradientRect.addColorStop(0, "rgb(255,255,0)");
        gradientRect.addColorStop(1, "rgb(255,0,0)");

        // Kode fra https://stackoverflow.com/questions/1255512/how-to-draw-a-rounded-rectangle-on-html-canvas
        ctx.beginPath();
        ctx.moveTo(this.topLeftCornerX + this.cornerRadius, this.topLeftCornerY);
        ctx.lineTo(this.topLeftCornerX + this.length - this.cornerRadius, this.topLeftCornerY);
        ctx.quadraticCurveTo(this.topLeftCornerX + this.length, this.topLeftCornerY, this.topLeftCornerX +
            this.length, this.topLeftCornerY + this.cornerRadius);
        ctx.lineTo(this.topLeftCornerX + this.length, this.topLeftCornerY + this.height - this.cornerRadius);
        ctx.quadraticCurveTo(this.topLeftCornerX + this.length, this.topLeftCornerY + this.height, this.topLeftCornerX +
            this.length - this.cornerRadius, this.topLeftCornerY + this.height);
        ctx.lineTo(this.topLeftCornerX + this.cornerRadius, this.topLeftCornerY + this.height);
        ctx.quadraticCurveTo(this.topLeftCornerX, this.topLeftCornerY + this.height, this.topLeftCornerX,
            this.topLeftCornerY + this.height - this.cornerRadius);
        ctx.lineTo(this.topLeftCornerX, this.topLeftCornerY + this.cornerRadius);
        ctx.quadraticCurveTo(this.topLeftCornerX, this.topLeftCornerY, this.topLeftCornerX
            + this.cornerRadius, this.topLeftCornerY);
        ctx.closePath();
        ctx.fillStyle = gradientRect;
        ctx.fill();
    }
};

let circle = {
    centerX: 300,
    centerY: 88,
    radius: 20,
    color: "rgb(82, 30, 135)",
    isLarge: false,
    circleClicked: false,
    draw: function () {
        if (this.circleClicked && !this.isLarge) {
            this.radius = 70;
            this.isLarge = true;
        }
        else if (this.circleClicked && this.isLarge) {
            this.radius = 20;
            this.isLarge = false;
        }

        ctx.beginPath();
        ctx.arc(this.centerX, this.centerY, this.radius, 0, Math.PI * 2, false);
        ctx.closePath();
        ctx.fillStyle = circle.color;
        ctx.fill();
    }
};

let triangle = {
    topCornerX: 100,
    topCornerY: 210,
    rightCornerX: 150,
    rightCornerY: 290,
    leftCornerX: 50,
    leftCornerY: 290,
    rotateCheck: false,
    draw: function () {
        let gradientTriangle = ctx.createLinearGradient(
            this.topCornerX - 50,
            this.topCornerY,
            this.topCornerX + 50,
            this.rightCornerY);
        gradientTriangle.addColorStop(0, "rgb(255,255,0)");
        gradientTriangle.addColorStop(1, "rgb(255,0,0)");

        ctx.beginPath();
        ctx.moveTo(this.topCornerX, this.topCornerY);
        ctx.lineTo(this.rightCornerX, this.rightCornerY);
        ctx.lineTo(this.leftCornerX, this.leftCornerY);
        ctx.closePath();
        ctx.fillStyle = gradientTriangle;
        ctx.fill();

        if (this.rotateCheck) {
            ctx.translate(100, 215);
            ctx.rotate(Math.PI);
            ctx.translate(-100, -314);
        }
    },
};

let ellipse = {
    centerX: 300,
    centerY: 250,
    height: 100,
    length: 175,
    angle: 0,
    color: "rgb(0, 0, 0)",
    colorOption1: "rgb(0, 0, 0)",
    colorOption2: "rgb(168, 50, 94)",
    draw: function() {
        ctx.beginPath();
        ctx.ellipse(this.centerX, this.centerY, this.length/2.3, this.height/2,
            this.angle, 0, Math.PI*2, false);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
    }
};

let canvas = document.getElementById("canvas-mesterverk");
let ctx = canvas.getContext('2d');
let raf; //  RequestAnimationFrame

function clear() {
    ctx.clearRect(canvasRectangle.topLeftCornerX, canvasRectangle.topLeftCornerY,
        canvasRectangle.length, canvasRectangle.height);
}

function draw() {
    clear();

    // Draw canvas
    canvasRectangle.draw();

    // Draw rectangle
    if (roundedRectangleCheck) {
        roundedRectangle.draw();
    }
    else {
        rectangle.draw();
    }

    // Draw circle
    circle.draw();

    // Draw ellipse
    ellipse.draw();

    // Draw triangle
    triangle.draw();

    raf = window.requestAnimationFrame(draw);
}

function circleClick(pos) {
    return Math.sqrt((pos.x-circle.centerX) ** 2 + (pos.y - circle.centerY) ** 2) < circle.radius;
}

function rectangleClick(pos) {
    let withinX = (pos.x >= rectangle.topLeftCornerX) && (pos.x <= rectangle.topLeftCornerX + rectangle.length);
    let withinY = (pos.y >= rectangle.topLeftCornerY) && (pos.y <= rectangle.topLeftCornerY + rectangle.height);

    return withinX && withinY;
}

function ellipseClick(pos) {
    let withinX = (pos.x >= ellipse.centerX - ellipse.length/2) && (pos.x <= ellipse.centerX + ellipse.length/2);
    let withinY = (pos.y >= ellipse.centerY - ellipse.height/2) && (pos.y <= ellipse.centerY + ellipse.height/2);

    return withinX && withinY;
}

function triangleClick(pos) {
    let withinX = (pos.x >= triangle.leftCornerX) && (pos.x <= triangle.rightCornerX);
    let withinY = (pos.y >= triangle.topCornerY) && (pos.y <= triangle.rightCornerY);
    return withinX && withinY;
}

canvas.addEventListener('click', (e) => {
    let pos = {
        x: e.clientX - (canvas.offsetLeft + canvas.clientLeft),
        y: e.clientY + $(window).scrollTop() - (canvas.offsetTop + canvas.clientTop)
    };

    if (rectangleClick(pos)) {
        //animate rectangle
        console.log("rect");

        roundedRectangleCheck = !roundedRectangleCheck;
        rectangle.draw();
        raf = window.requestAnimationFrame(draw);
    }

    if (circleClick(pos)) {
        //animate circle
        console.log("circle");

        circle.circleClicked = true;
        circle.draw();
        raf = window.requestAnimationFrame(draw);
        circle.circleClicked = false;
    }

    if (triangleClick(pos)) {
        //animate triangle
        console.log("triangle");

        triangle.rotateCheck = true;
        triangle.draw();
        raf = window.requestAnimationFrame(draw);
        triangle.rotateCheck = false;
    }

    if (ellipseClick(pos)) {
        //animate ellipse
        console.log("ellipse");

        if (ellipse.color === ellipse.colorOption1) {
            ellipse.color = ellipse.colorOption2;
        }
        else {
            ellipse.color = ellipse.colorOption1;
        }
        ellipse.draw();
        raf = window.requestAnimationFrame(draw);
    }
});

canvas.addEventListener('mouseover', (e) => {
    document.body.style.cursor = "pointer";
});

canvas.addEventListener('mouseout', (e) => {
    document.body.style.cursor = "default";
});


draw();