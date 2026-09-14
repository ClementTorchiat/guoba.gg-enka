fetch('https://enka.network/store/characters.json').then(r => r.json()).then(data => {
  const d = data["10000005-71"];
  console.log(d.NameTextMapHash);
}).catch(console.error);
