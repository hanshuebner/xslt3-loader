
import { exec } from 'child_process';
import { file } from 'tmp';

import { getOptions } from 'loader-utils';
import validateOptions from 'schema-utils';
import * as fs from 'fs';

const schema = {
  type: 'object',
  properties: {
    test: {
      type: 'string'
    }
  }
};

export default function(source) {
    const options = getOptions(this);

    validateOptions(schema, options, 'XSLT3 Loader');

    const callback = this.async();
    file((err, xsltPath, fd) => {
        if (err) throw err;
        fs.writeSync(fd, source);
        file((err, sefPath) => {
            const script = `xslt3 -t -nogo -xsl:${xsltPath} -export:${sefPath}`;
            const command = exec(script, options, function(err, result) {
                if (err) return callback(err);
                callback(null, fs.readFileSync(sefPath));
            });
            command.stdin.end();
        });
    });
};
