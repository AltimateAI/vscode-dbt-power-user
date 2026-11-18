"""Stand-in for the Open VSX API in ovsx-publish.sh tests.

Usage: openvsx_stub.py <port-file> <hits-file> <visible-after>
Serves GET /<target>/<version>: 404 until request number <visible-after>, then
200 with {"version", "targetPlatform"}; 0 means never visible. Writes the port
it listens on to <port-file> and the request count to <hits-file>.
"""

import http.server
import json
import sys

port_file, hits_file, visible_after = sys.argv[1], sys.argv[2], int(sys.argv[3])
hits = 0


class Handler(http.server.BaseHTTPRequestHandler):
    def do_GET(self):
        global hits
        hits += 1
        with open(hits_file, "w") as f:
            f.write(str(hits))
        target, version = self.path.strip("/").split("/")[-2:]
        if visible_after and hits >= visible_after:
            body = json.dumps({"version": version, "targetPlatform": target}).encode()
            self.send_response(200)
        else:
            body = b'{"error": "not found"}'
            self.send_response(404)
        self.send_header("Content-Type", "application/json")
        self.end_headers()
        self.wfile.write(body)

    def log_message(self, *args):
        pass


server = http.server.HTTPServer(("127.0.0.1", 0), Handler)
with open(port_file, "w") as f:
    f.write(str(server.server_port))
server.serve_forever()
