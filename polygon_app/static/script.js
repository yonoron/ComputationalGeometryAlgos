const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let points = [];

canvas.addEventListener("click", function(e) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    points.push({x, y});

    draw();
});

function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);

    if(points.length === 0) return;

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);

    for(let i=1;i<points.length;i++){
        ctx.lineTo(points[i].x, points[i].y);
    }

    ctx.stroke();

    for(const p of points){
        ctx.beginPath();
        ctx.arc(p.x,p.y,4,0,Math.PI*2);
        ctx.fill();
    }
}

function finishPolygon(){

    if(points.length < 3){
        alert("Need at least 3 points");
        return;
    }

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);

    for(let i=1;i<points.length;i++){
        ctx.lineTo(points[i].x, points[i].y);
    }

    ctx.closePath();

    ctx.fillStyle = "rgba(0,150,255,0.3)";
    ctx.fill();
    ctx.stroke();

    fetch("/save_polygon",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({points:points})
    });

    // points = [];
}

function clearCanvas(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    points = [];
}

function checkPolygon(){

    fetch("/check_polygon",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({points: points})
    })
    .then(res => res.json())
    .then(data => {
        console.log("server data:", data);
        document.getElementById("result").innerHTML =
            "Vertices: " + data.vertices +
            "<br>Simple: " + data.is_simple;
    });
}
