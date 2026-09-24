import urllib.request
import json

req = urllib.request.urlopen('https://raw.githubusercontent.com/EnkaNetwork/API-docs/master/store/loc.json')
loc = json.loads(req.read())

req2 = urllib.request.urlopen('https://raw.githubusercontent.com/EnkaNetwork/API-docs/master/store/gi/relics.json')
relics = json.loads(req2.read())

with open('/Applications/MAMP/htdocs/guobagg_enka_tests/src/data/set_name_mapping.json') as f:
    SET_NAME_MAPPING = json.load(f)

# Build HASH_TO_KEY
HASH_TO_KEY = {}
for hash_val, nom in loc["fr"].items():
    if nom in SET_NAME_MAPPING:
        HASH_TO_KEY[str(hash_val)] = SET_NAME_MAPPING[nom]

# Build ICON_TO_NAME_HASH
ICON_TO_NAME_HASH = {}
for item in relics["Items"].values():
    if "Icon" in item and "SetId" in item and str(item["SetId"]) in relics["Sets"]:
        icon_name = item["Icon"].split('/')[-1].replace('.png', '')
        name_hash = relics["Sets"][str(item["SetId"])].get("Name")
        if icon_name and name_hash:
            ICON_TO_NAME_HASH[icon_name] = str(name_hash)

flat_icon = "UI_RelicIcon_15035_4"
flat_setNameTextMapHash = "1492570003"

targetHash = flat_setNameTextMapHash
if flat_icon in ICON_TO_NAME_HASH:
    targetHash = ICON_TO_NAME_HASH[flat_icon]

print("Final targetHash:", targetHash)
print("setKey:", HASH_TO_KEY.get(targetHash, "UnknownSet"))

print("Original setKey:", HASH_TO_KEY.get(flat_setNameTextMapHash, "UnknownSet"))
