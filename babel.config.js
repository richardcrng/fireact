const presets = [
  [
    "@babel/env",
    {
      targets: {
        edge: "17",
        firefox: "60",
        chrome: "67",
        safari: "11.1",
        node: "current"
      },
      useBuiltIns: "usage",
    },
  ],
  "@babel/typescript"
];

const plugins = [
  "@babel/proposal-class-properties",
  "@babel/proposal-object-rest-spread"
]

module.exports = { plugins, presets };