// Aqui estão todas as informações referentes
// ao display simulado

// Tamanho do pixel com base na resolução e tamanho do display
const pixel_size = () => {
  if (state.resolution > display_size) {
    return display_size;
  } else {
    return display_size / state.resolution;
  }
};

const get_display_pixels = () => {
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

function draw_pixel(point, active) {
  if (active) {
    console.log(point);
  }
  fill(active ? 255 : 0);
  strokeWeight(0);
  const place = new Point(point.x, state.resolution - point.y - 1);
  place.x *= pixel_size();
  place.y *= pixel_size();
  place.x += display_place.x;
  place.y += display_place.y;
  square(place.x, place.y, pixel_size());
  console.log("vish"); // chamado muito...
}

function draw_display() {
  fill(0);
  display_pixels = get_display_pixels();
  strokeWeight(0);
  square(display_place.x, display_place.y, display_size);
  if (state.modo === "poligono") {
    fill_polygon();
  }
  display_pixels.forEach((row, i_row) => {
    row.forEach((pixel, i_pixel) => {
      draw_pixel(new Point(i_row, i_pixel), pixel === 1);
    });
  });
}
