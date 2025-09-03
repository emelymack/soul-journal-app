module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"], // si usás Expo
    plugins: [
      [
        "module-resolver",
        {
          root: ["./src"],
          alias: {
            "@": "./src", 
            "@components": "./src/components",
            "@screens": "./src/screens",
            "@utils": "./src/utils",
            "@global": "./src/global",
            "@assets": "./assets",
          },
        },
      ],
    ],
  };
};
