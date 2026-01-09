from __future__ import unicode_literals

from codeop import Compile
import os
import sys
import json
import traceback
import platform
import struct
import math

NODE_CHANNEL_FD = int(os.environ['NODE_CHANNEL_FD'])
UNICODE_TYPE = unicode if sys.version_info[0] == 2 else str

if sys.version_info[0] <= 2:
    # print('PY2')
    def _exec(_code_, _globs_):
        exec('exec _code_ in _globs_')
else:
    _exec = getattr(__builtins__, 'exec')

_locals = {'__name__': '__console__', '__doc__': None}
_compile = Compile()


if platform.system() == 'Windows':
    # hacky reimplementation of https://github.com/nodejs/node/blob/master/deps/uv/src/win/pipe.c
    def read_data(f):
        header = f.read(16)
        if not header:
            return header
        try:
            msg_length, = struct.unpack('<Q', header[8:])
            return f.read(msg_length)
        except:
            raise ValueError('Error parsing msg with header: {}'.format(repr(header)))
    def write_data(f, data):
        header = struct.pack('<Q', 1) + struct.pack('<Q', len(data))
        f.write(header + data)
        f.flush()
else:
    def read_data(f):
        return reader.readline()
    def write_data(f, data):
        f.write(data)
        f.flush()


def format_exception(t=None, e=None, tb=None):
    return dict(
        exception=dict(
            type=dict(
                name=t.__name__,
                module=t.__module__
            ) if t else None,
            message=str(e),
            args=getattr(e, 'args', None),
            format=traceback.format_exception_only(t, e)
        ) if e else None,
        traceback=dict(
            lineno=traceback.tb_lineno(tb) if hasattr(traceback, 'tb_lineno') else tb.tb_lineno,
            strack=traceback.format_stack(tb.tb_frame),
            format=traceback.format_tb(tb)
        ) if tb else None,
        format=traceback.format_exception(t, e, tb)
    )


# JavaScript's Number.MAX_SAFE_INTEGER (2^53 - 1)
# Integers outside this range lose precision when parsed by JavaScript
MAX_SAFE_INTEGER = 9007199254740991
MIN_SAFE_INTEGER = -9007199254740991


def convert_large_ints(obj):
    """Recursively convert integers outside JavaScript's safe range to strings."""
    if isinstance(obj, bool):
        return obj
    if isinstance(obj, int):
        if obj > MAX_SAFE_INTEGER or obj < MIN_SAFE_INTEGER:
            return str(obj)
        return obj
    if isinstance(obj, dict):
        return {k: convert_large_ints(v) for k, v in obj.items()}
    if isinstance(obj, (list, tuple)):
        return [convert_large_ints(item) for item in obj]
    return obj


class JavaScriptEncoder(json.JSONEncoder):
    def default(self, o):
        if math.isnan(o):
            return 'NaN'
        if math.isinf(o):
            return 'Infinity' if o > 0 else '-Infinity'
        return o.__dict__


if __name__ == '__main__':
    writer = os.fdopen(NODE_CHANNEL_FD, 'wb')
    reader = os.fdopen(NODE_CHANNEL_FD, 'rb')

    while True:
        try:
            # Read new command
            line = read_data(reader)
            if not line:
                break
            try:
                data = json.loads(line.decode('utf-8'))
            except ValueError:
                raise ValueError('Could not decode IPC data:\n{}'.format(repr(line)))

            # Assert data saneness
            if data['type'] not in ['execute', 'evaluate']:
                raise Exception('Python bridge call `type` must be `execute` or `evaluate`')
            if not isinstance(data['code'], UNICODE_TYPE):
                raise Exception('Python bridge call `code` must be a string.')

            # Run Python code
            if data['type'] == 'execute':
                _exec(_compile(data['code'], '<input>', 'exec'), _locals)
                response = dict(type='success')
            else:
                value = eval(_compile(data['code'], '<input>', 'eval'), _locals)
                # Convert large integers to strings before JSON serialization to preserve precision
                value = convert_large_ints(value)
                response = dict(type='success', value=json.dumps(value, separators=(',', ':'), cls=JavaScriptEncoder))
        except:
            t, e, tb = sys.exc_info()
            response = dict(type='exception', value=format_exception(t, e, tb))

        data = json.dumps(response, separators=(',', ':')).encode('utf-8') + b'\n'
        write_data(writer, data)

    # Closing is messy
    try:
        reader.close()
    except IOError:
        pass

    try:
        writer.close()
    except IOError:
        pass
