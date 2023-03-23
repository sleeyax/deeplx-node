export function getRandomNumber(): number {
  const now = new Date().getTime();
  const randNum = Math.floor(Math.random() * 99999) + 8300000;
  return randNum * 1000 + (now % 1000);
}

export function getTimeStamp(counter: number): number {
  const ts = Date.now();

  if (counter !== 0) {
    counter = counter + 1;
    return ts - (ts % counter) + counter;
  } else {
    return ts;
  }
}

export function countLetterOccurrences(
  text: string | string[],
  letter: string
): number {
  if (Array.isArray(text)) {
    text = text.join('');
  }

  return text.split(letter).length - 1;
}
