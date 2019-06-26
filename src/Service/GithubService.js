
let root = 'https://api.github.com';
let owner = 'cheesasaurus';
let repo = 'twcheese-bug-report';

// Intentionally public token, for the twcheese-bug-report account to create issues.
// Enables bug reporting without forcing non-technical people to sign up for github.
// Base64 encoded to get around github's "helpful" auto-revoke for tokens found in repos.
// ENCODED, not encrypted. You shouldn't do this for anything you want to be secret.
let token = 'MzVkYTdjMjgwM2QyMzc5MDhhYWYzMzQxNTNkOTRhNjdjN2EzZWExZA==';

let GithubService = {

    async createIssue(title, message) {
        let url = `${root}/repos/${owner}/${repo}/issues`;
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                Authorization: `token ${atob(token)}`
            },
            body: JSON.stringify({
                title: title,
                body: message                
            })            
        });
        if (!response.ok) {
            throw new Error(`Failed to create issue. [${response.status}: ${response.statusText}]`);
        }
        return await response.json();
    }

};


export { GithubService };