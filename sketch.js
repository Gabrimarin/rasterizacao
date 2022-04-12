points = [];

let display_pixels = get_display_pixels();

function produz_fragmento(x, y) {
  return new Point(Math.floor(x), Math.floor(y));
}

function gera_linha(p1, p2) {
  let { x: x1, y: y1 } = p1;
  let { x: x2, y: y2 } = p2;
  [x1, y1, x2, y2] = [x1, y1, x2, y2].map((p) =>
    Math.floor(p / (display_size / state.resolution))
  );
  if (x1 > x2 || y1 > y2) {
    [x1, x2] = [x2, x1];
    [y1, y2] = [y2, y1];
  }
  const delta_x = x2 - x1;
  const delta_y = y2 - y1;
  if (delta_x === 0 && delta_y === 0) {
    return [p1];
  } else if (delta_x === 0) {
    const points = [];
    for (let i = 0; i <= delta_y; i += 1) {
      points.push(new Point(Math.floor(x1), Math.floor(y1 + i)));
    }
    return points;
  } else if (delta_y === 0) {
    const points = [];
    for (let i = 0; i <= delta_x; i += 1) {
      points.push(new Point(Math.floor(x1 + i), Math.floor(y1)));
    }
    return points;
  } else if (delta_x >= delta_y) {
    const m = delta_y / delta_x;
    const b = y1 - m * x1;
    const lista_pontos = [produz_fragmento(x1, y1)];
    while (x1 < x2) {
      x1 += 1;
      y1 = m * x1 + b;
      lista_pontos.push(produz_fragmento(x1, y1));
    }
    return lista_pontos;
  } else if (delta_y > delta_x) {
    const m = delta_x / delta_y;
    const b = x1 - m * y1;
    const lista_pontos = [produz_fragmento(x1, y1)];
    while (y1 < y2) {
      y1 += 1;
      x1 = m * y1 + b;
      lista_pontos.push(produz_fragmento(x1, y1));
    }
    return lista_pontos;
  }
}

function update() {
  if (state.modo === "linha") {
    points = gera_linha(state.pontos_linha.p1, state.pontos_linha.p2);
  } else if (state.modo === "poligono") {
    points = [];
    state.pontos_poligono.forEach((p, i) => {
      if (i === 0) {
        points = points.concat(
          gera_linha(p, state.pontos_poligono[state.pontos_poligono.length - 1])
        );
      } else {
        points = points.concat(gera_linha(state.pontos_poligono[i - 1], p));
      }
    });
  }
  draw_display();
}

function fill_polygon() {
  // função de preencher o poligono
}

function setup() {
  createCanvas(1000, 1000);
  background(220);
  draw_interface();
  update();
}

function draw() {}
