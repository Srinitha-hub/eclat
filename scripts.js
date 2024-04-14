function calculateEclat() {
  const inputTransactions = document.getElementById('inputItems').value.split('\n');
  const transactions = inputTransactions
      .map(transaction => transaction.trim().split(',').map(item => item.trim()))
      .filter(transaction => transaction.length > 0);

  const minSupport = parseInt(document.getElementById('supportThreshold').value, 10);

  // Calculate support for each item
  const supportCount = {};
  for (const transaction of transactions) {
      for (const item of transaction) {
          if (item !== "") {
              if (!supportCount[item]) {
                  supportCount[item] = 0;
              }
              supportCount[item]++;
          }
      }
  }

  // Remove items from support count that do not meet the minimum support threshold
  for (const item in supportCount) {
      if (supportCount[item] < minSupport) {
          delete supportCount[item];
      }
  }

  // Display frequent itemsets and their support
  const frequentItemsets = Object.keys(supportCount);
  const output = document.getElementById('output');
  if (frequentItemsets.length > 0) {
      output.innerHTML = `<strong>Frequent Itemsets:</strong><br>${frequentItemsets.join(', ')}<br><br><strong>Support:</strong><br>${JSON.stringify(supportCount, null, 4)}`;
  } else {
      output.innerHTML = 'No frequent itemsets found.';
  }
}

