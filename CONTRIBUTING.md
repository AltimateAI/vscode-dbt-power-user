# Contributing Guidelines

Thank you for your interest in contributing to the vscode-dbt-power-user extension! We greatly appreciate the dedication of our community members in helping us enhance this project.

## Bug Reports and Feature Requests

One of the simplest ways to contribute is by sharing your thoughts with us. If you come across any bugs or have ideas for new features or improvements, please start a discussion in our dedicated channel: `#tools-dbt-power-user` on the [dbt community Slack](https://www.getdbt.com/community/join-the-community/). Additionally, take a look at the [GitHub issues](https://github.com/innoverio/vscode-dbt-power-user/issues) to see if the topic has already been raised. If not, feel free to create a new issue. Your detailed bug reports, along with steps to reproduce the issue and relevant environment information, are invaluable to us and other contributors.

## How to Contribute

We warmly welcome contributions from our active community! If you're interested in contributing to the extension, follow these steps:

1. **Fork the Repository:** Start by forking the repository to your own GitHub account.

2. **Clone the Repository:** Clone your forked repository to your local machine:

   ```bash
   git clone https://github.com/your-username/vscode-dbt-power-user.git
   cd vscode-dbt-power-user
   ```

3. **Set Up Development Environment:** Setting up the development environment for the vscode-dbt-power-user extension is designed to be straightforward. Most of the setup is already prepared, but you might need to follow a few steps to ensure a smooth experience:

   1. **Install Node.js and npm:** If you haven't already, make sure you have Node.js and npm (Node Package Manager) installed on your machine. You can download and install them from the [official Node.js website](https://nodejs.org/).

   2. **Install Required Node Packages:** In the root directory of your cloned repository (`vscode-dbt-power-user`), open a terminal and run the following command to install the required Node.js packages:

      ```bash
      npm install
      ```

   3. **Install Java Runtime:** Some functionalities of the extension require Java Runtime to be installed on your machine. If you don't already have Java installed, you will be prompted by VSCode with a link to download and install it.

   4. **Start Debugging:** In the Visual Studio Code interface, navigate to the "Run and Debug" sidebar. Click on "Launch Extension" to start the debugging process. This will open a new window with the vscode-dbt-power-user extension installed. During this debug session, the existing installation of dbt-power-user will be overridden, allowing you to test your changes without affecting the installed extension.

   5. **Open a dbt Project as a Target:** To effectively test your changes, open a dbt project as a target. You can either use an existing project or create a new virtual environment with the necessary dbt package installed. Creating a virtual environment ensures a clean environment that won't interfere with any existing dbt installations. It's important to note that the vscode-dbt-power-user extension itself does not require any Python/dbt installation.

   6. **Explore and Test:** With the extension debug window open and your dbt project loaded, take the time to explore and test your changes. Verify that the extension behaves as expected and that your changes integrate seamlessly.

   Following these steps will help you establish a productive development environment for contributing to the vscode-dbt-power-user extension. If you encounter any issues during setup, don't hesitate to reach out to the community for assistance.

4. **Make Your Changes:** Feel free to implement the changes or new features you have in mind. If you're new to contributing, our [contributing page](https://github.com/innoverio/vscode-dbt-power-user/contribute) is a great starting point. Choose an issue listed there and familiarize yourself with the extension.

5. **Thorough Testing:** Test your changes thoroughly to ensure they work as expected.

6. **Clear Commit Messages:** Write clear and descriptive commit messages.

7. **Push Changes:** Push the changes to your forked repository.

8. **Create a Pull Request:** Submit a pull request to the main repository, explaining the purpose and details of your changes.

## Code Style and Formatting

Maintaining consistent code style and formatting is crucial for readability and collaboration. Ensure your code aligns with the existing conventions and formatting guidelines used in the project.

## Adding New Features or Fixing Bugs

When introducing new features or addressing bugs, consider the current codebase and community needs. Engage in discussions with fellow community members if you're unsure about design decisions or implementation details.

## Testing

Comprehensive testing is essential for maintaining the extension's stability and reliability. While adding new features or fixing bugs, run tests locally helps ensure your changes don't introduce regressions.

## Security

If you identify security vulnerabilities or potential issues, please report them responsibly. Reach out to the maintainers directly to discuss and report the issue privately.

## Credits and Acknowledgments

Our heartfelt thanks go out to all the contributors and our vibrant community members who have supported this project. Your contributions are a cornerstone of our progress. We also want to acknowledge that the dbt logo is a trademark of dbt Labs, Inc.

## Feedback and Communication

Open communication is a core value of our community. Join discussions on our GitHub repository, participate in issue discussions, and provide feedback on proposed changes.

Thank you for being a vital part of our open-source community! Your contributions help us enhance the vscode-dbt-power-user extension, providing an improved experience for all users.
