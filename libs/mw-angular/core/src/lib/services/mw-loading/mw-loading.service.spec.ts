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

      service.getIsLoading('general').subscribe(onNextEventSpy);
      service.start('general');
      service.stop('general');
      service.start('general');
      tick(debounceTime);
      service.stop('general');
      tick(debounceTime);

      expect(onNextEventSpy.calls.allArgs()).toEqual([[true], [false]]);
    }));

    it('should return boolean observable without tag', fakeAsync((): void => {
      const onNextEventSpy: jasmine.Spy = jasmine.createSpy('onNextEventSpy');

      service.getIsLoading('general').subscribe(onNextEventSpy);
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

      service.getIsLoading('general').subscribe(onNextEventSpy);
      tick(debounceTime);

      service.start('general');
      tick(debounceTime);

      service.start('general');
      tick(debounceTime);

      expect(onNextEventSpy.calls.allArgs()).toEqual([[false], [true]]);
    }));

    it('should start loading multiple tags', fakeAsync((): void => {
      const onNextEventSpyGeneral: jasmine.Spy = jasmine.createSpy('onNextEventSpyGeneral');
      const onNextEventSpyCustom: jasmine.Spy = jasmine.createSpy('onNextEventSpyCustom');

      service.getIsLoading('general').subscribe(onNextEventSpyGeneral);
      service.getIsLoading('custom-tag').subscribe(onNextEventSpyCustom);
      tick(debounceTime);
      service.start('general');
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

      service.getIsLoading('general').subscribe(onNextEventSpy);
      tick(debounceTime);
      service.startObservable('general').subscribe();
      tick(debounceTime);

      expect(onNextEventSpy.calls.allArgs()).toEqual([[false], [true]]);
    }));

    it('should not start loading when tag is null', fakeAsync((): void => {
      service.startObservable(null).subscribe();

      expect(service.getPoolInfo()).toEqual({});
    }));

    it('should start loading multiple tags', fakeAsync((): void => {
      const onNextEventSpyGeneral: jasmine.Spy = jasmine.createSpy('onNextEventSpyGeneral');
      const onNextEventSpyCustom: jasmine.Spy = jasmine.createSpy('onNextEventSpyCustom');

      service.getIsLoading('general').subscribe(onNextEventSpyGeneral);
      service.getIsLoading('custom-tag').subscribe(onNextEventSpyCustom);
      tick(debounceTime);
      service.startObservable('general').subscribe();
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

      service.getIsLoading('general').subscribe(onNextEventSpy);
      tick(debounceTime);

      service.start('general');
      tick(debounceTime);
      service.start('general');
      tick(debounceTime);
      service.stop('general');
      tick(debounceTime);
      service.stop('general');
      tick(debounceTime);

      service.start('general');
      tick(debounceTime);
      service.stop('general');
      tick(debounceTime);
      service.stop('general');
      tick(debounceTime);

      service.start('general');
      tick(debounceTime);
      service.stop('general');
      tick(debounceTime);

      expect(onNextEventSpy.calls.allArgs()).toEqual([[false], [true], [false], [true], [false], [true], [false]]);
    }));

    it('should stop loading multiple tags', fakeAsync((): void => {
      const onNextEventSpyGeneral: jasmine.Spy = jasmine.createSpy('onNextEventSpyGeneral');
      const onNextEventSpyCustom: jasmine.Spy = jasmine.createSpy('onNextEventSpyCustom');

      service.getIsLoading('general').subscribe(onNextEventSpyGeneral);
      service.getIsLoading('custom-tag').subscribe(onNextEventSpyCustom);
      tick(debounceTime);

      service.start('general');
      tick(debounceTime);
      service.start('general');
      tick(debounceTime);
      service.start('custom-tag');
      tick(debounceTime);
      service.stop('custom-tag');
      tick(debounceTime);
      service.stop('general');
      tick(debounceTime);

      expect(onNextEventSpyGeneral.calls.allArgs()).toEqual([[false], [true]]);

      expect(onNextEventSpyCustom.calls.allArgs()).toEqual([[false], [true], [false]]);
    }));
  });

  describe('destroy', (): void => {
    it('should clean tags', fakeAsync((): void => {
      const onNextEventSpy: jasmine.Spy = jasmine.createSpy('onNextEventSpy');
      const onCompleteEventSpy: jasmine.Spy = jasmine.createSpy('onCompleteEventSpy');

      service.getIsLoading('general').subscribe(onNextEventSpy, (): void => {}, onCompleteEventSpy);
      tick(debounceTime);
      service.start('general');
      tick(debounceTime);
      service.start('general');
      tick(debounceTime);
      service.destroy('general');
      tick(debounceTime);
      service.start('general');
      tick(debounceTime);
      service.stop('general');
      tick(debounceTime);

      expect(onNextEventSpy.calls.allArgs()).toEqual([[false], [true], [false]]);

      expect(onCompleteEventSpy).toHaveBeenCalled();
    }));

    it('should not fail on double destroy', fakeAsync((): void => {
      expect((): void => {
        service.start('general');
        service.destroy('general');
        service.destroy('general');
      }).not.toThrow();
    }));
  });

  describe('getPoolInfo', (): void => {
    it('should not start loading when tag is null', fakeAsync((): void => {
      service.startObservable('one').subscribe();
      service.startObservable('two').subscribe();
      service.startObservable('two').subscribe();

      expect(service.getPoolInfo()).toEqual({ one: 1, two: 2 });
    }));
  });
});
