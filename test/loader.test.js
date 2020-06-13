/**
 * @jest-environment node
 */
import compiler from './compiler.js';

test('Compiles XSL template to sef',
     async () => {
         const stats = await compiler('basic-test.xsl');
         const output = stats.toJson().modules[0].source;

         expect(output).toMatch(/export const stylesheet = {/);
     }
);
