export class GameStateUtils {

    private static levelLocalStorage = 'currentLevel';
    private static potionAmountLocalStorage = 'potionAmount';

    public static getLevel(): number {
        const currentLevel: string = localStorage.getItem(this.levelLocalStorage);
        return currentLevel != null ? parseInt(currentLevel, 10) : 0;
    }

    public static setLevel(newLevel: number): void {
        if (newLevel == null) {
            return;
        }
        localStorage.setItem(this.levelLocalStorage, newLevel.toString());
    }

    public static getPotionAmount(): number {
        const currentLevel: string = localStorage.getItem(this.potionAmountLocalStorage);
        return currentLevel != null ? parseInt(currentLevel, 10) : 0;
    }

    public static setPotionAmount(newPotionAmount: number): void {
        if (newPotionAmount == null) {
            return;
        }
        localStorage.setItem(this.potionAmountLocalStorage, newPotionAmount.toString());
    }
}
