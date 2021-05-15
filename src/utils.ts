import { existsSync, mkdirSync } from "fs";
import { sync as rmDirSync } from "rimraf";
import { t } from "testcafe";

export async function enableDownloadForHeadlessChrome(t: TestController) {
  // @ts-ignore
  const browserConnection = t.testRun.browserConnection;
  const browserClient = await browserConnection.provider.plugin.openedBrowsers[browserConnection.id].browserClient.getActiveClient();
  const { Page, Network } = browserClient;

  const downloadDir = "tests/src/testcafe-downloads";
  if (existsSync(downloadDir)) {
    rmDirSync(downloadDir);
  }
  mkdirSync(downloadDir);

  await Promise.all([Network.enable(), Page.enable()]);

  await Page.setDownloadBehavior({
    behavior: "allow",
    downloadPath: downloadDir,
  });
  console.log("Set Download dir to: " + downloadDir);

  t.ctx.downloadDir = downloadDir;
}
