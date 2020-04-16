import { Chat } from './chat';
import { Audio } from './audio';

export interface NFC {
    nfc_id: number;
    nfc_title: string;
    chat: Chat;
    audios: Audio[];
}
