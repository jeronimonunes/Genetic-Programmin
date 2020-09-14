import { depth } from '../compute-engine';
import { fullTreeGenerator } from './genetic-programming';

describe('Test Genetic programming', () => {

  it('should generate balanced trees', () => {
    for (let i = 10; i > 0; i--) {
      const expr = fullTreeGenerator(i, 0, { min: 0, max: 0 }, 1);
      expect(depth(expr)).toEqual(i);
    }
  });

  // it('should generate balanced trees', () => {
  //   for (let i = 10; i > 0; i--) {
  //     const expr = fullTreeGenerator(i, 0, { min: 0, max: 0 }, 1);
  //     expect(depth(expr)).toEqual(i);
  //   }
  // });

});
