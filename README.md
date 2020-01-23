# GitHub Repository Search

A basic application making use of GitHub's GraphQL API to search repositories by keyword.

# Running

First create a [personal access token](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line) and store that in your local environment as REACT_APP_GITHUB_API_TOKEN. These scopes should be included:
```
user
public_repo
repo
repo_deployment
repo:status
read:repo_hook
read:org
read:public_key
read:gpg_key
```

Next, after cloning the repository:

* `yarn install`
* `yarn start`
* Navigate to http://localhost:3000 in your browser
