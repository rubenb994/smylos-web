import { StageService } from 'src/app/services/stage.service';
import { TestBed } from '@angular/core/testing';



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

    describe('setCurrenStage', () => {

        let methodSpy;
        let stageFinishedSpy;
        // let currenStageSpy;
        // let availableAudiosSpy;
        // let availableChatsSpy;

        beforeEach(() => {
            // stageFinishedSpy = spyOnProperty(service.$stageFinished, 'getValue', 'get');
        });

        it('should have been called', () => {
            const methodSpy = spyOn(service, 'setCurrentStage');

            service.setCurrentStage(1);

            expect(methodSpy).toHaveBeenCalledTimes(1);
        });

        it('should have set stageFinished to true', () => {
            const stageFinishedSpy = spyOnProperty(service.$stageFinished, 'getValue', 'get');

            service.setCurrentStage(1);

            expect(stageFinishedSpy).toBe(true);
        });

    });

});
