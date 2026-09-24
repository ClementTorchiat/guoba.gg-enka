import urllib.request
import json

req = urllib.request.urlopen('https://raw.githubusercontent.com/EnkaNetwork/API-docs/master/store/gi/locs.json')
loc = json.loads(req.read())

print("3029494867 in fr:", "3029494867" in loc["fr"])
if "3029494867" in loc["fr"]:
    print("3029494867 value:", loc["fr"]["3029494867"])
