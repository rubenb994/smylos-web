export interface ChatItem {
    id: number;
    next: number[];
    type: string;
    sender: string;
    titles: string[];
    messages: string[];
    audio_message: string;
}
