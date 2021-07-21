
const renderTiles = (() => {

  const tiles = document.querySelector('#tiles');

  const createTile = (content) => {
    const tile = document.createElement('div');
    tile.classList.add('tile');
    tile.textContent = content;
    tiles.append(tile);
  }

  for (let i = 0; i < 15; i++) {
    createTile(i);
  }

});

export default renderTiles;
