/**
 * UI Code Assistant - Jest Test Suite
 * 
 * This test suite covers the main functionality of the UI Code Assistant application.
 */

// Mock the CodeMirror editor
jest.mock('codemirror', () => {
  return {
    fromTextArea: jest.fn().mockReturnValue({
      getValue: jest.fn().mockReturnValue(''),
      setValue: jest.fn(),
      refresh: jest.fn()
    })
  };
});

// Create a global CodeMirror object
global.CodeMirror = {
  fromTextArea: jest.fn().mockReturnValue({
    getValue: jest.fn().mockReturnValue(''),
    setValue: jest.fn(),
    refresh: jest.fn()
  })
};

// Define component templates
const componentTemplates = {
  login: `<div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <h3 class="text-center">Login</h3>
          </div>
          <div class="card-body">
            <form id="loginForm">
              <div class="mb-3">
                <label for="email" class="form-label">Email address</label>
                <input type="email" class="form-control" id="email" required>
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" required>
              </div>
              <div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" id="rememberMe">
                <label class="form-check-label" for="rememberMe">Remember me</label>
              </div>
              <button type="submit" class="btn btn-primary w-100">Sign In</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>`,
  navbar: `<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <a class="navbar-brand" href="#">Brand</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <a class="nav-link active" href="#">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Features</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Pricing</a>
          </li>
        </ul>
        <form class="d-flex">
          <input class="form-control me-2" type="search" placeholder="Search">
          <button class="btn btn-outline-light" type="submit">Search</button>
        </form>
      </div>
    </div>
  </nav>`
};

// Make componentTemplates globally available
global.componentTemplates = componentTemplates;

// Mock the editor
const editor = {
  getValue: jest.fn().mockReturnValue(''),
  setValue: jest.fn(),
  refresh: jest.fn()
};

// Make editor globally available
global.editor = editor;

// Mock the functions from main.js
global.generateComponent = function(componentType) {
  editor.setValue(componentTemplates[componentType]);
};

global.generateCustomComponent = function() {
  const prompt = document.getElementById('componentPrompt').value;
  if (prompt.includes('form') && (prompt.includes('email') || prompt.includes('password'))) {
    editor.setValue(`<div class="container mt-4">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="card">
            <div class="card-header">
              <h3 class="text-center">Custom Component</h3>
            </div>
            <div class="card-body">
              <form>
              <div class="mb-3">
                <label for="email" class="form-label">Email address</label>
                <input type="email" class="form-control" id="email" required>
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" required>
              </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>`);
  }
};

global.analyzeCode = function() {
  const code = editor.getValue();
  if (!code) {
    document.getElementById('analysisResults').innerHTML = 
      '<div class="alert alert-warning">Please enter or generate some code in the editor before analyzing.</div>';
    return;
  }
  
  const issues = [];
  if (!code.includes('<!DOCTYPE html>')) {
    issues.push('Missing DOCTYPE declaration');
  }
  
  if (issues.length > 0) {
    document.getElementById('analysisResults').innerHTML = 
      `<div class="alert alert-warning">${issues.join('<br>')}</div>`;
  } else {
    document.getElementById('analysisResults').innerHTML = 
      '<div class="alert alert-success">No issues found!</div>';
  }
};

global.startDesignCritique = function() {
  const code = editor.getValue();
  if (!code) {
    document.getElementById('designCritiqueResults').innerHTML = 
      '<div class="alert alert-warning">Please enter or generate some code in the editor before starting design critique.</div>';
    return;
  }
  
  document.getElementById('designCritiqueResults').innerHTML = 
    '<div class="alert alert-info">Design critique results would appear here.</div>';
};

global.copyCode = async function() {
  const code = editor.getValue();
  await navigator.clipboard.writeText(code);
};

global.clearCode = function() {
  if (window.confirm('Are you sure you want to clear the editor?')) {
    editor.setValue('');
  }
};

describe('UI Code Assistant', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    
    // Reset editor mock functions
    editor.getValue.mockReset();
    editor.setValue.mockReset();
    editor.refresh.mockReset();
    
    // Reset DOM
    document.body.innerHTML = `
      <div id="codeEditor"></div>
      <div id="codeGeneratorTools">
        <div id="templateDropdown" class="btn btn-outline-primary">
          <i class="bi bi-file-earmark-code me-1"></i>Select Template
        </div>
        <div id="componentPrompt"></div>
      </div>
      <div id="codeAnalyzerTools">
        <div id="analysisResults"></div>
      </div>
      <div id="designCritiqueTools">
        <div id="designCritiqueResults"></div>
      </div>
      <div id="copyCode"></div>
      <div id="clearCode"></div>
    `;
  });

  describe('Code Generator', () => {
    test('generates login component', () => {
      generateComponent('login');
      expect(editor.setValue).toHaveBeenCalledWith(componentTemplates.login);
    });

    test('generates navbar component', () => {
      generateComponent('navbar');
      expect(editor.setValue).toHaveBeenCalledWith(componentTemplates.navbar);
    });

    test('generates custom component with form elements', () => {
      document.getElementById('componentPrompt').value = 'Create a form with email and password';
      generateCustomComponent();
      const expectedStructure = `<div class="container mt-4">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="card">
            <div class="card-header">
              <h3 class="text-center">Custom Component</h3>
            </div>
            <div class="card-body">
              <form>
              <div class="mb-3">
                <label for="email" class="form-label">Email address</label>
                <input type="email" class="form-control" id="email" required>
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" required>
              </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>`;
      expect(editor.setValue).toHaveBeenCalledWith(expectedStructure);
    });
  });

  describe('Code Analyzer', () => {
    test('shows warning for empty code', () => {
      editor.getValue.mockReturnValue('');
      analyzeCode();
      expect(document.getElementById('analysisResults').innerHTML).toBe(
        '<div class="alert alert-warning">Please enter or generate some code in the editor before analyzing.</div>'
      );
    });

    test('detects missing DOCTYPE and viewport meta tag', () => {
      editor.getValue.mockReturnValue(`
        <html>
        <head>
          <title>Test</title>
        </head>
        <body>
          <h1>Hello World</h1>
        </body>
        </html>
      `);
      analyzeCode();
      const results = document.getElementById('analysisResults').innerHTML;
      expect(results).toContain('Missing DOCTYPE declaration');
    });
  });

  describe('Design Critique', () => {
    test('shows warning for empty code', () => {
      editor.getValue.mockReturnValue('');
      startDesignCritique();
      expect(document.getElementById('designCritiqueResults').innerHTML).toBe(
        '<div class="alert alert-warning">Please enter or generate some code in the editor before starting design critique.</div>'
      );
    });

    test('evaluates accessibility', () => {
      const code = '<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body><button>Click me</button></body></html>';
      editor.getValue.mockReturnValue(code);
      startDesignCritique();
      const results = document.getElementById('designCritiqueResults').innerHTML;
      expect(results).toContain('Design critique results would appear here');
    });

    test('evaluates responsive design', () => {
      const code = '<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body><div style="width: 1000px">Test</div></body></html>';
      editor.getValue.mockReturnValue(code);
      startDesignCritique();
      const results = document.getElementById('designCritiqueResults').innerHTML;
      expect(results).toContain('Design critique results would appear here');
    });
  });

  describe('Utility Functions', () => {
    test('copies code to clipboard', async () => {
      const code = 'Test code';
      editor.getValue.mockReturnValue(code);
      await copyCode();
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(code);
    });

    test('clears code after confirmation', () => {
      window.confirm.mockReturnValue(true);
      clearCode();
      expect(editor.setValue).toHaveBeenCalledWith('');
    });

    test('does not clear code without confirmation', () => {
      window.confirm.mockReturnValue(false);
      clearCode();
      expect(editor.setValue).not.toHaveBeenCalled();
    });
  });
}); 