#!/bin/zsh
cd -- "${0:A:h}" || exit 1
print 'Roundtable: http://127.0.0.1:8048/'
print 'Keep this window open while presenting. Press Control-C to stop.'
python3 -m http.server 8048 --bind 127.0.0.1 --directory dist
