const goToViewGame = (gameId: string, history: any) => {
  history.push(`/games/${gameId}`);
}

const goToViewCategory = (gameId: string, categoryId: string, history: any) => {
  history.push(`/games/${gameId}/categories/${categoryId}`);
}

export {
  goToViewGame,
  goToViewCategory,
}