import { LocalizedDatePipe } from './localized-data.pipe';

describe('LocalizedDataPipe', () => {
  it('create an instance', () => {
    const pipe = new LocalizedDatePipe();
    expect(pipe).toBeTruthy();
  });
});
