import AES from 'crypto-js/aes';
import Utf8 from 'crypto-js/enc-utf8';

export class DecryptionManager {
  decrypt(encData: string, key: string) {
    const decryptedDataString = AES.decrypt(encData, key).toString(Utf8);
    const decryptedData = JSON.parse(decryptedDataString);
    return decryptedData;
  }
}
