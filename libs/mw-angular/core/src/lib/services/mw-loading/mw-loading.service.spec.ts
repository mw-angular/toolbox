import { fakeAsync, tick } from '@angular/core/testing';

import { MwLoadingService } from './mw-loading.service';

describe('MwLoadingService', (): void => {
  let service: MwLoadingService;
  const debounceTime: number = 100;

  beforeEach((): void => {
    service = new MwLoadingService();
  });

  describe('getIsLoading', (): void => {
    it('should debounce', fakeAsync((): void => {
      const onNextEventSpy: jasmine.Spy = jasmine.createSpy('onNextEventSpy');

      service.getIsLoading().subscribe(onNextEventSpy);
      service.start();
      service.stop();
      service.start();
      tick(debounceTime);
      service.stop();
      tick(debounceTime);

      expect(onNextEventSpy.calls.allArgs()).toEqual([[true], [false]]);
    }));

    it('should return boolean observable without tag', fakeAsync((): void => {
      const onNextEventSpy: jasmine.Spy = jasmine.createSpy('onNextEventSpy');

      service.getIsLoading().subscribe(onNextEventSpy);
      tick(debounceTime);

      expect(onNextEventSpy.calls.allArgs()).toEqual([[false]]);
    }));

    it('should return boolean observable with custom tag', fakeAsync((): void => {
      const onNextEventSpy: jasmine.Spy = jasmine.createSpy('onNextEventSpy');

      service.getIsLoading('custom-tag').subscribe(onNextEventSpy);
      tick(debounceTime);

      expect(onNextEventSpy.calls.allArgs()).toEqual([[false]]);
    }));
  });

  describe('start', (): void => {
    it('should start loading multiple times', fakeAsync((): void => {
      const onNextEventSpy: jasmine.Spy = jasmine.createSpy('onNextEventSpy');

      service.getIsLoading().subscribe(onNextEventSpy);
      tick(debounceTime);

      service.start();
      tick(debounceTime);

      service.start();
      tick(debounceTime);

      expect(onNextEventSpy.calls.allArgs()).toEqual([[false], [true]]);
    }));

    it('should start loading multiple tags', fakeAsync((): void => {
      const onNextEventSpyGeneral: jasmine.Spy = jasmine.createSpy('onNextEventSpyGeneral');
      const onNextEventSpyCustom: jasmine.Spy = jasmine.createSpy('onNextEventSpyCustom');

      service.getIsLoading().subscribe(onNextEventSpyGeneral);
      service.getIsLoading('custom-tag').subscribe(onNextEventSpyCustom);
      tick(debounceTime);
      service.start();
      service.start('custom-tag');
      tick(debounceTime);
      service.stop('custom-tag');
      tick(debounceTime);

      expect(onNextEventSpyGeneral.calls.allArgs()).toEqual([[false], [true]]);

      expect(onNextEventSpyCustom.calls.allArgs()).toEqual([[false], [true], [false]]);
    }));
  });

  describe('startObservable', (): void => {
    it('should start loading', fakeAsync((): void => {
      const onNextEventSpy: jasmine.Spy = jasmine.createSpy('onNextEventSpy');

      service.getIsLoading().subscribe(onNextEventSpy);
      tick(debounceTime);
      service.startObservable().subscribe();
      tick(debounceTime);

      expect(onNextEventSpy.calls.allArgs()).toEqual([[false], [true]]);
    }));

    it('should start loading multiple tags', fakeAsync((): void => {
      const onNextEventSpyGeneral: jasmine.Spy = jasmine.createSpy('onNextEventSpyGeneral');
      const onNextEventSpyCustom: jasmine.Spy = jasmine.createSpy('onNextEventSpyCustom');

      service.getIsLoading().subscribe(onNextEventSpyGeneral);
      service.getIsLoading('custom-tag').subscribe(onNextEventSpyCustom);
      tick(debounceTime);
      service.startObservable().subscribe();
      service.startObservable('custom-tag').subscribe();
      tick(debounceTime);
      service.stop('custom-tag');
      tick(debounceTime);

      expect(onNextEventSpyGeneral.calls.allArgs()).toEqual([[false], [true]]);

      expect(onNextEventSpyCustom.calls.allArgs()).toEqual([[false], [true], [false]]);
    }));
  });

  describe('stop', (): void => {
    it('should throw if loading subject not exist', fakeAsync((): void => {
      expect((): void => {
        service.stop('not-existed-tag');
      }).toThrowError('Loading subject was not created for tag: not-existed-tag.');
    }));

    it('should stop loading multiple times', fakeAsync((): void => {
      const onNextEventSpy: jasmine.Spy = jasmine.createSpy('onNextEventSpy');

      service.getIsLoading().subscribe(onNextEventSpy);
      tick(debounceTime);

      service.start();
      tick(debounceTime);
      service.start();
      tick(debounceTime);
      service.stop();
      tick(debounceTime);
      service.stop();
      tick(debounceTime);

      service.start();
      tick(debounceTime);
      service.stop();
      tick(debounceTime);
      service.stop();
      tick(debounceTime);

      service.start();
      tick(debounceTime);
      service.stop();
      tick(debounceTime);

      expect(onNextEventSpy.calls.allArgs()).toEqual([[false], [true], [false], [true], [false], [true], [false]]);
    }));

    it('should stop loading multiple tags', fakeAsync((): void => {
      const onNextEventSpyGeneral: jasmine.Spy = jasmine.createSpy('onNextEventSpyGeneral');
      const onNextEventSpyCustom: jasmine.Spy = jasmine.createSpy('onNextEventSpyCustom');

      service.getIsLoading().subscribe(onNextEventSpyGeneral);
      service.getIsLoading('custom-tag').subscribe(onNextEventSpyCustom);
      tick(debounceTime);

      service.start();
      tick(debounceTime);
      service.start();
      tick(debounceTime);
      service.start('custom-tag');
      tick(debounceTime);
      service.stop('custom-tag');
      tick(debounceTime);
      service.stop();
      tick(debounceTime);

      expect(onNextEventSpyGeneral.calls.allArgs()).toEqual([[false], [true]]);

      expect(onNextEventSpyCustom.calls.allArgs()).toEqual([[false], [true], [false]]);
    }));
  });

  describe('destroy', (): void => {
    it('should clean tags', fakeAsync((): void => {
      const onNextEventSpy: jasmine.Spy = jasmine.createSpy('onNextEventSpy');
      const onCompleteEventSpy: jasmine.Spy = jasmine.createSpy('onCompleteEventSpy');

      service.getIsLoading().subscribe(onNextEventSpy, (): void => {}, onCompleteEventSpy);
      tick(debounceTime);
      service.start();
      tick(debounceTime);
      service.start();
      tick(debounceTime);
      service.destroy();
      tick(debounceTime);
      service.start();
      tick(debounceTime);
      service.stop();
      tick(debounceTime);

      expect(onNextEventSpy.calls.allArgs()).toEqual([[false], [true], [false]]);

      expect(onCompleteEventSpy).toHaveBeenCalled();
    }));

    it('should not fail on double destroy', fakeAsync((): void => {
      expect((): void => {
        service.start();
        service.destroy();
        service.destroy();
      }).not.toThrow();
    }));
  });
});
