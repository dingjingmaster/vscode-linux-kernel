import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

export enum LogLevel {
    Info = 'info',
    Warning = 'warning',
    Error = 'error',
}

export class Logger {
    private logFilePath: string = path.join(os.tmpdir(), '/vscode-linux-kernel.log');
    private outputChannel: vscode.OutputChannel;

    constructor() {
        this.outputChannel = vscode.window.createOutputChannel('vscode-linux-kernel');
        this.appendFileLine(`=====Start! Logger initialized. Log file: ${this.logFilePath}`);
    }

    private formatMessage(level: LogLevel, message: string): string {
        const timestamp = new Date().toISOString();
        return `[${timestamp}] [${level}] ${message}`;
    }

    private log (level: LogLevel, message: string) {
        const formattedMessage = this.formatMessage(level, message);
        this.outputChannel.appendLine(formattedMessage);
        if (level === LogLevel.Error) {
            console.error(formattedMessage);
        }
        else if (level === LogLevel.Warning) {
            console.warn(formattedMessage);
        }
        else {
            console.log(formattedMessage);
        }
        this.appendFileLine(formattedMessage);
    }
    private appendFileLine(message: string) {
        fs.appendFileSync(this.logFilePath, message + os.EOL, { encoding: 'utf8' });
    }

    public info(message: string) {
        this.log(LogLevel.Info, message);
    }
    public warning(message: string) {
        this.log(LogLevel.Warning, message);
    }
    public error(message: string) {
        this.log(LogLevel.Error, message);
    }
    
    public show() {
        this.outputChannel.show(true);
    }
    public dispose() {
        this.outputChannel.dispose();
        this.appendFileLine(`=====End! Logger disposed.`);
    }
}
