const canva_size = 400;
const input_height = 15;
const canva_place = new Point(100, 100);

let state = {
  resolution: 40,
  pontos_linha: {
    p1: { x: 0, y: 0 },
    p2: { x: 0, y: 0 },
  },
  pontos_poligono: [
    { x: 200, y: 0 },
    { x: 100, y: 100 },
    { x: 100, y: 200 },
    { x: 200, y: 300 },
    { x: 300, y: 200 },
    { x: 300, y: 100 },
  ],
  modo: "linha",
};

points = [];

function setState(newState) {
  state = { ...state, ...newState };
  update();
}

const pixel_size = () => {
  if (state.resolution > canva_size) {
    return canva_size;
  } else {
    return canva_size / state.resolution;
  }
};

const get_canva_pixels = () => {
  const list = [];
  for (var i = 0; i < state.resolution; i++) {
    list.push([]);
    for (var j = 0; j < state.resolution; j++) {
      list[i].push(0);
    }
  }
  points.forEach((p) => {
    list[p.x][p.y] = 1;
  });
  return list;
};

let canva_pixels = get_canva_pixels();

function produz_fragmento(x, y) {
  return new Point(Math.floor(x), Math.floor(y));
}

function gera_linha(p1, p2) {
  let { x: x1, y: y1 } = p1;
  let { x: x2, y: y2 } = p2;
  [x1, y1, x2, y2] = [x1, y1, x2, y2].map((p) =>
    Math.floor(p / (canva_size / state.resolution))
  );
  if (x1 > x2) {
    [x1, x2] = [x2, x1];
    [y1, y2] = [y2, y1];
  }
  const delta_x = x2 - x1;
  const delta_y = y2 - y1;
  // if (delta_y > delta_x) {
  //   [x1, y1, x2, y2] = [y1, x1, y2, x2];
  // }
  if (delta_x === 0 && delta_y === 0) {
    return [p1];
  } else if (delta_x === 0) {
    const points = [];
    for (let i = 0; i < delta_y; i += 1) {
      points.push(new Point(Math.floor(x1), Math.floor(y1 + i)));
    }
    return points;
  } else if (delta_y === 0) {
    const points = [];
    for (let i = 0; i < delta_x; i += 1) {
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

function draw_pixel(point, active) {
  if (active) {
    console.log(point);
  }
  fill(active ? 255 : 0);
  strokeWeight(0);
  const place = new Point(point.x, state.resolution - point.y - 1);
  place.x *= pixel_size();
  place.y *= pixel_size();
  place.x += canva_place.x;
  place.y += canva_place.y;
  square(place.x, place.y, pixel_size());
  console.log('vish') // chamado muito...
}

function draw_canva() {
  fill(0);
  canva_pixels = get_canva_pixels();
  strokeWeight(0);
  square(canva_place.x, canva_place.y, canva_size);
  if (state.modo === "poligono") {
    fill_polygon();
  }
  canva_pixels.forEach((row, i_row) => {
    row.forEach((pixel, i_pixel) => {
      draw_pixel(new Point(i_row, i_pixel), pixel === 1);
    });
  });
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
  draw_canva();
}

function fill_polygon() {
  let count;
  let candidates;
  canva_pixels.forEach((row, x) => {
    count = 0;
    candidates = [];
    row.forEach((pixel, y) => {
      if (count === 1) {
        candidates.push(new Point(x, y));
      } else if (count === 2) {
        candidates.forEach(({ x, y }) => {
          canva_pixels[x][y] = 1;
        });
        candidates = [];
        count = 0;
      }
      if (pixel === 1) {
        count++;
      }
    });
  });
}

function setup() {
  createCanvas(1000, 1000);
  background(220);
  draw_interface();
  update();
}

function draw() {}
