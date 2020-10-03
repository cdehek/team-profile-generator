const Employee = require('../lib/Employee');

test('creates employee object', () => {
    const employee = new Employee();

    expect(typeof(employee)).toBe("object");
});