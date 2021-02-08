import {FilenameExistsPipe} from './filename-exists.pipe';

describe('FilenameExistsPipe', () => {
  it('create an instance', () => {
    const pipe = new FilenameExistsPipe();
    expect(pipe).toBeTruthy();
  });
});
