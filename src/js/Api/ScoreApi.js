import axios from 'axios';

const ScoreApi = () => {
  const key = 'ZomxrkxLhhvvo2nuWmNk';

  const getResults = () => new Promise((resolve, reject) => {
    const url = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${key}/scores/`;
    axios.get(url).then((res) => {
      resolve(res.data.result);
    }).catch((error) => {
      reject(error.message);
    });
  });

  const postResults = (user, score) => new Promise((resolve, reject) => {
    const url = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${key}/scores/`;
    axios.post(url, { user, score }).then((res) => {
      resolve(res.data.result);
    }).catch((error) => {
      reject(error);
    });
  });

  const rearrangeResults = (data) => {
    const len = data.length;
    const arr = [...data];
    for (let i = 0; i < len; i += 1) {
      for (let j = 0; j < len - i - 1; j += 1) {
        if (arr[j].score > arr[j + 1].score) {
          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
        }
      }
    }
    return [...arr].reverse();
  };

  const chooseScores = (scores) => {
    const cut = [];
    scores.forEach((item) => {
      if ((item.score >= 0) && (item.user.length > 0)) cut.push(item);
    });
    return cut;
  };

  const topScores = (idx, scores) => {
    let ts = rearrangeResults(scores);
    ts = chooseScores(ts);
    if (ts.length > idx) ts.splice(idx, ts.length - idx);
    return ts;
  };

  return {
    getResults,
    rearrangeResults,
    postResults,
    chooseScores,
    topScores,
  };
};

export default ScoreApi;
