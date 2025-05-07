import PricingForm from '@/pages/pricing/PricingForm.vue'
import tailwind from '@/styles/global.css?inline'
import { defineCustomElement } from 'vue'

const stylesheet = new CSSStyleSheet()
stylesheet.replaceSync(tailwind)
stylesheet.insertRule(`
:root {
  --font-lexend: 'Lexend', sans-serif;
  --font-secondary: 'DM Sans', sans-serif;
}
`)

// Find the first @layer rule that contains a @supports rule
// and report the index of that top‑level rule in the stylesheet
// while also returning the css-stylesheet-text of the innermost rule.
function fetchCSSInitializerStyles() {
  for (let i = 0; i < stylesheet.cssRules.length; i++) {
    const cssLayerRule = stylesheet.cssRules[i]

    if (cssLayerRule instanceof CSSLayerBlockRule) {
      for (const cssSupportsRule of cssLayerRule.cssRules) {
        if (cssSupportsRule instanceof CSSSupportsRule) {
          return {
            topLevelRuleIdx: i,
            cssText: `@layer properties { ${cssSupportsRule.cssRules[0]!.cssText} }`,
          }
        }
      }
    }
  }
  return null
}

// Apply the necessary initializer rules without the wrapping @support rule
const result = fetchCSSInitializerStyles()
if (result) {
  const { topLevelRuleIdx, cssText } = result

  stylesheet.insertRule(cssText)
  stylesheet.deleteRule(topLevelRuleIdx)
}

// Extend a custom element on top of the custom element returned by defineCustomElement
// in order to add the constructed stylesheet into the shadow dom
class PricingFormElement extends defineCustomElement(PricingForm) {
  constructor() {
    super()
    this.shadowRoot!.adoptedStyleSheets = [stylesheet]
    console.log(stylesheet)
  }
}

export { PricingFormElement }

export function register() {
  console.log('Web component registering...')
  window.customElements.define('pricing-form', PricingFormElement)
  console.log('Web component registered')
}
