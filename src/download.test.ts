import { Selector, ClientFunction } from "testcafe";
import { enableDownloadForHeadlessChrome } from "./utils";

fixture`My download tests`.page("file://C:/Users/hancim/Desktop/testcafe-test.html").beforeEach(async (t) => {
  console.log("Another test starts..");
});

export const overrideWindowOpen = ClientFunction(() => {
  // @ts-ignore
  window.open = function (url) {
    // @ts-ignore
    window.__lastWindowOpenUrl = url;
  };
});

// @ts-ignore
export const getLastWindowOpenUrl = ClientFunction(() => window.__lastWindowOpenUrl);

test("First download test", async (t) => {
  const downloadButton = Selector("button");

  await t.expect(Selector("button").exists).ok("Seems like there page is missing key components!");
  await overrideWindowOpen();
  await t.click(downloadButton);
}).before(async (t) => {
  // await enableDownloadForHeadlessChrome(t);
  await t.resizeWindow(1920, 1080);
});
