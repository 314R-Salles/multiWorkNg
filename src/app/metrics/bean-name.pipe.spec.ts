import { BeanNamePipe } from './bean-name.pipe';

describe('BeanNamePipe', () => {
  it('create an instance', () => {
    const pipe = new BeanNamePipe();
    expect(pipe).toBeTruthy();
  });
});
