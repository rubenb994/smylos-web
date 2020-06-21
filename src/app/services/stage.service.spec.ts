import { Audio } from 'src/app/models/audio';
import { Chat } from 'src/app/models/chat';
import { GameStateUtils } from 'src/app/utils/game-state-util';
import { Stage } from 'src/app/models/stage';
import { StageService } from 'src/app/services/stage.service';
import { TestBed } from '@angular/core/testing';
import { skip } from 'rxjs/operators';


describe('StageService', () => {
    let service: StageService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(StageService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should have loaded stages', () => {
        expect(service.stages).not.toBe(null);
    });

    const amountOfExpectedStages = 5;
    it(`should contain ${amountOfExpectedStages} stages`, () => {
        expect(service.stages.length).toBe(amountOfExpectedStages);
    });

    describe('setCurrentStage', () => {

        const currentStage = 1;

        it('should have been called', () => {
            const methodSpy = spyOn(service, 'setCurrentStage');

            service.setCurrentStage(currentStage);

            expect(methodSpy).toHaveBeenCalledTimes(1);
        });

        it('should have set stageFinished to true', () => {
            service.$stageFinished.pipe(skip(1)).subscribe(value => expect(value).toBe(false));
            service.setCurrentStage(currentStage);
        });

        it('should have called clearCompletedChatsAudios', () => {
            const methodSpy = spyOn<any>(service, 'clearCompletedChatsAudios');
            service.setCurrentStage(currentStage);

            expect(methodSpy).toHaveBeenCalledTimes(1);
        });

        it(`should have set currentStage to ${currentStage}`, () => {
            service.$currentStage.pipe(skip(1)).subscribe(value => expect(value.level).toBe(1));
            service.setCurrentStage(currentStage);
        });

        it(`should have called setAvailableAudios`, () => {
            const methodSpy = spyOn<any>(service, 'setAvailableAudios');
            service.setCurrentStage(currentStage);

            expect(methodSpy).toHaveBeenCalledTimes(1);
        });

        it(`should have called setAvailableChats`, () => {
            const methodSpy = spyOn<any>(service, 'setAvailableChats');
            service.setCurrentStage(currentStage);

            expect(methodSpy).toHaveBeenCalledTimes(1);
        });

        const finalStage = 5;
        it(`should have set game finished to true for stage ${finalStage}`, () => {
            service.$gameFinished.pipe(skip(1)).subscribe(value => expect(value).toBe(true));
            service.setCurrentStage(finalStage);
        });
    });

    describe('getNFCForLocation', () => {

        const validLocationId = 1;
        const invalidLocationId = 0;
        const currentLevel = 1;

        beforeEach(() => {
            // Set the current level which the methods relies on.
            GameStateUtils.setLevel(1);
        });

        it('should have been called', () => {
            const methodSpy = spyOn(service, 'getNFCForLocation');

            service.getNFCForLocation(validLocationId);

            expect(methodSpy).toHaveBeenCalledTimes(1);
        });

        it('should have found nfcForLocation for valid id', () => {
            const result = service.getNFCForLocation(validLocationId);

            expect(result).not.toBe(null);
            expect(result.nfc_id).toEqual(1);
        });

        it('should not have found nfcForLocation for invalid id', () => {
            const result = service.getNFCForLocation(invalidLocationId);

            expect(result).toBe(null);
        });

        it('should not have found nfcForLocation when current level is invalid', () => {
            GameStateUtils.setLevel(-1);
            const result = service.getNFCForLocation(invalidLocationId);
            expect(result).toBe(null);
        });
    });

    describe('removeAvailableChat', () => {
        const chat: Chat = {
            chat_id: 'C_0',
            chat_items: [],
            chat_title: '',
            enable_items: [],
            disable_items: []
        };

        it('should have been called', () => {
            const methodSpy = spyOn(service, 'removeAvailableChat');

            service.removeAvailableChat(chat);
            expect(methodSpy).toHaveBeenCalledTimes(1);
        });

        it('should have exited for invalidAvailableChat', () => {
            const methodSpy = spyOn<any>(service, 'removeDisabledChatsFromAvailableChats');

            service.removeAvailableChat(chat);
            expect(methodSpy).toHaveBeenCalledTimes(0);
        });
    });

    describe('removeAvailableAudio', () => {
        const audio: Audio = {
            audio_id: 'A_0',
            audio_title: '',
        };

        it('should have been called', () => {
            const methodSpy = spyOn(service, 'removeAvailableAudio');

            const result = service.removeAvailableAudio(audio);
            expect(methodSpy).toHaveBeenCalledTimes(1);
        });

        it('should have exited for invalidAvailableAudio', () => {
            const methodSpy = spyOn<any>(service, 'removeDisabledAudiosFromAvailableAudios');

            service.removeAvailableAudio(audio);
            expect(methodSpy).toHaveBeenCalledTimes(0);
        });
    });


});
