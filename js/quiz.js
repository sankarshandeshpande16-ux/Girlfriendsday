/**
 * Relationship Quiz Engine Module
 */
export function initQuiz() {
  const quizData = [
    {
      question: "1. What is my absolute favorite place to rest and completely relax?",
      options: [
        
        "Lying down on the couch scrolling on my phone",
        "Your lap while your fingers run through my hair",
        "In bed after a long day of studying",
        "On a comfortable chair while listening to music"
      ],
      correct: 1
    },
    {
      question: "2. What do I usually end up doing when I miss you a lot?",
      options: [
        "Send long text messages and act extra clingy",
        "Go for a long walk outside to clear my mind",
        "Put my phone away and watch movies to distract myself",
        "Just wait quietly until you message me back"
      ],
      correct: 0
    },
    {
      question: "3. What is our absolute go-to date spot when we want something quick and comforting?",
      options: [
        
        "Panipuri wala dada",
        "A nice cozy cafe",
        "Cal B",
        "McDonald's"
      ],
      correct: 3
    },
    {
      question: "4. What is our favorite thing to order and eat together when we crave something good?",
      options: [
        "Cheesy Chicken Dominator Calzone Pocket",
        "Butter Chicken with Garlic Naan",
        "Classic Cheese Loaded Burger & Fries",
        "Momos"
      ],
      correct: 0
    }
  ];

  let currentQuestion = 0;
  let score = 0;

  const quizQuestion = document.getElementById('quizQuestion');
  const quizOptions = document.getElementById('quizOptions');
  const quizBadge = document.getElementById('quizBadge');
  const quizApp = document.getElementById('quizApp');

  function renderQuestion() {
    const q = quizData[currentQuestion];
    quizQuestion.textContent = q.question;
    quizBadge.textContent = `Question ${currentQuestion + 1} of ${quizData.length}`;
    quizOptions.innerHTML = '';

    q.options.forEach((opt, index) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.textContent = opt;
      btn.addEventListener('click', () => handleOptionClick(index, btn));
      quizOptions.appendChild(btn);
    });
  }

  function handleOptionClick(selectedIndex, btnElement) {
    const q = quizData[currentQuestion];
    const buttons = quizOptions.querySelectorAll('.option-btn');
    
    buttons.forEach(b => b.style.pointerEvents = 'none');

    if (selectedIndex === q.correct) {
      btnElement.classList.add('correct');
      score++;
    } else {
      btnElement.classList.add('wrong');
      buttons[q.correct].classList.add('correct');
    }

    setTimeout(() => {
      currentQuestion++;
      if (currentQuestion < quizData.length) {
        renderQuestion();
      } else {
        renderResults();
      }
    }, 1200);
  }

  function renderResults() {
    quizApp.innerHTML = `
      <div style="text-align: center; padding: 1.5rem 0;">
        <h3 style="font-family: 'Playfair Display', serif; font-size: 2.2rem; color: var(--accent-rose); margin-bottom: 0.5rem;">Quiz Complete! 🎉</h3>
        <p style="margin-bottom: 1.2rem; color: var(--text-muted);">You scored ${score} out of ${quizData.length}!</p>
        <p style="color: var(--accent-gold); font-weight: 500;">
          ${score === quizData.length 
            ? "Perfect 4/4! You know us inside and out! ❤️" 
            : "Great job! Guess we need a McDonald's date soon to review! 😉"}
        </p>
      </div>
    `;
  }

  renderQuestion();
}
