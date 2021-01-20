import { DsIconSvgClass } from '../entities/ds-icon-svg-class';

import { prepareClassListHelper } from './prepare-class-list.helper';

describe('prepareClassListHelper', (): void => {
  describe('string input', (): void => {
    it('should handle classes separated by space', (): void => {
      const svgClass: DsIconSvgClass = 'class1 class2 class3';
      const result: string[] = prepareClassListHelper(svgClass);

      expect(result).toEqual(['class1', 'class2', 'class3']);
    });

    it('should handle one class', (): void => {
      const svgClass: DsIconSvgClass = 'class1';
      const result: string[] = prepareClassListHelper(svgClass);

      expect(result).toEqual(['class1']);
    });

    it('should handle empty string', (): void => {
      const svgClass: DsIconSvgClass = '';
      const result: string[] = prepareClassListHelper(svgClass);

      expect(result).toEqual([]);
    });

    it('should handle space string', (): void => {
      const svgClass: DsIconSvgClass = ' ';
      const result: string[] = prepareClassListHelper(svgClass);

      expect(result).toEqual([]);
    });

    it('should handle string with extra spaces', (): void => {
      const svgClass: DsIconSvgClass = ' class1  class2 class3   ';
      const result: string[] = prepareClassListHelper(svgClass);

      expect(result).toEqual(['class1', 'class2', 'class3']);
    });
  });

  describe('string array input', (): void => {
    it('should handle string array', (): void => {
      const svgClass: DsIconSvgClass = ['class1', 'class2', 'class3'];
      const result: string[] = prepareClassListHelper(svgClass);

      expect(result).toEqual(['class1', 'class2', 'class3']);
    });

    it('should handle string array with empty elements', (): void => {
      const svgClass: DsIconSvgClass = ['class1', '', 'class2', ' ', 'class3'];
      const result: string[] = prepareClassListHelper(svgClass);

      expect(result).toEqual(['class1', 'class2', 'class3']);
    });
  });

  describe('set of strings input', (): void => {
    it('should handle Set of strings', (): void => {
      const svgClass: DsIconSvgClass = new Set<string>().add('class1').add('class2').add('class3');
      const result: string[] = prepareClassListHelper(svgClass);

      expect(result).toEqual(['class1', 'class2', 'class3']);
    });
  });

  describe('object input', (): void => {
    it('should handle simple object', (): void => {
      const svgClass: DsIconSvgClass = {
        class1: true,
        class2: false,
        class3: true,
      };
      const result: string[] = prepareClassListHelper(svgClass);

      expect(result).toEqual(['class1', 'class3']);
    });

    it('should handle object of strings with spaces', (): void => {
      const svgClass: DsIconSvgClass = {
        'class1 class2': false,
        'class3 class4 class5': true,
        'class6': true,
        ' class7   class8  ': true,
      };
      const result: string[] = prepareClassListHelper(svgClass);

      expect(result).toEqual(['class3', 'class4', 'class5', 'class6', 'class7', 'class8']);
    });
  });
});
