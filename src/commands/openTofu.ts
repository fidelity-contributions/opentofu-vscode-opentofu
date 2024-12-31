// Copyright (c) The OpenTofu Authors
// SPDX-License-Identifier: MPL-2.0
// Copyright (c) HashiCorp, Inc.
// SPDX-License-Identifier: MPL-2.0

import * as vscode from 'vscode';
import { LanguageClient } from 'vscode-languageclient/node';
import * as opentofu from '../api/openTofu/openTofu';

export class OpenTofuCommands implements vscode.Disposable {
  private commands: vscode.Disposable[];

  constructor(private client: LanguageClient) {
    this.commands = [
      vscode.commands.registerCommand('opentofu.init', async () => {
        await opentofu.initAskUserCommand(this.client);
      }),
      vscode.commands.registerCommand('opentofu.initCurrent', async () => {
        await opentofu.initCurrentOpenFileCommand(this.client);
      }),
      vscode.commands.registerCommand('opentofu.apply', async () => {
        await opentofu.command('apply', this.client, true);
      }),
      vscode.commands.registerCommand('opentofu.plan', async () => {
        await opentofu.command('plan', this.client, true);
      }),
      vscode.commands.registerCommand('opentofu.validate', async () => {
        await opentofu.command('validate', this.client);
      }),
    ];
  }

  dispose() {
    this.commands.forEach((c) => c.dispose());
  }
}
