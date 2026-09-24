import urllib.request
import json

url = 'https://raw.githubusercontent.com/EnkaNetwork/API-docs/master/store/loc.json'
req = urllib.request.urlopen(url)
loc = json.loads(req.read())
print("3029494867:", loc["fr"].get("3029494867"))
print("1492570003:", loc["fr"].get("1492570003"))
