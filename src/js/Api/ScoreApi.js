import axios from 'axios';
import 'regenerator-runtime/runtime';

export default class ScoreApi {
  constructor(key) {
    this.key = 'ZomxrkxLhhvvo2nuWmNk';
  }

  async postResults(name, score) {
    axios.post(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${this.key}/scores/`, {
      user: name,
      score: score,
    }).catch((err) => {
      alert('Request failed');
    });
  }

  async getResults() {
    const response = await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${this.key}/scores/`, { mode: 'cors' });
    const data = await response.json();
    return data.result;
  }

  async getResult() {
    const response = await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${this.key}/scores/`, { mode: 'cors' });
    const data = await response.json();
    const re = data.result;
    re.forEach(el => {
      console.log(el)
    });
  }

  // async getResults() {
  //   try {
  //     const response = await axios.get(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${this.key}/scores/`, { mode: 'cors' });
  //     const scores = await response.data.result;
  //     return scores;
  //   } catch (error) {
  //     alert('Request failed');
  //   }
  // }
}