import { AbstractError } from './AbstractError';

export interface UserErrorDetails {
  docs?: string;
  items?: string[];
}

export class UserError extends AbstractError {
  public docs: string;
  public description: string;
  public items: string[];
  protected label: string = 'Examples';
  public constructor(
    message: string,
    description: string,
    { docs, items = [] }: UserErrorDetails = {}
  ) {
    super(message);
    this.docs = docs;
    this.description = description;
    this.items = items;
  }

  public toOut(): string {
    let out = `${this.message}\n- ${this.description}`;

    if (this.docs) {
      out += `\n- ${this.docs}`;
    }

    if (this.items.length > 0) {
      out += `\n- ${this.label}:`;
      out += this.items.map(example => `\n  - ${example}`).join('');
    }
    return out;
  }
}
