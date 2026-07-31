/**
 * Main Application Entry Point
 */
import { initAudio } from './audio.js';
import { initBouquetGenerator } from './bouquet.js';
import { initQuiz } from './quiz.js';

document.addEventListener('DOMContentLoaded', () => {
  initAudio();
  initBouquetGenerator();
  initQuiz();
});
