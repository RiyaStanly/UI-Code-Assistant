/**
 * Basic test file to verify Jest setup
 */

describe('Basic Test Suite', () => {
  test('Jest is working correctly', () => {
    expect(true).toBe(true);
  });

  test('DOM elements are mocked correctly', () => {
    expect(document.getElementById('codeEditor')).not.toBeNull();
    expect(document.getElementById('codeGeneratorTools')).not.toBeNull();
    expect(document.getElementById('codeAnalyzerTools')).not.toBeNull();
    expect(document.getElementById('designCritiqueTools')).not.toBeNull();
  });

  test('Mock functions are working', () => {
    // Test window.confirm mock
    expect(window.confirm('Test message')).toBe(true);
    expect(window.confirm).toHaveBeenCalledWith('Test message');

    // Test window.alert mock
    window.alert('Test alert');
    expect(window.alert).toHaveBeenCalledWith('Test alert');
  });
}); 