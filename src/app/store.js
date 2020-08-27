import { configureStore } from '@reduxjs/toolkit';
import gameReducer from '../feature/game/gameSlice';

export default configureStore({
  reducer: {
    game: gameReducer,
  },
});
