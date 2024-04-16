document.addEventListener('DOMContentLoaded', function () {
  const taskForm = document.getElementById('taskForm');

  // Function to validate the form fields
  function validateForm() {
      const title = document.getElementById('taskTitle').value.trim();
      const description = document.getElementById('taskDescription').value.trim();
      const dueDate = document.getElementById('dueDate').value.trim();

      if (title === '' || description === '' || dueDate === '') {
          alert('Please fill in all fields.');
          return false;
      }

      return true;
  }

  // Event listener for form submission
  taskForm.addEventListener('submit', function (event) {
      event.preventDefault(); // Prevent default form submission

      if (validateForm()) {
          // If form validation passes, you can handle the form submission here
          alert('Form submitted successfully!'); // For demonstration purposes
          taskForm.reset(); // Reset the form
      }
  });
});
