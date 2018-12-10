// const CSSLoaderResolver = require('@vue/cli-service/lib/webpack/CSSLoaderResolver')

// const langs = ['css', 'scss'] // I only care about these languages for now
// const isProd = process.env.NODE_ENV === 'production'
// const cssExtract = false
// const postCSS = true
// const sourceMap = true

// const userOptions = {
//   lintOnSave: false,
//   dll: true,
//   css: {
//     extract: cssExtract,
//     sourceMap: sourceMap 
//   }
// }

// module.exports = Object.assign({}, userOptions, {
//   chainWebpack: config => {
//     // Customize CSS/SCSS loaders to handle relative paths
//     // Taking cues from @vue/cli-service/lib/config/css.js
//     const baseOptions = Object.assign({}, userOptions, {
//       sourceMap: sourceMap, // This was the missing option!
//       extract: isProd && userOptions.extract !== false,
//       minimize: isProd,
//       postcss: true
//     })

//     const resolver = new CSSLoaderResolver(baseOptions)

//     for (const lang of langs) {
//       // Remove existing rule
//       config.module.rules.delete(lang)

//       // Pull rule from default resolver for this language
//       const rule = resolver[lang]()

//       // Make an array of uses returned by the default resolver, in order
//       const newUses = []
//       for (const use of rule.use) {
//         newUses.push(use)

//         // Inject resolve-url-loader right after css-loader
//         if (use.loader === 'css-loader') {
//           newUses.push({
//             loader: 'resolve-url-loader',
//             options: {
//               sourceMap: sourceMap
//             }
//           })
//         }
//       }

//       // Set up a new rule for the language in this context
//       const context = config.module
//         .rule(lang)
//         .test(rule.test)
//         .include
//           .add(filepath => {
//             // Not ends with `.module.xxx`
//             return !/\.module\.[a-z]+$/.test(filepath)
//           })
//           .end()

//       // Now apply the new array of uses 
//       newUses.forEach(use => {
//         context
//           .use(use.loader)
//             .loader(use.loader)
//             .options(use.options)
//       })
//     }
//   }
// })