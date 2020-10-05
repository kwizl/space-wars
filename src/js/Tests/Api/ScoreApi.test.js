import ScoreApi from '../../Api/ScoreApi';

const axios = require('axios');

jest.mock('axios');

describe('Mock testing API', () => {
  const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/';
  const key = 'ZomxrkxLhhvvo2nuWmNk';

  test('should fetch results', () => {
    const mockedResponse = { data: { user: 'test-user', score: 50 } };
    axios.get.mockResolvedValue(mockedResponse);

    const api = ScoreApi();
    api.getResults();

    expect(axios.get).toHaveBeenCalled();
    expect(axios.get).toHaveBeenCalledWith(`${url}${key}/scores/`);
  });
});

describe('API Helper methods', () => {
  test('Rearrange array', () => {
    const arr = [34, 55, 66, 44];

    const api = ScoreApi();
    const result = api.rearrangeResults(arr);
    expect(result).toEqual([44, 66, 55, 34]);
  });

  test('Choose numbers in 1-D array', () => {
    const arr = [34, 55, 66, 44];
    const empty = [];

    const api = ScoreApi();
    const result = api.chooseScores(arr);
    expect(result.length).toEqual(empty.length);
  });

  test('Choose boolean values in 1-D array', () => {
    const arr = [false, true];
    const empty = [];

    const api = ScoreApi();
    const result = api.chooseScores(arr);
    expect(result.length).toEqual(empty.length);
  });

  test('Choose letter in 1-D array', () => {
    const arr = ['l', 'b', 'c'];
    const empty = [];

    const api = ScoreApi();
    const result = api.chooseScores(arr);
    expect(result.length).toEqual(empty.length);
  });

  test('Choose letter in 1-D array', () => {
    const arr = ['l', 'b', 'c'];
    const assert = ['c', 'b', 'l'];

    const api = ScoreApi();
    const result = api.rearrangeResults(arr);
    expect(result).toEqual(assert);
  });

  test('Choose in 2-D array', () => {
    const arr = [{ user: 'martin', score: 24 }, { user: 'pat', score: 20 }, { user: 'lex', score: 15 }, { user: 'aflo', score: 25 }];
    const assert = [{ user: 'martin', score: 24 }, { user: 'pat', score: 20 }, { user: 'lex', score: 15 }, { user: 'aflo', score: 25 }];

    const api = ScoreApi();
    const result = api.chooseScores(arr);
    expect(result).toEqual(assert);
  });

  test('Rearrange boolean values in 2-D array', () => {
    const arr = [false, true];
    const assert = [true, false];

    const api = ScoreApi();
    const result = api.rearrangeResults(arr);
    expect(result).toEqual(assert);
  });

  test('Rearrange hashes in 2-D array', () => {
    const arr = [{ user: 'martin', score: 24 }, { user: 'pat', score: 20 }, { user: 'lex', score: 15 }, { user: 'aflo', score: 25 }];
    const assert = [{ user: 'aflo', score: 25 }, { user: 'martin', score: 24 }, { user: 'pat', score: 20 }, { user: 'lex', score: 15 }];

    const api = ScoreApi();
    const result = api.rearrangeResults(arr);
    expect(result).toEqual(assert);
  });
});