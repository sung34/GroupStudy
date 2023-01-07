let words = []

const wordsInit = async () => {
  fetch("words.txt")
    .then((response) => response.text())
    .then((data) => {
      // Do something with your data
      words = data.match(/\w{1,}/gm);
      console.log(words)
    });
};

await new Promise(resolve => setTimeout(resolve, 2000))
console.log('Hello!') // 1 seconds after sended console.log