import { AbstractError } from './AbstractError';

export interface UserErrorDetails {
  docs?: string;
  examples?: string[];
}

export class UserError extends AbstractError {
  public docs: string;
  public description: string;
  public examples: string[];
  public constructor(
    message: string,
    description: string,
    { docs, examples = [] }: UserErrorDetails = {}
  ) {
    super(message);
    this.docs = docs;
    this.description = description;
    this.examples = examples;
  }

  public toOut(): string {
    let out = `${this.message}\n- ${this.description}`;

    if (this.docs) {
      out += `\n- ${this.docs}`;
    }

    if (this.examples.length > 0) {
      out += `\n- Examples:`;
      out += this.examples.map(example => `\n  - ${example}`).join('');
    }
    return out;
  }
}
