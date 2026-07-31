/**
 * Audio Controller Module
 */
export function initAudio() {
  const audio = document.getElementById('bgAudio');
  const toggleBtn = document.getElementById('musicToggle');
  let isPlaying = false;

  toggleBtn.addEventListener('click', () => {
    if (!isPlaying) {
      audio.play().then(() => {
        toggleBtn.textContent = '⏸ Pause Music';
        isPlaying = true;
      }).catch(err => console.log("Playback error:", err));
    } else {
      audio.pause();
      toggleBtn.textContent = '▶ Play Music';
      isPlaying = false;
    }
  });
}
