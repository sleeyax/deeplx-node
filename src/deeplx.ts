import c from 'centra';
import { RPC_URL } from './constants';
import { countLetterOccurrences, getRandomNumber, getTimeStamp } from './utils';
import { isValidLanguageCode } from './validation';

export class Deeplx {
  private _sequenceId: number;

  constructor() {
    this._sequenceId = getRandomNumber();
  }

  async translate(
    sourceText: string | string[],
    sourceLanguage: string,
    targetLanguage: string
  ) {
    sourceText = !Array.isArray(sourceText) ? sourceText.trim() : sourceText;
    sourceLanguage = sourceLanguage.toUpperCase();
    targetLanguage = targetLanguage.toUpperCase();

    if (sourceText === '') {
      throw new Error('Source text may not be empty!');
    }

    if (
      !isValidLanguageCode(sourceLanguage) ||
      !isValidLanguageCode(targetLanguage)
    ) {
      throw new Error(
        `One or more invalid language codes provided! Source: ${sourceLanguage}, target: ${targetLanguage}`
      );
    }

    this._sequenceId += 1;

    const payload = {
      jsonrpc: '2.0',
      method: 'LMT_handle_texts',
      id: this._sequenceId,
      params: {
        texts: Array.isArray(sourceText)
          ? sourceText.map((text) => ({
              text,
              requestAlternatives: 3,
            }))
          : [
              {
                text: sourceText,
                requestAlternatives: 3,
              },
            ],
        splitting: 'newlines',
        lang: {
          source_lang_user_selected: sourceLanguage,
          target_lang: targetLanguage,
        },
        timestamp: getTimeStamp(
          countLetterOccurrences(sourceText, 'i')
        ),
        commonJobParams: {
          wasSpoken: false,
          transcribeAS: '',
        },
      },
    };

    let json = JSON.stringify(payload);

    // add space where necessary
    if ((this._sequenceId + 5) % 29 === 0 || (this._sequenceId + 3) % 13 === 0) {
      json = json.replace('"method":"', '"method" : "');
    } else {
      json = json.replace('"method":"', '"method": "');
    }

    const res = await c(RPC_URL, 'POST')
      .header({
        'Content-Type': 'applic%ation/json',
        Accept: '*/*',
        'x-app-os-name': 'iOS',
        'x-app-os-version': '16.3.0',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'x-app-device': 'iPhone13,2',
        'User-Agent': 'DeepL-iOS/2.6.0 iOS 16.3.0 (iPhone13,2)',
        'x-app-build': '353933',
        'x-app-version': '2.6',
        Connection: 'keep-alive',
      })
      .body(json)
      .send();

    if (res.statusCode === 429) {
      throw new Error('Too many requests!');
    }

    if (res.statusCode === 413) {
      throw new Error('Too many characters in source text!');
    }

    const resBody = await res.json();

    if (resBody.error?.code == -32600) {
      throw new Error('Unsupported target language!');
    }

    const texts = resBody.result.texts.map(
      (text: { text: string }) => text.text
    );

    return texts;
  }
}
