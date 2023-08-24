import adapter from "webrtc-adapter";

export const getUsetBrowser = () => {
  return adapter.browserDetails.browser;
};
