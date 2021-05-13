const goToCreateGame = () => {
  console.log('create game');
}

const goToViewGame = (gameId: string, history: any) => {
  history.push(`/games/${gameId}`);
}

export {
  goToCreateGame,
  goToViewGame,
}