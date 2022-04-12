// Este arquivo guarda o estado da aplicação
// Ou seja, tudo o que pode ser alterado pelo usuário

let state = {
  resolution: 40,
  pontos_linha: {
    p1: { x: 0, y: 0 },
    p2: { x: 0, y: 0 },
  },
  pontos_poligono: [
    { x: 0, y: 0 },
    { x: 50, y: 80.66 },
    { x: 100, y: 0 },
  ],
  modo: "linha",
};

function setState(newState) {
  state = { ...state, ...newState };
  update();
}
