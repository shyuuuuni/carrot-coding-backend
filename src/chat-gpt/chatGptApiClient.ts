import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Configuration, CreateChatCompletionRequest, OpenAIApi } from 'openai';

@Injectable()
export class ChatGptApiClient {
  // NestJS logger
  private readonly logger = new Logger(ChatGptApiClient.name);
  // ChatGPT API
  private openai: OpenAIApi;
  private requestConfiguration: CreateChatCompletionRequest;

  constructor(readonly configService: ConfigService) {
    const configuration = new Configuration({
      apiKey: configService.get<string>('CHAT_GPT_API_KEY'),
    });

    // Initialize Configuration
    this.openai = new OpenAIApi(configuration);
    this.requestConfiguration = {
      model: 'gpt-3.5-turbo',
      temperature: 0,
      messages: [],
    };
  }

  async getAnswer(question: string, parameters: { [key: string]: string }) {
    this.logger.log('ChatGPT API request with', question, parameters);

    const requestConfiguration = { ...this.requestConfiguration, messages: [] };
    requestConfiguration.messages.push({
      role: 'system',
      content:
        'You are the assistant that gives information about programming in Korean.',
    });
    Object.entries(parameters).forEach(([key, value]) => {
      requestConfiguration.messages.push({
        role: 'assistant',
        content: `[${key}]: ${value}`,
      });
    });
    requestConfiguration.messages.push({
      role: 'user',
      content: question,
    });

    const res = await this.openai.createChatCompletion(requestConfiguration);
    const id = res.data.id,
      usage = res.data.usage,
      finishReason = res.data.choices[0].finish_reason;

    this.logger.log(
      `Chat GPT API Usage: id(${id}) - prompt_tokens(${usage.prompt_tokens}), completion_tokens(${usage.completion_tokens}), total_tokens(${usage.total_tokens})`,
    );
    if (finishReason !== 'stop') {
      throw new Error(
        `ChatGPT API responds ${finishReason} status. See: https://platform.openai.com/docs/guides/chat/introduction`,
      );
    }

    return res.data.choices[0].message.content;
  }
}
