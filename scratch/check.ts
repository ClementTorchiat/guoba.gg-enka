const res = await fetch('https://raw.githubusercontent.com/EnkaNetwork/API-docs/master/store/loc.json');
const loc = await res.json();
console.log("3029494867:", loc["fr"]["3029494867"]);
console.log("1492570003:", loc["fr"]["1492570003"]);
