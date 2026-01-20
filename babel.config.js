module.exports = {
  presets: ["@react-native/babel-preset"],
  plugins: [
    ["module-resolver", {
      root: ["./"],
      extensions: [".js", ".jsx", ".ts", ".tsx"]
    }]
  ]
};
