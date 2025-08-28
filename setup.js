// Mock CodeMirror editor
const editor = {
  getValue: jest.fn().mockReturnValue(''),
  setValue: jest.fn(),
  refresh: jest.fn()
};

// Make editor globally available
global.editor = editor;

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

// Mock DOM elements
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

// Mock clipboard API
if (!navigator.clipboard) {
  Object.defineProperty(navigator, 'clipboard', {
    value: {
      writeText: jest.fn().mockResolvedValue(undefined)
    },
    configurable: true
  });
}

// Mock window.confirm and window.alert
window.confirm = jest.fn().mockReturnValue(true);
window.alert = jest.fn();

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

// Use fake timers
jest.useFakeTimers(); 