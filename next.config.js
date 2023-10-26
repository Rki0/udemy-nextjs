const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = ({ phase }) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      reactStrictMode: true,
      env: {
        MONGO_URL:
          "mongodb+srv://pky00823:pksy1228@cluster0.yolaj0d.mongodb.net/",
      },
    };
  }

  return {
    reactStrictMode: true,
    env: {
      MONGO_URL:
        "mongodb+srv://pky00823:pksy1228@cluster0.yolaj0d.mongodb.net/prod",
    },
  };
};
