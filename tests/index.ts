// Spy and mock native objects
jest.spyOn(global, 'Date').mockReturnValue(new Date())
jest.spyOn(console, 'info').mockImplementation(jest.fn)

