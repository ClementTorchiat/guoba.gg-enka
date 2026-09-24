import urllib.request
import json
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

req = urllib.request.Request('https://enka.network/api/uid/704449686/', headers={'User-Agent': 'Mozilla/5.0'})
try:
    response = urllib.request.urlopen(req, context=ctx)
    data = json.loads(response.read())
    for avatar in data.get("avatarInfoList", []):
        print("Avatar ID:", avatar.get("avatarId"))
        for equip in avatar.get("equipList", []):
            if equip.get("flat", {}).get("itemType") == "ITEM_RELIQUARY":
                print("  Set Hash:", equip["flat"].get("setNameTextMapHash"), "Icon:", equip["flat"].get("icon"))
except Exception as e:
    print("Error:", e)
