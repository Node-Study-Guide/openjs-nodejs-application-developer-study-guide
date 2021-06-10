function count() {
    for (let i = 1; i < 4; i++) {
      debugger;
      if (i > 2) {
        throw 'Wait, I counted too far!'
      }
      console.log(i + ' hahaha');
  }
}

function startACount() {
  console.log('I will now begin to count...')
  count();
}

startACount();
