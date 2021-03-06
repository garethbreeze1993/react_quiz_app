import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from './App';

const mockQuestionData = [{category: "General Knowledge",
    type: "multiple",
    difficulty: "easy",
    correct_answer: "Budapest",
    incorrect_answers: ["London", "Paris", "Berlin"],
    question: "What is the capital city of Hungary?"
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
  // screen.debug();
  expect(screen.getByRole('heading')).toHaveTextContent('What is the capital city of Hungary?');
  const radioItems = await screen.findAllByRole('radio')
  expect(radioItems).toHaveLength(4)
})

test('testing user selecting radio answer buttons on quiz screen', async() => {
  await act(async () => render(<App />))
  await screen.getByText('Start Quiz')
  await act(async () => fireEvent.click(screen.getByText('Start Quiz')));
  await act(async () => fireEvent.click(screen.getByLabelText('London')))
  expect(screen.getByLabelText('London')).toBeChecked()
  await act(async () => fireEvent.click(screen.getByLabelText('Budapest')));
  expect(screen.getByLabelText('Budapest')).toBeChecked()
  expect(screen.getByLabelText('London')).not.toBeChecked()
})

test('testing user selects incorrect answer and checks answers', async() => {
  await act(async () => render(<App />))
  await screen.getByText('Start Quiz')
  await act(async () => fireEvent.click(screen.getByText('Start Quiz')));
  await act(async () => fireEvent.click(screen.getByLabelText('London')))
  expect(screen.getByLabelText('London')).toBeChecked();
  await act(async () => fireEvent.click(screen.getByText('Check Answers')));
  expect(screen.getByText('You scored 0 out of 1')).toBeInTheDocument();
  expect(screen.getByLabelText('London')).toBeChecked();
  expect(screen.getByText('London').closest("div")).toHaveStyle("background-color: red;");
  expect(screen.getByText('Budapest').closest("div")).toHaveStyle("background-color: green;");
})

test('testing user select correct answer and checks answers', async() => {
  await act(async () => render(<App />))
  await screen.getByText('Start Quiz')
  await act(async () => fireEvent.click(screen.getByText('Start Quiz')));
  await act(async () => fireEvent.click(screen.getByLabelText('Budapest')))
  expect(screen.getByLabelText('Budapest')).toBeChecked();
  await act(async () => fireEvent.click(screen.getByText('Check Answers')));
  expect(screen.getByText('You scored 1 out of 1')).toBeInTheDocument();
  expect(screen.getByLabelText('Budapest')).toBeChecked();
  expect(screen.getByText('Budapest').closest("div")).toHaveStyle("background-color: green;");
})

test('testing user clicks play again and gets sent back to intro screen', async() => {
  await act(async () => render(<App />))
  await screen.getByText('Start Quiz')
  await act(async () => fireEvent.click(screen.getByText('Start Quiz')));
  await act(async () => fireEvent.click(screen.getByLabelText('Budapest')))
  await act(async () => fireEvent.click(screen.getByText('Check Answers')));
  await act(async () => fireEvent.click(screen.getByText('Play Again?')));
  expect(screen.getByText('Start Quiz')).toBeInTheDocument();
  expect(screen.getByText('Quizzical')).toBeInTheDocument();
  expect(screen.getByText('A fun quiz app built with React')).toBeInTheDocument();
})
