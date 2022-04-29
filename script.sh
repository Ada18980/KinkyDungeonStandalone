USER=Ada18980
REPO=Bondage-College
BRANCH=master
COMMIT=318f6068d2514c7986cfa08afc7a1c6c05fd4563

printf "// Strategy:\n"\
"// 1. If commit= is specified, use that commit (using user/repo if specified)\n"\
"// 2. If v=latest, or any of user/repo/branch are specified, query github API for the latest commit from said branch\n"\
"// 3. Use the default commmit (stable) specified here\n"\
"const USER = %s'$USER';\n"\
"const REPO = %s'$REPO';\n"\
"const BRANCH = %s'$BRANCH';\n"\
"const COMMIT = %s'$COMMIT'; // Stable\n" > ./src/sourceBranch.js