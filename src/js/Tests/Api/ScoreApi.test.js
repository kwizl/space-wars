import ScoreApi from '../../Api/ScoreApi';
const axios = require('axios');

jest.mock('axios');

describe('Mock testing API', () => {
  const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/';
  const key = 'ZomxrkxLhhvvo2nuWmNk';

  test('should fetch results', () => {
    const mockedResponse = { data: { user: 'test-user', score: 50} }
    axios.get.mockResolvedValue(mockedResponse);
  
    const api = ScoreApi();
  
    api.getResults();
  
    expect(axios.get).toHaveBeenCalled();
    expect(axios.get).toHaveBeenCalledWith(`${url}${key}/scores/`);
  });

  test('Rearrange array', () => {
    const arr = [34, 55, 66, 44]

    const api = ScoreApi();
    const result = api.rearrangeResults(arr);
    expect(result).toEqual([44, 66, 55, 34]);
  });
});