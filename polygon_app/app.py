from flask import Flask, render_template, request, jsonify
from shapely.geometry import Polygon, LinearRing

app = Flask(__name__)

polygons = []

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/save_polygon", methods=["POST"])
def save_polygon():
    data = request.json
    polygons.append(data["points"])
    return jsonify({"status": "saved", "total": len(polygons)})

@app.route("/check_polygon", methods=["POST"])
def check_polygon():

    data = request.json
    points = data["points"]

    coords = [(p["x"], p["y"]) for p in points]

    vertices = len(coords)
    
    # Check if polygon is simple
    polygon = Polygon(coords)
    is_simple = polygon.is_simple

    print(data)
    return jsonify({
        "vertices": vertices,
        "is_simple": is_simple
    })

if __name__ == "__main__":
    app.run(debug=True)
