import { FilterPacientePipe } from './filter-paciente.pipe';

describe('FilterPacientePipe', () => {
  it('create an instance', () => {
    const pipe = new FilterPacientePipe();
    expect(pipe).toBeTruthy();
  });
});
