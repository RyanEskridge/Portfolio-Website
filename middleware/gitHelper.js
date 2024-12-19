const { exec } = require('child_process');

/**
 * Gets the latest commit message from the local Git log.
 * @returns {Promise<string>} A promise that resolves with the latest commit message or rejects with an error.
 */
function getLatestCommitMessage() {
  return new Promise((resolve, reject) => {
    exec('git log -1 --pretty=%B', (error, stdout, stderr) => {
      if (error) {
        return reject(`Error executing Git command: ${stderr || error.message}`);
      }
      resolve(stdout.trim()); // Trim to remove unnecessary newlines or spaces
    });
  });
}

module.exports = { getLatestCommitMessage };
