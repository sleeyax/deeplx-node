import Deeplx from '../src';

async function main() {
  const deeplx = new Deeplx();
  let texts = await deeplx.translate('hello world', 'en', 'nl');
  console.log(texts); // ['hallo wereld']
  texts = await deeplx.translate(['hello', 'world'], 'en', 'nl');
  console.log(texts); // ['hallo', 'wereld']
}

main();
