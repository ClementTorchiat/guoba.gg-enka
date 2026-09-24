import urllib.request
import json

req = urllib.request.urlopen('https://raw.githubusercontent.com/EnkaNetwork/API-docs/master/store/loc.json')
loc = json.loads(req.read())

print("1086878883 in fr:", "1086878883" in loc["fr"])
if "1086878883" in loc["fr"]:
    print("Value:", loc["fr"]["1086878883"])

print("1337665995 in fr:", "1337665995" in loc["fr"]) # Nilou
print("1212345779 in fr:", "1212345779" in loc["fr"]) # Mavuika
print("1774578891 in fr:", "1774578891" in loc["fr"]) # Mavuika 2
