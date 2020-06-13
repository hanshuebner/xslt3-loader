
import { readFileSync, writeSync } from 'fs';

import { exec } from 'child_process';

import { file } from 'tmp';

import { getOptions } from 'loader-utils';

import validateOptions from 'schema-utils';

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
    file((err1, xsltPath, fd) => {
        if (err1) throw err1;
        writeSync(fd, source);
        file((err2, sefPath) => {
            if (err2) throw err2;
            const script = `xslt3 -t -nogo -xsl:${xsltPath} -export:${sefPath}`;
            const command = exec(script, options,
                                 (err) => {
                                     if (err) return callback(err);
                                     const sef = readFileSync(sefPath);
                                     return callback(null, `export const stylesheet = ${sef}`);
                                 }
            );
            command.stdin.end();
        });
    });
};
