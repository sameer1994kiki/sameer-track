const config = {
  url: "123",
  appID: "",
  userID: "",
  vue: {
    Vue: null,
    router: null,
  },
  react: {
    React: null,
    router: null,
  },
};

export default config;

export const setConfig = (options) => {
  for (const key in config) {
    if (options[key]) {
      config[key] = options[key];
    }
  }
};
