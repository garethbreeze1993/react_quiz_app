import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from './App';

const mockQuestionData = [{category: "General Knowledge",
    type: "multiple",
    difficulty: "easy",
    correct_answer: "19",
    incorrect_answers: ["2", "3", "4"],
    question: "On a dartboard which number is opposite 17?"
}]

  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue({results: mockQuestionData})
    })
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

test('check intro elements on page when app is loaded initially', () => {
  render(<App />);
  expect(screen.getByText('Start Quiz')).toBeInTheDocument();
  expect(screen.getByText('Quizzical')).toBeInTheDocument();
  expect(screen.getByText('A fun quiz app built with React')).toBeInTheDocument();
});

test('check when Start Quiz button clicked that Quiz component loads', async () => {
  await act(async () => render(<App />))
  await screen.getByText('Start Quiz')
  await act(async () => fireEvent.click(screen.getByText('Start Quiz')));
  expect(screen.getByText('Check Answers')).toBeInTheDocument();
});

test('check mock api response output to screen', async () => {
  await act(async () => render(<App />))
  await screen.getByText('Start Quiz')
  await act(async () => fireEvent.click(screen.getByText('Start Quiz')));
  screen.debug();
})

// up to React Testing Library: React Testing Library: Asynchronous / Async
// on https://www.robinwieruch.de/react-testing-library/


// < body >
// < div >
// < div
// className = "App"
//     >
//     < form >
//     < div
// className = "quiz--container"
//     >
//     < h5
// className = "quiz--question"
//     >
//     On
// a
// dartboard
// which
// number
// is
// opposite
// 17 ?
// </h5>
// <div
// className="quiz--answer"
// >
// <input
// id="19"
// name="On a dartboard which number is opposite 17?"
// type="radio"
// value="19"
// />
// 19
// </div>
// <div
// className="quiz--answer"
// >
// <input
// id="2"
// name="On a dartboard which number is opposite 17?"
// type="radio"
// value="2"
// />
// 2
// </div>
// <div
// className="quiz--answer"
// >
// <input
// id="3"
// name="On a dartboard which number is opposite 17?"
// type="radio"
// value="3"
// />
// 3
// </div>
// <div
// className="quiz--answer"
// >
// <input
// id="4"
// name="On a dartboard which number is opposite 17?"
// type="radio"
// value="4"
// />
// 4
// </div>
// </div>
// <button
// className="intro--button"
// >
// Check Answers
// </button>
// </form>
// </div>
// </div>
// </body>
