# xslt3-loader for Webpack

This Web loader can load XSLT stylesheets using [Saxon-JS
2](https://www.saxonica.com/saxon-js/documentation/index.html).  The
compiler is called to convert the stylesheet into the SEF format.  The
result will be a module exporting a single constant, `stylesheet`,
which can then be imported into the frontend application and used by
Saxon-JS 2.  At this point, only the free (XX) compiler is supported.

## Usage

In your `module.rules` section of `webpack.config.js`, add a rule like
so:

    {
        test: /\.xsl$/,
        use: [ 'xslt3-loader' ]
    }

In your application source, you can then import a stylesheet like this:

    import { stylesheet as example } from '../example.xsl';

The stylesheet can then be used in invokations to Saxon-JS 2:

    console.log(SaxonJS.transform({ stylesheetInternal: example,
                                    sourceText: '<foo>bar</foo>',
                                    destination: 'serialized' }).principalResult);
