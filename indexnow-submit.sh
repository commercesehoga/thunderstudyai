#!/usr/bin/env bash
set -euo pipefail

KEY="de1dd4732c9998d648656d27394756be"
HOST="ai.thunderstudy.indevs.in"
KEY_LOCATION="https://${HOST}/de1dd4732c9998d648656d27394756be.txt"
SITEMAP="https://${HOST}/sitemap.xml"
ENDPOINT="https://api.indexnow.org/indexnow"

curl -fsS "$SITEMAP" -o /tmp/thunderstudy-sitemap.xml

python3 - "$KEY" "$HOST" "$KEY_LOCATION" "$ENDPOINT" <<'PY'
import json, sys, urllib.request, xml.etree.ElementTree as ET

key, host, key_location, endpoint = sys.argv[1:5]
root = ET.parse("/tmp/thunderstudy-sitemap.xml").getroot()
ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
urls = [node.text.strip() for node in root.findall("sm:url/sm:loc", ns) if node.text]

payload = {
    "host": host,
    "key": key,
    "keyLocation": key_location,
    "urlList": urls
}

req = urllib.request.Request(
    endpoint,
    data=json.dumps(payload).encode("utf-8"),
    headers={"Content-Type": "application/json; charset=utf-8"},
    method="POST",
)

with urllib.request.urlopen(req) as response:
    print(response.read().decode("utf-8", errors="replace"))
PY
