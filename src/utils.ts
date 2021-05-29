import { existsSync, mkdirSync } from "fs";
import { sync as rmDirSync } from "rimraf";
import { t } from "testcafe";

export async function enableDownloadForHeadlessChrome(t: TestController) {
  // @ts-ignore
  const browserConnection = t.testRun.browserConnection;
  const browser = browserConnection.provider.plugin.openedBrowsers[browserConnection.id];
  const client = await browser.browserClient.getActiveClient();
  const { Network, Browser } = client;

  const downloadDir = "C:\\Users\\hancim\\Documents\\test";
  if (existsSync(downloadDir)) {
    rmDirSync(downloadDir);
  }
  mkdirSync(downloadDir);

  // await Network.enable();

  await Browser.setDownloadBehavior({
    behavior: "allow",
    downloadPath: downloadDir,
  });
  console.log("Set Download dir to: " + downloadDir);

  t.ctx.downloadDir = downloadDir;
}
