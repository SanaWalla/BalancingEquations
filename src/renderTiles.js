
const renderTiles = ((tiles) => {

  const tilesHtml = document.querySelector('#tiles');

  const createTile = (content) => {
    const tile = document.createElement('div');
    tile.classList.add('tile');
    tile.textContent = content;
    tilesHtml.append(tile);
  }

  for (let i = 0; i < 15; i++) {
    createTile(tiles[i]);
  }

});

export default renderTiles;
