/**
 * @jest-environment node
 */
import compiler from './compiler.js';
import SaxonJS from 'saxon-js/SaxonJS2N';

test('Test compiling and evaluating a trivial XSL template',
     async () => {
         const stats = await compiler('basic-test.xsl');
         const output = stats.toJson().modules[0].source;

         expect(output)
             .toMatch(/^export const stylesheet = {/);

         const sef = JSON.parse(output.replace(/^export const stylesheet = /, ''));
         expect(typeof sef)
             .toBe('object');

         expect(SaxonJS.transform({ stylesheetInternal: sef,
                                    sourceText: '<foo>world</foo>',
                                    destination: 'serialized' }).principalResult)
             .toBe('<?xml version=\"1.0\" encoding=\"UTF-8\"?><hello>world</hello>');
     }
);
