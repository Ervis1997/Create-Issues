function saveIssue(evt) {
    evt.preventDefault();
  
    const summary = document.getElementById('summary').value;
    const description = document.getElementById('description').value;
    const priority = document.getElementById('priority').value;
    const assignedTo = document.getElementById('assignedTo').value;
    const id = Math.floor(Math.random() * 100000);
    const status = 'Open';
  
    const issue = {
      id,
      summary,
      description,
      priority,
      assignedTo,
      status,
    };
  
    if (localStorage.getItem('issues') == null) {
      let issues = [];
      issues.push(issue);
      localStorage.setItem('issues', JSON.stringify(issues));
    } else {
      let issues = JSON.parse(localStorage.getItem('issues'));
      issues.push(issue);
      localStorage.setItem('issues', JSON.stringify(issues));
    }
  
    document.getElementById('createIssueForm').reset();
  
    fetchIssues();
  }
  
  document
    .getElementById('createIssueForm')
    .addEventListener('submit', saveIssue);
  
  function setStatusClosed(id) {
    let issues = JSON.parse(localStorage.getItem('issues'));
  
    for (let i = 0; i < issues.length; i++) {
      if (issues[i].id == id) {
        issues[i].status = 'Closed';
      }
    }
  
    localStorage.setItem('issues', JSON.stringify(issues));
  
    fetchIssues();
  }
  
  function deleteIssue(id) {
    let issues = JSON.parse(localStorage.getItem('issues'));
  
    for (let i = 0; i < issues.length; i++) {
      if (issues[i].id == id) {
        issues.splice(i, 1);
      }
    }
  
    localStorage.setItem('issues', JSON.stringify(issues));
  
    fetchIssues();
  }
  
  function fetchIssues() {
    const issuesList = document.getElementById('issuesList');
    const issues = JSON.parse(localStorage.getItem('issues'));
  
    issuesList.innerHTML = '';
  
    for (let i = 0; i < issues.length; i++) {
      const id = issues[i].id;
      const summary = issues[i].summary;
      const description = issues[i].description;
      const priority = issues[i].priority;
      const assignedTo = issues[i].assignedTo;
      const status = issues[i].status;
  
      issuesList.innerHTML += `<div class="issue-card">
                  <h3>${summary}</h3>
                  <p class="label label-info">${status}</p>
                  <p>Description: ${description}</p>
                  <p>Priority: ${priority}</p>
                  <p>Assignee: ${assignedTo}</p>
                  <button class="btn btn-warning" onclick="setStatusClosed(${id})">Close</button>
                  <button class="btn btn-danger" onclick="deleteIssue(${id})">Delete</button>
              </div>`;
    }
  }
