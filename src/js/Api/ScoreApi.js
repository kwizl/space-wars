export default class ScoreApi {
  constructor(query) {
    this.query = query;
  }

  async postResults() {

  }

  async getResults() {
    const display = Display();
    const response = await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/${this.query}`, { mode: 'cors' });
    const result = await response.json();
    if (this.query === '' || typeof result.name === 'undefined') {
      display.errorDisplay('Invalid Data');
    } else {
      display.apiData(result);
      display.errorErase();
    }
  }
}