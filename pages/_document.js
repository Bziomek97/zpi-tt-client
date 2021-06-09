import * as React from 'react'
import { Stylesheet, InjectionMode } from '@fluentui/merge-styles'
import { resetIds } from '@fluentui/utilities'
import Document from 'next/document'

// Do this in file scope to initialize the stylesheet before Fluent UI React components are imported.
const stylesheet = Stylesheet.getInstance()

// Set the config.
stylesheet.setConfig({
  injectionMode: InjectionMode.none,
  namespace: 'server'
})

// Now set up the document, and just reset the stylesheet.
class MyDocument extends Document {
  static async getInitialProps(ctx) {
    stylesheet.reset()
    resetIds()

    const initialProps = await Document.getInitialProps(ctx)
    return {
      ...initialProps,
      styles: [initialProps.styles, <style key="fluentui-css" dangerouslySetInnerHTML={{ __html: stylesheet.getRules(true) }} />]
    }
  }
}

export default MyDocument