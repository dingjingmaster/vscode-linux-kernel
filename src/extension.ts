// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { Logger } from './logger';
import * as os from "os";
import * as fs from 'fs';
import * as path from 'path';

let logger: Logger;

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	logger = new Logger();

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	logger.info('Congratulations, your extension "vscode-linux-kernel" is now active!');
	const folder = vscode.workspace.workspaceFolders?.[0]; 
	if (folder) {
		const rootPath = folder.uri.fsPath;
		logger.info(`Workspace folder: ` + rootPath);
		const filePath = path.join(rootPath, 'kernel', 'Makefile');
		if (fs.existsSync(filePath)) {
			logger.info(`Found kernel Makefile: ${filePath}`);
			vscode.window.showInformationMessage('检测到您正在查看内核代码, 启动vscode-linux-kernel插件!');
			// 这里启动核心功能
		} else {
			logger.warning(`Kernel Makefile not found: ${filePath}`);
		}
	} 

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('vscode-linux-kernel.start', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Start vscode-linux-kernel!');
		// 这里启动核心功能
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {
	logger?.dispose();
}
