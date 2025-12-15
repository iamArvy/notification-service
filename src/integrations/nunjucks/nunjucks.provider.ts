import * as fs from 'fs/promises';

import { Injectable, Logger } from '@nestjs/common';
import * as nunjucks from 'nunjucks';

@Injectable()
export class NunjucksProvider {
  private readonly logger = new Logger(NunjucksProvider.name);

  /**
   * Compiles an email template using Nunjucks.
   * @param templateName The filename of the template (e.g., "welcome.njk")
   * @param context The data to inject
   * @returns The compiled HTML string
   */
  async compile(
    templatePath: string,
    context: Record<string, unknown>,
  ): Promise<string> {
    try {
      const template = await fs.readFile(templatePath, 'utf-8');

      const fullContext = {
        ...context,
        copyRightYear: new Date().getFullYear(),
      };

      return nunjucks.renderString(template, fullContext);
    } catch (error) {
      this.logger.error(
        `Error reading or compiling template at: ${templatePath}`,
        error,
      );
      throw new Error('Could not load or compile email template.');
    }
  }
}
