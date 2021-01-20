const fs = require('fs');

const message = fs.readFileSync(process.env.HUSKY_GIT_PARAMS, 'utf-8');

if (!/^#\d+\s.{5,100}/.test(message)) {
  console.log(`
    Commit message should follow the pattern:
    #<ISSUE> <SUBJECT>

    Where is:
    ISSUE - issue number
    SUBJECT - short description of changes, at least 5 characters, max 100
      * use the imperative, present tense: "change" not "changed" nor "changes"
      * don't capitalize first letter
      * no dot (.) at the end

    Example: #77 some beautiful feature implementation
  `);

  process.exit(1);
}

const { execSync } = require('child_process');

function getCurrentBranch() {
  const branches = execSync('git branch', { encoding: 'utf8' });
  return branches
    .split('\n')
    .find((b) => b.charAt(0) === '*')
    .trim()
    .substring(2);
}

if (!/^#\d+\/[a-z0-9-]{5,50}/.test(getCurrentBranch())) {
  console.log(`
    Branch name should follow the pattern:
    #<ISSUE>/<SUBJECT>

    Where is:
    ISSUE - issue number
    SUBJECT - [a-z0-9-] at least 5 characters, max 50

    Example: #77/some-feature-implementation
  `);

  process.exit(1);
}
