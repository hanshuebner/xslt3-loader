
import { readFileSync, writeSync } from 'fs';

import { exec } from 'child_process';

import { file } from 'tmp';

import { getOptions } from 'loader-utils';

export default function(source) {
    const callback = this.async();
    file((err1, xsltPath, fd) => {
        if (err1) throw err1;
        writeSync(fd, source);
        file((err2, sefPath) => {
            if (err2) throw err2;
            const script = `xslt3 -t -nogo -xsl:${xsltPath} -export:${sefPath}`;
            const command = exec(script, {},
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
