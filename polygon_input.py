import tkinter as tk

points = []

def add_point(event):
    x, y = event.x, event.y
    points.append((x, y))

    r = 3
    canvas.create_oval(x-r, y-r, x+r, y+r, fill="black")

    if len(points) > 1:
        canvas.create_line(points[-2][0], points[-2][1], x, y)

def finish_polygon():
    if len(points) > 2:
        canvas.create_line(points[-1][0], points[-1][1], points[0][0], points[0][1])

def clear_canvas():
    global points
    canvas.delete("all")
    points = []

root = tk.Tk()
root.title("Polygon Creator")

canvas = tk.Canvas(root, width=600, height=400, bg="white")
canvas.pack()

canvas.bind("<Button-1>", add_point)

btn_frame = tk.Frame(root)
btn_frame.pack()

finish_btn = tk.Button(btn_frame, text="Finish Polygon", command=finish_polygon)
finish_btn.pack(side=tk.LEFT)

clear_btn = tk.Button(btn_frame, text="Clear", command=clear_canvas)
clear_btn.pack(side=tk.LEFT)

root.mainloop()
