import { Chalk, UserError } from '@smartsheet-bridge/extension-cli-logger';

interface Template {
  templateName: string;
  workspaceName: string;
}

export class ExtensionInUseError extends UserError {
  public constructor(extension: string, templates: Template[] = []) {
    super(
      `Cannot revoke '${extension}' extension because the workflows below depend on it.`,
      `You can override this with ${Chalk.cyan('--force')} option.`,
      {
        items: templates.map(
          template =>
            `'${template.templateName}' on '${template.workspaceName}'.`
        ),
      }
    );
    this.label = 'Templates';
  }
}
