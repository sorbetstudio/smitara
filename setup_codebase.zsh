#!/bin/zsh

# Set the project name
project_name="smitara"

# Set the directory for the project
project_directory="."

# Create the project directory if it doesn't exist
mkdir -p "$project_directory"

# Change to the project directory
cd "$project_directory"

# Create the necessary files and directories
mkdir -p src/css src/js src/img

# Create the HTML file
cat > index.html <<EOL
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>$project_name</title>
  <link href="https://fonts.googleapis.com/css2?family=Mukta&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="src/css/styles.css">
</head>
<body>
  <!-- Your HTML content goes here -->
  <script src="src/js/script.js"></script>
</body>
</html>
EOL

# Create the CSS file
cat > src/css/styles.css <<EOL
/* Your styles go here */
body {
  font-family: 'Mukta', sans-serif;
}
EOL

# Create the JavaScript file
cat > src/js/script.js <<EOL
// Your JavaScript code goes here
EOL

# Create the README file
cat > README.md <<EOL
# $project_name

This is the codebase for the $project_name project.

## Getting Started

To get started with this project, follow these steps:

1. Clone the repository: \`git clone <repository-url>\`
2. Open the \`index.html\` file in your web browser.

## Project Structure

- \`index.html\`: The main HTML file.
- \`src/css/styles.css\`: The CSS file for styling.
- \`src/js/script.js\`: The JavaScript file for interactivity.
- \`src/img/\`: Directory for storing images.

EOL

# Initialize a Git repository
git init
git add .
git commit -m "Initial commit"

echo "Codebase setup complete. Happy coding!"