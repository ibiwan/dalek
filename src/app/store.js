import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../feature/counter/counterSlice';
import gameReducer from '../feature/game/gameSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    game: gameReducer,
  },
});
