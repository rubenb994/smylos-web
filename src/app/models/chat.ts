import { ChatItem } from './chat-item';

export interface Chat {
    chat_id: string;
    chat_title: string;
    enable_items: string[];
    disable_items: string[];
    chat_items: ChatItem[];
}
