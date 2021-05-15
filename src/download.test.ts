import { Selector } from "testcafe";
import { enableDownloadForHeadlessChrome } from "./utils";

fixture`My download tests`.page("https://file-examples.com/index.php/sample-documents-download/sample-doc-download/").beforeEach(async (t) => {
  await t.resizeWindow(1920, 1080);
  await enableDownloadForHeadlessChrome(t);
});

test("Some cool test", async (t) => {
  console.log("yup!");
  await t.expect(Selector("#features").exists).ok("Seems like there page is missing key components!");
});

test("Test downloading to directory other than the default directory", async (t) => {
  const downloadButton = Selector("a").withAttribute("download", "file-sample_100kB.doc");

  await t.expect(Selector("#features").exists).ok("Seems like there page is missing key components!");
  await t.click(downloadButton);
});
