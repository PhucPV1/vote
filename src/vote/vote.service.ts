import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';

@Injectable()
export class VoteService {
  async vote(): Promise<void | string> {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    // Disable images and videos loading
    await page.setRequestInterception(true);
    page.on('request', (req) => {
      const resourceType = req.resourceType();
      // @ts-ignore
      if (resourceType === 'image' || resourceType === 'video') req.abort();
      else req.continue();
    });

    // Navigate the page to a URL
    await page.goto(
      'https://sanchoicongdantoancau.com/video-du-thi/26044/xem-chi-tiet',
      { timeout: 0 },
    );

    await page.evaluate(async () => {
      // return await document.getElementsByClassName('b__video--comment')[0].getElementsByTagName('div')[0].innerText
      const parentDiv =
        await document.getElementsByClassName('b__video--comment')[0];
      const mathProbElement = parentDiv.getElementsByTagName('div')[0];
      const mathProbStr = mathProbElement.innerText;

      // @ts-ignore
      document.getElementById('sum').value = eval(mathProbStr.slice(0, -2));
      setTimeout(() => {
        document.getElementById('bt_vote').click();
      }, 200);
    });

    // Set screen size
    await page.setViewport({ width: 1080, height: 1024 });
    // await browser.close();
    // this.vote();
    return 'Done!';
  }
}
