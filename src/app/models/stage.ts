import { LevelSetup } from './level-setup';
import { NFC } from './nfc';


export interface Stage {
    level: number;
    nfc_title: string;
    level_setup: LevelSetup;
    nfc: NFC[];
}
