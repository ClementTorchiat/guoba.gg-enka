import urllib.request
import json

req = urllib.request.urlopen('https://raw.githubusercontent.com/EnkaNetwork/API-docs/master/store/gi/locs.json')
loc = json.loads(req.read())

print("1086878883 in fr:", "1086878883" in loc["fr"])
print("1086878883 value:", loc["fr"].get("1086878883"))
