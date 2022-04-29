// Strategy:
// 1. If commit= is specified, use that commit (using user/repo if specified)
// 2. If v=latest, or any of user/repo/branch are specified, query github API for the latest commit from said branch
// 3. Use the default commmit (stable) specified here

const USER = 'Ada18980';
const REPO = 'Bondage-College';
const BRANCH = 'master';
const COMMIT = '318f6068d2514c7986cfa08afc7a1c6c05fd4563'; // Stable