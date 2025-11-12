// Get the button and task table body
var createTaskBtn = document.getElementById("createTaskBtn");
var taskTableBody = document.querySelector("#taskTable tbody");

// Add event listener for button click 
createTaskBtn.addEventListener("click", function() {
  // Create a new row
  var newRow = document.createElement("tr");

  // Create and adds each cell for the table data
  var titleCell = document.createElement("td");
  titleCell.contentEditable = "true";
  titleCell.textContent = "New Task";

  var descCell = document.createElement("td");
  descCell.contentEditable = "true";
  descCell.textContent = "Task description";

  var dateCell = document.createElement("td");
  dateCell.contentEditable = "true";
  dateCell.textContent = "YYYY-MM-DD";

  var priorityCell = document.createElement("td");
  priorityCell.contentEditable = "true";
  priorityCell.textContent = "Medium";

  var statusCell = document.createElement("td");
  statusCell.contentEditable = "true";
  statusCell.textContent = "Not Started";

  // Create delete button 
  var deleteCell = document.createElement("td");
  var deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "deleteBtn";
  deleteCell.appendChild(deleteBtn);

  // Append all cells to the row
  newRow.appendChild(titleCell);
  newRow.appendChild(descCell);
  newRow.appendChild(dateCell);
  newRow.appendChild(priorityCell);
  newRow.appendChild(statusCell);
  newRow.appendChild(deleteCell);

  // Append row to table body
  taskTableBody.appendChild(newRow);

  // Delete button event listener
  deleteBtn.addEventListener("click", function() {
    newRow.remove();
  });
});
