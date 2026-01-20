const fs = require("fs");
const path = require("path");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;

function isReactComponent(node) {
    return (
        (node.type === "FunctionDeclaration" ||
            node.type === "FunctionExpression" ||
            node.type === "ArrowFunctionExpression") &&
        node.params &&
        node.body
    );
}

function checkFile(file) {
    try {
        const code = fs.readFileSync(file, "utf8");

        const ast = parser.parse(code, {
            sourceType: "module",
            plugins: [
                "jsx",
                "typescript",
                "classProperties",
                "optionalChaining",
                "nullishCoalescingOperator",
            ],
        });

        let foundComponent = false;

        traverse(ast, {
            ExportNamedDeclaration({ node }) {
                if (
                    node.declaration &&
                    isReactComponent(node.declaration)
                ) {
                    foundComponent = true;
                }
            },
            ExportDefaultDeclaration({ node }) {
                if (isReactComponent(node.declaration)) {
                    foundComponent = true;
                }
            },
        });

        if (!foundComponent) {
            console.log("⚠️ No component export found in:", file);
        }
    } catch (err) {
        console.log("❌ Parse error in", file, err.message);
    }
}

function traverseDir(dir) {
    fs.readdirSync(dir).forEach((name) => {
        const full = path.join(dir, name);

        if (fs.lstatSync(full).isDirectory()) {
            traverseDir(full);
        } else if (full.match(/\.(js|jsx|ts|tsx)$/)) {
            checkFile(full);
        }
    });
}

const projectRoot = path.join(__dirname, "src");
traverseDir(projectRoot);
