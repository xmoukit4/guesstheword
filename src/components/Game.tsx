'use client'
import React, { useState, useEffect } from 'react';

type WordItem = {
  word: string;
  hint: string;
};

const words: WordItem[] = [
  { word: 'ahd', hint: 'The most beautiful girl on the planet' },
  // Add more words and hints
];

const getRandomWord = (): WordItem => words[Math.floor(Math.random() * words.length)];

const Game: React.FC = () => {
  const [gameState, setGameState] = useState({
    ...getRandomWord(),
    guessedLetters: [] as string[],
    remainingGuesses: 6,
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const letter = event.key.toLowerCase();
      if (/[a-z]/.test(letter) && !gameState.guessedLetters.includes(letter)) {
        handleGuess(letter);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [gameState.guessedLetters]);

  const handleGuess = (letter: string) => {
    if (!gameState.guessedLetters.includes(letter)) {
      const isCorrectGuess = gameState.word.includes(letter);
      setGameState((prevState) => ({
        ...prevState,
        guessedLetters: [...prevState.guessedLetters, letter],
        remainingGuesses: isCorrectGuess
          ? prevState.remainingGuesses
          : prevState.remainingGuesses - 1,
      }));
    }
  };

  const resetGame = () => {
    setGameState({
      ...getRandomWord(),
      guessedLetters: [],
      remainingGuesses: 6,
    });
  };

  const displayWord = gameState.word
    .split('')
    .map((letter) => (gameState.guessedLetters.includes(letter) ? letter : '_'))
    .join(' ');

  return (
    <div className="wrapper p-4 max-w-lg mx-auto bg-white rounded-lg shadow-md text-black">
      <h1 className="text-3xl font-medium mb-4">Devinez le Mot</h1>
      <p className="mb-2">Hint: {gameState.hint}</p>
      <p className="text-xl mb-4">{displayWord}</p>
      <p className="mb-4">Remaining guesses: {gameState.remainingGuesses}</p>
      <div className="mb-4">
        <div className="content inputs flex flex-wrap justify-center">
          {Array.from({ length: 26 }, (_, index) => String.fromCharCode(97 + index)).map(
            (letter) => (
              <button
                key={letter}
                className={`input p-2 m-1 text-2xl font-medium border border-gray-300 ${
                  gameState.guessedLetters.includes(letter)
                    ? 'bg-gray-300 cursor-default'
                    : 'bg-blue-500 text-white cursor-pointer'
                }`}
                onClick={() => handleGuess(letter)}
                disabled={gameState.guessedLetters.includes(letter)}
              >
                {letter}
              </button>
            )
          )}
        </div>
      </div>
      {gameState.remainingGuesses <= 0 ? (
        <div className="text-red-500">
          <p>Game Over! The word was: {gameState.word}</p>
          <button className="reset-btn mt-4 px-4 py-2 bg-green-500 text-white" onClick={resetGame}>
            Play Again
          </button>
        </div>
      ) : (
        gameState.word.split('').every((letter) => gameState.guessedLetters.includes(letter)) && (
          <div className="text-green-500">
            <p>Congratulations! You guessed the word!</p>
            <button className="reset-btn mt-4 px-4 py-2 bg-green-500 text-white" onClick={resetGame}>
              Play Again
            </button>
          </div>
        )
      )}
    </div>
  );
};

export default Game;
