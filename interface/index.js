function draw_text(txt, x, y) {
  text(txt, x, y, 200, 20);
}

function draw_input({
  label = "",
  x = 0,
  y = 0,
  callback = () => {},
  initial = "",
  width = 100,
}) {
  draw_text(label, x, y);
  let inp = createInput(initial);
  inp.position(x, y + 16);
  inp.size(width, input_height);
  inp.input(() => callback(inp.value()));
}

function draw_interface() {
  button = createButton("Linha");
  button.position(canva_place.x, canva_place.y + canva_size + input_height);
  button.mousePressed(() => {
    setState({ modo: "linha" });
  });
  button.size(canva_size / 2, 80);
  button = createButton("Polígono");
  button.position(
    canva_place.x + canva_size / 2,
    canva_place.y + canva_size + input_height
  );
  button.mousePressed(() => {
    setState({ modo: "poligono" });
  });
  button.size(canva_size / 2, 80);
  const onInputResolution = (v) => {
    setState({ resolution: parseInt(v) });
  };
  draw_input({
    label: "Resolução (max = 400)",
    x: canva_place.x + canva_size + 10,
    y: canva_place.y,
    callback: onInputResolution,
    initial: state.resolution,
  });

  draw_input({
    label: "X1",
    x: canva_place.x + canva_size + 10,
    y: canva_place.y + 50,
    callback: (v) => {
      setState({
        pontos_linha: {
          ...state.pontos_linha,
          p1: {
            ...state.pontos_linha.p1,
            x: parseInt(v),
          },
        },
      });
    },
    initial: state.pontos_linha.x1,
    width: 30,
  });
  draw_input({
    label: "Y1",
    x: canva_place.x + canva_size + 50,
    y: canva_place.y + 50,
    callback: (v) => {
      setState({
        pontos_linha: {
          ...state.pontos_linha,
          p1: {
            ...state.pontos_linha.p1,
            y: parseInt(v),
          },
        },
      });
    },
    initial: state.pontos_linha.y1,
    width: 30,
  });

  draw_input({
    label: "X2",
    x: canva_place.x + canva_size + 10,
    y: canva_place.y + 100,
    callback: (v) => {
      setState({
        pontos_linha: {
          ...state.pontos_linha,
          p2: {
            ...state.pontos_linha.p2,
            x: parseInt(v),
          },
        },
      });
    },
    initial: state.pontos_linha.x2,
    width: 30,
  });
  draw_input({
    label: "Y2",
    x: canva_place.x + canva_size + 50,
    y: canva_place.y + 100,
    callback: (v) => {
      setState({
        pontos_linha: {
          ...state.pontos_linha,
          p2: {
            ...state.pontos_linha.p2,
            y: parseInt(v),
          },
        },
      });
    },
    initial: state.pontos_linha.y2,
    width: 30,
  });
}
